import Smart from './smart.js';

const filmDetalsCardBlock = (filmData)=>{
  const buttonCheckedWatchlist = filmData.watchlist ? `checked` : null;
  const buttonCheckedHistory = filmData.history ? `checked` : null;
  const buttonCheckedFavorites = filmData.favorites ? `checked` : null;
  const emodji = filmData.comment.emotion;
  return `<section class="film-details">
<form class="film-details__inner" action="" method="get">
  <div class="form-details__top-container">
    <div class="film-details__close">
      <button class="film-details__close-btn" type="button">close</button>
    </div>
    <div class="film-details__info-wrap">
      <div class="film-details__poster">
        <img class="film-details__poster-img" src="${filmData.poster}">

        <p class="film-details__age">${filmData.ageRating}</p>
      </div>

      <div class="film-details__info">
        <div class="film-details__info-head">
          <div class="film-details__title-wrap">
            <h3 class="film-details__title">${filmData.filmName}</h3>
            <p class="film-details__title-original">${filmData.filmNameOriginal}</p>
          </div>

          <div class="film-details__rating">
            <p class="film-details__total-rating">${filmData.rating}</p>
          </div>
        </div>

        <table class="film-details__table">
          <tr class="film-details__row">
            <td class="film-details__term">Director</td>
            <td class="film-details__cell">${filmData.producer}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Writers</td>
            <td class="film-details__cell">${filmData.screenwriter}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Actors</td>
            <td class="film-details__cell">${filmData.actors}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Release Date</td>
            <td class="film-details__cell">${filmData.relisData}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Runtime</td>
            <td class="film-details__cell">${filmData.timeLine}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Country</td>
            <td class="film-details__cell">${filmData.productCountry}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">${filmData.genres.lengthText}</td>
            <td class="film-details__cell">
              <span class="film-details__genre">${filmData.genres.text[0]}</span>
              <span class="film-details__genre">${filmData.genres.text[1]}</span>
              <span class="film-details__genre">${filmData.genres.text[2]}</span></td>
          </tr>
        </table>

        <p class="film-details__film-description">
          ${filmData.description}
        </p>
      </div>
    </div>

    <section class="film-details__controls">
      <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${buttonCheckedWatchlist}>
      <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

      <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${buttonCheckedHistory}>
      <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

      <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${buttonCheckedFavorites}>
      <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
    </section>
  </div>

  <div class="form-details__bottom-container">
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">4</span></h3>

      <ul class="film-details__comments-list">

      </ul>

      <div class="film-details__new-comment">
      <div for="add-emoji" class="film-details__add-emoji-label" id="emoji">${emodji
    ? `<img src="images/emoji/` + emodji + `.png" width="55" height="55" alt="emoji-smile">`
    : ``}</div>

        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
        </label>

        <div class="film-details__emoji-list">
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
          <label class="film-details__emoji-label" for="emoji-smile">
            <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
          <label class="film-details__emoji-label" for="emoji-sleeping">
            <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
          <label class="film-details__emoji-label" for="emoji-puke">
            <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
          <label class="film-details__emoji-label" for="emoji-angry">
            <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
          </label>
        </div>
      </div>
    </section>
  </div>
</form>
</section>`;
};

export default class FilmDetalsCard extends Smart {
  constructor(filmData) {
    super();
    this._data = filmData;
    this._data.comment = {};
    this.controlWatchlistDetalsHandler = this.controlWatchlistDetalsHandler.bind(this);
    this._emojiChangeHandler = this._emojiChangeHandler.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleHistoryClick = this._handleHistoryClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._setInnerHandlers();
    this._callback = {};
    this._clickHandler = this._clickHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this.resetData = this.resetData.bind(this);


  }

  getTemplate() {
    return filmDetalsCardBlock(this._data);
  }

  // onClosePopup(callback) {
  //   this.getElement().querySelector(`.film-details__close-btn`)
  //   .addEventListener(`click`, callback);
  //   this.getElement().querySelector(`.film-details__emoji-list`)
  //   .addEventListener(`change`, this._emojiChangeHandler);

  //   document.addEventListener(`keydown`, escCloser);

  //   function escCloser(evt) {
  //     if (evt.key === `Escape` || evt.key === `Esc`) {
  //       callback();
  //     }
  //   }
  // }


  controlWatchlistDetalsHandler(callback) {
    this.getElement().querySelector(`.film-details__control-label--watchlist`)
    .addEventListener(`click`, callback);
  }

  controlWatchlistDetalsHandler(callback) {
    this.getElement().querySelector(`.film-details__control-label--watched`)
    .addEventListener(`click`, callback);
  }

  controlWatchlistDetalsHandler(callback) {
    this.getElement().querySelector(`.film-details__control-label--favorite`)
    .addEventListener(`click`, callback);
  }
  setCloseHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._clickHandler);
  }
  setEscCloseHandler(callback) {
    this._callback.escPress = callback;
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    this._callback.escPress(evt);
  }

  _clickHandler(evt) {
    this._callback.click(evt);

  }

  _emojiChangeHandler(evt) {
    this.updateData({
      comment: {
        emotion: evt.target.value,
      }
    });
    this.resetHandlers();
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`change`, this._emojiChangeHandler);
    this.getElement().querySelector(`#watchlist`).addEventListener(`change`, this._handleWatchlistClick);
    this.getElement().querySelector(`#watched`).addEventListener(`click`, this._handleHistoryClick);
    this.getElement().querySelector(`#favorite`).addEventListener(`click`, this._handleFavoriteClick);
  }

  resetHandlers() {
    this._setInnerHandlers();
    this.setCloseHandler(this._callback.click);
  }
  resetData() {
    this.updateData({
      comment: {
        emotion: null,
      }
    });
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
