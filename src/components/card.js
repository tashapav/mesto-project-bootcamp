const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
]; 

import { elements, popupPicture } from "./utils";
import { openPopup } from "./modal";

function handleLike(like) {
    like.classList.toggle('element__like_active');
}

function handleRemove(newElement) {
    newElement.remove();
}

export function addElement(element) {
    const newElement = document.getElementById('template-element').content.querySelector('.element').cloneNode(true);
    const like = newElement.querySelector('.element__like');
    const elementDelete = newElement.querySelector('.element__delete');
    const picture = newElement.querySelector('.element__picture');
    const title = newElement.querySelector('.element__title');
    title.textContent = element.name;
    picture.src = element.link;
    picture.alt = element.name;
    elements.insertBefore(newElement, elements.firstChild);

    like.addEventListener('click', () => handleLike(like));

    elementDelete.addEventListener('click', () => handleRemove(newElement));

    picture.addEventListener('click', () => openPopup(popupPicture, element));
}


export const makeCards = () => {
    for (let i = 0; i < initialCards.length; ++i) {
        addElement(initialCards[i]);
    }
}
