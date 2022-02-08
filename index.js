const profileInfoEditButton = document.querySelector(
  ".profile__info-edit-button"
);
const popupCloseIcon = document.querySelector(".popup__close-icon");
const popup = document.querySelector(".popup");
const popupInputName = document.querySelector(".popup__input-name");
const popupInputMetier = document.querySelector(".popup__input-metier");
const profileInfoName = document.querySelector(".profile__info-name");
const profileInfoMetier = document.querySelector(".profile__info-metier");

function addPopupInputAtributValue() {
  popupInputName.setAttribute("value", profileInfoName.textContent);
  popupInputMetier.setAttribute("value", profileInfoMetier.textContent);
}

function openPopup() {
  addPopupInputAtributValue();
  popup.classList.add("popup_open");
  document.body.style.overflow = "hidden";
}

profileInfoEditButton.addEventListener("click", openPopup);

function closePopup() {
  popup.classList.remove("popup_open");
  document.body.style.overflow = "";
}

document.addEventListener("keydown", function (event) {
  if (event.code === "Escape") {
    closePopup();
  }
});

popupCloseIcon.addEventListener("click", closePopup);

const popupForm = document.querySelector(".popup__form");

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileInfoName.textContent = popupInputName.value;
  profileInfoMetier.textContent = popupInputMetier.value;
  closePopup();
}

popupForm.addEventListener("submit", formSubmitHandler);

console.log(profileInfoName.textContent);
