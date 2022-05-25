export class UserInfo {
  constructor({ name, metier }) {
    this.name = name;
    this.metier = metier;
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
