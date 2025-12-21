import { el } from "../utils/dom.js";

const COLUMNS = [
  { key: "name", title: "Название", sortable: true },
  { key: "shelf", title: "Полка", sortable: true },
  { key: "weight", title: "Вес", sortable: true },
  { key: "storageDate", title: "Хранить до", sortable: true },
];

function compareAsc(a, b, key) {
  if (key === "storageDate") {
    return new Date(a[key]) - new Date(b[key]);
  }

  if (typeof a[key] === "number") {
    return a[key] - b[key];
  }

  return String(a[key]).localeCompare(String(b[key]), "ru");
}

export function createItemsTable({
  items,
  onSort,
  onDelete,
  sortKey,
}) {
  const tableWrap = el("div", { className: "table-wrap" });

  if (!items.length) {
    tableWrap.append(el("div", { className: "empty", text: "Список пуст. Добавьте первую запись." }));
    return tableWrap;
  }

  const table = el("table");
  const thead = el("thead");
  const headRow = el("tr");

  for (const col of COLUMNS) {
    const th = el("th", { text: col.title, className: col.sortable ? "sortable" : "" });

    if (col.sortable) {
      th.title = "Сортировать по возрастанию";
      th.addEventListener("click", () => onSort(col.key));
      if (sortKey === col.key) th.textContent = `${col.title} ▲`;
    }

    headRow.append(th);
  }

  headRow.append(el("th", { text: "Действия" }));
  thead.append(headRow);

  const tbody = el("tbody");
  for (const item of items) {
    const tr = el("tr");
    tr.append(el("td", { text: item.name }));
    tr.append(el("td", { text: item.shelf }));
    tr.append(el("td", { text: `${item.weight}` }));
    tr.append(el("td", { text: `${item.storageDate}` }));

    const actions = el("td", { className: "actions" });
    const delBtn = el("button", { className: "btn btn-danger", text: "Удалить" });
    delBtn.addEventListener("click", () => onDelete(item.id));
    actions.append(delBtn);

    tr.append(actions);
    tbody.append(tr);
  }

  table.append(thead, tbody);
  tableWrap.append(table);
  return tableWrap;
}

export function sortItemsAsc(items, key) {
  // делаем копию, чтобы не мутировать исходный массив
  return [...items].sort((a, b) => compareAsc(a, b, key));
}
