import smart from './smart.js';


const createFilmCardBlockTemplate = (filmData)=>{
  const watchlistClassAdd = filmData.watchlist ? `film-card__controls-item--active` : null;
  const historyClassAdd = filmData.history ? `film-card__controls-item--active` : null;
  const favoriteClassAdd = filmData.favorites ? `film-card__controls-item--active` : null;
  return `<article class="film-card">
  <h3 class="film-card__title">${filmData.filmName}</h3>
  <p class="film-card__rating">${filmData.rating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${filmData.relisData}</span>
    <span class="film-card__duration">${filmData.timeLine}</span>
    <span class="film-card__genre">${filmData.genre}</span>
  </p>
  <img src="${filmData.poster}" alt="" class="film-card__poster">
  <p class="film-card__description">${filmData.description}</p>
  <a class="film-card__comments">${filmData.commentsQuantity}</a>
  <form class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlistClassAdd}">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${historyClassAdd}">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteClassAdd} ">Mark as favorite</button>
  </form>
  </article>`;
};

export default class FilmCard extends smart {
  constructor(filmData) {
    super();
    this._filmData = filmData;
    this.controlWatchlistHandler = this.controlWatchlistHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardBlockTemplate(this._filmData);
  }

  showPopupHandler(callback) {
    this.getElement().addEventListener(`click`, callback);
  }
  controlWatchlistHandler(callback) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
    .addEventListener(`click`, callback);
  }
  controlWatchedtHandler(callback) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
    .addEventListener(`click`, callback);
  }
  controlFavoritetHandler(callback) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
    .addEventListener(`click`, callback);
  }
}
