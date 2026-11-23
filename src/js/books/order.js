// Кнопки Add To Cart та Buy Now

import { THANK_YOU_MESSAGE } from './config.js';
import { formatPrice, formatTitle } from './helpers.js';
import { getQuantity, getTotalPrice, validateQuantity } from './quantity.js';
import { state } from './state.js';
import { showToast } from './toast.js';

function getOrderText() {
  const title = formatTitle(state.currentBook?.title);

  return `${getQuantity()} × ${title} (${formatPrice(getTotalPrice())})`;
}

// ТЗ: "Add To Cart" (type="button") - у консоль і повідомленням на сторінці
export function onAddToCartClick() {
  if (!state.currentBook || !validateQuantity()) return;

  console.log('Add To Cart:', {
    id: state.currentBook._id,
    title: formatTitle(state.currentBook.title),
    quantity: getQuantity(),
    total: getTotalPrice(),
  });

  showToast(`Added to cart: ${getOrderText()}`);
}

// ТЗ: "Buy Now" (type="submit") - повідомлення "Дякуємо за покупку"
export function onModalFormSubmit(event) {
  event.preventDefault();

  if (!validateQuantity()) return;

  showToast(THANK_YOU_MESSAGE);
}
