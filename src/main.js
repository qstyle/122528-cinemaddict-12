import {createProfileTemplate} from "./veiw/profileBlock.js";
import {createsSortBlockTemplate} from "./veiw/sortBlock.js";
import {createFilmContainerBlockTemplate} from "./veiw/filmContainerBlock.js";
import {reateFilmCardBlockTemplate} from "./veiw/filmCardBlock.js";

const RENDER_COUNT = {
  five: 5,
  two: 2,
  one: 1};

const hraderNode = document.querySelector(`.header`);
const mainNode = document.querySelector(`.main`);

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
renderAllBlock();

function renderContentInBlock() {
  const filmListContainerNode = mainNode.querySelector(`.films-list .films-list__container`);
  render(reateFilmCardBlockTemplate(), filmListContainerNode, `beforeend`, RENDER_COUNT.five);
  const filmExtraContainerNode = mainNode.querySelectorAll(`.films-list--extra .films-list__container`);
  filmExtraContainerNode.forEach((block) => {
    render(reateFilmCardBlockTemplate(), block, `beforeend`, RENDER_COUNT.two);
  });
}

