import {generateRandomNumber} from "../generateRandomNumberUtils.js";


export const generateMockData = ()=>{
  return {
    filmName: `name`,
    poster: `./images/posters/popeye-meets-sinbad.png`,
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
