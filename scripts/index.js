import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards, validationConfig, closePopup, closeByEsc } from './constans.js';

//Элементы кнопок
const editProfileButton = document.querySelector('.profile__edit-button');
const closeProfileButton = document.getElementById('profile-close-button');
const formProfileSaveButton = document.querySelector('#profile-save-button');

// const saveButton = document.getElementById('profile-save-button');
const popupProfile = document.getElementById('profile-popup');

// Находим форму в DOM
const formElementProfile = document.getElementById('profile__form');

//Имя и работа в форме профиля
const nameProfileInput = document.getElementById('name-input');
const jobInput = document.getElementById('job-input');

//Имя и работа в профиле
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');

//Элементы кнопок
const addCardButton = document.querySelector('.profile__add-button');
const closeCardPopupButton = document.getElementById('place-popup-close-button');

//Сам попап place
const popupPlace = document.querySelector('.popup_place');

//Форма Попапа place
const formElementCard = document.getElementById('place-form');

//Находим Template элемента
const templateElement = document.getElementById('element');
const listElement = document.querySelector('.elements');

const popupImage = document.querySelector('.image-popup')

//Имя и Ссылка в попапе места
const namePlaceInput = document.getElementById('place-input');
const linkPlaceInput = document.getElementById('link-input');

//Функция открытия попапа добавления Карточки
const openPlacePopup = () => {openPopup(popupPlace)};
//Функция закрытия попапа добавления Карточки
const closePlacePopup = () => {closePopup(popupPlace)};

//Картинка и имя попапа
// const popupImagePhoto = popupImage.querySelector('.image-popup__image');
// const popupImageName = popupImage.querySelector('.image-popup__name');

//Кнопка закрытия попапа картинки
const buttonClosePopupImage = popupImage.querySelector('#image-close-button');

//Кнопка создания карточки
const formPlaceSaveButton = document.querySelector('#place_save-button');

//Список из всех попапов
const popupList = Array.from(document.querySelectorAll('.popup'));

//Закрытие попапов на нажатие на оверлей
const closePopupOverlay = () => {
  popupList.forEach((popupContainer) => {
    popupContainer.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        closePopup(popupContainer)
      }
    });
  });
}

//Универсальная функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_active');
  document.addEventListener('keydown', closeByEsc);
};

//Открытие попапа редактирования профиля
function openEditProfile () {
  openPopup(popupProfile);
  nameProfileInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

//Закрытие попапа редактирования профиля
function closeEditProfile () {
  // popupProfile.classList.remove('popup_active');
  closePopup(popupProfile);
};

//Редактирование профиля
function handleFormProfileSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameProfileInput.value;
  profileJob.textContent = jobInput.value;
  //Деактивируем кнопку
  formProfileSaveButton.classList.add('popup__save-button_inactive');
  formProfileSaveButton.disabled = true;
  
  closePopup(popupProfile);
};

function createNewCard(name, link) {
  const newCard = new Card(name, link);
  return newCard.createCard();
}

//Функция добавление карточки в список
function handleFormCardSubmit(evt) {
  evt.preventDefault();

  //Создаем новую константу куда помещаем значения с инпутов
  const card = { };
  card.name = namePlaceInput.value;
  card.link = linkPlaceInput.value;
  
  //Добавляем в список элементов новую карточку
  listElement.prepend(createNewCard(card));

  formElementCard.reset();

  //Делаем кнопку неактивной
  formPlaceSaveButton.classList.add('popup__save-button_inactive');
  formPlaceSaveButton.disabled = true;
  
  closePlacePopup();
};

//Добавление карточек из массива
initialCards.forEach((item) => {
  const placeElement = createNewCard(item);
  listElement.prepend(placeElement);
});

closePopupOverlay();

//"Слушатель" на форму для добавления карточки
formElementCard.addEventListener('submit', handleFormCardSubmit);

//Отправка изменений в профиле
formElementProfile.addEventListener('submit', handleFormProfileSubmit);

//Срабатывание открытия/закрытия при клике
editProfileButton.addEventListener('click', openEditProfile);
closeProfileButton.addEventListener('click', closeEditProfile);


//Добавление "слушателей" на кнопки открытия-закрытия попапа добавления места
addCardButton.addEventListener('click', openPlacePopup);
closeCardPopupButton.addEventListener('click', closePlacePopup);

//"Слушатель" для закрытия попапа
buttonClosePopupImage.addEventListener('click', () => {
  closePopup(popupImage);
});

const formElementProfileValidator = new FormValidator(formElementProfile, validationConfig);
formElementProfileValidator.enableValidation();

const formElementCardValidator = new FormValidator(formElementCard, validationConfig);
formElementCardValidator.enableValidation();