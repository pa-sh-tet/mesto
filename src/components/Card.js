export default class Card{
  constructor(data, cardTemplate, handleCardClick, deleteCard, userId, setLike) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._deleteCard = deleteCard;
    this._userId = userId;
    this._setLike = setLike;

    this._cardElement = this._getTemplate();
    this.likeCardCounter = this._cardElement.querySelector('.elements__like-counter');
    this.buttonDelete = this._cardElement.querySelector('.elements__delete-button');
    this.buttonLike = this._cardElement.querySelector('.elements__like-button');
    this.cardImage = this._cardElement.querySelector('.elements__item-image');
    this.cardName = this._cardElement.querySelector('.elements__place');
  }

  //Клонирование темплейта
  _getTemplate() {
    const _newTemplate = this._cardTemplate.content.querySelector('.elements__item').cloneNode(true);
    return _newTemplate;
  }

  //Удаление карточки
  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  //Проверка наличия лайка определенного пользователем
  isCardLiked() {
    return this._likes.some((like) => {
      return like._id === this._userId;
    });
  }

  //Лайк карточки
  _likeCardClick(likes) {
    this.likeCardCounter.textContent = likes.length;
    this._likes = likes;
    if (this.isCardLiked()) {
      this.buttonLike.classList.add('elements__like-button_active');
    } else {
      this.buttonLike.classList.remove('elements__like-button_active');
    }
  }

  //Навешивание слушателей на кнопки удаления и лайка, а также на картинку карточки
  _setEventListeners() {
    this.buttonDelete.addEventListener('click', () => {
      this._deleteCard(this._id, this);
    });
    this.buttonLike.addEventListener('click', () => this._setLike(this._id, this.isCardLiked(), this));
    this.cardImage.addEventListener('click', () => {this._handleCardClick(this._name, this._link)});
  }

  //Создание новой карточки
  createCard() {
    this.cardImage.src = this._link;
    this.cardImage.alt = this._name;
    this.cardName.textContent = this._name;

    if (this._ownerId === this._userId) {
      this.buttonDelete.setAttribute('style', 'display: flex;');
    }

    this._likeCardClick(this._likes);
    this._setEventListeners();

    return this._cardElement;
  }
}