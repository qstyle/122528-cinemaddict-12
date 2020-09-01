import Abstract from './abstract.js';

const createsMainNavigationTemplate = ()=>{
  return `<nav class="main-navigation">
<div class="main-navigation__items">
  <a href="#all" class="main-navigation__item main-navigation__item--active" data-sort = 'allMovies'>All movies</a>
  <a href="#watchlist" class="main-navigation__item"data-sort = 'Watchlist'>Watchlist <span class="main-navigation__item-count">13</span></a>
  <a href="#history" class="main-navigation__item"data-sort = 'History'>History <span class="main-navigation__item-count">4</span></a>
  <a href="#favorites" class="main-navigation__item"data-sort = 'Favorites'>Favorites <span class="main-navigation__item-count">8</span></a>
</div>
<a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`;

};

export default class MainNavigation extends Abstract {
  getTemplate() {
    return createsMainNavigationTemplate();
  }
  onSortMainNavigation(callBack) {
    let eventId;
    let sortId;
    this.getElement().addEventListener(`click`, function (evt) {

      if (eventId === evt.target) {
        return;
      } else {
        eventId = evt.target;
        sortId = evt.target.dataset.sort;
        callBack(sortId);
      }

    });
  }
}
