export function validateItem({ name, shelf, weight, storageDate }) {
  const errors = {};

  const n = String(name ?? "").trim();
  const s = String(shelf ?? "").trim();
  const wRaw = String(weight ?? "").trim();
  const dRaw = String(storageDate ?? "").trim();

  if (!n || n.length < 2) {
    errors.name = "Название должно быть минимум 2 символа.";
  }

  if (!s || !/^[A-Za-zА-Яа-я0-9_-]{1,10}$/.test(s)) {
    errors.shelf = "Полка: 1–10 символов (буквы/цифры/_, -).";
  }

  const w = Number(wRaw.replace(",", "."));
  if (!Number.isFinite(w) || w <= 0) {
    errors.weight = "Вес должен быть числом больше 0.";
  }

  if (!dRaw) {
    errors.storageDate = "Выберите дату хранения.";
  } else {
    const selected = new Date(dRaw);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selected < today) {
      errors.storageDate = "Дата не может быть в прошлом.";
    }
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    normalized: {
      name: n,
      shelf: s,
      weight: w,
      storageDate: dRaw, // ISO-строка
    },
  };
}
