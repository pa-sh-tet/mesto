import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import './index.css'
import {
  validationConfig,
  buttonOpenPopupProfile,
  inputNamePopupEdit,
  inputDescriptionPopupEdit,
  popupProfile,
  cardTemplate,
  listElement,
  popupPlace,
  formElementProfile,
  formElementCard,
  formElementAvatar,
  popupImage,
  buttonOpenPopupCard,
  buttonOpenPopupAvatar,
  popupAvatar,
  popupDelete,
  buttonSubmitAvatar,
  buttonSubmitCard,
  buttonSubmitDelete,
  buttonSubmitProfile
} from '../utils/constans.js';

const apiConfig = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-74',
  headers: {
    authorization: '1d76cac4-bc77-42fa-bf15-5d8cd3682348',
    "Content-Type": "application/json",
  }
};

const api = new Api(apiConfig);

let userId;

//Промис на получение и подставление информации о юзере и изначальных карточек
Promise.all([ api.getUserData(), api.getInitialCards() ])
  .then(([data, initialCards]) => {
    userId = data._id;
    profileInfo.setUserInfo(data);
    cardList.renderItems(initialCards);
  })
  .catch((error) => {
    console.log(error);
  });


//Создание нового экземпляра карточки
function createNewCard(data) {
  const newCard = new Card(
    data,
    cardTemplate,
    handleCardClick,
    handleCardDelete,
    userId,
    addLikeClick);
  return newCard.createCard();
}

//Удаление карточки
const handleCardDelete = (id, newCard) => {
  popupDeleteCard.setSubmitAction(() => {
    buttonSubmitDelete.textContent = 'Удаление...';
    api.deleteCard(id)
      .then(() => {
        newCard.removeCard();
        popupDeleteCard.close();
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        buttonSubmitDelete.textContent = 'Да';
      })
  })
  popupDeleteCard.open();
}

//Функция добавления/удаления лайка в зависимости от его текущего состояния
function addLikeClick(id, isCardLiked, newCard) {
  if (isCardLiked) {
    api.deleteLike(id)
      .then((data) => {
        newCard._likeCardClick(data.likes)
      })
      .catch((error) => {
        console.log(error)
      })
  } else {
    api.setLike(id)
      .then((data) => {
        newCard._likeCardClick(data.likes)
      })
      .catch((error) => {
        console.log(error)
      })
  }

}

//Экземпляр Класса редактирования профиля
const profileInfo = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description',
  avatarSelector: '.profile__image'
});

//Валидация форм
const formElementProfileValidator = new FormValidator(validationConfig, formElementProfile);
formElementProfileValidator.enableValidation();

const formElementCardValidator = new FormValidator(validationConfig, formElementCard);
formElementCardValidator.enableValidation();

const formElementAvatarValidator = new FormValidator(validationConfig, formElementAvatar);
formElementAvatarValidator.enableValidation();

//Добавление карточки в кардлист
const addCard = (data) => {
  buttonSubmitCard.textContent = 'Сохранение...';
    api.postCard(data)
    .then((data) => {
      const cardElement = createNewCard(data);
      cardList.addNewItem(cardElement);
      popupAddCard.close();
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      buttonSubmitCard.textContent = 'Создать';
    })
}

//Создание списка карточек
const cardList = new Section({
  renderer: (data) => {
    const placeElement = createNewCard(data);
    cardList.addItem(placeElement);
  }
}, listElement);

//Функция редактирования аватара
const editAvatar = (data) => {
  buttonSubmitAvatar.textContent = 'Сохранение...';
  api.patchAvatar(data.link)
    .then((data) => {
      profileInfo.setUserAvatar(data.avatar);
      popupEditAvatar.close();
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      buttonSubmitAvatar.textContent = 'Сохранить';
    });
}

//Функция добавления отредактированной информации в профиль
const editProfile = (data) => {
  buttonSubmitProfile.textContent = 'Сохранение...';
  api.patchUserInfo(data)
    .then((data) => {
      profileInfo.setProfileInfo(data);
      popupEditProfile.close();
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      buttonSubmitProfile.textContent = 'Сохранить';
    })
}

//Слушатель на кнопку открытия попапа добавления карточки
buttonOpenPopupCard.addEventListener('click', () => {
  formElementCardValidator.toggleButtonState();
  formElementCardValidator.clearErrors();
  popupAddCard.open();
});

//Слушатель на кнопку открытия попапа редактирования профиля
buttonOpenPopupProfile.addEventListener('click', () => {
  formElementProfileValidator.toggleButtonState();
  formElementProfileValidator.clearErrors();
  const { name, about } = profileInfo.getUserInfo();
  inputNamePopupEdit.value = name;
  inputDescriptionPopupEdit.value = about;
  popupEditProfile.open();
});

//Слушатель на кнопку открытия попапа редактирования аватара
buttonOpenPopupAvatar.addEventListener('click', () => {
  formElementAvatarValidator.toggleButtonState();
  formElementAvatarValidator.clearErrors();
  popupEditAvatar.open();
});

//Функция открытия попапа карточки
function handleCardClick (name, link) {
  popupWithImage.open(name, link);
};

//Попап с формой редактирования профиля
const popupDeleteCard = new PopupWithConfirm(popupDelete);
//Попап с формой редактирования профиля
const popupEditProfile = new PopupWithForm(popupProfile, editProfile);
//Попап с формой добавления карточки
const popupAddCard = new PopupWithForm(popupPlace, addCard);
//Попап с формой редактирования автара
const popupEditAvatar = new PopupWithForm(popupAvatar, editAvatar)
//Попап карточки
const popupWithImage = new PopupWithImage(popupImage);

//Навешивание слушателей на попап редактирования профиля
popupEditProfile.setEventListeners();
//Навешивание слушателей на попап добавления карточки
popupAddCard.setEventListeners();
//Навешивание слушателей на попап карточки
popupWithImage.setEventListeners();
//Навешивание слушателей на попап редактирования аватара
popupEditAvatar.setEventListeners();
//Навешивание слушателей на попап удаления карточки
popupDeleteCard.setEventListeners();