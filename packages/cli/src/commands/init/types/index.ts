export type TBuildTool = 'vite' | 'bun' | 'webpack' | 'rollup' | 'esbuild';

export interface IJayJSCLIInitOptions {
  projectName: string;
  javascriptVariant: 'ts' | 'js';
  buildTool: TBuildTool;
  projectType: 'static' | 'spa';
  languageType: 'single' | 'multi';
  defaultLanguage?: string;
  installUIPackage: boolean;
  cssLibrary?: 'daisyui' | 'none';
  useThemeProvider: boolean;
  useJSX: boolean;
  installDependencies: boolean;
}
