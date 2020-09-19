import ProfileBlock from "./veiw/profileBlock.js";
import Films from "./model/films.js";
import {render} from "./utils/render.js";
import {RENDER_POSITION} from "./const.js";
import {generateMockDataArrays} from "./mock/generateMockData.js";
import FilmList from "./presenter/filmList.js";
import Filter from "./presenter/filter.js";

const headerNode = document.querySelector(`.header`);
const mainNode = document.querySelector(`.main`);
const mockData = generateMockDataArrays();
render(headerNode, new ProfileBlock(), RENDER_POSITION.BEFOREEND);

const filmModel = new Films();
filmModel.setFilms(mockData);
const filter = new Filter(mainNode, mockData);
const filmList = new FilmList(mainNode, filmModel);
filmList.init();
filter.init();

