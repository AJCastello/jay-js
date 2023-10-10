export function changeClass(element: HTMLElement, add?: string) {
  element.classList.remove("input-warning");
  element.classList.remove("input-error");
  add && element.classList.add(add);
}