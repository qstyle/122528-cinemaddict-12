import {createProfileTemplate} from "./veiw/profileBlock.js";
import {createsSortBlockTemplate} from "./veiw/sortBlock.js";
import {createFilmContainerBlockTemplate} from "./veiw/filmContainerBlock.js";
import {createFilmCardBlockTemplate} from "./veiw/filmCardBlock.js";
import {generateMockDataArrays} from "./mock/generateMockData.js";


const RENDER_COUNT = {
  five: 5,
  two: 2,
  one: 1};

const hraderNode = document.querySelector(`.header`);
const mainNode = document.querySelector(`.main`);
const mockData = generateMockDataArrays();

function render(htmlBlock, parent, position, quantity) {
  for (let i = 0; i < quantity; i++) {
    parent.insertAdjacentHTML(position, htmlBlock);
  }
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
  for (let i = 0; i < RENDER_COUNT.five; i++) {
    render(createFilmCardBlockTemplate(dataFilmArrays[i]), filmListContainerNode, `beforeend`, RENDER_COUNT.one);
  }
}
renderAllBlock();
const showMoreButton = document.querySelector(`.films-list__show-more`);
showMoreButton.addEventListener(`click`, renderContentInBlock);
