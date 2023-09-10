export default class UserInfo {
  constructor({nameValue, descriptionValue, avatarValue}) {
    this._nameValue = document.querySelector(nameValue);
    this._descriptionValue = document.querySelector(descriptionValue);
    this._avatarValue = document.querySelector(avatarValue);
  }

  //Возвращает объект со значениями, которые сейчас у профиля в разметке
  getUserInfo() {
    return {
      name: this._nameValue.textContent,
      about: this._descriptionValue.textContent,
      avatar: this._avatarValue.src,
    };
  
  }

  //Принимает объект и подставляет его имя и описание в значения профиля в разметку
  setUserInfo({ name, about, avatar, _id }) {
    this._nameValue.textContent = name;
    this._descriptionValue.textContent = about;
    this._avatarValue.src = avatar;
    this._userId = _id;
  }

  setProfileInfo({ name, about }) {
    this._nameValue.textContent = name;
    this._descriptionValue.textContent = about;
  }

  setUserAvatar(avatarLink) {
    this._avatarValue.src = avatarLink;
  }
}