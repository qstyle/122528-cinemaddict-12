import Abstract from "./abstract.js";
import {SORTFILMS} from "../const.js";

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;
  return (
    `<a href="#" id = "${type}"
     class="main-navigation__item ${type === currentFilterType ?
      `main-navigation__item--active` : ``}">
     ${name}${type !== SORTFILMS.ALLMOVIES ? `
     <span class="main-navigation__item-count">${count}</span>` : ` `}
     </a>`
  );
};

export const createFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join(``);

  return `<nav class="main-navigation">
          <div class="main-navigation__items">
          ${filterItemsTemplate}
          </div>
          <a href="#stats" class="main-navigation__additional">Stats</a>
          </nav>`;
};

export default class Filter extends Abstract {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilterTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.id);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`click`, this._filterTypeChangeHandler);
  }
}


// `<nav class="main-navigation">
// <div class="main-navigation__items">
//   <a href="#all" class="main-navigation__item main-navigation__item--active" data-sort = '${SORTFILMS.ALLMOVIES}'>All movies</a>
//   <a href="#watchlist" class="main-navigation__item"data-sort = '${SORTFILMS.WATCHLIST}'>Watchlist <span class="main-navigation__item-count">${filterLength().watchlist}</span></a>
//   <a href="#history" class="main-navigation__item"data-sort = '${SORTFILMS.HISTORY}'>History <span class="main-navigation__item-count">${filterLength().history}</span></a>
//   <a href="#favorites" class="main-navigation__item"data-sort = '${SORTFILMS.FAVORITES}'>Favorites <span class="main-navigation__item-count">${filterLength().favorites}</span></a>
// </div>
// <a href="#stats" class="main-navigation__additional">Stats</a>
// </nav>`
