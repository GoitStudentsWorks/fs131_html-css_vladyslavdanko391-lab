// Кількість і ціна в модальному вікні

import { MAX_QUANTITY } from './config.js';
import { els } from './elements.js';
import { formatPrice, getBookPrice } from './helpers.js';
import { state } from './state.js';

// Коректна кількість: ціле число від 1 до MAX_QUANTITY
function isQuantityValid() {
  const input = els.quantityInput;
  const value = Number(input.value);

  return (
    input.value.trim() !== '' &&
    Number.isInteger(value) &&
    value >= 1 &&
    value <= MAX_QUANTITY
  );
}

// Error text з Figma під полем кількості
export function setQuantityError(hasError) {
  if (els.quantityError) els.quantityError.hidden = !hasError;
  els.quantityInput.setAttribute('aria-invalid', String(hasError));
}

export function validateQuantity() {
  const isValid = isQuantityValid();

  setQuantityError(!isValid);

  if (!isValid) els.quantityInput.focus();

  return isValid;
}

// Кількість для розрахунку: від 1 до MAX_QUANTITY (порожнє поле = 1)
export function getQuantity() {
  const value = Math.floor(Number(els.quantityInput.value)) || 1;

  return Math.min(MAX_QUANTITY, Math.max(1, value));
}

// Ціна = ціна однієї книги × кількість. Рахуємо в центах,
// щоб уникнути похибок дробів (35.65 × 3 = 106.95)
export function getTotalPrice() {
  const unitCents = Math.round(getBookPrice(state.currentBook) * 100);

  return (unitCents * getQuantity()) / 100;
}

export function updateModalPrice() {
  const quantity = getQuantity();

  els.modalPrice.textContent = formatPrice(getTotalPrice());
  els.quantityMinus.disabled = quantity <= 1;
  els.quantityPlus.disabled = quantity >= MAX_QUANTITY;
}

function changeQuantity(step) {
  els.quantityInput.value = Math.min(
    MAX_QUANTITY,
    Math.max(1, getQuantity() + step),
  );
  setQuantityError(false);
  updateModalPrice();
}

// Під час набору: ціна оновлюється одразу, помилка - лише для явно
// некоректного числа (порожнє поле не лякаємо, поки користувач друкує)
function onQuantityInput() {
  updateModalPrice();
  setQuantityError(els.quantityInput.value !== '' && !isQuantityValid());
}

function onQuantityChange() {
  setQuantityError(!isQuantityValid());
}

// Enter у полі не відправляє форму (Buy Now), лише перевіряє значення
function onQuantityKeydown(event) {
  if (event.key !== 'Enter') return;

  event.preventDefault();
  setQuantityError(!isQuantityValid());
}

export function bindQuantityEvents() {
  els.quantityMinus.addEventListener('click', () => changeQuantity(-1));
  els.quantityPlus.addEventListener('click', () => changeQuantity(1));
  els.quantityInput.addEventListener('input', onQuantityInput);
  els.quantityInput.addEventListener('change', onQuantityChange);
  els.quantityInput.addEventListener('keydown', onQuantityKeydown);
}
