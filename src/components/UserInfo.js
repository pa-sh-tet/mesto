export default class UserInfo {
  constructor({nameValue, descriptionValue}) {
    this._nameValue = document.querySelector(nameValue);
    this._descriptionValue = document.querySelector(descriptionValue);
  }

  //Возвращает объект со значениями, которые сейчас у профиля в разметке
  getUserInfo() {
    return {
      name: this._nameValue.textContent,
      description: this._descriptionValue.textContent,
    };
  }

  //Принимает объект и подставляет его имя и описание в значения профиля в разметку
  setUserInfo({ name, description }) {
    this._nameValue.textContent = name;
    this._descriptionValue.textContent = description;
  }
}