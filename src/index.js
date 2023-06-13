import karachaevsk from './images/karachaevsk.png'
import elbrus from './images/elbrus.png'
import dombay from './images/dombay.png'
import avatar from './images/avatar.png'
import logo from './images/logo.svg'
import './styles/index.css';

import { popupProfile, popupNewElement, popupPicture, buttonEdit, buttonAddElement, profileEdit, formNewElement } from './components/utils.js'
import { enableValidation } from './components/validate.js'
import { makeCards } from './components/card.js'
import { openPopup, closePopup, submitProfile, submitNewElement } from './components/modal.js'

document.addEventListener('keydown', (event) => {
    if (event.code == "Escape") {
        popupProfile.classList.remove('popup_opened');
        popupNewElement.classList.remove('popup_opened');
        popupPicture.classList.remove('popup_opened');
    }});
buttonEdit.addEventListener('click', () => openPopup(popupProfile));
buttonAddElement.addEventListener('click', () => openPopup(popupNewElement));
profileEdit.addEventListener('submit', submitProfile);
formNewElement.addEventListener('submit', submitNewElement);
popupProfile.addEventListener('click', (event) => closePopup(event, popupProfile));
popupNewElement.addEventListener('click', (event) => closePopup(event, popupNewElement));
popupPicture.addEventListener('click', (event) => closePopup(event, popupPicture));

makeCards();
enableValidation();