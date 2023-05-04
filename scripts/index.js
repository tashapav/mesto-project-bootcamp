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
const popupProfileName = popupProfile.querySelector('input[name="name"]');
const popupProfileJob = popupProfile.querySelector('input[name="job"]');
const profileEditName = profileEdit.querySelector('input[name="name"]');
const profileEditJob = profileEdit.querySelector('input[name="job"]');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');
const popupNewElementTitle = popupNewElement.querySelector('input[name="title"]');
const popupNewElementLink = popupNewElement.querySelector('input[name="link"]');
const popupPictureImage = popupPicture.querySelector('.popup__image');
const popupPictureTitle = popupPicture.querySelector('.popup__title');



function handleLike(like) {
    like.classList.toggle('element__like_active');
}

function handleRemove(newElement) {
    newElement.remove();
}

function openPopup(popup, element = {name: "", link: ""}) {
    if (popup.classList.contains('popup_profile')) {
        popupProfileName.value = profileName.textContent;
        popupProfileJob.value = profileJob.textContent;
        popupProfile.classList.add('popup_opened');
    } else if (popup.classList.contains('popup_picture')) {
        popupPicture.classList.add('popup_opened');
        popupPictureImage.src = element.link;
        popupPictureTitle.textContent = element.name;
    } else {
        popupNewElement.classList.add('popup_opened');
    }
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function addElement(element) {
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


function submitProfile(event) {
    event.preventDefault();
    profileName.textContent = profileEditName.value;
    profileJob.textContent = profileEditJob.value;
    closePopup(popupProfile);
}

function submitNewElement(event) {
    event.preventDefault();
    info = {
        name: popupNewElementTitle.value,
        link: popupNewElementLink.value
    }
    addElement(info);
    popupNewElementTitle.value = "";
    popupNewElementLink.value = "";
    closePopup(popupNewElement);
}


function makeCards() {
    for (let i = 0; i < initialCards.length; ++i) {
        addElement(initialCards[i]);
    }
}

makeCards();

buttonEdit.addEventListener('click', () => openPopup(popupProfile));
buttonAddElement.addEventListener('click', () => openPopup(popupNewElement));
buttonPopupProfileExit.addEventListener('click', () => closePopup(popupProfile));
buttonPopupNewElementExit.addEventListener('click', () => closePopup(popupNewElement));
buttonPopupPictureExit.addEventListener('click', () => closePopup(popupPicture));
profileEdit.addEventListener('submit', submitProfile);
formNewElement.addEventListener('submit', submitNewElement);
