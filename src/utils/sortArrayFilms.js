export function filterArrayFilms(array, sortId) {
  let filmsSortedArray = [];
  if (sortId === `Watchlist`) {
    filmsSortedArray = array.filter((film)=>film.watchlist);
  }
  if (sortId === `History`) {
    filmsSortedArray = array.filter((film)=>film.history);
  }
  if (sortId === `Favorites`) {
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

