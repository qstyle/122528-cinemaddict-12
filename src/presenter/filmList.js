
import {FILMS_COUNT_PER_STEP, RENDER_POSITION, FILMS_COUNT_IN_EXTRA, SORTFILMSID, PARENTFORRENDERFILM} from "../const.js";
import FilmContainer from "../veiw/filmContainerBlock.js";
import MoreButton from "../veiw/showMoreButton.js";
import {render, deleteBlock} from "../utils/render.js";
import FilmCard from "../veiw/filmCardBlock.js";
import SectionFilm from "../veiw/sectionFilm.js";
import FilmNoData from "../veiw/filmNoData.js";
import TopRateFilms from "../veiw/topRateFilms.js";
import MostComentedFilms from "../veiw/mostCommentedFilms.js";
import FilmDetalsCard from "../veiw/filmDetalsCardBlock.js";
import MainNavigation from "../veiw/mainNavigation.js";
import SortBlock from "../veiw/sortBlock.js";
import {filterArrayFilms, sortFilms, getFilterLength} from "../utils/sortArrayFilms.js";
const bodyNode = document.querySelector(`body`);

export default class FilmList {
  constructor(container) {
    this._container = container;
    this._filmContainer = new FilmContainer();
    this._sectionFilm = new SectionFilm();
    this._topRateFilms = new TopRateFilms();
    this._mostComentedFilms = new MostComentedFilms();
    this._sortBlock = new SortBlock();
    this._moreButton = new MoreButton();
    this._FilmNoData = new FilmNoData();
    this._sortFilmArray = this._sortFilmArray.bind(this);
    this._filterFilmArray = this._filterFilmArray.bind(this);
  }

  init(filmData) {
    this._filmData = filmData.slice();
    this._sourceFilmData = filmData.slice();
    render(this._container, this._sectionFilm, RENDER_POSITION.BEFOREEND);
    render(this._sectionFilm, this._filmContainer, RENDER_POSITION.BEFOREEND);
    render(this._sectionFilm, this._topRateFilms, RENDER_POSITION.BEFOREEND);
    render(this._sectionFilm, this._mostComentedFilms, RENDER_POSITION.BEFOREEND);
    this._renderFilm();
  }

  _sortFilmArray(sortType) {
    this._container.querySelector(`.sort__button--active`)
    .classList.remove(`sort__button--active`);
    switch (sortType) {
      case `rating`:
        sortFilms(this._filmData, `rating`);
        this._clearFilmList();
        this._renderFilmList();
        break;
      case `date`:
        sortFilms(this._filmData, `date`);
        this._clearFilmList();
        this._renderFilmList();
        break;
      default:
        this._filmData = this._sourceFilmData.slice();
        this._clearFilmList();
        this._renderFilmList();
    }
    this._sortType = sortType;
  }

  _clearFilmList() {
    const filmContainer = this._container.querySelectorAll(`.films-list__container`);
    filmContainer[0].innerHTML = ``;
  }

  _filterFilmArray(sortId) {
    this._container.querySelector(`.main-navigation__item--active`)
    .classList.remove(`main-navigation__item--active`);
    this._filmData = this._sourceFilmData.slice();
    switch (sortId) {
      case `watchlist`:
        this._filmData = filterArrayFilms(this._filmData, `watchlist`);
        this._clearFilmList();
        this._renderFilmList();
        break;
      case `history`:
        this._filmData = filterArrayFilms(this._filmData, `history`);
        this._clearFilmList();
        this._renderFilmList();
        break;
      case `favorites`:
        this._filmData = filterArrayFilms(this._filmData, `favorites`);
        this._clearFilmList();
        this._renderFilmList();
        break;
      default:
        this._filmData = this._sourceFilmData.slice();
        this._clearFilmList();
        this._renderFilmList();
    }
  }

  _renderSort() {
    const filterLength = getFilterLength(this._filmData);
    this._mainNavigation = new MainNavigation(filterLength);
    render(this._container, this._sortBlock, RENDER_POSITION.AFTERBEGIN);
    render(this._container, this._mainNavigation, RENDER_POSITION.AFTERBEGIN);
    this._sortBlock.sortFilmsHandler(this._sortFilmArray);
    this._mainNavigation.sortMainNavigationHandler(this._filterFilmArray);
  }

  _renderFilmInPage(film, parent) {
    const filmCard = new FilmCard(film);
    const filmDetalsCard = new FilmDetalsCard(film);
    const filmContainer = this._container.querySelectorAll(`.films-list__container`);
    function closePopup() {
      deleteBlock(filmDetalsCard);
    }
    filmCard.showPopupHandler(()=>{
      render(bodyNode, filmDetalsCard, RENDER_POSITION.BEFOREEND);
      filmDetalsCard.onClosePopup(closePopup);
    });
    render(filmContainer[parent], filmCard, RENDER_POSITION.BEFOREEND);
  }

  _renderTopRateFilms() {
    sortFilms(this._sourceFilmData.slice(), SORTFILMSID.RATING)
    .slice(0, FILMS_COUNT_IN_EXTRA).forEach((film) => this._renderFilmInPage(film, PARENTFORRENDERFILM.TOPRTEFILM));
  }
  _renderTopComent() {
    sortFilms(this._sourceFilmData.slice(), SORTFILMSID.TOPCOMMENTS)
    .slice(0, FILMS_COUNT_IN_EXTRA).forEach((film) => this._renderFilmInPage(film, PARENTFORRENDERFILM.TOPCOMMENTFILM));
  }

  _renderFilms(from, to) {
    this._filmData
    .slice(from, to)
    .forEach((film) => this._renderFilmInPage(film, PARENTFORRENDERFILM.MAINFILM));
  }

  _renderNoFilm() {
    render(this._sectionFilm, this._FilmNoData, RENDER_POSITION.AFTERBEGIN);
  }

  _renderLoadMoreButton() {
    let renderedFilmCount = FILMS_COUNT_PER_STEP;
    const loadMoreButtonComponent = new MoreButton();
    render(this._filmContainer, loadMoreButtonComponent, RENDER_POSITION.BEFOREEND);
    loadMoreButtonComponent.showMoreHandler(() => {
      this._filmData
         .slice(renderedFilmCount, renderedFilmCount + FILMS_COUNT_PER_STEP)
         .forEach((filmData) => this._renderFilmInPage(filmData));
      renderedFilmCount += FILMS_COUNT_PER_STEP;
      if (renderedFilmCount >= this._filmData.length) {
        deleteBlock(loadMoreButtonComponent);
      }
    });
  }

  _renderFilmList() {
    this._renderFilms(0, Math.min(this._filmData.length, FILMS_COUNT_PER_STEP));
  }

  _renderFilm() {
    if (this._filmData.length === 0) {
      this._renderNoFilm();
      return;
    }
    this._renderSort();
    this._renderFilmList();
    this._renderTopRateFilms();
    this._renderTopComent();
    if (this._filmData.length > FILMS_COUNT_PER_STEP) {
      this._renderLoadMoreButton();
    }
  }
}

