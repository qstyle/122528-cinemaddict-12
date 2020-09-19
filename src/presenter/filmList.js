
import {FILMS_COUNT_PER_STEP, RENDER_POSITION, SORTFILMS, UPDATETYPE, USERACTION} from "../const.js";
import FilmContainer from "../veiw/filmContainerBlock.js";
import MoreButton from "../veiw/showMoreButton.js";
import {render, deleteBlock} from "../utils/render.js";
import SectionFilm from "../veiw/sectionFilm.js";
import FilmNoData from "../veiw/filmNoData.js";
import TopRateFilms from "../veiw/topRateFilms.js";
import MostComentedFilms from "../veiw/mostCommentedFilms.js";
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
    this._sortBlock = null;
    this._moreButton = null;
    this._FilmNoData = new FilmNoData();

    this._filmPresenter = {};
    this._currentSortType = SORTFILMS.DEFAULT;
    this.filmsCount = FILMS_COUNT_PER_STEP;

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._clearFilm = this._clearFilm.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
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
    this._currentSortType = sortType;
    this._clearFilm({resetRenderedTaskCount: true});
    this._renderAllFilms();
  }

  _renderSort() {
    if (this._sortBlock !== null) {
      this._sortBlock = null;
    }
    this._sortBlock = new SortBlock(this._currentSortType);
    this._sortBlock.sortFilmsHandler(this._handleSortTypeChange);
    render(this._container, this._sortBlock, RENDER_POSITION.BEFOREEND);
  }

  _renderFilmInPage(film) {
    const filmPresenter = new FilmCard(this._container, this._handleViewAction, this._handleFilmChange);
    filmPresenter.ini(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case USERACTION.UPDATE_FILM:

        this._filmsModel.updateFilm(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UPDATETYPE.PATCH:
        console.log(`PATCH`);
        break;
      case UPDATETYPE.MINOR:

        this._filmPresenter[data.id].ini(data);
        // this._clearFilm();
        // this._renderAllFilms();
        break;
      case UPDATETYPE.MAJOR:
        console.log(`MAJOR`);
        break;
    }

  }
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
    if (this._moreButton !== null) {
      this._moreButton = null;
    }
    this._moreButton = new MoreButton();
    const loadMoreContainer = this._container.querySelector(`.films-list`);
    render(loadMoreContainer, this._moreButton, RENDER_POSITION.BEFOREEND);
    this._moreButton.showMoreHandler(this._handleLoadMoreButtonClick);
  }

  _clearFilm({resetRenderedTaskCount = false, resetSortType = false} = {}) {
    const filmCount = this._getFilms().length;

    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
      this._filmPresenter = {};

    deleteBlock(this._sortBlock);
    deleteBlock(this._FilmNoData);
    deleteBlock(this._moreButton);

    if (resetRenderedTaskCount) {
      this.filmsCount = FILMS_COUNT_PER_STEP;
    } else {
      // На случай, если перерисовка доски вызвана
      // уменьшением количества задач (например, удаление или перенос в архив)
      // нужно скорректировать число показанных задач
      this.filmsCount = Math.min(filmCount, this.filmsCount);
    }

    if (resetSortType) {
      this._currentSortType = SORTFILMS.DEFAULT;
    }
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
    const films = this._getFilms();
    const filmCount = films.length;
    if (filmCount === 0) {
      this._renderNoFilm();
      return;
    }

    this._renderSort();
    this._renderFilms(films.slice(0, Math.min(filmCount, this.filmsCount)));

    if (filmCount > this.filmsCount) {
      this._renderLoadMoreButton();
    }
  }
}

