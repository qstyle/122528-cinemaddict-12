import Abstract from '../veiw/abstract.js';
import {RENDER_POSITION} from "../const.js";


export const render = (container, child, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (child instanceof Abstract) {
    child = child.getElement();
  }

  switch (place) {
    case RENDER_POSITION.AFTERBEGIN:
      container.prepend(child);
      break;
    case RENDER_POSITION.BEFOREEND:
      container.append(child);
      break;
  }
};

export function deleteBlock(component) {
  component.getElement().remove();
  component.removeElement();
}
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};


