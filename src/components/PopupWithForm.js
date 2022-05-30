import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupElement, handlerFormSubmit) {
    super(popupElement);
    this._handlerFormSubmit = handlerFormSubmit;
    this._inputsValue = Array.from(
      this._popupElement.querySelectorAll(".popup__input")
    );
    this._profileFormPopup = this._popupElement.querySelector(".popup__form");
  }

  _getInputValues() {
    const inputList = {};
    this._inputsValue.forEach((item) => {
      inputList[item.id] = item.value;
    });
    return inputList;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", this._submitHandler);
  }

  close() {
    super.close();
    this._profileFormPopup.reset();
  }

  _submitHandler = (e) => {
    e.preventDefault();
    this._handlerFormSubmit(this._getInputValues());
    this.close();
  };
}
