// Точка входу книжкового блоку: main.js викликає initBooks() після рендеру

import { initElements } from './elements.js';
import { ALL_CATEGORIES } from './config.js';
import { bindBooksEvents, loadBooks } from './books.js';
import { bindFilterEvents, loadCategories } from './filter.js';
import { bindModalEvents, initAccordion } from './modal.js';
import { bindQuantityEvents } from './quantity.js';

export function initBooks() {
  initElements();

  initAccordion();
  bindBooksEvents();
  bindFilterEvents();
  bindQuantityEvents();
  bindModalEvents();

  loadCategories();
  loadBooks(ALL_CATEGORIES);
}
