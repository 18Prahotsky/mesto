import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector, name, link) {
    super(popupSelector);
    this._imagePopupTitle = name;
    this._imagePopupCardImage = link;
  }

  open() {
    this._popupSelector.querySelector(".popup__card-image").src =
      this._imagePopupCardImage;
    this._popupSelector.querySelector(".popup__card-image").alt =
      this._imagePopupTitle;
    this._popupSelector.querySelector(".popup__image-title").textContent =
      this._imagePopupTitle;
    super.open();
  }
}
