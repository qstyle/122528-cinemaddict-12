import Abstract from './abstract.js';

const createFilmContainerBlockTemplate = ()=>{
  return `<section class="films"></section>`;
};

export default class SectionFilm extends Abstract {
  getTemplate() {
    return createFilmContainerBlockTemplate();
  }

}
