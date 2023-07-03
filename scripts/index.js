//Элементы кнопок
let editProfileButton = document.querySelector('.profile__edit-button');
let closeProfileButton = document.getElementById('profile-close-button');

// let saveButton = document.getElementById('profile-save-button');
let popupProfile = document.getElementById('profile-popup');

// Находим форму в DOM
let formElementProfile = document.getElementById('profile__form');

//Имя и работа в форме профиля
let nameProfileInput = document.getElementById('userName');
let jobInput = document.getElementById('userJob');

//Имя и работа в профиле
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');

//Открытие попапа редактирования профиля
function openEditProfile () {
  popupProfile.classList.add('popup_active');
  nameProfileInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

//Закрытие попапа редактирования профиля
function closeEditProfile () {
  popupProfile.classList.remove('popup_active');
};

//Редактирование профиля
function handleFormProfileSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameProfileInput.value;
  profileJob.textContent = jobInput.value;
  closeEditProfile();
}

//Отправка изменений в профиле
formElementProfile.addEventListener('submit', handleFormProfileSubmit);

//Срабатывание открытия/закрытия при клике
editProfileButton.addEventListener('click', openEditProfile);
closeProfileButton.addEventListener('click', closeEditProfile);

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Элементы кнопок
let addCardButton = document.querySelector('.profile__add-button');
let closeCardPopupButton = document.getElementById('place-popup-close-button');

//Сам попап place
let popupPlace = document.querySelector('.place-popup');

//Форма Попапа place
const formElementCard = document.getElementById('place-form');

//Находим Template элемента
const templateElement = document.getElementById('element');
const listElement = document.querySelector('.elements');

const popupImage = document.querySelector('.image-popup')

//Имя и Ссылка в попапе места
let namePlaceInput = document.getElementById('placeName');
let linkPlaceInput = document.getElementById('placeLink');

//Функция открытия попапа добавления Карточки
const openPlacePopup = () => {popupPlace.classList.add('popup_active')};
//Функция закрытия попапа добавления Карточки
const closePlacePopup = () => {popupPlace.classList.remove('popup_active')};

//Добавление "слушателей" на кнопки открытия-закрытия попапа добавления места
addCardButton.addEventListener('click', openPlacePopup);
closeCardPopupButton.addEventListener('click', closePlacePopup);

//Создание карточки
const createCard = ({name, link}) => {

  //Клонируем содержимое template
  const clone = templateElement.content.cloneNode(true);
  const placeElement = clone.querySelector('.elements__item');

  //Присваиваем значения
  placeElement.querySelector('.elements__place').textContent = name;
  placeElement.querySelector('.elements__item-image').src = link;
  placeElement.querySelector('.elements__item-image').alt = name;

  //Элементы кнопок лайка-удаления
  const buttonLike = placeElement.querySelector('.elements__like-button');
  const buttonDelete = placeElement.querySelector('.elements__delete-button');

  //Находим картинку у карточки
  const cardImage = placeElement.querySelector('.elements__item-image');

  //Кнопка закрытия попапа картинки
  const buttonClosePopupImage = popupImage.querySelector('#image-close-button');

  //Картинка и имя попапа
  const popupImagePhoto = popupImage.querySelector('.image-popup__image');
  const popupImageName = popupImage.querySelector('.image-popup__name');


  //"Слушатель" для изменения статуса лайка у карточки
  buttonLike.addEventListener('click', () => {
    buttonLike.classList.toggle('elements__like-button_active');
  });

  //"Слушатель" для удаления карточки
  buttonDelete.addEventListener('click', () => {
    buttonDelete.closest('.elements__item').remove();
  });

  //"Слушатель" с функцией открытия попапа и подставления значений
  cardImage.addEventListener('click', () => {
    popupImage.classList.add('popup_active');
    popupImagePhoto.src = link;
    popupImageName.textContent = name;
    popupImagePhoto.alt = link;
  });

  //"Слушатель" для закрытия попапа
  buttonClosePopupImage.addEventListener('click', () => {
    popupImage.classList.remove('popup_active');
  });

  return placeElement;
};

//Функция добавление карточки в список
function handleFormCardSubmit(evt) {
  evt.preventDefault();

  //Создаем новую константу куда помещаем значения с инпутов
  const newCard = {};
  newCard.name = namePlaceInput.value;
  newCard.link = linkPlaceInput.value;

  //Добавляем в список элементов новую карточку
  listElement.prepend(createCard(newCard));
  closePlacePopup();
};

//Добавление карточек из массива
initialCards.forEach((item) => {
  const placeElement = createCard(item);
  listElement.prepend(placeElement);
});

//"Слушатель" на форму для добавления карточки
formElementCard.addEventListener('submit', handleFormCardSubmit);

