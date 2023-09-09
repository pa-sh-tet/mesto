export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  renderItems(items, id) {
    items.forEach((item) => {
      this._renderer(item, id);
    });
  }

  addItem(item) {
    this._containerSelector.prepend(item);
  }
}