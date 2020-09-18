
import {FILMS_COUNT_PER_STEP, RENDER_POSITION, SORTFILMS} from "../const.js";
import FilmContainer from "../veiw/filmContainerBlock.js";
import MoreButton from "../veiw/showMoreButton.js";
import {render, deleteBlock} from "../utils/render.js";
import {updateDataItem} from "../utils/common.js";
import SectionFilm from "../veiw/sectionFilm.js";
import FilmNoData from "../veiw/filmNoData.js";
import TopRateFilms from "../veiw/topRateFilms.js";
import MostComentedFilms from "../veiw/mostCommentedFilms.js";
import MainNavigation from "../veiw/mainNavigation.js";
import SortBlock from "../veiw/sortBlock.js";
import FilmCard from "./cardFilm.js";
import {filterArrayFilms, sortFilms, getFilterLength} from "../utils/sortArrayFilms.js";


export default class FilmList {
  constructor(container, filmsModel) {

    this._filmsModel = filmsModel;
    this.filmModelSource = filmsModel;
    this._container = container;


    this._filmContainer = new FilmContainer();
    this._sectionFilm = new SectionFilm();
    this._topRateFilms = new TopRateFilms();
    this._mostComentedFilms = new MostComentedFilms();
    this._sortBlock = new SortBlock();
    this._moreButton = new MoreButton();
    this._FilmNoData = new FilmNoData();

    this._filmPresenter = {};
    this._currentSortType = SORTFILMS.DEFAULT;
    this.filmsCount = FILMS_COUNT_PER_STEP;
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
  }

  init() {

    render(this._container, this._sectionFilm, RENDER_POSITION.BEFOREEND);
    render(this._sectionFilm, this._filmContainer, RENDER_POSITION.BEFOREEND);
    render(this._sectionFilm, this._topRateFilms, RENDER_POSITION.BEFOREEND);
    render(this._sectionFilm, this._mostComentedFilms, RENDER_POSITION.BEFOREEND);
    this._renderAllFilms();
  }

  _getFilms() {
    switch (this._currentSortType) {
      case SORTFILMS.DATE:
        return sortFilms(this._filmsModel.getFilms().slice(), SORTFILMS.DATE);
      case SORTFILMS.RATING:
        return sortFilms(this._filmsModel.getFilms().slice(), SORTFILMS.RATING);
      case SORTFILMS.DEFAULT:
        this._filmsModel = this.filmModelSource;
    }
    return this._filmsModel.getFilms();
  }


  _clearFilmList() {
    const filmContainer = this._container.querySelectorAll(`.films-list__container`);
    filmContainer[0].innerHTML = ``;
  }
  _handleSortTypeChange(sortType) {
    if (this._currentSortType === SORTFILMS) {
      return;
    }

    this._currentSortType = sortType;
    this._clearFilmList();
    this._renderFilmList();
  }

  _renderSort() {
    render(this._container, this._sortBlock, RENDER_POSITION.AFTERBEGIN);
    this._sortBlock.sortFilmsHandler(this._handleSortTypeChange);
  }

  _renderFilmInPage(film) {
    const filmPresenter = new FilmCard(this._container, this._handleFilmChange);
    filmPresenter.ini(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _handleFilmChange(updatedFilm) {
    this._filmData = updateDataItem(this._filmData, updatedFilm);
    this._sourceFilmData = updateDataItem(this._sourceFilmData, updatedFilm);
    this._filmPresenter[updatedFilm.id].ini(updatedFilm);
  }
  // _renderTopRateFilms() {
  //   sortFilms(this._sourceFilmData.slice(), SORTFILMSID.RATING)
  //   .slice(0, FILMS_COUNT_IN_EXTRA).forEach((film) => this._renderFilmInPage(film, PARENTFORRENDERFILM.TOPRTEFILM));
  // }
  // _renderTopComent() {
  //   sortFilms(this._sourceFilmData.slice(), SORTFILMSID.TOPCOMMENTS)
  //   .slice(0, FILMS_COUNT_IN_EXTRA).forEach((film) => this._renderFilmInPage(film, PARENTFORRENDERFILM.TOPCOMMENTFILM));
  // }

  _renderFilms(films) {
    films.forEach((film) => this._renderFilmInPage(film));
  }

  _renderNoFilm() {
    render(this._sectionFilm, this._FilmNoData, RENDER_POSITION.AFTERBEGIN);
  }

  _handleLoadMoreButtonClick() {
    const filmCount = this._getFilms().length;
    const newRenderedFilmCount = Math.min(filmCount, this.filmsCount + FILMS_COUNT_PER_STEP);
    const films = this._getFilms().slice(this.filmsCount, newRenderedFilmCount);

    this._renderFilms(films);
    this.filmsCount = newRenderedFilmCount;

    if (this.filmsCount >= filmCount) {
      deleteBlock(this._moreButton);
    }
  }
  _renderLoadMoreButton() {
    const loadMoreContainer = this._container.querySelector(`.films-list`);
    render(loadMoreContainer, this._moreButton, RENDER_POSITION.BEFOREEND);

    this._moreButton.showMoreHandler(this._handleLoadMoreButtonClick);
  }


  _renderFilmList() {
    const filmCount = this._getFilms().length;
    const films = this._getFilms().slice(0, Math.min(filmCount, FILMS_COUNT_PER_STEP));
    this._renderFilms(films);
    if (filmCount > FILMS_COUNT_PER_STEP) {
      this._renderLoadMoreButton();
    }
  }

  _renderAllFilms() {
    this._renderFilmList();
    this._renderSort();
  }
}

