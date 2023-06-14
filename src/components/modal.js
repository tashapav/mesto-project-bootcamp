import { popupProfile, profileName, profileJob, profileEditName, profileEditJob, 
    popupNewElementTitle, popupNewElementLink, popupNewElement, popupPictureImage, popupPictureTitle } from "./constants";
import { addElement } from "./card";

export function closeByEsc(event) {
    if (event.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened') ;
        openedPopup.classList.remove('popup_opened');
    }
}

export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc);
}

export function openPopupPicture(popup, element = {name: "", link: ""}) {
    openPopup(popup);
    popupPictureImage.src = element.link;
    popupPictureImage.alt = element.name;
    popupPictureTitle.textContent = element.name;
}

export function handlePopupClose(event, popup) {
    if (event.target.classList[0] == 'popup' || event.target.classList[0] == 'popup__exit' ||
            (event.target.classList[0] == 'popup__button' && event.target.classList.length == 1)) {
        closePopup(popup)
    }
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
}

export function submitProfile(event) {
    event.preventDefault();
    profileName.textContent = profileEditName.value;
    profileJob.textContent = profileEditJob.value;
    closePopup(popupProfile);
}

export function submitNewElement(event) {
    event.preventDefault();
    const info = {
        name: popupNewElementTitle.value,
        link: popupNewElementLink.value
    }
    addElement(info);
    popupNewElementTitle.value = "";
    popupNewElementLink.value = "";
    const formButton = popupNewElement.querySelector('.popup__button');
    formButton.classList.add('popup__button_disabled');
    formButton.disabled = true;
    closePopup(popupNewElement);
}

