const scrollUpBtn = document.querySelector('[data-scroll-up]');

// Після скількох пікселів прокрутки показувати кнопку
const SHOW_AFTER = 400;

const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)',
);

function toggleScrollUp() {
  scrollUpBtn.classList.toggle('is-visible', window.scrollY > SHOW_AFTER);
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
  });
}

if (scrollUpBtn) {
  window.addEventListener('scroll', toggleScrollUp, { passive: true });
  scrollUpBtn.addEventListener('click', scrollToTop);
  toggleScrollUp();
}
