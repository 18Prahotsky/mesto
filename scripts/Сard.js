import { openPopup } from "./utils.js";

const imagePopup = document.querySelector(".popup_image");
const imagePopupTitle = imagePopup.querySelector(".popup__image-title");
const imagePopupCardImage = imagePopup.querySelector(".popup__card-image");

export class Card {
  constructor(data, cardSelector) {
    this.link = data.link;
    this.name = data.name;
    this._cardSelector = cardSelector;
    this._imagePopup = imagePopup;
    this._imagePopupTitle = imagePopupTitle;
    this._imagePopupCardImage = imagePopupCardImage;
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
