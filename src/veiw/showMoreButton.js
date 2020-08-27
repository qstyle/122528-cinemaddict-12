import Abstract from './abstract.js';

const showMoreButton = ()=>{
  return `<button class="films-list__show-more">Show more</button>`;
};

export default class MoreButton extends Abstract {
  getTemplate() {
    return showMoreButton();
  }
  showMoreHandler(callback) {
    this.getElement().addEventListener(`click`, callback);
  }
}
