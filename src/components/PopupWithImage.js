import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
  constructor(popupElement) {
    super(popupElement);
    this._popupImagePhoto = this._popupElement.querySelector('.image-popup__image');
    this._popupImageName = this._popupElement.querySelector('.image-popup__name');
  }

  //Открытие попапа с подстановкой значений
  open(name, link) {
    super.open();
    this._popupImageName.textContent = name;
    this._popupImagePhoto.src = link;
    this._popupImagePhoto.alt = name;
  }
}