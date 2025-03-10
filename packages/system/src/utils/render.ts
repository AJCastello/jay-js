/**
 * The `render` function takes target element, data, and optional insert options to render content in
 * the specified location on a web page.
 * @param {HTMLElement | string | null} target - The `target` parameter in the `render` function can be
 * either an HTMLElement, a string representing a selector, or null. It is the element to which the
 * data will be rendered.
 * @param {Node | string | (Node | string)[]} data - The `data` parameter in the `render` function can
 * accept a single Node or string, or an array of Nodes or strings.
 * @param options - The `options` parameter in the `render` function allows you to specify how the data
 * should be inserted into the target element. It has a property `insert` which can have two possible
 * values:
 * @returns The `render` function returns nothing (`undefined`) explicitly, as there is no `return`
 * statement with a value specified in the function. The function performs operations on the `target`
 * element based on the provided `data` and `options`, but it does not return any specific value.
 */
export function render(
  target: HTMLElement | string | null,
  data: Node | string | HTMLElement | (Node | string | HTMLElement)[] | null | undefined,
  options: {
    insert?: "append" | "prepend";
  } = {}
) {
  if (!target || !data) return;
  
  const currentTarget = typeof target === "string" ? document.querySelector(target) : target;
  if (!currentTarget) return;

  if (!options.insert) {
    currentTarget.innerHTML = "";
  }
  
  if (options.insert === "prepend") {
    if (Array.isArray(data)) {
      currentTarget.prepend(...data);
      return;
    }
    currentTarget.prepend(data);
    return;
  }

  if (Array.isArray(data)) {
    currentTarget.append(...data);
    return;
  }
  currentTarget.append(data);
  return;
}