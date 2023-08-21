export default class UserInfo {
  constructor(nameValue, descriptionValue) {
    this._nameValue = nameValue;
    this._descriptionValue = descriptionValue;
  }

  getUserInfo() {
    return {
      name: this._nameValue.textContent,
      description: this._descriptionValue.textContent
    }
  }

  setUserInfo({ name, description }) {
    this._nameValue.textContent = name;
    this._descriptionValue.textContent = description;
  }
}