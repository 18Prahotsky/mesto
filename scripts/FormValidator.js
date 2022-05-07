export class FormValidator {
  constructor(setupSelector, formElement) {
    this.formSelector = setupSelector.formSelector;
    this.inputSelector = setupSelector.inputSelector;
    this.submitButtonSelector = setupSelector.submitButtonSelector;
    this.inactiveButtonClass = setupSelector.inactiveButtonClass;
    this.inputErrorClass = setupSelector.inputErrorClass;
    this.errorClass = setupSelector.errorClass;
    this._formElement = formElement;
  }

  _setEventListener = () => {
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._submitButton = this._formElement.querySelector(
      this.submitButtonSelector
    );
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this.inputSelector)
    );
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  };

  enableValidation = () => {
    this._setEventListener();
    this._setInputErrorPopup();
  };

  _showInputError(inputElement, errorMessage) {
    this._errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this.inputErrorClass);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this.errorClass);
  }

  _hideInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this.inputErrorClass);
    this._errorElement.textContent = "";
    this._errorElement.classList.remove(this.errorClass);
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this.inactiveButtonClass);
      this._submitButton.setAttribute("disabled", "true");
    } else {
      this._submitButton.classList.remove(this.inactiveButtonClass);
      this._submitButton.removeAttribute("disabled");
    }
  }

  _setInputErrorPopup() {
    this._formElement.reset();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  }
}
