import { fetchCharacters } from "./api.js";
import { renderList, renderPager } from "./render.js";

const gridEl = document.getElementById("grid");
const pagerEl = document.getElementById("pager");

const state = {
    page: 1,
    pages: 1,
};

function getPageFromUrl() {
    const url = new URL(window.location.href);
    const p = Number(url.searchParams.get("page") || "1");
    return Number.isFinite(p) && p >= 1 ? p : 1;
}

function setPageToUrl(p) {
    const url = new URL(window.location.href);
    url.searchParams.set("page", String(p));
    history.pushState({ page: p }, "", url.toString());
}

async function load(p) {
    gridEl.setAttribute("aria-busy", "true");

    const data = await fetchCharacters(p);

    state.page = p;
    state.pages = data.info.pages;
    renderList(gridEl, data.results.slice(0, 4));

    renderPager(pagerEl, {
    currentPage: state.page,
    totalPages: state.pages,
    onPage: (next) => {
        if (next < 1 || next > state.pages) return;
        setPageToUrl(next);
        load(next);
    },
    });

    gridEl.setAttribute("aria-busy", "false");
}

window.addEventListener("popstate", () => {
    load(getPageFromUrl());
});

const initial = getPageFromUrl();
setPageToUrl(initial);
load(initial);
