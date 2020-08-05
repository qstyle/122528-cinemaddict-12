export const generateRandomNumber = (randomMin, randomMax) => {
  let randomValue = Math.round((Math.random() * randomMax));
  if (randomValue < randomMin) {
    randomValue += randomMin;
  }
  return randomValue;
};
