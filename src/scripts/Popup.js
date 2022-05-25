const popups = document.querySelectorAll(".popup");

export class Popup {
  constructor(poupSelector) {
    this._popupSelector = poupSelector;
  }

  open() {
    this._popupSelector.classList.add("popup_opened");
    this.setEventListeners();
    document.addEventListener("keydown", this._handleEscClose.bind(this));
  }

  close() {
    const popup = document.querySelector(".popup_opened");
    if (popup) {
      popup.classList.remove("popup_opened");
    }
    document.removeEventListener("keydown", this._handleEscClose.bind(this));
  }
  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    popups.forEach((popup) => {
      popup.addEventListener("mousedown", (e) => {
        if (e.target.classList.contains("popup_opened")) {
          this.close();
        }
        if (e.target.classList.contains("popup__close-icon")) {
          this.close();
        }
      });
    });
  }
}
