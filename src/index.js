import karachaevsk from './images/karachaevsk.png'
import elbrus from './images/elbrus.png'
import dombay from './images/dombay.png'
import ava from './images/avatar.png'
import logo from './images/logo.svg'
import './styles/index.css';

import { popupProfile, popupNewElement, popupPicture, buttonEdit, buttonAddElement, profileEdit, formNewElement, popupNewAvatar, avatar, popupNewAvatarButton, popupRemoveCard } from './components/constants.js'
import { enableValidation } from './components/validate.js'
import { makeCards } from './components/card.js'
import { openPopup, handlePopupClose, submitProfile, submitNewElement, setUserInfo, submitAvatar } from './components/modal.js'
import { getAllCards, getUserInfo } from './components/api'

buttonEdit.addEventListener('click', () => openPopup(popupProfile));
buttonAddElement.addEventListener('click', () => openPopup(popupNewElement));
profileEdit.addEventListener('submit', submitProfile);
formNewElement.addEventListener('submit', submitNewElement);
popupProfile.addEventListener('click', (event) => handlePopupClose(event, popupProfile));
popupNewElement.addEventListener('click', (event) => handlePopupClose(event, popupNewElement));
popupPicture.addEventListener('click', (event) => handlePopupClose(event, popupPicture));
popupNewAvatar.addEventListener('click', (event) => handlePopupClose(event, popupNewAvatar));
/*popupRemoveCard.addEventListener('click', (event) => handlePopupClose(event, popupRemoveCard));*/
avatar.addEventListener('click', () => openPopup(popupNewAvatar));
popupNewAvatarButton.addEventListener('click', submitAvatar);



enableValidation({
    formSelector: '.form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_error',
    errorClass: 'error_active'
}); 

const promises = [getUserInfo(), getAllCards()]

Promise.all(promises)
.then(([userInfo, allCards]) => {
    setUserInfo(userInfo);
    makeCards(allCards);
}); 
