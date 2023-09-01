import Card from "../components/Card.js";
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import './index.css'
import { initialCards,
  validationConfig,
  editProfileButton,
  popupEditNameInput,
  popupEditDescriptionInput,
  popupProfile,
  cardTemplate,
  listElement,
  popupPlace,
  formElementProfile,
  formElementCard,
  popupImage,
  addCardButton } from '../utils/constans.js';

//Валидация форм
const formElementProfileValidator = new FormValidator(validationConfig, formElementProfile);
formElementProfileValidator.enableValidation();

const formElementCardValidator = new FormValidator(validationConfig, formElementCard);
formElementCardValidator.enableValidation();

//Экземпляр Класса редактирования профиля
const profileInfo = new UserInfo({
  nameValue: '.profile__name',
  descriptionValue: '.profile__description'
});

//Функция добавления отредактированной информации в профиль
const editProfile = (data) => {
  profileInfo.setUserInfo(data);
  popupEditProfile.close();
}

//Попап с формой редактирования профиля
const popupEditProfile = new PopupWithForm(popupProfile, editProfile);

//Попап с формой добавления карточки
const popupAddCard = new PopupWithForm(popupPlace, addCard);

//Попап карточки
const popupWithImage = new PopupWithImage(popupImage);

//Добавление InitialCards
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const placeElement = createNewCard(item);
    cardList.addItem(placeElement);
  }
}, listElement);
cardList.renderItems();


//Добавление новой карточки
function addCard (inputValues) {
  const cardElement = createNewCard(inputValues);
  cardList.addItem(cardElement);
  popupAddCard.close();
}

//Создание нового экземпляра карточки
function createNewCard(data) {
  const newCard = new Card(data, cardTemplate, handleCardClick);
  return newCard.createCard();
}

//Функция открытия попапа карточки
function handleCardClick (name, link) {
  popupWithImage.open(name, link);
};

//Слушатель на кнопку открытия попапа добавления карточки
addCardButton.addEventListener('click', () => {
  formElementCardValidator.toggleButtonState();
  popupAddCard.open();
});

//Слушатель на кнопку открытия попапа редактирования профиля
editProfileButton.addEventListener('click', () => {
  formElementProfileValidator.toggleButtonState();
  const { name, description} = profileInfo.getUserInfo();
  popupEditNameInput.value = name;
  popupEditDescriptionInput.value = description;
  popupEditProfile.open();
});

//Навешивание слушателей на попап редактирования профиля
popupEditProfile.setEventListeners();

//Навешивание слушателей на попап добавления карточки
popupAddCard.setEventListeners();

//Навешивание слушателей на попап карточки
popupWithImage.setEventListeners();