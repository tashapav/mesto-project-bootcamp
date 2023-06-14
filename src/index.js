import karachaevsk from './images/karachaevsk.png'
import elbrus from './images/elbrus.png'
import dombay from './images/dombay.png'
import avatar from './images/avatar.png'
import logo from './images/logo.svg'
import './styles/index.css';

import { popupProfile, popupNewElement, popupPicture, buttonEdit, buttonAddElement, profileEdit, formNewElement } from './components/constants.js'
import { enableValidation } from './components/validate.js'
import { makeCards } from './components/card.js'
import { openPopup, handlePopupClose, submitProfile, submitNewElement } from './components/modal.js'

buttonEdit.addEventListener('click', () => openPopup(popupProfile));
buttonAddElement.addEventListener('click', () => openPopup(popupNewElement));
profileEdit.addEventListener('submit', submitProfile);
formNewElement.addEventListener('submit', submitNewElement);
popupProfile.addEventListener('click', (event) => handlePopupClose(event, popupProfile));
popupNewElement.addEventListener('click', (event) => handlePopupClose(event, popupNewElement));
popupPicture.addEventListener('click', (event) => handlePopupClose(event, popupPicture));

makeCards();
enableValidation({
    formSelector: '.form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_error',
    errorClass: 'error_active'
}); 
