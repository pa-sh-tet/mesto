import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import './index.css'


import { initialCards, validationConfig } from '../components/constans.js';

// //Элементы кнопок
// const editProfileButton = document.querySelector('.profile__edit-button');
// const closeProfileButton = document.querySelector('#profile-close-button');

// // const saveButton = document.getElementById('profile-save-button');
// const popupProfile = document.getElementById('profile-popup');

// Находим форму в DOM
const formElementProfile = document.getElementById('profile__form');

// //Имя и работа в форме профиля
// const nameProfileInput = document.getElementById('name-input');
// const jobInput = document.getElementById('job-input');

// //Имя и работа в профиле
// const profileName = document.querySelector('.profile__name');
// const profileJob = document.querySelector('.profile__description');

// //Элементы кнопок
// const addCardButton = document.querySelector('.profile__add-button');
// const closeCardPopupButton = document.querySelector('#place-close-button');

// //Сам попап place
// const popupPlace = document.querySelector('.popup_place');

//Форма Попапа place
const formElementCard = document.getElementById('place-form');

//Находим Template элемента
const templateElement = document.querySelector('#element');
const listElement = document.querySelector('.elements');

const popupImage = document.querySelector('.image-popup')

// //Имя и Ссылка в попапе места
// const namePlaceInput = document.getElementById('place-input');
// const linkPlaceInput = document.getElementById('link-input');

// //Функция открытия попапа добавления Карточки
// const openPlacePopup = () => {openPopup(popupPlace)};
// //Функция закрытия попапа добавления Карточки
// const closePlacePopup = () => {closePopup(popupPlace)};

// //Кнопка закрытия попапа картинки
// const buttonClosePopupImage = popupImage.querySelector('#image-close-button');

// //Список из всех попапов
// const popupList = Array.from(document.querySelectorAll('.popup'));

//Закрытие попапов на нажатие на оверлей
// const closePopupOverlay = () => {
//   popupList.forEach((popupContainer) => {
//     popupContainer.addEventListener('click', (evt) => {
//       if (evt.target === evt.currentTarget) {
//         closePopup(popupContainer)
//       }
//     });
//   });
// }

// //Открытие попапа редактирования профиля
// function openEditProfile () {
//   openPopup(popupProfile);
//   nameProfileInput.value = profileName.textContent;
//   jobInput.value = profileJob.textContent;
// };

// //Закрытие попапа редактирования профиля
// function closeEditProfile () {
//   closePopup(popupProfile);
// };

// //Редактирование профиля
// function handleFormProfileSubmit (evt) {
//   evt.preventDefault();
//   profileName.textContent = nameProfileInput.value;
//   profileJob.textContent = jobInput.value;
//   //Деактивируем кнопку
//   formElementProfileValidator.disableSubmitButton();
  
//   closePopup(popupProfile);
// };

const addCard = (data) => {
  const cardElement = createNewCard(data);
  initialCards.add
}

function createNewCard(data, templateElement) {
  const newCard = new Card(data, templateElement, handleCardClick);
  return newCard.createCard();
}

const handleCardClick = (name, link) => {
  popupImage.open(name, link);
}

// //Функция добавление карточки в список
// function handleFormCardSubmit(evt) {
//   evt.preventDefault();

//   //Создаем новую константу куда помещаем значения с инпутов
//   const data = { 
//     name: namePlaceInput.value,
//     link: linkPlaceInput.value,
//   };

//   //Добавляем в список элементов новую карточку
//   listElement.prepend(createNewCard(data, templateElement));

//   formElementCard.reset();

//   //Делаем кнопку неактивной
//   formElementCardValidator.disableSubmitButton();
  
//   closePlacePopup();
// };

//Добавление карточек из массива
initialCards.forEach((item) => {
  const placeElement = createNewCard(item, templateElement);
  listElement.prepend(placeElement);
});

// closePopupOverlay();

// //"Слушатель" на форму для добавления карточки
// formElementCard.addEventListener('submit', handleFormCardSubmit);

// //Отправка изменений в профиле
// formElementProfile.addEventListener('submit', handleFormProfileSubmit);

//Срабатывание открытия/закрытия при клике
// editProfileButton.addEventListener('click', openEditProfile);
// closeProfileButton.addEventListener('click', closeEditProfile);


// //Добавление "слушателей" на кнопки открытия-закрытия попапа добавления места
// addCardButton.addEventListener('click', openPlacePopup);
// closeCardPopupButton.addEventListener('click', closePlacePopup);

// //"Слушатель" для закрытия попапа
// buttonClosePopupImage.addEventListener('click', () => {
//   closePopup(popupImage);
// });

const formElementProfileValidator = new FormValidator(validationConfig, formElementProfile);
formElementProfileValidator.enableValidation();

const formElementCardValidator = new FormValidator(validationConfig, formElementCard);
formElementCardValidator.enableValidation();