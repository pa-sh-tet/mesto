//Функция показа сообщения об ошибке
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
  };
  
  //Функция скрытия сообщения об ошибке
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
  };
  
  //Проверка на валидность инпута
  const checkInputValidity = (formElement, inputElement) => {
    //Если не валиден - показать сообщение об ошибке
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    //Иначе - скрыть сообщение об ошибке
    } else {
      hideInputError(formElement, inputElement);
    }
  };
  
  //Добавление слушателей проверки на валидность на инпуты
  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__save-button');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };
  
  const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault;
      });
      setEventListeners(formElement);
    });
  };
  
  enableValidation(); 
  
  //Проверка на наличие невалидных инпутов в форме
  function hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  
  //Активация-Деактивация кнопки при проверки на валидность инпутов всей формы 
  function toggleButtonState (inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add('popup__save-button_inactive');
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove('popup__save-button_inactive')
      buttonElement.disabled = false;
    }
  };