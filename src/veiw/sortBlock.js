import Abstract from './abstract.js';
import {SORTFILMS} from '../const.js';

const createSortBlockTemplate = (sortTypeClassAction)=>{
  const sortTypeAction = sortTypeClassAction;
  return `<ul class="sort">
  <li><a href="#" class="sort__button ${sortTypeAction === SORTFILMS.DEFAULT ? ` sort__button--active` : ` `} " data-sort = '${SORTFILMS.DEFAULT}'>Sort by default</a></li>
  <li><a href="#" class="sort__button ${sortTypeAction === SORTFILMS.DATE ? ` sort__button--active` : ` `}" data-sort = '${SORTFILMS.DATE}'>Sort by date</a></li>
  <li><a href="#" class="sort__button ${sortTypeAction === SORTFILMS.RATING ? ` sort__button--active` : ` `}" data-sort = '${SORTFILMS.RATING}'>Sort by rating</a></li>
  </ul>`;

};

export default class SortBlock extends Abstract {
  constructor(sortType) {
    super();
    this.sortType = sortType;

  }

  getTemplate() {
    return createSortBlockTemplate(this.sortType);
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

    });
  }
}
