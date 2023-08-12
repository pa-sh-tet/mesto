export const initialCards = [
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

export const validationConfig = {
  formElement: '.popup__form',
  inputElement: '.popup__input',
  saveButtonElement: '.popup__save-button',
  inactiveButtonElement: 'popup__save-button_inactive',
  inputErrorElement: 'popup__input_type_error',
  errorElement: 'popup__input-error_active'
}; 

export const _popupImage = document.querySelector('.image-popup');
export const _popupImagePhoto = _popupImage.querySelector('.image-popup__image');
export const _popupImageName = _popupImage.querySelector('.image-popup__name');

export const openPopup = (popup) => {
  popup.classList.add('popup_active');
  document.addEventListener('keydown', closeByEsc);
};