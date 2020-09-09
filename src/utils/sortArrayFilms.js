export function filterArrayFilms(array, sortId) {
  let filmsSortedArray = [];
  if (sortId === `watchlist`) {
    filmsSortedArray = array.filter((film)=>film.watchlist);
  }
  if (sortId === `history`) {
    filmsSortedArray = array.filter((film)=>film.history);
  }
  if (sortId === `favorites`) {
    filmsSortedArray = array.filter((film)=>film.favorites);
  } if (sortId === `allMovies`) {
    filmsSortedArray = array;
  }
  return filmsSortedArray;
}

export function sortFilms(array, sortId) {
  if (sortId === `date`) {
    return array.sort(function (a, b) {
      return b.relisData - a.relisData;
    });
  }
  if (sortId === `rating`) {
    return array.sort(function (a, b) {
      return b.rating - a.rating;
    });
  }

  if (sortId === `default`) {
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
