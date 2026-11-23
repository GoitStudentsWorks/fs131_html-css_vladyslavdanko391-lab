// Список книг: картки, лічильник, Show More, завантаження з бекенду

import { getBooksByCategory, getTopBooks } from '../api.js';
import { ALL_CATEGORIES, SHOW_MORE_STEP } from './config.js';
import { els } from './elements.js';

function createBookCard(book) {
  const card = els.bookTemplate.content.cloneNode(true);
  const title = formatTitle(book.title);
  const image = card.querySelector('.book-card-image');

  card.querySelector('.book-card').dataset.id = book._id;

  image.src = book.book_image;
  image.alt = `${title} book cover`;

  card.querySelector('.book-card-title').textContent = title;
  card.querySelector('.book-card-author').textContent = book.author;
  card.querySelector('.book-card-price').textContent = formatPrice(
    getBookPrice(book),
  );

  return card;
}

// Лічильник "Showing X of Y" + показ/ховання кнопки Show More
function updateCounter() {
  els.shown.textContent = state.visibleCount;
  els.total.textContent = state.books.length;
  els.showMore.hidden = state.visibleCount >= state.books.length;
}

// Додає в список ще `count` книг (з тих, що ще не показані)
function appendBooks(count) {
  const from = state.visibleCount;
  const to = Math.min(from + count, state.books.length);
  const fragment = document.createDocumentFragment();

  state.books.slice(from, to).forEach((book) => {
    fragment.append(createBookCard(book));
  });

  els.booksList.append(fragment);
  state.visibleCount = to;
  updateCounter();
}

// Повідомлення замість списку ("нічого не знайдено" / помилка)
function showMessage(text, isError = false) {
  const item = document.createElement('li');

  item.className = 'books-message';
  item.classList.toggle('books-error', isError);
  item.textContent = text;
  els.booksList.replaceChildren(item);
}

function renderBooks(books) {
  state.books = books;
  state.visibleCount = 0;
  els.booksList.replaceChildren();

  if (books.length === 0) {
    updateCounter();
    showMessage('No books found in this category.');
    return;
  }

  appendBooks(getPageSize());
}

export async function loadBooks(category) {
  // Лише остання відповідь актуальна (якщо швидко клікати по категоріях)
  const requestId = ++state.requestId;

  try {
    const books =
      category === ALL_CATEGORIES
        ? flattenTopBooks(await getTopBooks())
        : await getBooksByCategory(category);

    if (requestId !== state.requestId) return;

    renderBooks(books);
  } catch (error) {
    if (requestId !== state.requestId) return;

    console.error(error);
    state.books = [];
    state.visibleCount = 0;
    updateCounter();
    showMessage('Failed to load books. Please try again later.', true);
  }
}

function onBooksListClick(event) {
  const button = event.target.closest('.book-card-button');

  if (button) openModal(button.closest('.book-card').dataset.id);
}

export function bindBooksEvents() {
  els.showMore.addEventListener('click', () => appendBooks(SHOW_MORE_STEP));
  els.booksList.addEventListener('click', onBooksListClick);
}
