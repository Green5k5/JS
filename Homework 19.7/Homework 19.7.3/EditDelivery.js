import Delivery from "./Delivery.js";

export default class EditDelivery extends Delivery {
  constructor(name, address, distance, status = "delivering") {
    super(name, address, distance);
    this._status = status; // delivering | delivered | canceled
  }

  get status() {
    return this._status;
  }

  set status(value) {
    const allowed = ["delivering", "delivered", "canceled"];
    this._status = allowed.includes(value) ? value : "delivering";
  }

  static getTotalDistance(deliveryArr) {
    if (!Array.isArray(deliveryArr)) return 0;

    return deliveryArr
      .filter((d) => d && d.status !== "canceled")
      .reduce((sum, d) => sum + Number(d.distance || 0), 0);
  }

  createCard(onEditClick) {
    const card = document.createElement("div");
    card.className = "card";

    if (this.status === "delivered") card.classList.add("card--delivered");
    if (this.status === "canceled") card.classList.add("card--canceled");
    if (this.highlighted) card.classList.add("card--highlighted");

    const top = document.createElement("div");
    top.className = "card__top";

    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.className = "btn btn--small";
    editBtn.textContent = "Изменить";
    editBtn.addEventListener("click", () => onEditClick(this));

    top.append(editBtn);

    card.append(top);
    card.append(this.createBaseContent());

    return card;
  }
}
