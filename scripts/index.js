import { Card } from "./Сard.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards } from "./data.js";
import { setupSelector } from "./data.js";
import { openPopup } from "./utils.js";
import { closePopup } from "./utils.js";

const popupProfile = document.querySelector(".popup_profile");

const popupInputName = popupProfile.querySelector(".popup__input_name");
const popupInputMetier = popupProfile.querySelector(".popup__input_metier");
const profileFormPopup = popupProfile.querySelector(".popup__form");
const profileInfoName = document.querySelector(".profile__info-name");
const profileInfoMetier = document.querySelector(".profile__info-metier");
const profileInfoEditButton = document.querySelector(
  ".profile__info-edit-button"
);

const addPlaceButton = document.querySelector(".profile__add-button");

const addPlacePopup = document.querySelector(".popup_place");

const placeFormPopup = addPlacePopup.querySelector(".popup__form");
const placeNameInput = addPlacePopup.querySelector(".popup__input_name");
const placeImageInput = addPlacePopup.querySelector(".popup__input_image");

const templateCard = document.querySelector("#photo-card__template").content;
const photoCards = document.querySelector(".photo-cards");

// Рендер карточек из массива в темплейт

initialCards.forEach((data) => {
  addCards(data, templateCard);
});

//Функция для добавления карточки в темплейт

function addCards(item, cardSelector) {
  const photoCardElement = createCard(item, cardSelector);
  photoCards.prepend(photoCardElement);
}

//Функция для создания новой карточки

function createCard(item, cardSelector) {
  const card = new Card(item, cardSelector);
  const photoCardElement = card.createCard();
  return photoCardElement;
}

// Валидация форм

const validPlaceFormPopup = new FormValidator(setupSelector, placeFormPopup);
validPlaceFormPopup.enableValidation();

const validprofileFormPopup = new FormValidator(
  setupSelector,
  profileFormPopup
);
validprofileFormPopup.enableValidation();

// popup для редактирования имени пользователя

profileInfoEditButton.addEventListener("click", function () {
  validprofileFormPopup.resetValidation();
  addPopupInputAttributeValue();
  openPopup(popupProfile);
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

// popup для добавления карточки

addPlaceButton.addEventListener("click", function () {
  validPlaceFormPopup.resetValidation();
  openPopup(addPlacePopup);
});

//Обработчик «отправки» формы для добавления карточки

function handlePlaceFormSubmit(evt) {
  const data = { name: placeNameInput.value, link: placeImageInput.value };
  addCards(data, templateCard);
  closePopup();
  placeFormPopup.reset();
}

placeFormPopup.addEventListener("submit", handlePlaceFormSubmit);
