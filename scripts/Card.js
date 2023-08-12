import { _popupImage, _popupImagePhoto, _popupImageName, openPopup } from './constans.js'

export default class Card {
  constructor({ name, link }) {
    this._name = name;
    this._link = link;
  }

  _getTemplate() {
    const _newTemplate = document.querySelector('#element').content.querySelector('.elements__item').cloneNode(true);
    return _newTemplate;
  }

  _openPopupImage() {
    _popupImagePhoto.src = this._link;
    _popupImageName.textContent = this._name;
    _popupImagePhoto.alt = this._link;
    openPopup(_popupImage);
  }

  _deleteCard() {
    this._cardElement.closest('.elements__item').remove();
  }

  _likeCard() {
    const _buttonLike = this._cardElement.querySelector('.elements__like-button');
    _buttonLike.classList.toggle('elements__like-button_active');
  }

  _setEventListeners() {
    const _buttonDelete = this._cardElement.querySelector('.elements__delete-button');
    _buttonDelete.addEventListener('click', () => {this._deleteCard()});

    const _buttonLike = this._cardElement.querySelector('.elements__like-button');
    _buttonLike.addEventListener('click', () => {this._likeCard()});

    const _cardImage = this._cardElement.querySelector('.elements__item-image');
    _cardImage.addEventListener('click', () => {this._openPopupImage()});
  }

  createCard() {
    this._cardElement = this._getTemplate();

    const _cardImage = this._cardElement.querySelector('.elements__item-image');
    const _cardName = this._cardElement.querySelector('.elements__place');

    _cardImage.src = this._link;
    _cardImage.alt = this._link;
    _cardName.textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}