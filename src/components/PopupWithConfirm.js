import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._submitForm = this._popupElement.querySelector('.delete-popup__form');
  }

  setSubmitAction(submitAction) {
    this._submitAction = submitAction;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitAction();
    })
  }
}