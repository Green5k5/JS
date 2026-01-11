export function buildPaginationModel(current, total) {
    const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
    current = clamp(current, 1, total);

    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

    const left = Math.max(2, current - 1);
    const right = Math.min(total - 1, current + 1);

    const out = [1];

    if (left > 3) out.push("...");

    for (let p = left; p <= right; p++) out.push(p);

    if (right < total - 1) out.push("...");

    out.push(total);

    return out;
}
