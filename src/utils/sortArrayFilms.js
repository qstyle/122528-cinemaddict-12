import {SORTFILMS} from '../const.js';


export const filter = {
  [SORTFILMS.ALLMOVIES]: (films) => films.filter((film) => film),
  [SORTFILMS.HISTORY]: (films) => films.filter((film) => film.history),
  [SORTFILMS.FAVORITES]: (films) => films.filter((film) => film.favorites),
  [SORTFILMS.WATCHLIST]: (films) => films.filter((film) => film.watchlist),
};

export function sortFilms(array, sortId) {
  if (sortId === SORTFILMS.DATE) {
    return array.sort(function (a, b) {
      return b.relisData - a.relisData;
    });
  }
  if (sortId === SORTFILMS.RATING) {
    return array.sort(function (a, b) {
      return b.rating - a.rating;
    });
  }
  if (sortId === SORTFILMS.TOPCOMMENTS) {
    return array.sort(function (a, b) {
      return b.commentsQuantity - a.commentsQuantity;
    });
  }
  if (sortId === SORTFILMS.DEFAULT) {
    return array;
  } else {
    return array;
  }
}
