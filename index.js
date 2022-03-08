let initialCards = [
  {
    id: 1,
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    isLiked: false,
  },
  {
    id: 2,
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    isLiked: false,
  },
  {
    id: 3,
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    isLiked: false,
  },
  {
    id: 4,
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    isLiked: false,
  },
  {
    id: 5,
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    isLiked: false,
  },
  {
    id: 6,
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    isLiked: false,
  },
];

const profileInfoEditButton = document.querySelector(
  ".profile__info-edit-button"
);
const popupProfile = document.querySelector(".popup_profile");
const popupCloseIconProfile = popupProfile.querySelector(".popup__close-icon");

const popupInputName = popupProfile.querySelector(".popup__input_name");
const popupInputMetier = popupProfile.querySelector(".popup__input_metier");
const profileInfoName = document.querySelector(".profile__info-name");
const profileInfoMetier = document.querySelector(".profile__info-metier");
const popup = document.querySelector(".popup");
const popupFormProfile = popupProfile.querySelector(".popup__form");

profileInfoEditButton.addEventListener("click", openPopupProfile);
popupCloseIconProfile.addEventListener("click", closePopupProfile);

function openPopupProfile() {
  addPopupInputAtributValue();
  popupProfile.style.visibility = "visible";
  popupProfile.style.opacity = "1";
  document.body.style.overflow = "hidden";
}

function closePopupProfile() {
  popupProfile.style.visibility = "hidden";
  popupProfile.style.opacity = "0";
  document.body.style.overflow = "";
}

function addPopupInputAtributValue() {
  popupInputName.setAttribute("value", profileInfoName.textContent);
  popupInputMetier.setAttribute("value", profileInfoMetier.textContent);
  console.log(profileInfoName.textContent);
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileInfoName.textContent = popupInputName.value;
  profileInfoMetier.textContent = popupInputMetier.value;
  closePopupProfile();
}

popupFormProfile.addEventListener("submit", formSubmitHandler);

// popup для добавления фотографии

const placeAddButton = document.querySelector(".profile__add-button");
const popupPlace = document.querySelector(".popup_place");
const popupPlaceCloseIcon = popupPlace.querySelector(".popup__close-icon");

function openPopupPlace() {
  popupPlace.style.visibility = "visible";
  popupPlace.style.opacity = "1";
  document.body.style.overflow = "hidden";
}

placeAddButton.addEventListener("click", openPopupPlace);

function closePopupPlace() {
  popupPlace.style.visibility = "hidden";
  popupPlace.style.opacity = "0";
  document.body.style.overflow = "";
}

popupPlaceCloseIcon.addEventListener("click", closePopupPlace);

//Добавление фото

let popupFormPlace = popupPlace.querySelector(".popup__form");
let popupNamePlace = popupPlace.querySelector(".popup__input_name");
let popupImagePlace = popupPlace.querySelector(".popup__input_image");

const photoCard = document.querySelector(".photo-card");

function renderPhotoCard(name, link, id, isLiked) {
  const templateCard = document.querySelector("#photo-card__template").content;
  const photoCardElement = templateCard
    .querySelector(".photo-card__element")
    .cloneNode(true);
  photoCardElement.setAttribute("id", id);
  photoCardElement.setAttribute("isLiked", isLiked);
  photoCardElement.querySelector(".photo-card__image").src = link;
  photoCardElement.querySelector(".photo-card__name").textContent = name;
  if (isLiked === true) {
    photoCardElement
      .querySelector(".photo-card__like")
      .classList.add("photo-card__like_active");
  }
  photoCard.prepend(photoCardElement);
}

//Функция генерируюущая значение id когда добавляешь карточку

function generateId(initialCards) {
  let massivId = [];
  for (let i = 0; i < initialCards.length; i++) {
    massivId[i] = initialCards[i].id;
  }
  massivId.sort(function (a, b) {
    return b - a;
  });
  return 1 + massivId[0];
}

//Функция для добавления в массив

function addPhotoCardToInitialCards(name, link, id) {
  const Object = {
    id: id,
    name: name,
    link: link,
    isLiked: false,
  };
  initialCards.push(Object);
}

//Обработчик «отправки» формы

function formSubmitPlace(evt) {
  evt.preventDefault();
  let name = popupNamePlace.value;
  let link = popupImagePlace.value;
  let id = generateId(initialCards);
  addPhotoCardToInitialCards(name, link, id);
  renderPhotos();
  closePopupPlace();
}
popupFormPlace.addEventListener("submit", formSubmitPlace);

//Удаление фото

function deletePhoto(id) {
  initialCards = initialCards.filter(function (initialCard) {
    return initialCard.id !== id;
  });
}

photoCard.addEventListener("click", function (event) {
  if (event.target.className !== "photo-card__trash-button") return;
  const id = event.target.closest(".photo-card__element").id;
  deletePhoto(+id);
  renderPhotos();
});

function renderPhotos() {
  photoCard.innerHTML = "";
  initialCards.forEach(function (initialCard) {
    renderPhotoCard(
      initialCard.name,
      initialCard.link,
      initialCard.id,
      initialCard.isLiked
    );
  });
}

renderPhotos();

//блок переключение значка Like

photoCard.addEventListener("click", function (event) {
  if (
    event.target.className === "photo-card__like photo-card__like_active" ||
    event.target.className === "photo-card__like"
  ) {
    event.target.classList.toggle("photo-card__like_active");
  }
});

//Открытие попапа просмотра картинки

photoCard.addEventListener("click", function (event) {
  if (event.target.className !== "photo-card__image") return;
  const photoCardName = event.target
    .closest(".photo-card__element")
    .querySelector(".photo-card__title")
    .querySelector(".photo-card__name").textContent;
  const photoCardImageLink = event.target
    .closest(".photo-card__element")
    .querySelector(".photo-card__image-square")
    .querySelector(".photo-card__image").src;
  openPopupImage(photoCardName, photoCardImageLink);
});

const popupImage = document.querySelector(".popup_image");
function openPopupImage(name, link) {
  popupImage.style.visibility = "visible";
  popupImage.style.opacity = "1";
  document.body.style.overflow = "hidden";
  popupImage.querySelector(".popup__card-image").src = link;
  popupImage.querySelector(".popup__image-title").textContent = name;
}

//Закрытие попапа просмотра картинки

function closePopupImage() {
  popupImage.style.visibility = "hidden";
  popupImage.style.opacity = "0";
  document.body.style.overflow = "";
}

document.addEventListener("keydown", function (event) {
  if (event.code === "Escape") {
  }
});

popupImage
  .querySelector(".popup__close-icon")
  .addEventListener("click", closePopupImage);

//Отправка формы через enter

document.addEventListener("keydown", function (event) {
  if (event.code === "Enter" && popupProfile.style.visibility === "visible") {
    formSubmitHandler(event);
  }
  if (event.code === "Enter" && popupPlace.style.visibility === "visible") {
    formSubmitPlace(event);
  }
});

// Закрытие попапов при нажатии кнопки escape

document.addEventListener("keydown", function (event) {
  if (event.code === "Escape") {
    closePopupProfile();
    closePopupPlace();
    closePopupImage();
  }
});
