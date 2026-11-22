import "./style.css";

import footerHtml from "./components/footer/footer.html?raw";
import "./components/footer/footer.css";
import { initFooter } from "./components/footer/footer.js";

const app = document.querySelector("#app");

app.insertAdjacentHTML("beforeend", footerHtml);
initFooter();
