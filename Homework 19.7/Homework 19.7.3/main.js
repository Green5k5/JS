import EditDelivery from "./EditDelivery.js";

const deliveryArr = [
  new EditDelivery("Ольга", "ул. Вымыслов, д. 12", 8, "delivering"),
  new EditDelivery("Дмитрий", "ул. Задачная, д. 7", 3, "delivered"),
  new EditDelivery("Оля", "ул. Ткачей, д. 43", 11, "canceled"),
];

const container = document.querySelector(".container");
const totalBtn = document.querySelector("#totalBtn");
const totalOut = document.querySelector("#totalOut");

// modal elements
const modal = document.querySelector("#modal");
const modalClose = document.querySelector("#modalClose");
const form = document.querySelector("#editForm");

const nameInput = document.querySelector("#nameInput");
const addressInput = document.querySelector("#addressInput");
const distanceInput = document.querySelector("#distanceInput");
const statusSelect = document.querySelector("#statusSelect");

let currentEditing = null;

function render() {
  container.innerHTML = "";

  deliveryArr.forEach((delivery) => {
    const card = delivery.createCard(openEditModal);
    container.append(card);
  });
}

function openEditModal(delivery) {
  // сброс подсветки, подсвечиваем выбранную
  deliveryArr.forEach(d => (d.highlighted = false));
  delivery.highlighted = true;
  render();

  currentEditing = delivery;

  nameInput.value = delivery.name;
  addressInput.value = delivery.address;
  distanceInput.value = String(delivery.distance);
  statusSelect.value = delivery.status;

  modal.classList.add("modal--open");
}

function closeModal() {
  modal.classList.remove("modal--open");
  currentEditing = null;
}

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!currentEditing) return;

  const newName = nameInput.value.trim();
  const newAddress = addressInput.value.trim();
  const newDistance = Number(distanceInput.value);
  const newStatus = statusSelect.value;

  if (!newName || !newAddress || !Number.isFinite(newDistance) || newDistance < 0) {
    alert("Проверьте поля: имя/адрес не пустые, расстояние — число ≥ 0");
    return;
  }

  currentEditing.name = newName;
  currentEditing.address = newAddress;
  currentEditing.distance = newDistance;

  // изменение статуса через setter
  currentEditing.status = newStatus;

  closeModal();
  render();
});

totalBtn.addEventListener("click", () => {
  const totalDistance = EditDelivery.getTotalDistance(deliveryArr);
  totalOut.textContent = `Общее расстояние: ${totalDistance} км`;
  totalOut.classList.add("total--visible");
});

render();
