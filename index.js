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


const buttonEdit = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const elements = document.querySelector('.elements');
const popupProfile = document.querySelector('.popup_profile');
const buttonPopupProfileExit = popupProfile.querySelector('.popup__exit');
const popupNewElement = document.querySelector('.popup_new-element');
const buttonPopupNewElementExit = popupNewElement.querySelector('.popup__exit');
const profile = document.querySelector('.profile');
const buttonAddElement = profile.querySelector('.profile__add-button');
const popupPicture = document.querySelector('.popup_picture');
const buttonPopupPictureExit = popupPicture.querySelector('.popup__exit');
const profileEdit = popupProfile.querySelector('form[name="edit-info"]');
const formNewElement = popupNewElement.querySelector('form[name="add-new-element"]');

function onLike(like) {
    if (like.classList.contains('element__like_active')) {
        like.classList.remove('element__like_active');
    } else {
        like.classList.add('element__like_active');
    }
}

function onRemove(newElement) {
    newElement.remove();
}

function openPopupPicture(element) {
    popupPicture.classList.add('popup_opened');
    popupPicture.querySelector('.popup__image').src = element.link;
    popupPicture.querySelector('.popup__title').textContent = element.name;
}

function openPopupProfile() {
    popupProfile.querySelector('input[name="name"]').value = profile.querySelector('.profile__name').textContent;
    popupProfile.querySelector('input[name="job"]').value = profile.querySelector('.profile__job').textContent;
    popupProfile.classList.add('popup_opened');
}

function openPopupNewElement() {
    popupNewElement.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function addElement(element) {
    let newElement = document.getElementById('template-element').content.querySelector('.element').cloneNode(true);
    let like = newElement.querySelector('.element__like');
    let elementDelete = newElement.querySelector('.element__delete');
    let picture = newElement.querySelector('.element__picture');
    newElement.querySelector('.element__title').textContent = element.name;
    newElement.querySelector('.element__picture').src = element.link;
    elements.insertBefore(newElement, elements.firstChild);

    like.addEventListener('click', () => onLike(like));

    elementDelete.addEventListener('click', () => onRemove(newElement));

    picture.addEventListener('click', () => openPopupPicture(element));
}


function submitProfile(event) {
    event.preventDefault();
    profile.querySelector('.profile__name').textContent = profileEdit.querySelector('input[name="name"]').value;
    profile.querySelector('.profile__job').textContent = profileEdit.querySelector('input[name="job"]').value;
    closePopup(popupProfile);
}

function submitNewElement(event) {
    event.preventDefault();
    info = {
        name: popupNewElement.querySelector('input[name="title"]').value,
        link: popupNewElement.querySelector('input[name="link"]').value
    }
    addElement(info);
    popupNewElement.querySelector('input[name="title"]').value = "";
    popupNewElement.querySelector('input[name="link"]').value = "";
    closePopup(popupNewElement);
}


function makeCards() {
    for (let i = 0; i < initialCards.length; ++i) {
        addElement(initialCards[i]);
    }
}

makeCards();

buttonEdit.addEventListener('click', openPopupProfile);
buttonAddElement.addEventListener('click', openPopupNewElement);
buttonPopupProfileExit.addEventListener('click', () => closePopup(popupProfile));
buttonPopupNewElementExit.addEventListener('click', () => closePopup(popupNewElement));
buttonPopupPictureExit.addEventListener('click', () => closePopup(popupPicture));
profileEdit.addEventListener('submit', submitProfile);
formNewElement.addEventListener('submit', submitNewElement);
