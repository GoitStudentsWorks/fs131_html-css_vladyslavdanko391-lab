import iconsUrl from "../assets/icons/icons.svg?url";

import midnightImage from "../img/midnight.jpg";
import bookCoverImage from "../img/book-cover.jpg";
import childrenImage from "../img/children.jpg";
import articleImage from "../img/article/articleimg.jpg";
import articleImage2x from "../img/article/articleimg@2.jpg";
import janeAvatar from "../img/feedbacks/jane-doe.png";
import johnAvatar from "../img/feedbacks/john-smith.png";
import emilyJohnsonAvatar from "../img/feedbacks/emily-johnson.png";
import michaelAvatar from "../img/feedbacks/michael-wilson.png";
import emilyAvatar from "../img/feedbacks/emily-davis.png";
import danielAvatar from "../img/feedbacks/daniel-lee.png";
import coverPlaceholderImage from "../img/cover-placeholder.svg";

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

import { initBooks } from "./books/init-books.js";
import { initFeedbacks } from "./feedbacks.js";

const heroImages = import.meta.glob("../img/hero/*.avif", {
  eager: true,
  query: "?url",
  import: "default",
});

const withIcons = (html) => html.replaceAll("/icons.svg", iconsUrl);

const headerHtml = withIcons(header);

const booksHtml = withIcons(books).replaceAll(
  "./images/cover-placeholder.svg",
  coverPlaceholderImage,
);

const bookModalHtml = withIcons(bookModal).replaceAll(
  "./images/cover-placeholder.svg",
  coverPlaceholderImage,
);

const eventsHtml = withIcons(events)
  .replaceAll("/src/img/midnight.jpg", midnightImage)
  .replaceAll("/src/img/book-cover.jpg", bookCoverImage)
  .replaceAll("/src/img/children.jpg", childrenImage);

const heroHtml = Object.entries(heroImages).reduce(
  (html, [path, url]) => {
    const filename = path.split("/").pop();

    return html.replaceAll(`./src/img/hero/${filename}`, url);
  },
  withIcons(hero),
);

const feedbacksHtml = withIcons(feedbacks)
  .replaceAll("/src/img/feedbacks/jane-doe.png", janeAvatar)
  .replaceAll("/src/img/feedbacks/john-smith.png", johnAvatar)
  .replaceAll("/src/img/feedbacks/emily-johnson.png", emilyJohnsonAvatar)
  .replaceAll("/src/img/feedbacks/michael-wilson.png", michaelAvatar)
  .replaceAll("/src/img/feedbacks/emily-davis.png", emilyAvatar)
  .replaceAll("/src/img/feedbacks/daniel-lee.png", danielAvatar);  

const articleHtml = withIcons(article)
  .replaceAll("./src/img/article/articleimg.jpg", articleImage)
  .replaceAll("./src/img/article/articleimg@2.jpg", articleImage2x);

const app = document.querySelector("#app");

if (!app) {
  throw new Error("Не знайдено елемент #app у index.html");
}

app.innerHTML = `
  ${headerHtml}
  ${booksHtml}
  ${heroHtml}
  ${feedbacksHtml}
  ${eventsHtml}
  ${articleHtml}
  ${withIcons(location)}
  ${withIcons(footer)}
  ${bookModalHtml}
  ${withIcons(contactModal)}
`;

initBooks();
initFeedbacks();

await Promise.all([
  import("./header.js"),
  import("./events.js"),
  import("./footer.js"),
  import("./hero.js"),
]);
