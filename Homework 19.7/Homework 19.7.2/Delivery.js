export default class Delivery {
  constructor(name, address, distance) {
    this.name = name;
    this.address = address;
    this.distance = distance; // число
    this._highlighted = false;
  }

  get highlighted() {
    return this._highlighted;
  }

  set highlighted(value) {
    this._highlighted = Boolean(value);
  }

  // Базовый рендер "тела" карточки (без кнопок и статусов)
  createBaseContent() {
    const wrapper = document.createElement("div");
    wrapper.className = "card__content";

    wrapper.innerHTML = `
      <p class="label">Имя</p>
      <p class="value">${this.name}</p>

      <p class="label">Адрес</p>
      <p class="value">${this.address}</p>

      <p class="label">Расстояние</p>
      <p class="value">${this.distance} км</p>
    `;

    return wrapper;
  }

  // Базовая карточка (если понадобится)
  createCard() {
    const card = document.createElement("div");
    card.className = "card";

    if (this.highlighted) card.classList.add("card--highlighted");

    card.append(this.createBaseContent());
    return card;
  }
}
