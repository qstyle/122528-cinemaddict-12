import {createProfileTemplate} from "./veiw/profileBlock.js";
import {createsSortBlockTemplate} from "./veiw/sortBlock.js";
import {createFilmContainerBlockTemplate} from "./veiw/filmContainerBlock.js";
import {createFilmCardBlockTemplate} from "./veiw/filmCardBlock.js";
import {generateMockDataArrays} from "./mock/generateMockData.js";
import {filmDetalsCardBlock} from "./veiw/filmDetalsCardBlock.js";

const RENDER_COUNT = {
  five: 5,
  two: 2,
  one: 1};

const hraderNode = document.querySelector(`.header`);
const mainNode = document.querySelector(`.main`);
const mockData = generateMockDataArrays();
const bodyNode = document.querySelector(`body`);

function render(htmlBlock, parent, position, quantity) {
  for (let i = 0; i < quantity; i++) {
    parent.insertAdjacentHTML(position, htmlBlock);
  }
}
function deleteBlock(htmlBlock) {
  htmlBlock.remove();
}

function renderAllBlock() {
  render(createProfileTemplate(), hraderNode, `beforeend`, RENDER_COUNT.one);
  render(createsSortBlockTemplate(), mainNode, `beforeend`, RENDER_COUNT.one);
  render(createFilmContainerBlockTemplate(), mainNode, `beforeend`, RENDER_COUNT.one);
  renderContentInBlock();
}


function renderContentInBlock() {
  const dataFilmArrays = mockData.splice(0, 5);
  const filmListContainerNode = mainNode.querySelector(`.films-list .films-list__container`);
  if (dataFilmArrays.length === 0) {
    document.querySelector(`.films-list__show-more`).classList.add(`visually-hidden`);
    return;
  } else {
    for (let i = 0; i < RENDER_COUNT.five; i++) {
      render(createFilmCardBlockTemplate(dataFilmArrays[i]), filmListContainerNode, `beforeend`, RENDER_COUNT.one);
    }
  }
}

renderAllBlock();
const showMoreButton = document.querySelector(`.films-list__show-more`);
showMoreButton.addEventListener(`click`, renderContentInBlock);

const closePopup = ()=>{
  const filmDetalsCard = bodyNode.querySelector(`.film-details`);
  deleteBlock(filmDetalsCard);

};

const renderPopup = ()=>{
  render(filmDetalsCardBlock(mockData[0]), bodyNode, `beforeend`, RENDER_COUNT.one);
  const buttonClosePopup = bodyNode.querySelector(`.film-details__close-btn`);
  buttonClosePopup.addEventListener(`click`, closePopup);
};
const filmPosterNode = document.querySelectorAll(`.film-card__poster`);
filmPosterNode.forEach((poster)=>{
  poster.addEventListener(`click`, renderPopup);
});


