const isValid = (formElement, inputElement, inputErrorClass, errorClass) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
        hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
}; 


const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}__error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}__error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};


export const enableValidation = ({
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass}) => {
    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach((formElement) => {
        const inputList = Array.from(formElement.querySelectorAll(inputSelector));

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {isValid(formElement, inputElement, inputErrorClass, errorClass)});
        })
        
        formElement.addEventListener('input', () => {hasNotInvalid(formElement, inputSelector, submitButtonSelector, inactiveButtonClass)});
    });
};

const hasNotInvalid = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass) => {
    let hasInvalid = false;
    const formButton = formElement.querySelector(submitButtonSelector);
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));

    inputList.forEach((inputElement) => {
        if (!inputElement.validity.valid) {
            hasInvalid = true;
        }
    })
    
    if (hasInvalid) {
        formButton.classList.add(inactiveButtonClass);
        formButton.disabled = true;
    } else {
        formButton.classList.remove(inactiveButtonClass);
        formButton.disabled = false;
    }
};
