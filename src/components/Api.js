export default class Api {
  constructor({ url, headers}) {
    this._url = url;
    this._headers = headers;
  }

  //Ответ от сервера
  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Возникла ошибка: ${res.status}`);
  }
  
  //Получить начальный карточки
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: "GET",
    })
      .then(this._getResponse);
  }

  //Получение текущей информации в профиле
  getUserData() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: "GET",
    })
      .then(this._getResponse);
  }

  //Патч новой информации в профиль
  patchUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name: data.name, 
        about: data.description,
      }),
    }).then(this._getResponse);
  }

  //Пост новой карточки
  postCard(data) {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(this._getResponse)
  }

  //Удаление карточки
  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      headers: this._headers,
      method: 'DELETE',
    })
      .then(this._getResponse);
  }

  //Поставить лайк
  setLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      headers: this._headers,
      method: 'PUT',
    })
      .then(this._getResponse);
  }

  //Удалить лайк
  deleteLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      headers: this._headers,
      method: 'DELETE',
    })
      .then(this._getResponse);
  }

  //Изменить аватар
  patchAvatar( avatarLink ) {
    return fetch(`${this._url}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar: avatarLink
      })
    }).then(this._getResponse);
  }
}