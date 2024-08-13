export function render(
  target: HTMLElement | string | null,
  data: Node | string | (Node | string)[],
) {
  const currentTarget = typeof target === "string" ? document.querySelector(target) : target;
  if (!currentTarget) return;
  currentTarget.innerHTML = "";

  if (Array.isArray(data)) {
    currentTarget.append(...data);
    return;
  }
  currentTarget.append(data);
}