const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
}; 


const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}__error`);
    inputElement.classList.add('form__input_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('error_active');
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}__error`);
    inputElement.classList.remove('form__input_error');
    errorElement.classList.remove('error_active');
    errorElement.textContent = '';
};


export const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.form'));

    formList.forEach((formElement) => {
        const inputList = Array.from(formElement.querySelectorAll('.popup__input'));

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {isValid(formElement, inputElement)});
        })
        
        formElement.addEventListener('input', () => {hasNotInvalid(formElement)});
    });
};

const hasNotInvalid = (formElement) => {
    let hasInvalid = false;
    const formButton = formElement.querySelector('.popup__button');
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));

    inputList.forEach((inputElement) => {
        if (!inputElement.validity.valid) {
            hasInvalid = true;
        }
    })
    
    if (hasInvalid) {
        formButton.classList.add('popup__button_disabled');
        formButton.disabled = true;
    } else {
        formButton.classList.remove('popup__button_disabled');
        formButton.disabled = false;
    }
};
