import { el } from "../utils/dom.js";
import { addItem } from "../storage.js";
import { validateItem } from "../utils/validate.js";

function uid() {
  return (crypto?.randomUUID?.() ?? `${Date.now()}_${Math.random().toString(16).slice(2)}`);
}

export async function render({ navigate }) {
  const card = el("div", { className: "card" });

  const header = el("div", { className: "page-header" });
  header.append(el("h1", { text: "Добавить запись" }));

  const backBtn = el("button", { className: "btn", text: "← На склад" });
  backBtn.addEventListener("click", () => navigate("#/warehouse"));
  header.append(backBtn);

  const form = el("form", { className: "form" });

  const nameInput = el("input", { attrs: { name: "name", placeholder: "Например: Посуда", autocomplete: "off" } });
  const shelfInput = el("input", { attrs: { name: "shelf", placeholder: "Например: A1", autocomplete: "off" } });
  const weightInput = el("input", { attrs: { name: "weight", placeholder: "Например: 2.5", inputmode: "decimal" } });
  const dateInput = el("input", { attrs: { name: "storageDate", type: "date" } });

  const nameErr = el("div", { className: "error" });
  const shelfErr = el("div", { className: "error" });
  const weightErr = el("div", { className: "error" });
  const dateErr = el("div", { className: "error" });

  function field(labelText, inputEl, helpText, errEl) {
    return el("div", {
      className: "field",
      children: [
        el("label", { text: labelText }),
        inputEl,
        el("div", { className: "help", text: helpText }),
        errEl,
      ],
    });
  }

  form.append(
    field("Название", nameInput, "Минимум 2 символа.", nameErr),
    field("Полка", shelfInput, "1–10 символов: буквы/цифры/_, -", shelfErr),
    field("Вес", weightInput, "Число больше 0 (можно 2.5).", weightErr),
    field("Хранить до", dateInput, "Дата, до которой разрешено хранение.", dateErr),
  );

  const submitBtn = el("button", { className: "btn btn-primary", text: "Добавить", attrs: { type: "submit" } });
  form.append(submitBtn);

  function clearErrors() {
    nameErr.textContent = "";
    shelfErr.textContent = "";
    weightErr.textContent = "";
    dateErr.textContent = "";
  }

  function showErrors(errors) {
    nameErr.textContent = errors.name ?? "";
    shelfErr.textContent = errors.shelf ?? "";
    weightErr.textContent = errors.weight ?? "";
    dateErr.textContent = errors.storageDate ?? "";
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();

    const res = validateItem({
      name: nameInput.value,
      shelf: shelfInput.value,
      weight: weightInput.value,
      storageDate: dateInput.value,
    });

    if (!res.ok) {
      showErrors(res.errors);
      return;
    }

    addItem({
      id: uid(),
      ...res.normalized,
    });

    // авто-переход на страницу списка
    navigate("#/warehouse");
  });

  card.append(header, form);
  return card;
}
