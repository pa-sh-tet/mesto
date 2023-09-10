export default class Section {
  constructor({ renderer }, containerElement) {
    this._renderer = renderer;
    this._containerElement = containerElement;
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(item) {
    this._containerElement.append(item);
  }

  addNewItem(item) {
    this._containerElement.prepend(item);
  }
}