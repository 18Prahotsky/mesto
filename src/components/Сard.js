export class Card {
  constructor(data, cardSelector, handleImageClick, api, { deleteFirebase }) {
    this.link = data.link;

    this.name = data.name;
    this.id = data.id;
    this._handleImageClick = handleImageClick;
    this._cardSelector = cardSelector;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".photo-card__image");
    this._cardName = this._element.querySelector(".photo-card__name");
    this._api = api;
    this.deleteFirebase = deleteFirebase;
  }

  _getTemplate() {
    const photoCardTemplate = this._cardSelector
      .querySelector(".photo-card")
      .cloneNode(true);
    return photoCardTemplate;
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
      this._handleImageClick(this.name, this.link);
    });
  }

  _handleLikeClick(e) {
    e.target.classList.toggle("photo-card__like_active");
  }

  _handleTrashButtonClick() {
    this._api
      .trashCard(this.id)
      .then(() => {
        this._element.remove();
        this._element = null;
      })
      .catch((err) => {
        console.log(err);
      });
    this.deleteFirebase(this.name);
  }

  createCard() {
    this._cardImage.id = this.id;
    this._cardImage.src = this.link;
    this._cardImage.alt = this.name;
    this._cardName.textContent = this.name;
    this._setEventListeners();
    return this._element;
  }
}
