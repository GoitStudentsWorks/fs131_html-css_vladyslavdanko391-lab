// Модальне вікно книги: відкриття, наповнення, закриття, акордеон

import Accordion from 'accordion-js';

import { getBookById } from '../api.js';
import { SCROLLBAR_HIDE_DELAY } from './config.js';
import { els } from './elements.js';
import { formatTitle } from './helpers.js';
import { onAddToCartClick, onModalFormSubmit } from './order.js';
import { setQuantityError, updateModalPrice } from './quantity.js';
import { state } from './state.js';
import { hideToast } from './toast.js';

let accordion = null;
let scrollTimer = null;

// Акордеон (accordion-js): Details, Shipping, Returns
export function initAccordion() {
  const container = els.modal.querySelector('.accordion');

  if (!container) return;

  accordion = new Accordion(container, {
    duration: 300,
    showMultiple: false,
    itemClass: 'accordion-item',
    triggerClass: 'accordion-trigger',
    panelClass: 'accordion-panel',
  });
}

// Повертає модалку у початковий стан перед показом
function resetModal() {
  els.quantityInput.value = 1;
  setQuantityError(false);
  updateModalPrice();
  accordion?.closeAll();
  els.modal.scrollTop = 0;
}

// Підставляє дані книги з бекенду
function fillModal(book) {
  const title = formatTitle(book.title);

  state.currentBook = book;

  els.modalImage.src = book.book_image;
  els.modalImage.alt = `${title} book cover`;
  els.modalTitle.textContent = title;
  els.modalAuthor.textContent = book.author;

  if (els.modalDescription) {
    els.modalDescription.textContent =
      book.description || 'Description is not available.';
  }
}

export async function openModal(id) {
  try {
    const book = await getBookById(id);

    fillModal(book);
    resetModal();
    els.modal.showModal();
  } catch (error) {
    console.error(error);
  }
}

// Клік по затемненому фону (поза межами діалогу) закриває модальне вікно
function onModalClick(event) {
  // Лише кліки по самому <dialog>. Клавіатурний "клік" (Enter/Space) має
  // координати 0,0 і інакше помилково закривав би вікно
  if (event.target !== els.modal) return;

  const rect = els.modal.getBoundingClientRect();
  const isInside =
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom;

  if (!isInside) els.modal.close();
}

// Скролбар модалки видно лише під час прокрутки (клас modal-scrolling),
// далі CSS показує його ще й при наведенні курсора
function onModalScroll() {
  els.modal.classList.add('modal-scrolling');

  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => {
    els.modal.classList.remove('modal-scrolling');
  }, SCROLLBAR_HIDE_DELAY);
}

function onModalClose() {
  hideToast();
  clearTimeout(scrollTimer);
  els.modal.classList.remove('modal-scrolling');
}

export function bindModalEvents() {
  // Закриття: кнопка-іконка, backdrop, Escape (вбудовано в <dialog>)
  els.modalClose.addEventListener('click', () => els.modal.close());
  els.modal.addEventListener('click', onModalClick);
  els.modal.addEventListener('close', onModalClose);
  els.modal.addEventListener('scroll', onModalScroll);

  els.addToCart.addEventListener('click', onAddToCartClick);
  els.modalForm.addEventListener('submit', onModalFormSubmit);
}
