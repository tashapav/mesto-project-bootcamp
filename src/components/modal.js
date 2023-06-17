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
    .then((info) => {
        profileName.textContent = profileEditName.value;
        profileJob.textContent = profileEditJob.value;
        closePopup(popupProfile);
        setUserInfo(info);
    })
    .finally(() => popupProfileButton.textContent = "Сохранить")
    .catch((error) => {
        console.log(error);
    })
}

export function submitNewElement(event) {
    event.preventDefault();
    popupNewElementButton.textContent = "Сохранение..."
    addCard(popupNewElementTitle.value, popupNewElementLink.value)
    .then((info) => {
        addElement(info);
        popupNewElementTitle.value = "";
        popupNewElementLink.value = "";
        popupNewElementButton.classList.add('popup__button_disabled');
        popupNewElementButton.disabled = true;
        closePopup(popupNewElement);
    })
    .finally(() => popupNewElementButton.textContent = "Создать")
    .catch((error) => {
        console.log(error)
    })
}

export function submitAvatar(event) {
    event.preventDefault();
    popupNewAvatarButton.textContent = "Сохранение..."
    changeAvatar(popupNewAvatarInput.value)
    .then((info) => {
        user.avatar = info.avatar;
        avatar.src = info.avatar;
        closePopup(popupNewAvatar);
        popupNewAvatarInput.value = "";
        popupNewAvatarButton.classList.add('popup__button_disabled');
        popupNewAvatarButton.disabled = true;
    })
    .finally(() => popupNewAvatarButton.textContent = "Сохранить")
    .catch((error) => {
        console.log(error)
    })
}

export function setUserInfo(info) {
    user._id = info._id;
    user.avatar = info.avatar;
    user.name = info.name;
    user.about = info.about;
    profileEditName.value = info.name;
    profileEditJob.value = info.about;
    changeUserInfo(user);
}

function changeUserInfo(user) {
    profileName.textContent = user.name;
    profileJob.textContent = user.about;
    profileAvatar.src = user.avatar;
}