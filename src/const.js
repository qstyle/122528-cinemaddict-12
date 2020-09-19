export const FILMS_COUNT_PER_STEP = 5;

export const FILMS_COUNT_IN_EXTRA = 2;

export const RENDER_POSITION = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  BEFOREBEGIN: `beforebegin`
};

export const SORTFILMS = {
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
  ALLMOVIES: `allMovies`,
  DATE: `date`,
  RATING: `rating`,
  TOPCOMMENTS: `topComments`,
  DEFAULT: `default`
};

export const PARENTFORRENDERFILM = {
  MAINFILM: 0,
  TOPRTEFILM: 1,
  TOPCOMMENTFILM: 2,
};

export const MODE = {
  DEFAULT: `DEFAULT`,
  OPEN: `OPEN_DETALS`
};

export const UPDATETYPE = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`
};

export const USERACTION = {
  UPDATE_FILM: `UPDATE_FILM`,
  DELETE_COMMENT: `DELETE_COMMENT`,
  ADD_COMMENT: `ADD_COMMENT`,
};

export const FilterType = {
  ALL: `all`,
  OVERDUE: `overdue`,
  TODAY: `today`,
  FAVORITES: `favorites`,
  REPEATING: `repeating`,
  ARCHIVE: `archive`
};
