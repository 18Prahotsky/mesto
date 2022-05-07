const popups = document.querySelectorAll(".popup");

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
}

export function closePopup() {
  const popup = document.querySelector(".popup_opened");
  if (popup) {
    popup.classList.remove("popup_opened");
  }
  document.removeEventListener("keydown", closeByEsc);
}

// Закрыть попап по esc

function closeByEsc(e) {
  if (e.key === "Escape") {
    closePopup();
  }
}

//обработчик оверлея и крестика для попап

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup();
    }
    if (evt.target.classList.contains("popup__close-icon")) {
      closePopup();
    }
  });
});
