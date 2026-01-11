const BASE = "https://rickandmortyapi.com/api/character";

export async function fetchCharacters(page = 1) {
    const url = new URL(BASE);
    url.searchParams.set("page", String(page));

    const res = await fetch(url.toString(), { headers: { Accept: "application/json" } });

    if (!res.ok) {
    let msg = `Ошибка: ${res.status}`;
    try {
        const j = await res.json();
        if (j?.error) msg = j.error;
    } catch {}
    throw new Error(msg);
    }

    return res.json();
}
