import {SORTFILMS} from '../const.js';


export function filterArrayFilms(array, sortId) {
  let filmsSortedArray = [];
  if (sortId === SORTFILMS.WATCHLIST) {
    filmsSortedArray = array.filter((film)=>film.watchlist);
  }
  if (sortId === SORTFILMS.HISTORY) {
    filmsSortedArray = array.filter((film)=>film.history);
  }
  if (sortId === SORTFILMS.FAVORITES) {
    filmsSortedArray = array.filter((film)=>film.favorites);
  } if (sortId === SORTFILMS.ALLMOVIES) {
    filmsSortedArray = array;
  }
  return filmsSortedArray;
}

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

export function getFilterLength(data) {
  const filterLength = {
    watchlist: data.filter((film)=>film.watchlist).length,
    history: data.filter((film)=>film.history).length,
    favorites: data.filter((film)=>film.favorites).length,
  };
  return filterLength;

}
