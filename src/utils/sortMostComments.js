export default function sortMostComments(filmsArray) {
  filmsArray.sort(function (a, b) {
    return b.commentsQuantity - a.commentsQuantity;
  });
}

