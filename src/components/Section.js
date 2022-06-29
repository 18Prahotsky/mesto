export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this._spinner = document.querySelector('.popup__spinner')    

  }

  renderItems() {
    this._items.forEach((item) => {
      // console.log(item);
      this._renderer(item);
    });
  }

  addItem(item) {
    Promise.resolve(item)
    .then((item) =>{
      
      this._container.prepend(item)
    })
    .then(() =>{
     
      this._spinner.closest('.popup').classList.remove('popup_opened')
    })
    ;
  }
}
