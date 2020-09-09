import {SORTFILMSID} from '../const.js';


export function filterArrayFilms(array, sortId) {
  let filmsSortedArray = [];
  if (sortId === SORTFILMSID.WATCHLIST) {
    filmsSortedArray = array.filter((film)=>film.watchlist);
  }
  if (sortId === SORTFILMSID.HISTORY) {
    filmsSortedArray = array.filter((film)=>film.history);
  }
  if (sortId === SORTFILMSID.FAVORITES) {
    filmsSortedArray = array.filter((film)=>film.favorites);
  } if (sortId === SORTFILMSID.ALLMOVIES) {
    filmsSortedArray = array;
  }
  return filmsSortedArray;
}

export function sortFilms(array, sortId) {
  if (sortId === SORTFILMSID.DATE) {
    return array.sort(function (a, b) {
      return b.relisData - a.relisData;
    });
  }
  if (sortId === SORTFILMSID.RATING) {
    return array.sort(function (a, b) {
      return b.rating - a.rating;
    });
  }
  if (sortId === SORTFILMSID.TOPCOMMENTS) {
    return array.sort(function (a, b) {
      return b.commentsQuantity - a.commentsQuantity;
    });
  }
  if (sortId === SORTFILMSID.DEFAULT) {
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
