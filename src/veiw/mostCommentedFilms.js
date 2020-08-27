import Abstract from './abstract.js';

const createFilmContainerBlockTemplate = ()=>{
  return `<section class="films-list--extra">
  <h2 class="films-list__title">Most commented</h2>
  <div class="films-list__container"></div>
  </section>`;
};

export default class MostComentedFilms extends Abstract {
  getTemplate() {
    return createFilmContainerBlockTemplate();
  }

}
