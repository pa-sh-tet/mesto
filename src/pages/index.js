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
  editProfileButton,
  popupEditNameInput,
  popupEditDescriptionInput,
  popupProfile,
  cardTemplate,
  listElement,
  popupPlace,
  formElementProfile,
  formElementCard,
  formElementAvatar,
  popupImage,
  addCardButton,
  editAvatarButton,
  popupAvatar,
  popupDelete,
  submitAvatarButton,
  submitCardButton,
  submitDeleteButton,
  submitProfileButton
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
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([data, initialCards]) => {
    userId = data._id;
    profileInfo.setUserInfo(data);
    cardList.renderItems(initialCards, userId);
  })
  .catch((error) => {
    console.log(error);
  });



//Удаление карточки
const handleCardDelete = (id, card) => {
  popupDeleteCard.open();
  popupDeleteCard.setSubmitAction(() => {
    submitDeleteButton.textContent = 'Удаление...';
    api.deleteCard(id)
      .then(() => {
        card.removeCard()
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        submitDeleteButton.textContent = 'Да';
      })
  })

  popupDeleteCard.close();
}

//Создание нового экземпляра карточки
function createNewCard(data, id) {
  const newCard = new Card(
    data,
    cardTemplate,
    handleCardClick,
    handleCardDelete,
    id,
    addLike);
  return newCard.createCard();
}

function addLike(id, newCard) {
  api.setLike(id)
    .then((data) => {
      newCard._likeCard(data.likes)
    })
    .catch((error) => {
      console.log(error)
    })
}

//Экземпляр Класса редактирования профиля
const profileInfo = new UserInfo({
  nameValue: '.profile__name',
  descriptionValue: '.profile__description',
  avatarValue: '.profile__avatar-container_image'
});


//Валидация форм
const formElementProfileValidator = new FormValidator(validationConfig, formElementProfile);
formElementProfileValidator.enableValidation();

const formElementCardValidator = new FormValidator(validationConfig, formElementCard);
formElementCardValidator.enableValidation();

const formElementAvatarValidator = new FormValidator(validationConfig, formElementAvatar);
formElementAvatarValidator.enableValidation();


//Функция добавления отредактированной информации в профиль
const editProfile = (inputValues) => {
  submitProfileButton.textContent = 'Сохранение...';
    api.patchUserInfo(inputValues)
      .then((data) => {
        profileInfo.setUserInfo(data);
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        submitProfileButton.textContent = 'Сохранить';
      })
      
      popupEditProfile.close();
}

//Добавление карточки в кардлист
const addCard = (data) => {
  submitCardButton.textContent = 'Сохранение...';
    api.postCard(data)
    .then((data) => {
      const cardElement = createNewCard(data, data.owner._id);
      cardList.addItem(cardElement);
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      submitCardButton.textContent = 'Создать';
    })
  
  popupAddCard.close();
}

//Создание списка карточек
const cardList = new Section({
  renderer: (data, id) => {
    const placeElement = createNewCard(data, id);
    cardList.addItem(placeElement);
  }
}, listElement);

//Функция редактирования аватара
const editAvatar = (data) => {
  console.log(data.link);
  submitAvatarButton.textContent = 'Сохранение...';
  api.patchAvatar(data.link)
    .then(() => {
      profileInfo.setUserAvatar(data.avatar);
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      submitAvatarButton.textContent = 'Сохранить';
    });

    popupEditAvatar.close();
}

//Слушатель на кнопку открытия попапа добавления карточки
addCardButton.addEventListener('click', () => {
  formElementCardValidator.toggleButtonState();
  popupAddCard.open();
});

//Слушатель на кнопку открытия попапа редактирования профиля
editProfileButton.addEventListener('click', () => {
  formElementProfileValidator.toggleButtonState();
  const { name, description } = profileInfo.getUserInfo();
  popupEditNameInput.value = name;
  popupEditDescriptionInput.value = description;
  popupEditProfile.open();
});

//Слушатель на кнопку открытия попапа редактирования аватара
editAvatarButton.addEventListener('click', () => {
  formElementAvatarValidator.toggleButtonState();
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




// //Добавление InitialCards
// const cardList = new Section({
//   renderer: (item) => {
//     const placeElement = createNewCard(item);
//     cardList.addItem(placeElement);
//   }
// }, listElement);

// cardList.renderItems();


//Добавление новой карточки
// function addCard (inputValues) {
//   const cardElement = createNewCard(inputValues);
//   cardList.addItem(cardElement);
//   popupAddCard.close();
// }

// //Создание нового экземпляра карточки
// function createNewCard(data) {
//   const newCard = new Card(data,
//     cardTemplate,
//     handleCardClick,
//     handleCardDelete,
//     userId,
//     );
//   return newCard.createCard();
// }