// Усі потрібні DOM-елементи в одному об'єкті `els`.
// Розмітку малює main.js, тому елементи шукаємо лише після рендеру:
// initElements() викликається з initBooks().

export const els = {};

export function initElements() {
  const modal = document.querySelector('.modal');
  const [quantityMinus, quantityPlus] =
    modal.querySelectorAll('.quantity-button');

  Object.assign(els, {
    // секція Books
    shown: document.querySelector('.books-shown'),
    total: document.querySelector('.books-total'),
    booksList: document.querySelector('.books-list'),
    showMore: document.querySelector('.books-more'),
    bookTemplate: document.querySelector('#book-card-template'),

    // фільтр
    filter: document.querySelector('.filter'),
    filterToggle: document.querySelector('.filter-toggle'),
    filterToggleText: document.querySelector('.filter-toggle-text'),
    filterList: document.querySelector('.filter-list'),
    filterError: document.querySelector('.filter-error'),
    filterTemplate: document.querySelector('#filter-item-template'),

    // модальне вікно
    modal,
    modalClose: modal.querySelector('.modal-close'),
    modalImage: modal.querySelector('.modal-image'),
    modalTitle: modal.querySelector('.modal-title'),
    modalAuthor: modal.querySelector('.modal-author'),
    modalPrice: modal.querySelector('.modal-price'),
    modalDescription: modal.querySelector('.modal-description'),
    modalForm: modal.querySelector('.modal-form'),
    addToCart: modal.querySelector('.modal-actions .button-primary'),
    quantityInput: modal.querySelector('.quantity-input'),
    quantityError: modal.querySelector('.quantity-error'),
    quantityMinus,
    quantityPlus,
  });
}
