export default class UserInfo {
  constructor({nameSelector, descriptionSelector, avatarSelector}) {
    this._nameSelector = document.querySelector(nameSelector);
    this._descriptionSelector = document.querySelector(descriptionSelector);
    this._avatarSelector = document.querySelector(avatarSelector);
  }

  //Возвращает объект со значениями, которые сейчас у профиля в разметке
  getUserInfo() {
    return {
      name: this._nameSelector.textContent,
      about: this._descriptionSelector.textContent,
      avatar: this._avatarSelector.src,
    };
  }

  //Принимает объект и подставляет его имя и описание в значения профиля в разметку
  setUserInfo({ name, about, avatar, _id }) {
    this._nameSelector.textContent = name;
    this._descriptionSelector.textContent = about;
    this._avatarSelector.src = avatar;
    this._userId = _id;
  }

  setProfileInfo({ name, about }) {
    this._nameSelector.textContent = name;
    this._descriptionSelector.textContent = about;
  }

  setUserAvatar(avatarLink) {
    this._avatarSelector.src = avatarLink;
  }
}