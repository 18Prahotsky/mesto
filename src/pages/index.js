import "./index.css";
import { Card } from "../components/Сard.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { initialCards } from "../components/data.js";
import { setupSelector } from "../components/data.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

const imagePopup = document.querySelector(".popup_image");
const popupProfile = document.querySelector(".popup_profile");
const popupInputName = popupProfile.querySelector(".popup__input_name");
const popupInputMetier = popupProfile.querySelector(".popup__input_metier");
const profileFormPopup = popupProfile.querySelector(".popup__form");
const profileInfoEditButton = document.querySelector(
  ".profile__info-edit-button"
);

const buttonAddPlace = document.querySelector(".profile__add-button");

const popupAddPlace = document.querySelector(".popup_place");
const placeFormPopup = popupAddPlace.querySelector(".popup__form");

const templateCard = document.querySelector("#photo-card__template").content;

//Функция для добавления фотокарточки в темплейт
function addCards(item, templateCard, handleImageClick) {
  cardList.addItem(createCard(item, templateCard, handleImageClick));
}

//Создание карточки
function createCard(item, templateCard, handleImageClick) {
  const card = new Card(item, templateCard, handleImageClick);
  const cardElement = card.createCard();
  return cardElement;
}

// Отрисовка карточек в темплейт
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      addCards(item, templateCard, handleImageClick);
    },
  },
  ".photo-cards"
);

cardList.renderItems();

// Валидация форм

const validPlaceFormPopup = new FormValidator(setupSelector, placeFormPopup);
validPlaceFormPopup.enableValidation();

const validProfileFormPopup = new FormValidator(
  setupSelector,
  profileFormPopup
);
validProfileFormPopup.enableValidation();

const userInfo = new UserInfo({
  name: ".profile__info-name",
  metier: ".profile__info-metier",
});

//Блок редактирования профиля
const popupProfileWithForm = new PopupWithForm(
  popupProfile,
  handleProfileFormSubmit
);

function openPopupProfile() {
  popupProfileWithForm.open();
}

// popup для редактирования имени пользователя

profileInfoEditButton.addEventListener("click", function () {
  validProfileFormPopup.resetValidation();
  addPopupInputAttributeValue();
  openPopupProfile();
});

function addPopupInputAttributeValue() {
  const getUserInfo = userInfo.getUserInfo();
  popupInputName.value = getUserInfo.name;
  popupInputMetier.value = getUserInfo.metier;
}

//Обработчик «отправки» формы для имени

function handleProfileFormSubmit(item) {
  userInfo.setUserInfo(item);
}

popupProfileWithForm.setEventListeners();

//Блок добавления фото

// popup для добавления карточки

const popupPlaceWithForm = new PopupWithForm(
  popupAddPlace,
  handlePlaceFormSubmit
);

buttonAddPlace.addEventListener("click", function () {
  validPlaceFormPopup.resetValidation();
  popupPlaceWithForm.open();
});

//Обработчик «отправки» формы для добавления карточки

function handlePlaceFormSubmit(item) {
  const data = { name: item["name-place-input"], link: item["image-input"] };
  addCards(data, templateCard, handleImageClick);
}

popupPlaceWithForm.setEventListeners();

//мягкое связывание imagePopup с классом Card

const popupWithImage = new PopupWithImage(imagePopup);

function handleImageClick(name, link) {
  popupWithImage.open(name, link);
}
