import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handlerFormSubmit) {
    super(popupSelector);
    this._handlerFormSubmit = handlerFormSubmit;
  }

  _getInputValues() {
    const inputList = {};
    this._inputsValue = Array.from(
      this._popupSelector.querySelectorAll(".popup__input")
    );
    this._inputsValue.forEach((item) => {
      inputList[item.id] = item.value;
    });
    return inputList;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener("submit", this._submitHandler);
  }

  close() {
    super.close();
    this._popupSelector.reset();
  }

  _submitHandler = (e) => {
    e.preventDefault();
    this._handlerFormSubmit(this._getInputValues());
    this.close();
  };
}
