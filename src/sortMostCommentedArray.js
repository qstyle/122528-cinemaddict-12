export const sortMostCommented = (array) => {
  const mostCommented = array.slice(0, array.length);
  mostCommented.sort(function (a, b) {
    return b.description.length - a.description.length;
  });
  return mostCommented;
};
