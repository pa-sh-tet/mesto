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
const editProfileButton = document.querySelector('.profile__edit-button');
const closeProfileButton = document.getElementById('profile-close-button');

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

//Универсальная функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_active');
};

//Универсальная функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_active');
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
  closePopup(popupProfile);
};

//Отправка изменений в профиле
formElementProfile.addEventListener('submit', handleFormProfileSubmit);

//Срабатывание открытия/закрытия при клике
editProfileButton.addEventListener('click', openEditProfile);
closeProfileButton.addEventListener('click', closeEditProfile);

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

//Добавление "слушателей" на кнопки открытия-закрытия попапа добавления места
addCardButton.addEventListener('click', openPlacePopup);
closeCardPopupButton.addEventListener('click', closePlacePopup);

//Картинка и имя попапа
const popupImagePhoto = popupImage.querySelector('.image-popup__image');
const popupImageName = popupImage.querySelector('.image-popup__name');

//Кнопка закрытия попапа картинки
const buttonClosePopupImage = popupImage.querySelector('#image-close-button');

//"Слушатель" для закрытия попапа
buttonClosePopupImage.addEventListener('click', () => {
  // popupImage.classList.remove('popup_active');
  closePopup(popupImage);
});

//Создание карточки
const createCard = ({name, link}) => {
  // namePlaceInput.value = '';
  // linkPlaceInput.value = '';

  //Клонируем содержимое template
  const clone = templateElement.content.cloneNode(true);
  const placeElement = clone.querySelector('.elements__item');

  //Находим картинку у карточки
  const cardImage = placeElement.querySelector('.elements__item-image');

  //Присваиваем значения
  placeElement.querySelector('.elements__place').textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  //Элементы кнопок лайка-удаления
  const buttonLike = placeElement.querySelector('.elements__like-button');
  const buttonDelete = placeElement.querySelector('.elements__delete-button');

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
    // popupImage.classList.add('popup_active');
    openPopup(popupImage);
    popupImagePhoto.src = link;
    popupImageName.textContent = name;
    popupImagePhoto.alt = link;
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

  namePlaceInput.reset();
  linkPlaceInput.reset();

  closePlacePopup();
};

//Добавление карточек из массива
initialCards.forEach((item) => {
  const placeElement = createCard(item);
  listElement.prepend(placeElement);
});

//"Слушатель" на форму для добавления карточки
formElementCard.addEventListener('submit', handleFormCardSubmit);

//Список из всех попапов
const popupList = Array.from(document.querySelectorAll('.popup'));

//Добавление слушателя закрытия попапов на Esc на документ
document.addEventListener('keydown', function (e) {
  popupList.forEach((popup) => {
    if (e.key === "Escape") {
      closePopup(popup);
    }
  });
});

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

closePopupOverlay();