import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._popupElementImage =
      this._popupElement.querySelector(".popup__card-image");
    this._popupElementTitle = this._popupElement.querySelector(
      ".popup__image-title"
    );
  }

  open(name, link) {
    super.setEventListeners();
    this._popupElementImage.src = link;
    this._popupElementImage.alt = name;
    this._popupElementTitle.textContent = name;
    super.open();
  }
}
