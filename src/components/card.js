/*const initialCards = [
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
]; */

import { elements, popupPicture, popupRemoveCard, popupRemoveCardButton} from "./constants";
import { openPopupPicture, user, openPopup, closePopup } from "./modal";
import { putLike, unputLike, removeCard } from "./api";

function handleLike(element, id, likeNumber, like) {
    const hasLike = element.querySelector('.element__like_active');
    if (hasLike) {
        unputLike(id)
        .then((item) => {
            likeNumber.textContent = item.likes.length;
            like.classList.toggle('element__like_active');
        })
        .catch(err => console.log(err));
    } else {
        putLike(id)
        .then((item) => {
            likeNumber.textContent = item.likes.length;
            like.classList.toggle('element__like_active');
        })
        .catch(err => console.log(err));
    }
}

function handleRemove(newElement, id) {
    
        removeCard(id)
        .then(() => {
            newElement.remove();

        })
        .catch(err => console.log(err));
    
}

function createCard(element) {
    const newElement = document.getElementById('template-element').content.querySelector('.element').cloneNode(true);
    const like = newElement.querySelector('.element__like');
    const elementDelete = newElement.querySelector('.element__delete');
    const picture = newElement.querySelector('.element__picture');
    const title = newElement.querySelector('.element__title');
    const likeNumber = newElement.querySelector('.element__like-number');
    title.textContent = element.name;
    picture.src = element.link;
    picture.alt = element.name;
    likeNumber.textContent = element.likes.length;

    like.addEventListener('click', () => handleLike(newElement, element._id, likeNumber, like));

    let isLiked = element.likes.some(item => item._id == user._id);

    if (isLiked) {
        like.classList.add('element__like_active')
    }

    if (element.owner._id === user._id) {
        elementDelete.addEventListener('click', () => {
            handleRemove(newElement, element._id);
        });
    } else {
        elementDelete.disabled = true;
        elementDelete.style.display = 'none';
    }

    picture.addEventListener('click', () => openPopupPicture(popupPicture, element));

    return newElement
}


export function addElement(element) {
    const newElement = createCard(element);
    elements.insertBefore(newElement, elements.firstChild);
}


export const makeCards = (allCards) => {
    console.log(allCards)
    for (let i = 0; i < allCards.length; ++i) {
        addElement(allCards[i]);
    }
}
