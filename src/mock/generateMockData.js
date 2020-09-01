import {generateRandomNumber} from "../generateRandomNumberUtils.js";
const MOCK_COUNT = 21;


export const generateMockDataArrays = ()=>{
  let mockData = [];
  for (let i = 0; i < MOCK_COUNT; i++) {
    mockData.push(generateMockData());
  }
  return mockData;

};

const generateMockData = ()=>{
  return {
    filmName: `name`,
    poster: generateRandomPoster(),
    rating: Number(`${generateRandomNumber(1, 9)}.${generateRandomNumber(1, 99)}`),
    yearOfIssue: `2000`,
    timeLine: `${generateRandomNumber(1, 2)} h ${generateRandomNumber(0, 60)} min`,
    genre: `comedy`,
    description: generateDiscription(),
    commentsQuantity: generateRandomNumber(1, 10),
    filmNameOriginal: `original Film Name`,
    producer: `Dmitry Ordin`,
    screenwriter: `Александр Белокур`,
    actors: `Дэнни дэ Витто`,
    relisData: `«01 April 1995»`,
    genres: generateGanres(),
    fullDescription: `blahblahblah`,
    ageRating: `0+`,
    productCountry: `USA`,
    Watchlist: generateRandomNumber(0, 1),
    History: generateRandomNumber(0, 1),
    Favorites: generateRandomNumber(0, 1),
  };
};
const generateRandomPoster = ()=>{
  const postersArray = [`./images/posters/made-for-each-other.png`, `./images/posters/popeye-meets-sinbad.png`,
    `./images/posters/sagebrush-trail.jpg`,
    `./images/posters/santa-claus-conquers-the-martians.jpg`, `./images/posters/the-dance-of-life.jpg`,
    `./images/posters/the-great-flamarion.jpg`, `./images/posters/the-man-with-the-golden-arm.jpg`];
  const randomIndexPosrer = generateRandomNumber(0, postersArray.length - 1);
  return postersArray[randomIndexPosrer];
};

const generateDiscription = ()=>{
  const discriptionText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
   Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique
   felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.
    Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
     Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
     Sed blandit, eros vel aliquam faucibus, purus ex euismod diam,
     eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit
     in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta
      dapibus. In rutrum ac purus sit amet tempus.`;
  const discriptionsArray = discriptionText.split(`.`);
  const discriptionCount = generateRandomNumber(1, 5);
  let discriptions = [];
  for (let i = 0; i < discriptionCount; i++) {
    let discription = discriptionsArray.splice(generateRandomNumber(0, discriptionsArray.length - 1), 1);
    discriptions.push(discription);
  }
  return discriptions;
};

const generateGanres = ()=>{
  const ganres = [`drama`, `comedy`, `Mystery`];
  const ganresQuality = generateRandomNumber(1, ganres.length);
  let ganresArray = {
    text: [],
    lengthText: `Genre`,
  };
  for (let i = 0; i < ganresQuality; i++) {
    ganresArray.text.push(ganres.splice(generateRandomNumber(0, ganres.length - 1), 1));
  }
  if (ganresArray.text.length > 1) {
    ganresArray.lengthText = `Genres`;
  }
  ganresArray.text.push(` `, ` `);
  return ganresArray;
};
