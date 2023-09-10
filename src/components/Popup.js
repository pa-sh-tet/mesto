export default class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
    this.closePopupButton = this._popupElement.querySelector('.popup__close-button');
    this._closeByEsc = this._closeByEsc.bind(this);
  }

  //Открытие попапа
  open() {
    this._popupElement.classList.add('popup_active');
    document.addEventListener('keydown', this._closeByEsc);
  }

  //Закрытие попапа
  close() {
    this._popupElement.classList.remove('popup_active');
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
    this._popupElement.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    })
  }
}