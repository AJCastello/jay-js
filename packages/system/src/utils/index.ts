// Exporta utilitários DOM
export {
  selector,
  selectors,
  closest,
  matches
} from "./dom/query.js";

export {
  render,
  createElement,
  clearElement,
  replaceElement
} from "./dom/render.js";

// Exporta utilitários core
export {
  uniKey,
  uuid,
  prefixedKey,
  timeKey
} from "./core/keys.js";

// Exporta tipos
export * from "./types.js";