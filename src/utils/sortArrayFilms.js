export function sortArrayFilms(array, sortId) {
  let filmsSortedArray = [];
  if (sortId === `Watchlist`) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].Watchlist) {
        filmsSortedArray.push(array[i]);
      }
    }
  }
  if (sortId === `History`) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].History) {
        filmsSortedArray.push(array[i]);
      }
    }
  }
  if (sortId === `Favorites`) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].Favorites) {
        filmsSortedArray.push(array[i]);
      }
    }
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

