import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupElement, submitForm) {
    super(popupElement);
    this._submitForm = submitForm.bind(this);
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._inputElements = Array.from(
      this._formElement.querySelectorAll('.popup__input')
    );
  }

  //Возваращет объект со значениями ипутов
  _getInputValues() {
    const data = {};
    this._inputElements.forEach(element => {
      data[element.name] = element.value;
    });
    return data;
  }

  //Навешивание слушателей на форму
  setEventListeners() {
    super.setEventListeners();
    //Изменение формы при отправки
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const data = this._getInputValues()
      this._submitForm(data);
    });
  }

  //Закрытие попапа и обнуление формы
  close() {
    super.close();
    this._formElement.reset();
  }
}