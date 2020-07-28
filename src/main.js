'use strict';
const RENDER_COUNT = {
  five: 5,
  two: 2,
  one: 1};
const hraderNode = document.querySelector(`.header`);
const mainNode = document.querySelector(`.main`);

function render(htmlBlock, parent, position, quantity) {
  for (let i = 0; i < quantity; i++) {
    parent.insertAdjacentHTML(position, htmlBlock);
  }
}

const profileBlock = `<section class="header__profile profile">
  <p class="profile__rating">Movie Buff</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`;

const sortBlock = `<nav class="main-navigation">
<div class="main-navigation__items">
  <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
  <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
  <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
  <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
</div>
<a href="#stats" class="main-navigation__additional">Stats</a>
</nav>
<ul class="sort">
<li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
<li><a href="#" class="sort__button">Sort by date</a></li>
<li><a href="#" class="sort__button">Sort by rating</a></li>
</ul>`;

const filmContainerBlock = `
<section class="films">
  <section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    <div class="films-list__container"></div>
    <button class="films-list__show-more">Show more</button>
</section>
  <section class="films-list--extra">
    <h2 class="films-list__title">Top rated</h2>
    <div class="films-list__container"></div>
    </section>
  <section class="films-list--extra">
    <h2 class="films-list__title">Most commented</h2>
    <div class="films-list__container"></div>
    </section>
  </section>
</section>`;

(function renderAllBlock() {
  render(profileBlock, hraderNode, `beforeend`, RENDER_COUNT.one);
  render(sortBlock, mainNode, `beforeend`, RENDER_COUNT.one);
  render(filmContainerBlock, mainNode, `beforeend`, RENDER_COUNT.one);
})();

(function renderContentInBlock() {
  const filmListContainerNode = mainNode.querySelector(`.films-list .films-list__container`);
  const filmCardBlock = `<article class="film-card">
  <h3 class="film-card__title">Santa Claus Conquers the Martians</h3>
  <p class="film-card__rating">2.3</p>
  <p class="film-card__info">
    <span class="film-card__year">1964</span>
    <span class="film-card__duration">1h 21m</span>
    <span class="film-card__genre">Comedy</span>
  </p>
  <img src="./images/posters/santa-claus-conquers-the-martians.jpg" alt="" class="film-card__poster">
  <p class="film-card__description">The Martians Momar ("Mom Martian") and Kimar ("King Martian") are worried that their children Girmar ("Girl Martian") and Bomar ("Boy Marti…</p>
  <a class="film-card__comments">465 comments</a>
  <form class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite film-card__controls-item--active">Mark as favorite</button>
  </form>
</article>`;

  render(filmCardBlock, filmListContainerNode, `beforeend`, RENDER_COUNT.five);
  const filmExtraContainerNode = mainNode.querySelectorAll(`.films-list--extra .films-list__container`);
  filmExtraContainerNode.forEach((block)=>{
    render(filmCardBlock, block, `beforeend`, RENDER_COUNT.two);
  });
})();
