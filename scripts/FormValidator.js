export default class FormValidator {
  constructor(formElement, validationConfig) {
    this._formElement = formElement;
    this._inputElement = validationConfig.inputElement;
    this._saveButtonElement = validationConfig.saveButtonElement;
    this._inactiveButtonElement = validationConfig.inactiveButtonElement;
    this._inputErrorElement = validationConfig.inputErrorElement;
    this._errorElement = validationConfig.errorElement;
    this._buttonElement = this._formElement.querySelector(this._saveButtonElement);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputElement));
    this._formList = Array.from(document.querySelectorAll(validationConfig.formElement))
  }

  //Функция показа сообщения об ошибке
  _showInputError(inputElement, errorMessage) {
    const _errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorElement);
    _errorElement.textContent = errorMessage;
    _errorElement.classList.add(this._errorElement);
  }

  //Функция скрытия сообщения об ошибке
  _hideInputError(inputElement) {
    const _errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorElement);
    _errorElement.classList.remove(this._errorElement);
    _errorElement.textContent = '';
  }

  //Проверка на валидность инпута
  _checkInputValidity(inputElement) {
    //Если не валиден - показать сообщение об ошибке
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    //Иначе - скрыть сообщение об ошибке
    } else {
      this._hideInputError(inputElement);
    }
  }

  //Добавление слушателей проверки на валидность на инпуты
  _setEventListeners() {
    this.toggleButtonState()
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault;
      });
      this._setEventListeners();
    });
  };

  //Проверка на наличие невалидных инпутов в форме
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  //Активация-Деактивация кнопки при проверки на валидность инпутов всей формы 
  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonElement);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonElement)
      this._buttonElement.disabled = false;
    }
  };
} 
