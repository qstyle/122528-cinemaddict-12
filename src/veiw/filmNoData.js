
import Abstract from './abstract.js';

const createNoDataTemplate = ()=>{
  return `<h2 class="films-list__title">There are no movies in our database</h2>`;
};

export default class NoDataFilm extends Abstract {
  getTemplate() {
    return createNoDataTemplate();
  }
}
