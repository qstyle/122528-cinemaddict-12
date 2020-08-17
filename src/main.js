
import FilmContainer from "./veiw/filmContainerBlock.js";
import SortBlock from "./veiw/sortBlock.js";
import ProfileBlock from "./veiw/profileBlock.js";
import FilmDetalsCard from "./veiw/filmDetalsCardBlock.js";
import FilmCard from "./veiw/filmCardBlock.js";
import {generateMockDataArrays} from "./mock/generateMockData.js";
import {sortTopRateArray} from "./sortTopRateArryay.js";
import {sortMostCommented} from "./sortMostCommentedArray.js";
import {renderElement} from "./utils.js";
import {deleteBlock} from "./utils.js";

const RENDER_COUNT = {
  five: 5,
  two: 2,
  one: 1
};

const hraderNode = document.querySelector(`.header`);
const mainNode = document.querySelector(`.main`);
const mockData = generateMockDataArrays();
const bodyNode = document.querySelector(`body`);


function renderAllBlock() {
  const filmContainerTempalte = new FilmContainer();
  const sortBlock = new SortBlock();
  const profileBlock = new ProfileBlock();
  renderElement(profileBlock.getElement(), hraderNode);
  renderElement(sortBlock.getElement(), mainNode);
  renderElement(filmContainerTempalte.getElement(), mainNode);
  renderContentInBlock();
}


function renderContentInBlock() {
  const dataFilmArrays = mockData.splice(0, RENDER_COUNT.five);
  const filmListContainerNode = mainNode.querySelector(`.films-list .films-list__container`);
  if (dataFilmArrays.length === 0) {
    document.querySelector(`.films-list__show-more`).classList.add(`visually-hidden`);
    return;
  } else {
    for (let i = 0; i < RENDER_COUNT.five; i++) {
      const filmCardElement = new FilmCard(dataFilmArrays[i]);
      renderElement(filmCardElement.getElement(), filmListContainerNode);
    }
  }
}

renderAllBlock();

const showMoreButton = document.querySelector(`.films-list__show-more`);
showMoreButton.addEventListener(`click`, renderContentInBlock);
const closePopup = ()=>{
  const buttonClosePopup = bodyNode.querySelector(`.film-details__close-btn`);
  const filmDetalsCard = bodyNode.querySelector(`.film-details`);
  deleteBlock(filmDetalsCard);
  document.removeEventListener(`keypress`, closePopupEsc);
  buttonClosePopup.removeEventListener(`click`, closePopup);
};

function closePopupEsc(evt) {
  evt.preventDefault();
  if (evt.key === `Escape`) {
    closePopup();
  }
}

const renderPopup = () => {
  const FilmDetalsBlock = new FilmDetalsCard(mockData[0]);
  renderElement(FilmDetalsBlock.getElement(), bodyNode);
  const buttonClosePopup = bodyNode.querySelector(`.film-details__close-btn`);
  document.addEventListener(`keypress`, closePopupEsc);
  buttonClosePopup.addEventListener(`click`, closePopup);
};
const filmPosterNode = document.querySelectorAll(`.film-card__poster`);
filmPosterNode.forEach((poster)=>{
  poster.addEventListener(`click`, renderPopup);
});

const topRateContainer = document.querySelectorAll(`.films-list--extra .films-list__container`);
const renderTopRateFilm = ()=>{
  const sortArray = sortTopRateArray(mockData);

  for (let i = 0; i < RENDER_COUNT.two; i++) {
    const filmCardElement = new FilmCard(sortArray[i]);
    renderElement(filmCardElement.getElement(), topRateContainer[0]);
  }
};
const renderMostComentedFilm = ()=>{
  const sortArray = sortMostCommented(mockData);
  for (let i = 0; i < RENDER_COUNT.two; i++) {
    const filmCardElement = new FilmCard(sortArray[i]);
    renderElement(filmCardElement.getElement(), topRateContainer[1]);
  }
};
renderTopRateFilm();
renderMostComentedFilm();


