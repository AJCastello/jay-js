import { State } from "../../state/index.js";
import { IThemeOptions, IThemeState } from "../types.js";

/**
 * Configuração padrão do sistema de temas
 */
export const themeOptions: IThemeOptions = {
  target: document.body,
  saveToLocalStorage: true,
  defaultTheme: "light",
  defaultDarkTheme: "dark",
  useAsDataset: true,
  useAsClass: false,
  themeList: ["light", "dark"]
};

/**
 * Estado global do sistema de temas
 */
export const themeState = State<IThemeState>({
  currentTheme: themeOptions.defaultTheme,
  isDark: false
});

/**
 * Define ou atualiza as opções do sistema de temas
 */
export function themeDefineOptions(options: Partial<IThemeOptions>): void {
  Object.assign(themeOptions, options);
}

/**
 * Aplica um tema ao elemento alvo
 */
export function applyTheme(theme: string): void {
  const target = themeOptions.target;

  if (themeOptions.useAsDataset) {
    target.dataset.theme = theme;
  }

  if (themeOptions.useAsClass) {
    // Remove temas anteriores
    themeOptions.themeList?.forEach(t => target.classList.remove(t));
    // Adiciona novo tema
    target.classList.add(theme);
  }

  // Atualiza estado
  themeState.set(current => ({
    ...current,
    currentTheme: theme
  }));

  // Salva no localStorage se configurado
  if (themeOptions.saveToLocalStorage) {
    localStorage.setItem("theme", theme);
    localStorage.setItem("isDark", String(themeState.get().isDark));
  }
}

/**
 * Verifica se o sistema prefere tema escuro
 */
export function prefersColorSchemeDark(): boolean {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}