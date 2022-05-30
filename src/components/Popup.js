export class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;

    this._handleEscClose = this._handleEscClose.bind(this);
    this.setEventListeners();
  }

  open() {
    this._popupElement.classList.add("popup_opened");

    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
    // const popup = document.querySelector(".popup_opened");
    // if (popup) {
    //   popup.classList.remove("popup_opened");
    // }
    document.removeEventListener("keydown", this._handleEscClose);
  }
  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener("mousedown", (e) => {
      if (e.target.classList.contains("popup_opened")) {
        this.close();
      }
      if (e.target.classList.contains("popup__close-icon")) {
        this.close();
      }
    });
  }

  // setEventListeners() {
  //   this.popups.forEach((popup) => {
  //     popup.addEventListener("mousedown", (e) => {
  //       if (e.target.classList.contains("popup_opened")) {
  //         this.close();
  //       }
  //       if (e.target.classList.contains("popup__close-icon")) {
  //         this.close();
  //       }
  //     });
  //   });
  // }
}
