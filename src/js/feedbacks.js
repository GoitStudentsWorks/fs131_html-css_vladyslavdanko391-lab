
import Swiper from 'swiper';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

export function initFeedbacks() {
  const swiperElement = document.querySelector('.feedbacks-swiper');

  if (!swiperElement) {
    console.error('Feedbacks: .feedbacks-swiper not found');
    return;
  }

  const container = swiperElement.closest('.feedbacks-container');
  const prevButton = container.querySelector('.feedbacks-arrow-left');
  const nextButton = container.querySelector('.feedbacks-arrow-right');
  const pagination = container.querySelector('.feedbacks-dots');

  new Swiper(swiperElement, {
    modules: [Navigation, Pagination, Keyboard],

    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 16,

    speed: 300,
    loop: false,

    navigation: {
      prevEl: prevButton,
      nextEl: nextButton,
    },

    pagination: {
      el: pagination,
      clickable: true,
    },

    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },

    breakpoints: {
      768: {
        slidesPerView: 2,
        slidesPerGroup: 1,
        spaceBetween: 24,
      },

      1024: {
        slidesPerView: 3,
        slidesPerGroup: 1,
        spaceBetween: 24,
      },
    },
  });
}
