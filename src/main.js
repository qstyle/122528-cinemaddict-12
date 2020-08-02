import {profileBlock} from "./veiw/profileBlock.js";
import {sortBlock} from "./veiw/sortBlock.js";
import {filmContainerBlock} from "./veiw/filmContainerBlock.js";
import {filmCardBlock} from "./veiw/filmCardBlock.js";

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

(function renderAllBlock() {
  render(profileBlock(), hraderNode, `beforeend`, RENDER_COUNT.one);
  render(sortBlock(), mainNode, `beforeend`, RENDER_COUNT.one);
  render(filmContainerBlock(), mainNode, `beforeend`, RENDER_COUNT.one);
  renderContentInBlock();
})();

function renderContentInBlock() {
  const filmListContainerNode = mainNode.querySelector(`.films-list .films-list__container`);
  render(filmCardBlock(), filmListContainerNode, `beforeend`, RENDER_COUNT.five);
  const filmExtraContainerNode = mainNode.querySelectorAll(`.films-list--extra .films-list__container`);
  filmExtraContainerNode.forEach((block) => {
    render(filmCardBlock(), block, `beforeend`, RENDER_COUNT.two);
  });
}
