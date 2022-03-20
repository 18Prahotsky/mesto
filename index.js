const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const profileInfoEditButton = document.querySelector(
  ".profile__info-edit-button"
);
const popup = document.querySelector(".popup");
const popupProfile = document.querySelector(".popup_profile");
const profilePopupCloseIcon = popupProfile.querySelector(".popup__close-icon");
const popupInputName = popupProfile.querySelector(".popup__input_name");
const popupInputMetier = popupProfile.querySelector(".popup__input_metier");
const profileInfoName = document.querySelector(".profile__info-name");
const profileInfoMetier = document.querySelector(".profile__info-metier");
const popupFormProfile = popupProfile.querySelector(".popup__form");
const profileFormPopup = popupProfile.querySelector(".popup__form");

profileInfoEditButton.addEventListener("click", function () {
  addPopupInputAttributeValue();
  openPopup(popupProfile);
});
profilePopupCloseIcon.addEventListener("click", function () {
  closePopup(popupProfile);
});

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.body.style.overflow = "hidden";
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.body.style.overflow = "";
}

function addPopupInputAttributeValue() {
  popupInputName.setAttribute("value", profileInfoName.textContent);
  popupInputMetier.setAttribute("value", profileInfoMetier.textContent);
}

function profileFormSubmit(e) {
  e.preventDefault();
  profileInfoName.textContent = popupInputName.value;
  profileInfoMetier.textContent = popupInputMetier.value;
  closePopup(popupProfile);
}

popupFormProfile.addEventListener("submit", profileFormSubmit);

// popup для добавления фотографии

const addPlaceButton = document.querySelector(".profile__add-button");
const addPlacePopup = document.querySelector(".popup_place");
const placePopupCloseIcon = addPlacePopup.querySelector(".popup__close-icon");

addPlaceButton.addEventListener("click", function () {
  openPopup(addPlacePopup);
});

placePopupCloseIcon.addEventListener("click", function () {
  closePopup(addPlacePopup);
});

//Добавление фото

let placeFormPopup = addPlacePopup.querySelector(".popup__form");
let placeNameInput = addPlacePopup.querySelector(".popup__input_name");
let placeImageInput = addPlacePopup.querySelector(".popup__input_image");

const photoCards = document.querySelector(".photo-cards");

//Рендер карточек из массива

function renderCards(array) {
  array.forEach(function (item) {
    renderCard(item.link, item.name);
  });
}

renderCards(initialCards);

function createCard(link, name) {
  const templateCard = document.querySelector("#photo-card__template").content;
  const photoCardItem = templateCard
    .querySelector(".photo-card")
    .cloneNode(true);
  photoCardItem.querySelector(".photo-card__image").src = link;
  photoCardItem.querySelector(".photo-card__name").textContent = name;
  photoCardItem.querySelector(".photo-card__image").alt = name;
  return photoCardItem;
}

function renderCard(link, name) {
  const photoCardElement = createCard(link, name);
  photoCards.prepend(photoCardElement);
}

//Обработчик «отправки» формы для добавления карточки

function formSubmitPlace(evt) {
  evt.preventDefault();
  const name = placeNameInput.value;
  const link = placeImageInput.value;
  renderCard(link, name);
  closePopup(addPlacePopup);
}
placeFormPopup.addEventListener("submit", formSubmitPlace);

//Удаление фото

photoCards.addEventListener("click", function (event) {
  if (event.target.className !== "photo-card__trash-button") return;
  event.target.closest(".photo-card").remove();
});

//блок переключение значка Like

photoCards.addEventListener("click", function (event) {
  const isLikeButton = event.target.classList.contains("photo-card__like");
  if (isLikeButton) {
    event.target.classList.toggle("photo-card__like_active");
  }
});

//Открытие попапа просмотра картинки

const imagePopup = document.querySelector(".popup_image");
const imageTitlePopup = imagePopup.querySelector(".popup__image-title");
const imageCardPopup = imagePopup.querySelector(".popup__card-image");

photoCards.addEventListener("click", function (event) {
  if (event.target.className !== "photo-card__image") return;
  const photoCardName = event.target
    .closest(".photo-card")
    .querySelector(".photo-card__title")
    .querySelector(".photo-card__name").textContent;
  const photoCardImageLink = event.target
    .closest(".photo-card")
    .querySelector(".photo-card__image-square")
    .querySelector(".photo-card__image").src;
  const photoCardImageAlt = event.target
    .closest(".photo-card")
    .querySelector(".photo-card__image-square")
    .querySelector(".photo-card__image").alt;
  renderImagePopup(photoCardName, photoCardImageLink, photoCardImageAlt);
  openPopup(imagePopup);
});

// Рендер исходных данных для popup

function renderImagePopup(name, link, alt) {
  imageCardPopup.src = link;
  imageTitlePopup.textContent = name;
  imageCardPopup.alt = alt;
}

//Закрытие попапа просмотра картинки

imagePopup
  .querySelector(".popup__close-icon")
  .addEventListener("click", function () {
    closePopup(imagePopup);
  });
