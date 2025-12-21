export function el(tag, options = {}) {
  const node = document.createElement(tag);

  if (options.className) node.className = options.className;
  if (options.text != null) node.textContent = String(options.text);
  if (options.html != null) node.innerHTML = String(options.html);

  if (options.attrs) {
    for (const [k, v] of Object.entries(options.attrs)) {
      node.setAttribute(k, String(v));
    }
  }

  if (options.children) {
    for (const child of options.children) node.append(child);
  }

  return node;
}
