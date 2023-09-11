export default class UserInfo {
  constructor({nameSelector, descriptionSelector, avatarSelector}) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  //Возвращает объект со значениями, которые сейчас у профиля в разметке
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._descriptionElement.textContent,
      avatar: this._avatarElement.src,
    };
  }

  //Принимает объект и подставляет его имя и описание в значения профиля в разметку
  setUserInfo({ name, about, avatar, _id }) {
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = about;
    this._avatarElement.src = avatar;
    this._userId = _id;
  }

  setProfileInfo({ name, about }) {
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = about;
  }

  setUserAvatar(avatarLink) {
    this._avatarElement.src = avatarLink;
  }
}