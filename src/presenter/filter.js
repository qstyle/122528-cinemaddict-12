import FilterFilms from '../veiw/filterFilms.js';
import {render} from '../utils/render.js';
import {RENDER_POSITION} from '../const.js';

export default class Filter {
  constructor(container, data) {
    this._container = container;
    this._data = data;
  }
  init() {
    this._filterBlock = new FilterFilms(this._data);
    render(this._container, this._filterBlock, RENDER_POSITION.AFTERBEGIN);

  }
}
