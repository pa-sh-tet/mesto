//Элементы кнопок
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close_button');
let saveButton = document.querySelector('.popup__save_button');
let popup = document.querySelector('.popup');

//Открытие попапа редактирования профиля
function openEditProfile () {
  popup.setAttribute('style', 'display: flex')
};

//Закрытие попапа редактирования профиля
function closeEditProfile () {
  popup.setAttribute('style', 'display: none')
};

// Находим форму в DOM
let formElement = document.querySelector('.popup__form');

//Имя и работа в форме
let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_description');

//Имя и работа в профиле
let userName = document.querySelector('.profile__name');
let userJob = document.querySelector('.profile__description');

function handleFormSubmit (evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closeEditProfile();
}

formElement.addEventListener('submit', handleFormSubmit);
//Срабатывание открытия/закрытия при клике
editButton.addEventListener('click', openEditProfile);
closeButton.addEventListener('click', closeEditProfile);
