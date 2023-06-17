const config = {
    baseUrl: 'https://nomoreparties.co/v1/exp-mipt-fbc-1',
    headers: {
        authorization: 'e2b74456-ec21-4848-ac9c-a11ddea4417d',
        'Content-Type': 'application/json'
    }
}

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export function getAllCards() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: {
            authorization: config.headers.authorization
        }
        })
        .then(res => checkResponse(res))
        .catch(err => console.log(err));
}

export function getUserInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: {
            authorization: config.headers.authorization
        }
        })
        .then(res => checkResponse(res))
        .catch(err => console.log(err));
}

export function updateUserInfo(name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
        })
        .then(res => checkResponse(res))
        .catch(err => console.log(err));
}

export function addCard(name, link) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
        })
        .then(res => checkResponse(res))
        .catch(err => console.log(err));
}

export function putLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            authorization: config.headers.authorization,
        },
    })
    .then(res => checkResponse(res))
    .catch(err => console.log(err));
}

export function unputLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: config.headers.authorization,
        },
    })
    .then(res => checkResponse(res))
    .catch(err => console.log(err)); 
}

export function removeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(res => checkResponse(res))
    .catch(err => console.log(err)); 
}

export function changeAvatar(link) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            avatar: link
        })
    })
    .then(res => checkResponse(res))
    .catch(err => console.log(err));
}