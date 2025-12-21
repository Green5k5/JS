function getLoader() {
  const node = document.getElementById("loader");
  if (!node) throw new Error("Не найден #loader");
  return node;
}

export function showLoader() {
  const loader = getLoader();
  loader.classList.remove("hidden");
  loader.setAttribute("aria-hidden", "false");
}

export function hideLoader() {
  const loader = getLoader();
  loader.classList.add("hidden");
  loader.setAttribute("aria-hidden", "true");
}
