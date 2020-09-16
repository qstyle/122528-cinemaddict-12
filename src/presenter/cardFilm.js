import FilmCard from "../veiw/filmCardBlock.js";
import FilmDetalsCard from "../veiw/filmDetalsCardBlock.js";
import {render, deleteBlock, replace} from "../utils/render.js";
const bodyNode = document.querySelector(`body`);
import {RENDER_POSITION, MODE} from "../const.js";

export default class CardFilm {
  constructor(container, changeData, changeMode) {
    this.changeMode = changeMode;
    this._container = container;
    this._changeData = changeData;
    this.filmCard = null;
    this.mode = MODE.DEFAULT;
    this.filmDetalsCard = null;
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleHistoryClick = this._handleHistoryClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._closePopup = this._closePopup.bind(this);
    this._escCloser = this._escCloser.bind(this);
  }

  ini(film) {
    this._filmData = film;
    const prevFilmComponent = this.filmCard;
    const prevFilmComponentDetals = this.filmDetalsCard;
    this.filmCard = new FilmCard(film);
    this.filmDetalsCard = new FilmDetalsCard(film);
    const filmContainer = this._container.querySelectorAll(`.films-list__container`);


    this.filmCard.showPopupHandler((evt)=>{
      if (evt.target.tagName !== `BUTTON`) {
        if (this.mode === MODE.DEFAULT) {
          render(bodyNode, this.filmDetalsCard, RENDER_POSITION.BEFOREEND);
          this.filmDetalsCard.resetHandlers();
          this.filmDetalsCard.setCloseHandler(this._closePopup);
          this.filmDetalsCard.setEscCloseHandler(this._escCloser);
          this.mode = MODE.OPEN;
        } else {
          this._closePopup();
          this.mode = MODE.DEFAULT;
        }
      }
    });

    if (prevFilmComponent === null || prevFilmComponentDetals === null) {
      render(filmContainer[0], this.filmCard, RENDER_POSITION.BEFOREEND);
    } else {
      replace(this.filmCard, prevFilmComponent);
    }

    this.filmCard.controlWatchlistHandler(this._handleWatchlistClick);
    this.filmCard.controlWatchedtHandler(this._handleHistoryClick);
    this.filmCard.controlFavoritetHandler(this._handleFavoriteClick);
  }
  _handleModeChange() {
    Object
      .values(this._taskPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _closePopup() {
    deleteBlock(this.filmDetalsCard);
    this.mode = MODE.DEFAULT;
    this.filmDetalsCard.resetData();
  }

  _handleWatchlistClick() {
    this._changeData(
        Object.assign(
            {},
            this._filmData,
            {
              watchlist: !this._filmData.watchlist
            }
        )
    );
  }

  _handleHistoryClick() {
    this._changeData(
        Object.assign(
            {},
            this._filmData,
            {
              history: !this._filmData.history
            }
        )
    );
  }


  _escCloser(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      this._closePopup();
    }
  }

  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._filmData,
            {
              favorites: !this._filmData.favorites
            }
        )
    );
  }

}
