const KEY = "warehouse_items_v1";

function safeParse(json, fallback) {
  try {
    const data = JSON.parse(json);
    return Array.isArray(data) ? data : fallback;
  } catch {
    return fallback;
  }
}

export function getItems() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return [];
  return safeParse(raw, []);
}

export function setItems(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function addItem(item) {
  const items = getItems();
  items.push(item);
  setItems(items);
}

export function deleteItem(id) {
  const items = getItems().filter((x) => x.id !== id);
  setItems(items);
}
