import { el } from "../utils/dom.js";
import { getItems, deleteItem } from "../storage.js";
import { createItemsTable, sortItemsAsc } from "../components/table.js";

let sortKey = null;

export async function render({ navigate }) {
  const card = el("div", { className: "card" });

  const header = el("div", { className: "page-header" });
  header.append(el("h1", { text: "Склад" }));

  const addBtn = el("button", { className: "btn btn-primary", text: "Добавить запись" });
  addBtn.addEventListener("click", () => navigate("#/add"));
  header.append(addBtn);

  const content = el("div");

  function repaint() {
    const rawItems = getItems();
    const viewItems = sortKey ? sortItemsAsc(rawItems, sortKey) : rawItems;

    content.innerHTML = "";
    content.append(
      createItemsTable({
        items: viewItems,
        sortKey,
        onSort: (key) => {
          sortKey = key;     // сортировка всегда по возрастанию
          repaint();
        },
        onDelete: (id) => {
          deleteItem(id);
          repaint();
        },
      })
    );
  }

  repaint();
  card.append(header, content);
  return card;
}
