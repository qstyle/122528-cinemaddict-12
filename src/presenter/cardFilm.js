import FilmCard from "../veiw/filmCardBlock.js";
import FilmDetalsCard from "../veiw/filmDetalsCardBlock.js";
import {render, deleteBlock, replace} from "../utils/render.js";
const bodyNode = document.querySelector(`body`);
import {RENDER_POSITION, MODE, UPDATETYPE, USERACTION} from "../const.js";
import CommentsModel from "../model/modelComment.js";

import Comment from '../veiw/comment.js';

export default class CardFilm {
  constructor(container, changeData, changeMode) {
    this.changeMode = changeMode;
    this._container = container;
    this._changeData = changeData;
    this._commentModel = new CommentsModel();
    this.filmCard = null;
    this.mode = MODE.DEFAULT;
    this.filmDetalsCard = null;
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleHistoryClick = this._handleHistoryClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._closePopup = this._closePopup.bind(this);
    this._escCloser = this._escCloser.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  ini(film) {
    this._filmData = film;
    const prevFilmComponent = this.filmCard;
    const prevFilmComponentDetals = this.filmDetalsCard;
    this.filmCard = new FilmCard(film);
    this.filmDetalsCard = new FilmDetalsCard(film);
    const filmContainer = this._container.querySelectorAll(`.films-list__container`);
    this._renderComments();


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
  _renderComments() {
    this._commentModel.getComments().map((item) => {

      const comment = new Comment(item);
      // comment.setHandleClickDelete(this._handleViewAction);
      const newCommentElement = this._filmPopupComponent.getElement().querySelector(`.film-details__comments-list`);
      render(newCommentElement, comment, RENDER_POSITION.BEFOREEND);
    });

  }


  destroy() {
    deleteBlock(this.filmCard);
    deleteBlock(this.filmDetalsCard);
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
        USERACTION.UPDATE_FILM,
        UPDATETYPE.MINOR,
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
        USERACTION.UPDATE_FILM,
        UPDATETYPE.MINOR,
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
        USERACTION.UPDATE_FILM,
        UPDATETYPE.MINOR,
        Object.assign(
            {},
            this._filmData,
            {
              favorites: !this._filmData.favorites
            }
        )
    );
  }

  _escCloser(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      this._closePopup();
    }
  }


}
