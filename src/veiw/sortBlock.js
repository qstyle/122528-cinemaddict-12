import Abstract from './abstract.js';
import {SORTFILMSID} from '../const.js';

const createSortBlockTemplate = ()=>{
  return `<ul class="sort">
  <li><a href="#" class="sort__button sort__button--active" data-sort = '${SORTFILMSID.DEFAULT}'>Sort by default</a></li>
  <li><a href="#" class="sort__button" data-sort = '${SORTFILMSID.DATE}'>Sort by date</a></li>
  <li><a href="#" class="sort__button" data-sort = '${SORTFILMSID.RATING}'>Sort by rating</a></li>
</ul>`;

};

export default class SortBlock extends Abstract {

  getTemplate() {
    return createSortBlockTemplate();
  }
  sortFilmsHandler(callBack) {
    let eventId;
    let sortId;
    this.getElement().addEventListener(`click`, function (evt) {
      if (evt.target.tagName !== `A`) {
        return;
      }

      if (eventId === evt.target) {
        return;
      } else {
        eventId = evt.target;
        sortId = evt.target.dataset.sort;
        callBack(sortId);
      }
      evt.target.classList.add(`sort__button--active`);
    });
  }
}
