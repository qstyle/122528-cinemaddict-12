import Abstract from './abstract.js';

const createFilmContainerBlockTemplate = ()=>{
  return `<section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upco!!ming</h2>
    <div class="films-list__container"></div>
    </section>

`;
};

export default class FilmContainer extends Abstract {
  getTemplate() {
    return createFilmContainerBlockTemplate();
  }

}
