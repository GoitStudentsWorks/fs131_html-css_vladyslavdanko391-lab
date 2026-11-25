import Swiper from "swiper";
import { Navigation, Keyboard } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const swiper = new Swiper(".swiper", {
  modules: [Navigation, Keyboard],
  navigation: {
    prevEl: ".hero-btn-prev",
    nextEl: ".hero-btn-next",
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
});
