const registerButtons = document.querySelectorAll(".events-btn");
const modal = document.querySelector(".register-modal");
const closeButton = document.querySelector(".register-modal__close");
const modalEventTitle = document.querySelector(".register-modal__event-title");
const form = document.querySelector(".register-form");

//  MODAL

function openModal(eventTitle) {
  if (!modal || !modalEventTitle) return;

  modalEventTitle.textContent = eventTitle;
  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  const nameInput = form?.querySelector("#name");
  nameInput?.focus();
}

function closeModal() {
  if (!modal) return;

  modal.classList.remove("active");
  document.body.style.overflow = "";
}

registerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const eventSlide = button.closest(".events-slider__slide");
    const eventTitle = eventSlide?.querySelector(".events-slide__title");

    if (eventTitle) {
      openModal(eventTitle.textContent.trim());
    }
  });
});

closeButton?.addEventListener("click", closeModal);

modal?.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal?.classList.contains("active")) {
    closeModal();
  }
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  const registration = {
    name: String(formData.get("name") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    message: String(formData.get("message") || "").trim(),
    event: modalEventTitle?.textContent.trim() || "",
  };

  console.log("Event registration:", registration);

  alert(
    "Thank you for registering! We look forward to seeing you at the event.",
  );
  form.reset();
  closeModal();
});

// EVENTS SLIDER

const sliderViewport = document.querySelector(".events-slider__viewport");
const sliderTrack = document.querySelector(".events-slider__track");
const slides = Array.from(document.querySelectorAll(".events-slider__slide"));
const dotsContainer = document.querySelector(".events-slider__dots");
const prevButton = document.querySelector(".events-slider__arrow--prev");
const nextButton = document.querySelector(".events-slider__arrow--next");

if (
  sliderViewport &&
  sliderTrack &&
  slides.length &&
  dotsContainer &&
  prevButton &&
  nextButton
) {
  let currentSlide = 0;
  let scrollFrame = null;
  let dots = [];

  const tabletQuery = window.matchMedia("(min-width: 768px)");
  const desktopQuery = window.matchMedia("(min-width: 1440px)");

  function getVisibleSlides() {
    if (desktopQuery.matches) return slides.length;
    if (tabletQuery.matches) return 2;

    return 1;
  }

  function getMaxSlide() {
    return Math.max(0, slides.length - getVisibleSlides());
  }

  function getSlideOffset(index) {
    return slides[index].offsetLeft - slides[0].offsetLeft;
  }

  function createDots() {
    dotsContainer.replaceChildren();
    dots = [];

    const dotsCount = getMaxSlide() + 1;

    for (let index = 0; index < dotsCount; index++) {
      const dot = document.createElement("button");

      dot.type = "button";
      dot.className = "events-slider__dot";
      dot.setAttribute("aria-label", `Go to slide ${index + 1}`);

      dot.addEventListener("click", () => {
        goToSlide(index);
      });

      dotsContainer.append(dot);
      dots.push(dot);
    }
  }

  function updateSlider() {
    dots.forEach((dot, index) => {
      const active = index === currentSlide;

      dot.classList.toggle("active", active);
      dot.setAttribute("aria-current", String(active));
    });

    prevButton.disabled = currentSlide === 0;
    nextButton.disabled = currentSlide >= getMaxSlide();
  }

  function goToSlide(index, smooth = true) {
    currentSlide = Math.max(0, Math.min(index, getMaxSlide()));

    if (!desktopQuery.matches) {
      sliderViewport.scrollTo({
        left: getSlideOffset(currentSlide),
        behavior: smooth ? "smooth" : "auto",
      });
    } else {
      sliderViewport.scrollTo({
        left: 0,
        behavior: "auto",
      });
    }

    updateSlider();
  }

  function syncCurrentSlide() {
    if (desktopQuery.matches) {
      currentSlide = 0;
      updateSlider();
      return;
    }

    const viewportLeft = sliderViewport.getBoundingClientRect().left;

    let closestIndex = 0;
    let smallestDistance = Infinity;

    slides.slice(0, getMaxSlide() + 1).forEach((slide, index) => {
      const distance = Math.abs(
        slide.getBoundingClientRect().left - viewportLeft,
      );

      if (distance < smallestDistance) {
        smallestDistance = distance;
        closestIndex = index;
      }
    });

    currentSlide = closestIndex;
    updateSlider();
  }

  prevButton.addEventListener("click", () => {
    goToSlide(currentSlide - 1);
  });

  nextButton.addEventListener("click", () => {
    goToSlide(currentSlide + 1);
  });

  sliderViewport.addEventListener("scroll", () => {
    if (desktopQuery.matches) return;

    if (scrollFrame !== null) {
      cancelAnimationFrame(scrollFrame);
    }

    scrollFrame = requestAnimationFrame(() => {
      syncCurrentSlide();
      scrollFrame = null;
    });
  });

  function handleResize() {
    currentSlide = Math.min(currentSlide, getMaxSlide());

    createDots();

    requestAnimationFrame(() => {
      goToSlide(currentSlide, false);
    });
  }

  window.addEventListener("resize", handleResize);

  createDots();
  updateSlider();
}
