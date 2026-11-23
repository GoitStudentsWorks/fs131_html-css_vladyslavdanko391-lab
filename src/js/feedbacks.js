const feedbacks = [
  {
    text: "Great selection, fast delivery, and beautifully packaged books. My go-to store for weekend reads!",
    name: "Jane Doe",
    role: "Book Lover, Reader",
  },
  {
    text: "I love discovering new books here. The atmosphere is wonderful, and the selection is amazing!",
    name: "John Smith",
    role: "Book Enthusiast",
  },
  {
    text: "A wonderful bookstore with friendly staff and an excellent collection of books.",
    name: "Anna Brown",
    role: "Regular Customer",
  },
];

export function initFeedbacks() {
  const feedbackText = document.querySelector(".feedbacks-text");
  const feedbackName = document.querySelector(".feedbacks-name");
  const feedbackRole = document.querySelector(".feedbacks-role");

  const prevBtn = document.querySelector(".feedbacks-arrow-left");
  const nextBtn = document.querySelector(".feedbacks-arrow-right");
  const dots = document.querySelectorAll(".feedbacks-dot");

  if (!feedbackText || !feedbackName || !feedbackRole || !prevBtn || !nextBtn) {
    return;
  }

  let currentIndex = 0;

  function showFeedback(index) {
    const feedback = feedbacks[index];

    feedbackText.textContent = feedback.text;
    feedbackName.textContent = feedback.name;
    feedbackRole.textContent = feedback.role;

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % feedbacks.length;
    showFeedback(currentIndex);
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + feedbacks.length) % feedbacks.length;

    showFeedback(currentIndex);
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex = index;
      showFeedback(currentIndex);
    });
  });

  showFeedback(currentIndex);
}
