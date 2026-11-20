import '../css/reset.css'
import '../css/style.css'
import header from '../partials/header.html?raw'
import hero from '../partials/hero.html?raw'
import books from '../partials/books.html?raw'
import feedbacks from '../partials/feedbacks.html?raw'
import events from '../partials/events.html?raw'
import article from '../partials/article.html?raw'
import location from '../partials/location.html?raw'
import footer from '../partials/footer.html?raw'
document.querySelector('#app').innerHTML = `
  ${header}
  ${hero}
  ${books}
  ${feedbacks}
  ${events}
  ${article}
  ${location}
  ${footer}
`
