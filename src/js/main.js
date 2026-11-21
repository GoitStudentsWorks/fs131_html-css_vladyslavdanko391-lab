import iconsUrl from "../assets/icons/icons.svg?url";

import midnightImage from "../img/midnight.jpg";
import bookCoverImage from "../img/book-cover.jpg";
import childrenImage from "../img/children.jpg";

import "../css/reset.css";
import "../css/index.css";

import header from "../partials/header.html?raw";
import hero from "../partials/hero.html?raw";
import books from "../partials/books.html?raw";
import feedbacks from "../partials/feedbacks.html?raw";
import events from "../partials/events.html?raw";
import article from "../partials/article.html?raw";
import location from "../partials/location.html?raw";
import footer from "../partials/footer.html?raw";
import bookModal from "../partials/book-modal.html?raw";
import contactModal from "../partials/contact-modal.html?raw";

const withIcons = (html) => html.replaceAll("/icons.svg", iconsUrl);

const headerHtml = withIcons(header);

const eventsHtml = withIcons(events)
  .replaceAll("/src/img/midnight.jpg", midnightImage)
  .replaceAll("/src/img/book-cover.jpg", bookCoverImage)
  .replaceAll("/src/img/children.jpg", childrenImage);

const app = document.querySelector("#app");

if (!app) {
  throw new Error("Не знайдено елемент #app у index.html");
}

app.innerHTML = `
  ${headerHtml}
  ${hero}
  ${books}
  ${feedbacks}
  ${eventsHtml}
  ${article}
  ${location}
  ${footer}
  ${bookModal}
  ${contactModal}
`;

// Ці модулі шукають елементи в DOM, тому запускаємо їх після вставлення partials.
await Promise.all([import("./header.js"), import("./events.js")]);
