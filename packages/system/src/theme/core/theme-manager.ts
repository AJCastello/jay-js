import { themeOptions, themeState, applyTheme, prefersColorSchemeDark } from "./configuration.js";

/**
 * Inicializa o sistema de temas
 */
export function initTheme(): void {
  // Recupera tema salvo ou usa as preferências do sistema
  const savedTheme = themeOptions.saveToLocalStorage
    ? localStorage.getItem("theme")
    : null;
  
  const savedIsDark = themeOptions.saveToLocalStorage
    ? localStorage.getItem("isDark") === "true"
    : prefersColorSchemeDark();

  // Atualiza estado com tema inicial
  themeState.set({
    currentTheme: savedTheme || (savedIsDark ? themeOptions.defaultDarkTheme : themeOptions.defaultTheme),
    isDark: savedIsDark
  });

  // Aplica tema inicial
  applyTheme(themeState.get().currentTheme);

  // Observa mudanças na preferência de cor do sistema
  window.matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!themeOptions.saveToLocalStorage) {
        toggleDarkMode();
      }
    });
}

/**
 * Alterna entre modo claro e escuro
 */
export function toggleDarkMode(): void {
  const state = themeState.get();
  const newIsDark = !state.isDark;
  
  themeState.set({
    currentTheme: newIsDark ? themeOptions.defaultDarkTheme : themeOptions.defaultTheme,
    isDark: newIsDark
  });

  applyTheme(themeState.get().currentTheme);
}

/**
 * Define um novo tema
 */
export function setTheme(theme: string): void {
  if (!themeOptions.themeList?.includes(theme)) {
    console.warn(`Theme "${theme}" is not in the list of available themes`);
  }

  const isDark = theme === themeOptions.defaultDarkTheme;
  themeState.set({
    currentTheme: theme,
    isDark
  });

  applyTheme(theme);
}