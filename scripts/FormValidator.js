export class FormValidator {
  constructor(setupSelector) {
    this.formSelector = setupSelector.formSelector;
    this.inputSelector = setupSelector.inputSelector;
    this.submitButtonSelector = setupSelector.submitButtonSelector;
    this.inactiveButtonClass = setupSelector.inactiveButtonClass;
    this.inputErrorClass = setupSelector.inputErrorClass;
    this.errorClass = setupSelector.errorClass;
  }

  _setEventListener = (formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(this.inputSelector)
    );
    const buttonElement = formElement.querySelector(this.submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };
  
  enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(this.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", (e) => {
        e.preventDefault();
      });
      this._setEventListener(formElement);
    });
  };

  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.errorClass);
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this.errorClass);
  }

  _isValid(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this.inactiveButtonClass);
      buttonElement.setAttribute("disabled", "true");
    } else {
      buttonElement.classList.remove(this.inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  }
  _setInputErrorPopup(formElement) {
    formElement.reset();
    const inputList = Array.from(
      formElement.querySelectorAll(this.inputSelector)
    );
    const buttonElement = formElement.querySelector(this.submitButtonSelector);
    inputList.forEach((inputElement) => {
      this._hideInputError(formElement, inputElement);
      this._toggleButtonState(inputList, buttonElement);
    });
  }
}
