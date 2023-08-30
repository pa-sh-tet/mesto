export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this.closePopupButton = this._popupSelector.querySelector('.popup__close-button');
    this._closeByEsc = this._closeByEsc.bind(this);
  }

  //Открытие попапа
  open() {
    this._popupSelector.classList.add('popup_active');
    document.addEventListener('keydown', this._closeByEsc);
  }

  //Закрытие попапа
  close() {
    this._popupSelector.classList.remove('popup_active');
    document.removeEventListener('keydown', this._closeByEsc);
  }

  //Закрытие на Esc
  _closeByEsc(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  //Закрытие по нажатию на кнопку или вне попапа
  setEventListeners() {
    this.closePopupButton.addEventListener('click', () => {
      this.close();
    });
    this._popupSelector.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    })
  }
}