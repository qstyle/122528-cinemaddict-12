export default function sortTopRate(filmsArray) {
  filmsArray.sort(function (a, b) {
    return b.rating - a.rating;
  });
}

