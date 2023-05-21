//Элементы кнопок
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let saveButton = document.querySelector('.popup__save-button');
let popup = document.querySelector('.popup');

// Находим форму в DOM
let formElement = document.querySelector('.popup__form');

//Имя и работа в форме
let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_description');

//Имя и работа в профиле
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');

//Открытие попапа редактирования профиля
function openEditProfile () {
  popup.classList.add('popup_active');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

//Закрытие попапа редактирования профиля
function closeEditProfile () {
  popup.classList.remove('popup_active');
};

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeEditProfile();
}

formElement.addEventListener('submit', handleFormSubmit);
//Срабатывание открытия/закрытия при клике
editButton.addEventListener('click', openEditProfile);
closeButton.addEventListener('click', closeEditProfile);
