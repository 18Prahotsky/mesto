const setupSelector = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__input-save",
  inactiveButtonClass: "popup__input-save_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

//Валидация формы Редактировать профиль

// Добавили обработчики на все поля одной формы
const setEventListener = (formElement, item) => {
  const inputList = Array.from(
    formElement.querySelectorAll(item.inputSelector)
  );

  const buttonElement = formElement.querySelector(item.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, item);
      toggleButtonState(inputList, buttonElement, item);
    });
  });
};

//Дабавляем обработчика на все формы

const enableValidation = (item) => {
  const formList = Array.from(document.querySelectorAll(item.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListener(formElement, item);
  });
};

enableValidation(setupSelector);

function showInputError(formElement, inputElement, errorMessage, item) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(item.inputErrorClass); //"popup__input_type_error"
  errorElement.textContent = errorMessage;
  errorElement.classList.add(item.errorClass); //"popup__input-error_active"
}

function hideInputError(formElement, inputElement, item) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(item.inputErrorClass); //"popup__input_type_error"
  errorElement.textContent = "";
  errorElement.classList.remove(item.errorClass); //"popup__input-error_active"
}

function isValid(formElement, inputElement, item) {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      item
    );
  } else {
    hideInputError(formElement, inputElement, item);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, item) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(item.inactiveButtonClass); //popup__input-save_inactive
    buttonElement.setAttribute("disabled", "true");
  } else {
    buttonElement.classList.remove(item.inactiveButtonClass); //popup__input-save_inactive
    buttonElement.removeAttribute("disabled");
  }
}
