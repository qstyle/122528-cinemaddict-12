import Abstract from './abstract.js';
import {SORTFILMS} from '../const.js';
let ClassActive = `default`;

const createSortBlockTemplate = ()=>{
  return `<ul class="sort">
  <li><a href="#" class="sort__button sort__button--active ${ClassActive === `default` ? `sort__button--active` : ``}" data-sort = '${SORTFILMS.DEFAULT}'>Sort by default</a></li>
  <li><a href="#" class="sort__button ${ClassActive === `date` ? `sort__button--active` : ``}" data-sort = '${SORTFILMS.DATE}'>Sort by date</a></li>
  <li><a href="#" class="sort__button ${ClassActive === `rating` ? `sort__button--active` : ``}" data-sort = '${SORTFILMS.RATING}'>Sort by rating</a></li>
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
        ClassActive = sortId;
        callBack(sortId);
      }

    });
  }
}
