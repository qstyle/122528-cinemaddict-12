import FilmCard from "../veiw/filmCardBlock.js";
import FilmDetalsCard from "../veiw/filmDetalsCardBlock.js";
import {render, deleteBlock} from "../utils/render.js";
const bodyNode = document.querySelector(`body`);
import {RENDER_POSITION} from "../const.js";

export default class CardFilm {
  constructor(container, changeData) {
    this.container = container;
    this._changeData = changeData;
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
  }

  ini(film) {
    const filmCard = new FilmCard(film);
    const filmDetalsCard = new FilmDetalsCard(film);
    const filmContainer = this.container.querySelectorAll(`.films-list__container`);

    function closePopup() {
      deleteBlock(filmDetalsCard);
    }
    filmCard.showPopupHandler((evt)=>{
      if (evt.target.tagName !== `BUTTON`) {
        render(bodyNode, filmDetalsCard, RENDER_POSITION.BEFOREEND);
        filmDetalsCard.onClosePopup(closePopup);
      }
    });
    render(filmContainer[0], filmCard, RENDER_POSITION.BEFOREEND);
    filmCard.controlWatchlistHandler(this._handleWatchlistClick);
    filmCard.controlWatchedtHandler(this.test);
    filmCard.controlFavoritetHandler(this.test);
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
}
