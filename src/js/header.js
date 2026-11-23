const openMenuBtn = document.querySelector('[data-menu-open]');
const closeMenuBtn = document.querySelector('[data-menu-close]');
const mobileMenu = document.querySelector('[data-menu]');
const mobileNavLinks = document.querySelectorAll('.mobile-menu__link');

function openMenu() {
  if (!mobileMenu || !openMenuBtn) return;
  mobileMenu.classList.add('is-open');
  openMenuBtn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', handleEscapeKey);
}

function closeMenu() {
  if (!mobileMenu || !openMenuBtn) return;
  mobileMenu.classList.remove('is-open');
  openMenuBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  document.removeEventListener('keydown', handleEscapeKey);
}

function handleEscapeKey(event) {
  if (event.key === 'Escape') {
    closeMenu();
  }
}

openMenuBtn?.addEventListener('click', openMenu);
closeMenuBtn?.addEventListener('click', closeMenu);

mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    closeMenu();
  });
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 768 && mobileMenu?.classList.contains('is-open')) {
    closeMenu();
  }
});
