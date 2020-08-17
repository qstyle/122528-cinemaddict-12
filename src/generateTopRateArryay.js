export const generateTopRateArray = (Array)=>{
  Array.sort(function (a, b) {
    return b.rating - a.rating;
  });
  return Array;
};
