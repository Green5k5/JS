import { showLoader, hideLoader } from "./components/loader.js";

const ROUTES = {
  "#/warehouse": () => import("./pages/warehousePage.js"),
  "#/add": () => import("./pages/addPage.js"),
};

function getAppRoot() {
  const root = document.getElementById("app");
  if (!root) throw new Error("Не найден #app");
  return root;
}

export function navigate(hash) {
  if (location.hash === hash) return;
  location.hash = hash;
}

async function renderRoute() {
  const root = getAppRoot();
  const hash = location.hash || "#/warehouse";
  const loaderFn = ROUTES[hash] ?? ROUTES["#/warehouse"];

  // Показ прелоадера на время динамической загрузки страницы
  showLoader();

  try {
    const mod = await loaderFn();
    // небольшой yield, чтобы прелоадер точно отрисовался (приятнее визуально)
    await new Promise((r) => requestAnimationFrame(() => r()));

    root.innerHTML = "";
    const pageEl = await mod.render({ navigate });
    root.append(pageEl);
  } catch (e) {
    console.error(e);
    root.innerHTML = `
      <div class="card">
        <h1>Ошибка</h1>
        <p class="help">Не удалось загрузить страницу.</p>
      </div>
    `;
  } finally {
    hideLoader();
  }
}

export function initRouter() {
  window.addEventListener("hashchange", renderRoute);
  // дефолтный роут
  if (!location.hash) location.hash = "#/warehouse";
  renderRoute();
}
