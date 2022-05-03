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

function closeByEsc(e) {
    if (e.key === "Escape") {
      closePopup();
    }
  }

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