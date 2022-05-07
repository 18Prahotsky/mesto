import { openPopup } from "./utils.js";

export class Card {
  constructor(data, cardSelector) {
    this.link = data.link;
    this.name = data.name;
    this._cardSelector = cardSelector;
    this._imagePopup = document.querySelector(".popup_image");
    this._imagePopupTitle = this._imagePopup.querySelector(
      ".popup__image-title"
    );
    this._imagePopupCardImage =
      this._imagePopup.querySelector(".popup__card-image");
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".photo-card__image");
    this._cardName = this._element.querySelector(".photo-card__name");
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
    this._cardImage.addEventListener("click", () => {
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
    this._renderImagePopup(this.name, this.link);
    openPopup(this._imagePopup);
  }
  _renderImagePopup(name, link) {
    this._imagePopupTitle.textContent = name;
    this._imagePopupCardImage.src = link;
    this._imagePopupCardImage.alt = name;
  }

  createCard() {
    this._cardImage.src = this.link;
    this._cardImage.alt = this.name;
    this._cardName.textContent = this.name;
    this._setEventListeners();
    return this._element;
  }
}
