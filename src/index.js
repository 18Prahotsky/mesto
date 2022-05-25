import './pages/index.css';
import { Card } from "./scripts/Сard.js";
import { FormValidator } from "./scripts/FormValidator.js";
import { Section } from "./scripts/Section.js";
import { initialCards } from "./scripts/data.js";
import { setupSelector } from "./scripts/data.js";
import { Popup } from "./scripts/Popup.js";
import { PopupWithImage } from "./scripts/PopupWithImage.js";
import { PopupWithForm } from "./scripts/PopupWithForm.js";
import { UserInfo } from "./scripts/UserInfo.js";

const imagePopup = document.querySelector(".popup_image");
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

const templateCard = document.querySelector("#photo-card__template").content;

//Функция для добавления фотокарточки в темплейт
function addCards(item, templateCard, handleImageClick) {
  const card = new Card(item, templateCard, handleImageClick);
  const cardElement = card.createCard();
  cardList.addItem(cardElement);
}

// Отрисовка карточек в темплейт
const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      cardItem.forEach((item) => {
        addCards(item, templateCard, handleImageClick);
      });
    },
  },
  ".photo-cards"
);

cardList.renderItems();

function openPopup(item) {
  new Popup(item).open();
}

// Валидация форм

const validPlaceFormPopup = new FormValidator(setupSelector, placeFormPopup);
validPlaceFormPopup.enableValidation();

const validProfileFormPopup = new FormValidator(
  setupSelector,
  profileFormPopup
);
validProfileFormPopup.enableValidation();

const userInfo = new UserInfo({
  name: profileInfoName,
  metier: profileInfoMetier,
});

// popup для редактирования имени пользователя

profileInfoEditButton.addEventListener("click", function () {
  validProfileFormPopup.resetValidation();
  addPopupInputAttributeValue();
  openPopup(popupProfile);
});

console.log(userInfo.getUserInfo());


function addPopupInputAttributeValue() {
  const getUserInfo = userInfo.getUserInfo();
  popupInputName.value = getUserInfo.name;
  popupInputMetier.value = getUserInfo.metier;
}
console.log(popupInputName);

//Обработчик «отправки» формы для имени

function handleProfileFormSubmit(item) {
  userInfo.setUserInfo(item);
}

new PopupWithForm(
  profileFormPopup,
  handleProfileFormSubmit
).setEventListeners();

// popup для добавления карточки

addPlaceButton.addEventListener("click", function () {
  validPlaceFormPopup.resetValidation();
  openPopup(addPlacePopup);
});

//Обработчик «отправки» формы для добавления карточки

function handlePlaceFormSubmit(item) {
  const data = { name: item["name-place-input"], link: item["image-input"] };
  addCards(data, templateCard, handleImageClick);
}

new PopupWithForm(placeFormPopup, handlePlaceFormSubmit).setEventListeners();

//мягкое связывание imagePopup с классом Card

function handleImageClick(name, link) {
  new PopupWithImage(imagePopup, name, link).open();
}