// Повідомлення (toast) поверх модального вікна

import { TOAST_DURATION } from './config.js';
import { els } from './elements.js';

let toast = null;
let toastTimer = null;

// popover потрапляє у верхній шар браузера, тому повідомлення видно поверх
// модального вікна. Створюємо його всередині <dialog>
export function showToast(text) {
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('popover', 'manual');
    toast.setAttribute('role', 'status');
    els.modal.append(toast);
  }

  clearTimeout(toastTimer);

  // перевідкриття піднімає повідомлення над модалкою
  if (toast.matches(':popover-open')) toast.hidePopover();

  toast.textContent = text;
  toast.showPopover();
  toastTimer = setTimeout(() => toast.hidePopover(), TOAST_DURATION);
}

export function hideToast() {
  clearTimeout(toastTimer);

  if (toast?.matches(':popover-open')) toast.hidePopover();
}
