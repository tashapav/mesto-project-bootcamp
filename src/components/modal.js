import { popupProfile, profileName, profileJob, profileEditName, profileEditJob, avatar,
    popupNewElementTitle, popupNewElementLink, popupNewElement, popupPictureImage, popupPictureTitle, profileAvatar, popupNewAvatarInput, popupNewAvatar, popupNewAvatarButton, popupProfileButton, popupNewElementButton } from "./constants";
import { addElement } from "./card";
import { updateUserInfo, addCard, changeAvatar } from "./api";

export let user = {
    "name": "Someone",
    "about": "Something",
    "avatar": "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
    "_id": "e20537ed11237f86bbb20ccb",
    "cohort": "cohort0"
}

export function closeByEsc(event) {
    if (event.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
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

export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
}

export function submitProfile(event) {
    event.preventDefault();
    popupProfileButton.textContent = "Сохранение..."
    updateUserInfo(profileEditName.value, profileEditJob.value)
    .then(() => {
        profileName.textContent = profileEditName.value;
        profileJob.textContent = profileEditJob.value;
        popupProfileButton.textContent = "Сохранить"
        closePopup(popupProfile);
    })
    .catch((error) => {
        console.log(error);
        popupProfileButton.textContent = "Сохранить"
    })
}

export function submitNewElement(event) {
    event.preventDefault();
    popupNewElementButton.textContent = "Сохранение..."
    addCard(popupNewElementTitle.value, popupNewElementLink.value)
    .then((info) => {
        addElement(info);
        popupNewElementButton.textContent = "Сохранить"
        popupNewElementTitle.value = "";
        popupNewElementLink.value = "";
        const formButton = popupNewElement.querySelector('.popup__button');
        formButton.classList.add('popup__button_disabled');
        formButton.disabled = true;
        closePopup(popupNewElement);
    })
    .catch((error) => {
        console.log(error)
        popupNewElementButton.textContent = "Сохранить"
    })
}

export function submitAvatar(event) {
    event.preventDefault();
    popupNewAvatarButton.textContent = "Сохранение..."
    changeAvatar(popupNewAvatarInput.value)
    .then((info) => {
        popupNewAvatarButton.textContent = "Сохранить"
        user.avatar = info.avatar;
        avatar.src = info.avatar;
        closePopup(popupNewAvatar);
        popupNewAvatarInput.value = "";
    })
    .catch((error) => {
        console.log(error)
        popupNewAvatarButton.textContent = "Сохранить"
    })
}

export function setUserInfo(info) {
    user._id = info._id;
    user.avatar = info.avatar;
    user.name = info.name;
    user.about = info.about;
    changeUserInfo(user);
}

function changeUserInfo(user) {
    profileName.textContent = user.name;
    profileJob.textContent = user.about;
    profileAvatar.src = user.avatar;
}