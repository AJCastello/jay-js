// Exporta API principal
export { useTheme } from "./hooks/use-theme.js";
export { 
  themeDefineOptions,
  applyTheme 
} from "./core/configuration.js";
export {
  initTheme,
  setTheme,
  toggleDarkMode
} from "./core/theme-manager.js";

// Exporta utilitários
export {
  isThemeActive,
  createThemedElement,
  createThemeSelector,
  createDarkModeToggle
} from "./utils/helpers.js";

// Exporta tipos
export * from "./types.js";

// Inicializa o sistema de temas automaticamente
initTheme();