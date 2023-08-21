import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._formElement = this._popupSelector.querySelector('.popup__form');
    this._inputElements = this._formElement.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    const inputValues = {};
    this._inputElements.forEach(element => {
      inputValues[element.name] = element.value;
    });
    return this._inputValies;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    })
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}