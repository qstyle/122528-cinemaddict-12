
import {FILMS_COUNT_PER_STEP, RENDER_POSITION, FILMS_COUNT_IN_EXTRA} from "../const.js";
import FilmContainer from "../veiw/filmContainerBlock.js";
import MoreButton from "../veiw/showMoreButton.js";
import {render, deleteBlock} from "../utils/render.js";
import FilmCard from "../veiw/filmCardBlock.js";
import SectionFilm from "../veiw/sectionFilm.js";
import TopRateFilms from "../veiw/topRateFilms.js";
import MostComentedFilms from "../veiw/mostCommentedFilms.js";
import sortTopRate from "../utils/sortTopRate.js";
import sortMostComments from "../utils/sortMostComments.js";
import FilmDetalsCard from "../veiw/filmDetalsCardBlock.js";
import MainNavigation from "../veiw/mainNavigation.js";
import SortBlock from "../veiw/sortBlock.js";
import {sortArrayFilms, sortFilms} from "../utils/sortArrayFilms.js";
const bodyNode = document.querySelector(`body`);

export default class FilmList {
  constructor(container) {
    this._container = container;
    this._filmsCount = FILMS_COUNT_PER_STEP;
    this._filmContainerTempalte = new FilmContainer();
    this._sectionFilm = new SectionFilm();
    this._topRateFilms = new TopRateFilms();
    this._mostComentedFilms = new MostComentedFilms();
    this._mainNavigation = new MainNavigation();
    this._sortBlock = new SortBlock();
    this._moreButton = new MoreButton();
    this._renderFilm = this._renderFilm.bind(this);
    this._closePopup = this._closePopup.bind(this);
    this._renderNavSort = this._renderNavSort.bind(this);
    this._renderSortFilms = this._renderSortFilms.bind(this);
  }

  init(data) {
    this._data = data.slice();
    this._sourcedData = data.slice();
    render(this._container, this._sectionFilm, RENDER_POSITION.BEFOREEND);
    this._filmContainerBlockNode = this._container.querySelector(`.films-list__container`);
    this._renderAllFilms();

  }

  _renderNavSort(sortId) {
    const films = this._sourcedData.slice();
    this._data = sortArrayFilms(films, sortId);
    this._filmContainerBlockNode.innerHTML = ``;
    this. _renderFilmList();

  }

  _renderMainNavigation() {
    render(this._container, this._mainNavigation, RENDER_POSITION.AFTERBEGIN);
    this._mainNavigation.onSortMainNavigation(this._renderNavSort);
  }

  _renderSortFilms(sortId) {

    this._data = sortFilms(this._data, sortId);
    this._filmContainerBlockNode.innerHTML = ``;
    this. _renderFilmList();

  }
  _renderSortBlock() {
    render(this._container, this._sortBlock, RENDER_POSITION.AFTERBEGIN);
    this._sortBlock.onSortfilms(this._renderSortFilms);
  }

  _renderFilm() {
    if (this._data.length > FILMS_COUNT_PER_STEP) {
      for (let i = 0; i < FILMS_COUNT_PER_STEP; i++) {
        this.film = this._data.splice(0, 1);
        const filmCardElement = new FilmCard(this.film[0]);
        filmCardElement.showPopupHandler(this._openPopup.bind(this, this.film[0]));
        deleteBlock(this._moreButton);
        render(this._filmContainerBlockNode, filmCardElement, RENDER_POSITION.BEFOREEND);
        this._renderLoadMoreButton();
      }
    } else {
      this._data.forEach((element) => {
        const filmCardElement = new FilmCard(element);
        render(this._filmContainerBlockNode, filmCardElement, RENDER_POSITION.BEFOREEND);
      });
      deleteBlock(this._moreButton);
      this._data = this._sourcedData.slice();
    }

  }

  _renderLoadMoreButton() {
    render(this._filmContainerBlockNode, this._moreButton, RENDER_POSITION.BEFOREEND);
    this._moreButton.showMoreHandler(this._renderFilm);
  }


  _renderFilmList() {
    this._renderFilm();
    this._renderLoadMoreButton();
  }

  _openPopup(data) {
    this._filmDetalsCard = new FilmDetalsCard(data);
    render(bodyNode, this._filmDetalsCard, RENDER_POSITION.BEFOREEND);
    this._filmDetalsCard.onClosePopup(this._closePopup);
  }

  _closePopup() {
    deleteBlock(this._filmDetalsCard);
  }

  _renderTopRateFilm() {
    render(this._sectionFilm, this._topRateFilms, RENDER_POSITION.BEFOREEND);
    const topRateArray = this._sourcedData.slice();
    sortTopRate(topRateArray);
    const topRateContainer = this._container.querySelectorAll(`.films-list--extra .films-list__container`);
    for (let i = 0; i < FILMS_COUNT_IN_EXTRA; i++) {
      const filmCardElement = new FilmCard(topRateArray[i]);
      filmCardElement.showPopupHandler(this._openPopup.bind(this, topRateArray[i]));
      render(topRateContainer[0], filmCardElement, RENDER_POSITION.BEFOREEND);
    }
  }
  _renderMostCommentsFilms() {
    render(this._sectionFilm, this._mostComentedFilms, RENDER_POSITION.BEFOREEND);
    const mostCommentArray = this._sourcedData.slice();
    sortMostComments(mostCommentArray);
    const mostCommentContainer = this._container.querySelectorAll(`.films-list--extra .films-list__container`);
    for (let i = 0; i < FILMS_COUNT_IN_EXTRA; i++) {
      const filmCardElement = new FilmCard(mostCommentArray[i]);
      filmCardElement.showPopupHandler(this._openPopup.bind(this, mostCommentArray[i]));
      render(mostCommentContainer[1], filmCardElement, RENDER_POSITION.BEFOREEND);
    }

  }

  _renderAllFilms() {
    this._renderFilmList();
    this._renderTopRateFilm();
    this._renderMostCommentsFilms();
    this._renderSortBlock();
    this._renderMainNavigation();
  }
}
