// Фільтр за категоріями

import { getCategoryList } from '../api.js';
import { ALL_CATEGORIES } from './config.js';
import { els } from './elements.js';
import { loadBooks } from './books.js';

function createFilterItem(name) {
  const item = els.filterTemplate.content.cloneNode(true);
  const button = item.querySelector('.filter-button');

  button.textContent = name;
  button.classList.toggle('filter-button-active', name === ALL_CATEGORIES);

  return item;
}

export async function loadCategories() {
  const fragment = document.createDocumentFragment();

  fragment.append(createFilterItem(ALL_CATEGORIES));
  if (els.filterError) els.filterError.hidden = true;

  try {
    const categories = await getCategoryList();

    categories
      .map(({ list_name: name }) => name)
      .filter(Boolean)
      .forEach((name) => fragment.append(createFilterItem(name)));
  } catch (error) {
    console.error(error);
    if (els.filterError) els.filterError.hidden = false;
  }

  els.filterList.replaceChildren(fragment);
}

function setFilterOpen(isOpen) {
  els.filterToggle.setAttribute('aria-expanded', String(isOpen));
}

function toggleFilter() {
  setFilterOpen(els.filterToggle.getAttribute('aria-expanded') !== 'true');
}

function selectCategory(button) {
  const category = button.textContent;

  els.filterList
    .querySelector('.filter-button-active')
    ?.classList.remove('filter-button-active');
  button.classList.add('filter-button-active');

  els.filterToggleText.textContent =
    category === ALL_CATEGORIES ? 'Categories' : category;
  setFilterOpen(false);

  loadBooks(category);
}

function onFilterListClick(event) {
  const button = event.target.closest('.filter-button');

  if (button) selectCategory(button);
}

export function bindFilterEvents() {
  els.filterToggle.addEventListener('click', toggleFilter);
  els.filterList.addEventListener('click', onFilterListClick);

  // клік поза фільтром або Escape згортає випадаючий список
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.filter')) setFilterOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setFilterOpen(false);
  });
}
