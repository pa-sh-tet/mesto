const validationConfig = {
  formElement: '.popup__form',
  inputElement: '.popup__input',
  buttonElement: '.popup__save-button',
  inactiveButtonElement: 'popup__save-button_inactive',
  inputErrorElement: 'popup__input_type_error',
  errorElement: 'popup__input-error_active'
}; 


//Функция показа сообщения об ошибке
const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorElement);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorElement);
  };
  
  //Функция скрытия сообщения об ошибке
  const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorElement);
    errorElement.classList.remove(config.errorElement);
    errorElement.textContent = '';
  };
  
  //Проверка на валидность инпута
  const checkInputValidity = (formElement, inputElement, config) => {
    //Если не валиден - показать сообщение об ошибке
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, config);
    //Иначе - скрыть сообщение об ошибке
    } else {
      hideInputError(formElement, inputElement, config);
    }
  };
  
  //Добавление слушателей проверки на валидность на инпуты
  const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputElement));
    const buttonElement = formElement.querySelector(config.buttonElement);
    toggleButtonState(inputList, buttonElement, config);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement, config);
        toggleButtonState(inputList, buttonElement, config);
      });
    });
  };
  
  const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formElement));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault;
      });
      setEventListeners(formElement, config);
    });
  };
  
  enableValidation(validationConfig); 
  
  //Проверка на наличие невалидных инпутов в форме
  function hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  
  //Активация-Деактивация кнопки при проверки на валидность инпутов всей формы 
  function toggleButtonState (inputList, buttonElement, config) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(config.inactiveButtonElement);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(config.inactiveButtonElement)
      buttonElement.disabled = false;
    }
  };