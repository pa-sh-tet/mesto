export default class Api {
  constructor({ url, headers}) {
    this._url = url;
    this._headers = headers;
  }

  _getResponse(res) {
    console.log(res);
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Возникла ошибка: ${res.status}`);
  }
  
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: "GET",
    })
      .then(this._getResponse);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: "GET",
    })
      .then(this._getResponse);
  }

  patchUserInfo({ nameProfile, descriptionProfile }) {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name: nameProfile, 
        description: descriptionProfile,
      }),
    })
      .then(this._getResponse);
  }

  postCard(data) {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(this._getResponse)
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      headers: this._headers,
      method: 'DELETE',
    })
      .then(this._getResponse);
  }

  setLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      headers: this._headers,
      method: 'PUT',
    })
      .then(this._getResponse);
  }

  deleteLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      headers: this._headers,
      method: 'DELETE',
    })
      .then(this._getResponse);
  }

  patchAvatar({ avatarLink }) {
    // console.log(avatar);
    return fetch(`${this._url}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar: avatarLink
      })
    }).then(this._getResponse);
  }
}