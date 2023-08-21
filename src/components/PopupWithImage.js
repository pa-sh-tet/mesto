import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImagePhoto = this._popupSelector.querySelector('.image-popup__image');
    this._popupImageName = this._popupSelector.querySelector('.image-popup__name');
  }

  open(name, link) {
    this._popupImageName.textContent = name;
    this._popupImagePhoto.src = link;
    this._popupImagePhoto.alt = name;
  }
}