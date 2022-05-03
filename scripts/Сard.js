import { openPopup } from "./utils.js";
import { closePopup } from "./utils.js";

export class Card {
  constructor(data, cardSelector) {
    this.link = data.link;
    this.name = data.name;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const photoCardItem = this._cardSelector
      .querySelector(".photo-card")
      .cloneNode(true);
    return photoCardItem;
  }

  _setEventListeners() {
    this._element
      .querySelector(".photo-card__trash-button")
      .addEventListener("click", () => {
        this._handleTrashButtonClick();
      });
    this._element
      .querySelector(".photo-card__like")
      .addEventListener("click", (e) => {
        this._handleLikeClick(e);
      });
    this._element
      .querySelector(".photo-card__image")
      .addEventListener("click", () => {
        this._handleImageClick();
      });
  }

  _handleLikeClick(e) {
    e.target.classList.toggle("photo-card__like_active");
  }

  _handleTrashButtonClick() {
    this._element.closest(".photo-card").remove();
  }
  _handleImageClick() {
    this._imagePopup = document.querySelector(".popup_image");
    this._renderImagePopup(this.name, this.link);
    openPopup(this._imagePopup);
  }
  _renderImagePopup(name, link) {
    this._imagePopup.querySelector(".popup__image-title").textContent = name;
    this._imagePopup.querySelector(".popup__card-image").src = link;
    this._imagePopup.querySelector(".popup__card-image").alt = name;
    this._imagePopup
      .querySelector(".popup__close-icon")
      .addEventListener("click", () => {
        closePopup();
      });
  }

  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".photo-card__image").src = this.link;
    this._element.querySelector(".photo-card__image").alt = this.name;
    this._element.querySelector(".photo-card__name").textContent = this.name;
    return this._element;
  }
}
