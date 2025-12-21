export default class Delivery {
  constructor(name, address, distance) {
    this.name = name;
    this.address = address;
    this.distance = distance; // число
    this._highlighted = false;
  }

  // геттер
  get highlighted() {
    return this._highlighted;
  }

  // сеттер
  set highlighted(value) {
    this._highlighted = value;
  }

  createCard() {
    const card = document.createElement("div");
    card.className = "card";

    if (this.highlighted) {
      card.classList.add("card--highlighted");
    }

    card.innerHTML = `
      <p class="label">Имя</p>
      <p class="value">${this.name}</p>

      <p class="label">Адрес</p>
      <p class="value">${this.address}</p>

      <p class="label">Расстояние</p>
      <p class="value">${this.distance} км</p>
    `;

    return card;
  }
}
