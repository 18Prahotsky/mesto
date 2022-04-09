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

const popupProfile = document.querySelector(".popup_profile");
const profilePopupCloseIcon = popupProfile.querySelector(".popup__close-icon");
const popupInputName = popupProfile.querySelector(".popup__input_name");
const popupInputMetier = popupProfile.querySelector(".popup__input_metier");
const profileFormPopup = popupProfile.querySelector(".popup__form");
const profileInfoName = document.querySelector(".profile__info-name");
const profileInfoMetier = document.querySelector(".profile__info-metier");

const imagePopup = document.querySelector(".popup_image");
const imageTitlePopup = imagePopup.querySelector(".popup__image-title");
const imageCardPopup = imagePopup.querySelector(".popup__card-image");

const addPlaceButton = document.querySelector(".profile__add-button");

const addPlacePopup = document.querySelector(".popup_place");
const placePopupCloseIcon = addPlacePopup.querySelector(".popup__close-icon");
const placeFormPopup = addPlacePopup.querySelector(".popup__form");
const placeNameInput = addPlacePopup.querySelector(".popup__input_name");
const placeImageInput = addPlacePopup.querySelector(".popup__input_image");

const photoCards = document.querySelector(".photo-cards");

const templateCard = document.querySelector("#photo-card__template").content;

profileInfoEditButton.addEventListener("click", function () {
  setInputErrorPopup(profileFormPopup, setupSelector);
  addPopupInputAttributeValue();
  openPopup(popupProfile);
});

//Функция для настройки попапа при открытии (инпуты сброшены, ошибки отсутствуют)
function setInputErrorPopup(formElement, item) {
  formElement.reset();
  const inputList = Array.from(
    formElement.querySelectorAll(item.inputSelector)
  ); //".popup__input"
  const buttonElement = formElement.querySelector(item.submitButtonSelector); //".popup__input-save"
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, item);
    toggleButtonState(inputList, buttonElement, item);
  });
}

profilePopupCloseIcon.addEventListener("click", function () {
  closePopup();
});

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
}

function closePopup() {
  const popup = document.querySelector(".popup_opened");
  if (popup) {
    popup.classList.remove("popup_opened");
  }
  document.removeEventListener("keydown", closeByEsc);
}

function addPopupInputAttributeValue() {
  popupInputName.value = profileInfoName.textContent;
  popupInputMetier.value = profileInfoMetier.textContent;
}

function handleProfileFormSubmit(e) {
  profileInfoName.textContent = popupInputName.value;
  profileInfoMetier.textContent = popupInputMetier.value;
  closePopup();
}

profileFormPopup.addEventListener("submit", handleProfileFormSubmit);

// popup для добавления фотографии

addPlaceButton.addEventListener("click", function () {
  setInputErrorPopup(placeFormPopup, setupSelector);
  openPopup(addPlacePopup);
});

placePopupCloseIcon.addEventListener("click", function () {
  closePopup(); //addPlacePopup
});

//Рендер карточек из массива

function renderCards(array) {
  array.forEach(function (item) {
    renderCard(item.link, item.name, templateCard);
  });
}

renderCards(initialCards);

// Рендер исходных данных для popup картинки

function renderImagePopup(name, link) {
  imageCardPopup.src = link;
  imageTitlePopup.textContent = name;
  imageCardPopup.alt = name;
}

//Функция для события лайк

function handleLikeClick(e) {
  e.target.classList.toggle("photo-card__like_active");
}

//Функция для события по нажатию на картинку

function handleImageClick(e) {
  const photoCardName = e.target.alt;
  const photoCardImageLink = e.target.src;
  renderImagePopup(photoCardName, photoCardImageLink);
  openPopup(imagePopup);
}

//Функция для события по нажатию на кнопку удалить

function handleTrashButtonClick(e) {
  e.target.closest(".photo-card").remove();
}

//Функция для создания карточки

function createCard(link, name, template) {
  const photoCardItem = template.querySelector(".photo-card").cloneNode(true);
  const photoCardItemImage = photoCardItem.querySelector(".photo-card__image");
  const photoCardItemName = photoCardItem.querySelector(".photo-card__name");
  const photoCardItemLike = photoCardItem.querySelector(".photo-card__like");
  const photoCardTrashButton = photoCardItem.querySelector(
    ".photo-card__trash-button"
  );

  photoCardItemImage.addEventListener("click", handleImageClick);
  photoCardItemLike.addEventListener("click", handleLikeClick);
  photoCardTrashButton.addEventListener("click", handleTrashButtonClick);

  photoCardItemImage.src = link;
  photoCardItemImage.alt = name;
  photoCardItemName.textContent = name;
  return photoCardItem;
}

//Функция добавления созданной карточки в начало сетки

function renderCard(link, name, template) {
  const photoCardElement = createCard(link, name, template);
  photoCards.prepend(photoCardElement);
}

//Обработчик «отправки» формы для добавления карточки

function handlePlaceFormSubmit(evt) {
  const name = placeNameInput.value;
  const link = placeImageInput.value;
  renderCard(link, name, templateCard);
  closePopup(); //addPlacePopup
  placeFormPopup.reset();
}
placeFormPopup.addEventListener("submit", handlePlaceFormSubmit);

//Закрытие попапа просмотра картинки

imagePopup
  .querySelector(".popup__close-icon")
  .addEventListener("click", function () {
    closePopup(); //imagePopup
  });

//закрытие попапов кликом на оверлэй

function checkOverlayClick(e) {
  return e.target.classList.contains("popup_opened");
}

function onOverlayClick(e) {
  if (checkOverlayClick(e)) {
    closePopup();
  }
}

document.addEventListener("click", onOverlayClick);

//Закрытие попапов по esc

function closeByEsc(e) {
  if (e.key === "Escape") {
    closePopup();
  }
}
