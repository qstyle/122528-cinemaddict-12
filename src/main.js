import ProfileBlock from "./veiw/profileBlock.js";

import {render} from "./utils/render.js";
import {RENDER_POSITION} from "./const.js";
import {generateMockDataArrays} from "./mock/generateMockData.js";
import FilmList from "./presenter/filmList.js";

const headerNode = document.querySelector(`.header`);
const mainNode = document.querySelector(`.main`);
const mockData = generateMockDataArrays();
const filmList = new FilmList(mainNode);

render(headerNode, new ProfileBlock(), RENDER_POSITION.BEFOREEND);
filmList.init(mockData);

