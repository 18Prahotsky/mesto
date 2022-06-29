// export const initialCards = [
//   {
//     name: "Архыз",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
//   },
//   {
//     name: "Челябинская область",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
//   },
//   {
//     name: "Иваново",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
//   },
//   {
//     name: "Камчатка",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
//   },
//   {
//     name: "Холмогорский район",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
//   },
//   {
//     name: "Байкал",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
//   },
// ];

export const config = {
  url: "https://62b04b70b0a980a2ef4fa3aa.mockapi.io/api/v1/cards/",
  headers: {
    "content-type": "application/json",
  },
};

export const setupSelector = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__input-save",
  inactiveButtonClass: "popup__input-save_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

export const firebaseConfig = {
  apiKey: "AIzaSyCB_JXxhKSz0r23e_famSAxzJbfUY8JNkQ",
  authDomain: "prahotsky18.firebaseapp.com",
  projectId: "prahotsky18",
  storageBucket: "prahotsky18.appspot.com",
  messagingSenderId: "548325991244",
  appId: "1:548325991244:web:d6ef586c7ddfe937ed25e9"
};