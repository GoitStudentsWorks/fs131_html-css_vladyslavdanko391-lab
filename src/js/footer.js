export function initFooter() {
  const form = document.getElementById("footer-form");
  const emailInput = document.getElementById("footer-email");
  const message = document.getElementById("footer-message");

  function showMessage(text, type) {
    message.textContent = text;
    message.classList.remove("is-error", "is-success");
    if (type) message.classList.add(type);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!emailInput.checkValidity()) {
      emailInput.classList.add("is-invalid");
      showMessage(
        emailInput.validity.valueMissing
          ? "Please enter your email."
          : "Please enter a valid email.",
        "is-error",
      );
      return;
    }

    emailInput.classList.remove("is-invalid");
    showMessage("Thank you for signing up!", "is-success");
    form.reset();
  });

  emailInput.addEventListener("input", () => {
    emailInput.classList.remove("is-invalid");
    showMessage("", null);
  });
}
