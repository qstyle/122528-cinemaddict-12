export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};
export function renderElement(htmlBlock, parent) {
  parent.append(htmlBlock);
}
export function deleteBlock(htmlBlock) {
  htmlBlock.remove();
}
