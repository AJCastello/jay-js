import { Effect } from "../../state/index.js";
import { IUseTheme } from "../types.js";
import { themeState, themeOptions } from "../core/configuration.js";
import { toggleDarkMode, setTheme } from "../core/theme-manager.js";

/**
 * Hook para usar o sistema de temas
 */
export function useTheme(): IUseTheme {
  let state = themeState.get();

  // Observa mudanças no estado do tema
  Effect(() => {
    state = themeState.value;
  });

  return {
    theme: state.currentTheme,
    isDark: state.isDark,
    toggleDark: toggleDarkMode,
    setTheme,
    themeList: themeOptions.themeList || []
  };
}