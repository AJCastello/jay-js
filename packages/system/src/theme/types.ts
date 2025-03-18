/**
 * Opções de configuração do sistema de temas
 */
export interface IThemeOptions {
  /** Elemento alvo para aplicação do tema */
  target: HTMLElement;
  /** Se deve salvar o tema no localStorage */
  saveToLocalStorage: boolean;
  /** Tema padrão */
  defaultTheme: string;
  /** Tema escuro padrão */
  defaultDarkTheme: string;
  /** Se deve aplicar o tema como dataset */
  useAsDataset?: boolean;
  /** Se deve aplicar o tema como classe CSS */
  useAsClass?: boolean;
  /** Lista de temas disponíveis */
  themeList?: Array<string>;
}

/**
 * Estado do sistema de temas
 */
export interface IThemeState {
  /** Tema atual */
  currentTheme: string;
  /** Se está usando o tema escuro */
  isDark: boolean;
}

/**
 * Hook do sistema de temas
 */
export interface IUseTheme {
  /** Tema atual */
  theme: string;
  /** Se está usando o tema escuro */
  isDark: boolean;
  /** Alterna entre tema claro e escuro */
  toggleDark: () => void;
  /** Define um novo tema */
  setTheme: (theme: string) => void;
  /** Lista de temas disponíveis */
  themeList: string[];
}