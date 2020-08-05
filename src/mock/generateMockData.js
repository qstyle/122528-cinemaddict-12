import {generateRandomNumber} from "../generateRandomNumberUtils.js";
const MOCK_COUNT = 20;


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
    rating: `****`,
    yearOfIssue: `2000`,
    timeLine: generateRandomNumber(10, 20),
    genre: `comedy`,
    description: [`blablabla`],
    commentsQuantity: generateRandomNumber(1, 10),
    filmNameOriginal: `original Film Name`,
    producer: `Dmitry Ordin`,
    screenwriter: `Александр Белокур`,
    actors: `Дэнни дэ Витто`,
    relisData: `«01 April 1995»`,
    genres: `comedy`,
    fullDescription: `blablabla2`,
    ageRating: `0+`,
  };
};
const generateRandomPoster = ()=>{
  const postersArray = [`./images/posters/made-for-each-other.png`, `./images/posters/popeye-meets-sinbad.png`,
    `./images/posters/sagebrush-trail.jpg`,
    `./images/posters/santa-claus-conquers-the-martians.jpg`, `./images/posters/the-dance-of-life.jpg`,
    `./images/posters/the-great-flamarion.jpg`, `./images/posters/the-man-with-the-golden-arm.jpg`];
  const randomIndexPosrer = generateRandomNumber(0, postersArray.length);
  return postersArray[randomIndexPosrer];
};
