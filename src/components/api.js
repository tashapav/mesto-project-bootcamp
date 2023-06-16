const config = {
    baseUrl: 'https://nomoreparties.co/v1/exp-mipt-fbc-1',
    headers: {
        authorization: 'e2b74456-ec21-4848-ac9c-a11ddea4417d',
        'Content-Type': 'application/json'
    }
}

const afterReqest = (res) => {
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
        .then(res => afterReqest(res));
}

export function getUserInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: {
            authorization: config.headers.authorization
        }
        })
        .then(res => afterReqest(res));
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
        .then(res => afterReqest(res));;
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
        .then(res => afterReqest(res));
}

export function putLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            authorization: config.headers.authorization,
        },
    })
    .then(res => afterReqest(res));
}

export function unputLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: config.headers.authorization,
        },
    })
    .then(res => afterReqest(res)); 
}

export function removeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: config.headers.authorization,
        },
    }); 
}

export function changeAvatar(link) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            avatar: link
        })
    })
    .then(res => afterReqest(res));
}