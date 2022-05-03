import { Card } from "./Сard.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards } from "./data.js";
import { setupSelector } from "./data.js";
import { openPopup } from "./utils.js";
import { closePopup } from "./utils.js";

const popupProfile = document.querySelector(".popup_profile");
const profilePopupCloseIcon = popupProfile.querySelector(".popup__close-icon");
const popupInputName = popupProfile.querySelector(".popup__input_name");
const popupInputMetier = popupProfile.querySelector(".popup__input_metier");
const profileFormPopup = popupProfile.querySelector(".popup__form");
const profileInfoName = document.querySelector(".profile__info-name");
const profileInfoMetier = document.querySelector(".profile__info-metier");

const addPlaceButton = document.querySelector(".profile__add-button");

const addPlacePopup = document.querySelector(".popup_place");
const placePopupCloseIcon = addPlacePopup.querySelector(".popup__close-icon");
const placeFormPopup = addPlacePopup.querySelector(".popup__form");
const placeNameInput = addPlacePopup.querySelector(".popup__input_name");
const placeImageInput = addPlacePopup.querySelector(".popup__input_image");

const templateCard = document.querySelector("#photo-card__template").content;
const photoCards = document.querySelector(".photo-cards");

initialCards.forEach((data) => {
  addCards(data, templateCard);
});

function addCards(data, cardSelector) {
  const card = new Card(data, cardSelector);
  const photoCardElement = card.createCard();
  photoCards.prepend(photoCardElement);
}

const valid = new FormValidator(setupSelector);
valid.enableValidation();

const profileInfoEditButton = document.querySelector(
  ".profile__info-edit-button"
);

profileInfoEditButton.addEventListener("click", function () {
  valid._setInputErrorPopup(profileFormPopup);
  addPopupInputAttributeValue();
  openPopup(popupProfile);
});

profilePopupCloseIcon.addEventListener("click", function () {
  closePopup();
});

function addPopupInputAttributeValue() {
  popupInputName.value = profileInfoName.textContent;
  popupInputMetier.value = profileInfoMetier.textContent;
}

//Обработчик «отправки» формы для имени

function handleProfileFormSubmit(e) {
  profileInfoName.textContent = popupInputName.value;
  profileInfoMetier.textContent = popupInputMetier.value;
  closePopup();
}

profileFormPopup.addEventListener("submit", handleProfileFormSubmit);

// popup для добавления фотографии

addPlaceButton.addEventListener("click", function () {
  valid._setInputErrorPopup(placeFormPopup);
  openPopup(addPlacePopup);
});

placePopupCloseIcon.addEventListener("click", function () {
  closePopup();
});

//Обработчик «отправки» формы для добавления карточки

function handlePlaceFormSubmit(evt) {
  const data = { name: placeNameInput.value, link: placeImageInput.value };
  addCards(data, templateCard);
  closePopup();
  placeFormPopup.reset();
}
placeFormPopup.addEventListener("submit", handlePlaceFormSubmit);
