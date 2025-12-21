import Delivery from "./Delivery.js";

const deliveryArr = [
  new Delivery("Ольга", "ул. Вымыслов, д. 12", 8),
  new Delivery("Дмитрий", "ул. Задачная, д. 7", 3),
  new Delivery("Оля", "ул. Ткачей, д. 43", 11),
];

// управление карточками через сеттер
deliveryArr[1].highlighted = true;

const container = document.querySelector(".container");

deliveryArr.forEach(delivery => {
  container.append(delivery.createCard());
});
