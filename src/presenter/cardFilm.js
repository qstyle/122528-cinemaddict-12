import FilmCard from "../veiw/filmCardBlock.js";
import FilmDetalsCard from "../veiw/filmDetalsCardBlock.js";
import {render, deleteBlock, replace} from "../utils/render.js";
const bodyNode = document.querySelector(`body`);
import {RENDER_POSITION} from "../const.js";

export default class CardFilm {
  constructor(container, changeData) {

    this._container = container;
    this._changeData = changeData;
    this.filmCard = null;
    this.filmDetalsCard = null;
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleHistoryClick = this._handleHistoryClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  ini(film) {
    this._filmData = film;
    const prevFilmComponent = this.filmCard;
    const prevFilmComponentDetals = this.filmDetalsCard;
    this.filmCard = new FilmCard(film);
    this.filmDetalsCard = new FilmDetalsCard(film);
    const filmContainer = this._container.querySelectorAll(`.films-list__container`);

    function closePopup(data) {
      deleteBlock(data);
    }

    this.filmCard.showPopupHandler((evt)=>{
      if (evt.target.tagName !== `BUTTON`) {
        render(bodyNode, this.filmDetalsCard, RENDER_POSITION.BEFOREEND);
        this.filmDetalsCard.onClosePopup(closePopup.bind(this, this.filmDetalsCard));
        this.filmDetalsCard.controlWatchlistDetalsHandler(this._handleWatchlistClick);
        this.filmDetalsCard.controlWatchlistDetalsHandler(this._handleHistoryClick);
        this.filmDetalsCard.controlWatchlistDetalsHandler(this._handleFavoriteClick);
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
