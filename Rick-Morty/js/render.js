import { buildPaginationModel } from "./pagination.js";

function esc(s) {
    return String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function statusKey(status) {
    // API: "Alive" | "Dead" | "unknown"
    if (status === "Alive") return "Alive";
    if (status === "Dead") return "Dead";
    return "unknown";
}

export function renderList(gridEl, characters) {
    gridEl.innerHTML = characters.map((c) => {
    const name = esc(c.name);
    const gender = esc(c.gender);
    const status = esc(c.status);
    const origin = esc(c.origin?.name);

    const cls = statusKey(c.status);

    return `
        <article class="item">
        <div class="meta">
            <div class="name">${name}</div>
            <div class="status status--${cls}">${status}</div>

            <div class="gender">${gender}</div>
            <div class="origin">${origin}</div>
        </div>

        <a class="pic" href="#" tabindex="-1" aria-hidden="true">
            <img src="${esc(c.image)}" alt="${name}" loading="lazy" />
        </a>
        </article>
    `;
    }).join("");
}

export function renderPager(pagerEl, { currentPage, totalPages, onPage }) {
    const model = buildPaginationModel(currentPage, totalPages);

    pagerEl.innerHTML = model.map((it) => {
    if (it === "...") return `<span class="dots">…</span>`;

    const active = it === currentPage;
    return `
        <button
        class="page ${active ? "page--active" : ""}"
        data-page="${it}"
        ${active ? 'aria-current="page"' : ""}
        >${it}</button>
    `;
    }).join("");

    pagerEl.onclick = (e) => {
    const btn = e.target.closest("button[data-page]");
    if (!btn) return;
    const p = Number(btn.dataset.page);
    if (Number.isFinite(p)) onPage(p);
  };
}
