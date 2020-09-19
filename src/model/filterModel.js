import Observer from '../utils/observer.js';
import {SORTFILMS} from '../const.js';

export default class Films extends Observer {

  constructor() {
    super();
    this._activeFilter = SORTFILMS.ALLMOVIES;
  }

  setFilter(updateType, filter) {
    this._activeFilter = filter;
    this._notify(updateType, filter);
  }

  getFilter() {
    return this._activeFilter;
  }
}
