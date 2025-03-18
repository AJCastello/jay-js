import { themeState, themeOptions } from "../core/configuration.js";

/**
 * Verifica se um tema está ativo
 */
export function isThemeActive(theme: string): boolean {
  return themeState.get().currentTheme === theme;
}

/**
 * Cria um elemento com estilo específico para um tema
 */
export function createThemedElement(
  tagName: string,
  theme: string,
  styles: Partial<CSSStyleDeclaration>
): HTMLElement {
  const element = document.createElement(tagName);
  
  // Aplica estilos condicionalmente baseado no tema ativo
  const unsub = themeState.sub("themed_element", (state) => {
    if (state.currentTheme === theme) {
      Object.assign(element.style, styles);
    }
  });

  // Limpa subscription quando o elemento é removido
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.removedNodes.forEach((node) => {
        if (node === element) {
          unsub();
          observer.disconnect();
        }
      });
    });
  });

  observer.observe(element.parentElement || document.body, { childList: true });
  
  return element;
}

/**
 * Cria um seletor de tema
 */
export function createThemeSelector(className = "theme-selector"): HTMLSelectElement {
  const select = document.createElement("select");
  select.className = className;

  themeOptions.themeList?.forEach(theme => {
    const option = document.createElement("option");
    option.value = theme;
    option.textContent = theme;
    select.appendChild(option);
  });

  select.value = themeState.get().currentTheme;
  select.addEventListener("change", () => setTheme(select.value));

  return select;
}

/**
 * Cria um toggle para alternar entre modo claro/escuro
 */
export function createDarkModeToggle(
  className = "dark-mode-toggle",
  labels = { light: "Light", dark: "Dark" }
): HTMLButtonElement {
  const button = document.createElement("button");
  button.className = className;
  
  function updateLabel() {
    const isDark = themeState.get().isDark;
    button.textContent = isDark ? labels.light : labels.dark;
    button.setAttribute("aria-pressed", String(isDark));
  }

  themeState.sub("dark_mode_toggle", updateLabel);
  updateLabel();

  button.addEventListener("click", toggleDarkMode);
  
  return button;
}