export const sortTopRateArray = (array)=>{
  const topRateArray = array.slice(0, array.length);
  topRateArray.sort(function (a, b) {
    return b.rating - a.rating;
  });
  return topRateArray;
};
