export class UserInfo {
  constructor({ name, metier }) {
    this.name = document.querySelector(name);
    this.metier = document.querySelector(metier);
  }

  getUserInfo() {
    return (this._userInfoFromProfile = {
      name: this.name.textContent,
      metier: this.metier.textContent,
    });
  }

  setUserInfo(item) {
    this.name.textContent = item["name-input"];
    this.metier.textContent = item["metier-input"];
  }
}
