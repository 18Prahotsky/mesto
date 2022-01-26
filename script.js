let profileInfoEditButton = document.querySelector(
  ".profile__info_edit-button"
);
let popupCloseIcon = document.querySelector(".popup__close-icon");
let popup = document.querySelector(".popup");

function openPopup() {
  console.log("Открыли попап");
  popup.classList.add("popup_open");
}
profileInfoEditButton.addEventListener("click", openPopup);

function closePopup() {
  popup.classList.remove("popup_open");
  console.log("Закрыли попап");
}
popupCloseIcon.addEventListener("click", closePopup);

let popupInputName = document.querySelector(".popup__input-name");
let popupInputMetier = document.querySelector(".popup__input-metier");
let profileInfoName = document.querySelector(".profile__info_name");
let profileInfoMetier = document.querySelector(".profile__info_metier");

function addPopupInputAtributValue() {
  popupInputName.setAttribute("value", profileInfoName.textContent);
  popupInputMetier.setAttribute("value", profileInfoMetier.textContent);
}

addPopupInputAtributValue();

console.log(popupInputName.getAttribute("value"));
console.log(popupInputMetier.getAttribute("value"));

let popupInputSave = document.querySelector(".popup__input-save");

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileInfoName.textContent = popupInputName.value;
  profileInfoMetier.textContent = popupInputMetier.value;
  console.log(popupInputName.value);
  console.log("нажал кнопку сохранить");
  closePopup();
}

popupInputSave.addEventListener("click", formSubmitHandler);

console.log(profileInfoName.textContent);
