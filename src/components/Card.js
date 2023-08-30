export default class Card{
  constructor(data, cardTemplate, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
  }

  //Клонирование темплейта
  _getTemplate() {
    const _newTemplate = this._cardTemplate.content.querySelector('.elements__item').cloneNode(true);
    return _newTemplate;
  }

  //Удаление карточки
  _deleteCard() {
    this._cardElement.closest('.elements__item').remove();
  }

  //Лайк карточки
  _likeCard() {
    const _buttonLike = this._cardElement.querySelector('.elements__like-button');
    _buttonLike.classList.toggle('elements__like-button_active');
  }

  //Навешивание слушателей на кнопки удаления и лайка, а также на картинку карточки
  _setEventListeners() {
    const _buttonDelete = this._cardElement.querySelector('.elements__delete-button');
    _buttonDelete.addEventListener('click', () => {this._deleteCard()});

    const _buttonLike = this._cardElement.querySelector('.elements__like-button');
    _buttonLike.addEventListener('click', () => {this._likeCard()});

    const _cardImage = this._cardElement.querySelector('.elements__item-image');
    _cardImage.addEventListener('click', () => {this._handleCardClick(this._name, this._link)});
  }

  //Создание новой карточки
  createCard() {
    this._cardElement = this._getTemplate();

    const _cardImage = this._cardElement.querySelector('.elements__item-image');
    const _cardName = this._cardElement.querySelector('.elements__place');

    _cardImage.src = this._link;
    _cardImage.alt = this._name;
    _cardName.textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}