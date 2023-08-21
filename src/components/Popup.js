export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add('popup_active');
    document.addEventListener('keydown', closeByEsc);
  }

  close() {
    this._popupSelector.classList.remove('popup_active');
    document.removeEventListener('keydown', closeByEsc);
  }

  _closeByEsc(evt) {
    if (evt.key === 'Escape') {
      this.close()
    }
  }

  setEventListeners() {
    const closePopupButton = this._popupSelector.querySelector('popup__close-button');
    closePopupButton.addEventListener('click', () => {
      this._close();
    });
    this._popupSelector.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    })
  }
}