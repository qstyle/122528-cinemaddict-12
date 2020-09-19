import FilterFilms from '../veiw/filterFilms.js';
import {render, deleteBlock, replace} from '../utils/render.js';
import {RENDER_POSITION, UPDATETYPE, SORTFILMS} from '../const.js';
import {filter} from '../utils/sortArrayFilms.js';

export default class Filter {
  constructor(filterContainer, filterModel, filmsModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;
    this._currentFilter = null;
    this._filterComponent = null;
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();

    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterFilms(filters, this._currentFilter);
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RENDER_POSITION.BEFOREEND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    deleteBlock(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    this._filterModel.setFilter(UPDATETYPE.MAJOR, filterType);
  }

  _getFilters() {
    const films = this._filmsModel.getFilms();

    return [
      {
        type: SORTFILMS.ALLMOVIES,
        name: `All movies`,
        count: filter[SORTFILMS.ALLMOVIES](films).length
      },
      {
        type: SORTFILMS.WATCHLIST,
        name: `Watchlist`,
        count: filter[SORTFILMS.WATCHLIST](films).length
      },
      {
        type: SORTFILMS.HISTORY,
        name: `History`,
        count: filter[SORTFILMS.HISTORY](films).length
      },
      {
        type: SORTFILMS.FAVORITES,
        name: `Favorites`,
        count: filter[SORTFILMS.FAVORITES](films).length
      }
    ];
  }
}


