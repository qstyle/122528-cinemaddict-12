import Abstract from './abstract.js';

const createSortBlockTemplate = ()=>{
  return `<ul class="sort">
  <li><a href="#" class="sort__button sort__button--active" data-sort = 'default'>Sort by default</a></li>
  <li><a href="#" class="sort__button" data-sort = 'date'>Sort by date</a></li>
  <li><a href="#" class="sort__button" data-sort = 'rating'>Sort by rating</a></li>
</ul>`;

};

export default class SortBlock extends Abstract {
  getTemplate() {
    return createSortBlockTemplate();
  }
  onSortfilms(callBack) {
    let eventId;
    let sortId;
    this.getElement().addEventListener(`click`, function (evt) {

      if (eventId === evt.target) {
        return;
      } else {
        eventId = evt.target;
        sortId = evt.target.dataset.sort;
        callBack(sortId);
      }

    });
  }
}
