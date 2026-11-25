let requestsCount = 0;

export function showLoader() {
  requestsCount = requestsCount + 1;

  const loader = document.querySelector('.loader-backdrop');
  loader.classList.remove('is-hidden');
}

export function hideLoader() {
  requestsCount = requestsCount - 1;
  if (requestsCount > 0) {
    return;
  }
   

  const loader = document.querySelector('.loader-backdrop');
  loader.classList.add('is-hidden');
}