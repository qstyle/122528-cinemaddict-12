
export const createFilmCardBlockTemplate = (filmData)=>{
  return `<article class="film-card">
  <h3 class="film-card__title">${filmData.filmName}</h3>
  <p class="film-card__rating">${filmData.rating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${filmData.relisData}</span>
    <span class="film-card__duration">${filmData.timeLine}</span>
    <span class="film-card__genre">${filmData.genre}</span>
  </p>
  <img src="${filmData.poster}" alt="" class="film-card__poster">
  <p class="film-card__description">${filmData.description}</p>
  <a class="film-card__comments">${filmData.description.length}</a>
  <form class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite film-card__controls-item--active">Mark as favorite</button>
  </form>
</article>`;
};
