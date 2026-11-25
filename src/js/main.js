import { initFooter } from "./footer.js";
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
import janeAvatar2x from "../img/feedbacks/jane-doe@2x.png";
import johnAvatar2x from "../img/feedbacks/john-smith@2x.png";
import emilyJohnsonAvatar2x from "../img/feedbacks/emily-johnson@2x.png";
import michaelAvatar2x from "../img/feedbacks/michael-wilson@2x.png";
import emilyAvatar2x from "../img/feedbacks/emily-davis@2x.png";
import danielAvatar2x from "../img/feedbacks/daniel-lee@2x.png";
import coverPlaceholderImage from "../img/cover-placeholder.svg";

import "modern-normalize/modern-normalize.css";
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
import loader from "../partials/loader.html?raw";

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
  .replaceAll("/src/img/feedbacks/daniel-lee.png", danielAvatar) 
  .replaceAll( "/src/img/feedbacks/jane-doe@2x.png",janeAvatar2x)
  .replaceAll("/src/img/feedbacks/john-smith@2x.png", johnAvatar2x)
  .replaceAll("/src/img/feedbacks/emily-johnson@2x.png", emilyJohnsonAvatar2x)
  .replaceAll("/src/img/feedbacks/michael-wilson@2x.png", michaelAvatar2x)
  .replaceAll("/src/img/feedbacks/emily-davis@2x.png", emilyAvatar2x)
  .replaceAll("/src/img/feedbacks/daniel-lee@2x.png", danielAvatar2x);
 

const articleHtml = withIcons(article)
  .replaceAll("./src/img/article/articleimg.jpg", articleImage)
  .replaceAll("./src/img/article/articleimg@2.jpg", articleImage2x);

const app = document.querySelector("#app");

if (!app) {
  throw new Error("Не знайдено елемент #app у index.html");
}

app.innerHTML = `
  ${headerHtml}
  ${heroHtml}
  ${booksHtml}
  ${feedbacksHtml}
  ${eventsHtml}
  ${articleHtml}
  ${withIcons(location)}
  ${withIcons(footer)}
  ${bookModalHtml}
  ${withIcons(contactModal)}
  ${loader}
`;

initBooks();
initFeedbacks();
initFooter();

await Promise.all([
  import("./header.js"),
  import("./events.js"),
  import("./hero.js"),
]);
