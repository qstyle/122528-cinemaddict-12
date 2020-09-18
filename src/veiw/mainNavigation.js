import Abstract from './abstract.js';
import {SORTFILMS} from '../const.js';

const createsMainNavigationTemplate = (filterLength)=>{
  return `<nav class="main-navigation">
<div class="main-navigation__items">
  <a href="#all" class="main-navigation__item main-navigation__item--active" data-sort = '${SORTFILMS.ALLMOVIES}'>All movies</a>
  <a href="#watchlist" class="main-navigation__item"data-sort = '${SORTFILMS.WATCHLIST}'>Watchlist <span class="main-navigation__item-count">${filterLength.watchlist}</span></a>
  <a href="#history" class="main-navigation__item"data-sort = '${SORTFILMS.HISTORY}'>History <span class="main-navigation__item-count">${filterLength.history}</span></a>
  <a href="#favorites" class="main-navigation__item"data-sort = '${SORTFILMS.FAVORITES}'>Favorites <span class="main-navigation__item-count">${filterLength.favorites}</span></a>
</div>
<a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`;

};

export default class MainNavigation extends Abstract {
  constructor(filterLength) {
    super();
    this.filterLength = filterLength;
  }
  getTemplate() {
    return createsMainNavigationTemplate(this.filterLength);
  }
  sortMainNavigationHandler(callBack) {
    let eventId;
    let sortId;
    this.getElement().addEventListener(`click`, function (evt) {
      if (evt.target.tagName !== `A`) {
        return;
      }
      if (eventId === evt.target) {
        return;
      } else {
        eventId = evt.target;
        sortId = evt.target.dataset.sort;
        callBack(sortId);
      }
      evt.target.classList.add(`main-navigation__item--active`);
    });
  }
}
