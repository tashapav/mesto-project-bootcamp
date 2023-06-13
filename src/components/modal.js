import { popupProfile, popupProfileName, popupProfileJob, popupPictureImage, popupPictureTitle, 
profileName, profileJob, profileEditName, profileEditJob, popupNewElementTitle, popupNewElementLink,
popupNewElement } from "./utils";
import { addElement } from "./card";


function openPopupProfile() {
    popupProfileName.value = profileName.textContent;
    popupProfileJob.value = profileJob.textContent;
}

function openPopupPicture(element = {name: "", link: ""}) {
    popupPictureImage.src = element.link;
    popupPictureImage.alt = element.name;
    popupPictureTitle.textContent = element.name;
}

export function openPopup(popup, element = {name: "", link: ""}) {
    popup.classList.add('popup_opened');
    if (popup.classList.contains('popup_profile')) {
        openPopupProfile()
    } else if (popup.classList.contains('popup_picture')) {
        openPopupPicture(element)
    }
}

export function closePopup(event, popup) {
    console.log(event.target.classList)
    if (event.target.classList[0] == 'popup' || event.target.classList[0] == 'popup__exit' ||
            (event.target.classList[0] == 'popup__button' && event.target.classList.length == 1)) {
        popup.classList.remove('popup_opened');
    }
}


export function submitProfile(event) {
    event.preventDefault();
    profileName.textContent = profileEditName.value;
    profileJob.textContent = profileEditJob.value;
    closePopup(event, popupProfile);
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
    closePopup(event, popupNewElement);
}

