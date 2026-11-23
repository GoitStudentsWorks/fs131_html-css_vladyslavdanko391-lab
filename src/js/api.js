const BASE_URL = 'https://books-backend.p.goit.global/books';

// Один спільний запит: перевіряє відповідь і повертає JSON
async function request(path) {
  const response = await fetch(`${BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(
      `Request failed: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}

// [{ list_name: "Business" }, ...]
export function getCategoryList() {
  return request('/category-list');
}

// [{ list_name: "Business", books: [ {...}, ... ] }, ...]
export function getTopBooks() {
  return request('/top-books');
}

// [ {...book}, ... ]
export function getBooksByCategory(category) {
  return request(`/category?category=${encodeURIComponent(category)}`);
}

// {...book}
export function getBookById(id) {
  return request(`/${encodeURIComponent(id)}`);
}
