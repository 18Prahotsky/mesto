import "./index.css";
import { Card } from "../components/Сard.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { setupSelector } from "../components/data.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { config } from "../components/data.js";
import { FirebaseStorage } from "../components/FirebaseStorage.js";
import { firebaseConfig } from "../components/data.js";

const imagePopup = document.querySelector(".popup_image");
const popupProfile = document.querySelector(".popup_profile");
const popupInputName = popupProfile.querySelector(".popup__input_name");
const popupInputMetier = popupProfile.querySelector(".popup__input_metier");
const profileFormPopup = popupProfile.querySelector(".popup__form");
const profileInfoEditButton = document.querySelector(
  ".profile__info-edit-button"
);

const buttonAddPhoto = document.querySelector(".profile__add-photo");
const popupAddPhoto = document.querySelector(".popup_photo");
const photoFormPopup = popupAddPhoto.querySelector(".popup__form");

const templateCard = document.querySelector("#photo-card__template").content;

//Функция для добавления фотокарточки в темплейт
function addCards(item, templateCard, handleImageClick) {
  const card = createCard(item, templateCard, handleImageClick, api);
  section().addItem(card);
}

//Создание карточки
function createCard(item, templateCard, handleImageClick, api) {
  const card = new Card(item, templateCard, handleImageClick, api, {
    deleteFirebase: (name) => {
      deletePhotoFromFirebaseStorage(name);
    },
  });
  const cardElement = card.createCard();
  return cardElement;
}

// Отрисовка карточек в темплейт

const api = new Api(config);
const cards = api.getAllCards();
cards
  .then((data) => {
    section(data).renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

//Функция для создания секуии карточек
function section(data) {
  const cardList = new Section(
    {
      items: data,
      renderer: (item) => {
        addCards(item, templateCard, handleImageClick);
      },
    },
    ".photo-cards"
  );
  return cardList;
}

// Валидация форм

const validPhotoFormPopup = new FormValidator(setupSelector, photoFormPopup);
validPhotoFormPopup.enableValidation();

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

//popup для добавления фотографии
const popupPhotoWithForm = new PopupWithForm(
  popupAddPhoto,
  handlePhotoFormSubmit // нет функции
);

buttonAddPhoto.addEventListener("click", function () {
  validPhotoFormPopup.resetValidation();
  popupPhotoWithForm.open();
});

//мягкое связывание imagePopup с классом Card

const popupWithImage = new PopupWithImage(imagePopup);

function handleImageClick(name, link) {
  popupWithImage.open(name, link);
}

function handlePhotoFormSubmit(item) {
  uploadFile(item);
}

popupPhotoWithForm.setEventListeners();

function uploadFile(item) {
  const selectedFile = document.getElementById("photo-input").files[0];
  const name = item["name-photo-input"];
  const firebaseStorage = new FirebaseStorage(
    firebaseConfig,
    name,
    selectedFile,
    api,
    {
      renderer: (data) => {
        addPhotoToSection(data);
      },
    }
  );
  firebaseStorage.uploadToFirebaseStorage();
}

//Функция для удаления фото из firebasestorage
function deletePhotoFromFirebaseStorage(name) {
  const firebaseStorage = new FirebaseStorage(firebaseConfig, name, {}, {}, {});
  firebaseStorage.deletePhoto();
}

//Функция для добаления фото и отрисовки на секции
function addPhotoToSection(data) {
  api
    .addCards(data)
    .then((data) => {
      addCards(data, templateCard, handleImageClick);
    })
    .catch((err) => {
      console.log(err);
    });
}
