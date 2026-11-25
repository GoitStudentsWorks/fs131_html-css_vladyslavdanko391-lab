// Допоміжні функції: розміри сторінки, форматування, обробка даних

import { DESKTOP_PAGE_SIZE, MOBILE_PAGE_SIZE, desktopQuery } from './config.js';

export function getPageSize() {
  return desktopQuery.matches ? DESKTOP_PAGE_SIZE : MOBILE_PAGE_SIZE;
}

// "ATOMIC HABITS" -> "Atomic Habits"
export function formatTitle(title = '') {
  return title.toLowerCase().replace(/(^|\s)\S/g, (char) => char.toUpperCase());
}

// Ціна книги з бекенду -> число. Розуміє 15, "15.00", "$15.50", "15,5".
// Якщо бекенд не віддав ціну (або віддав 0) - повертає 0, нічого не вигадуємо
export function getBookPrice(book) {
  const raw = String(book?.price ?? '').replace(',', '.');
  const value = parseFloat(raw.replace(/[^\d.]/g, ''));

  return value > 0 ? value : 0;
}

// 15 -> "$15", "32.16" -> "$32.16", 142.6 -> "$142.60"
export function formatPrice(price) {
  const value = Number(price) || 0;

  return Number.isInteger(value) ? `$${value}` : `$${value.toFixed(2)}`;
}

// Об'єднує книги з усіх категорій в один список без дублікатів
export function flattenTopBooks(categories) {
  const unique = new Map();

  categories.forEach(({ books }) => {
    books.forEach((book) => unique.set(book._id, book));
  });

  return [...unique.values()];
}
