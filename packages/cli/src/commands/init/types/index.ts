export type TBuildTool = "vite" | "bun" | "webpack" | "rollup" | "esbuild";

export interface IJayJSCLIInitOptions {
  projectName: string;
  javascriptVariant: "ts" | "js";
  buildTool: TBuildTool;
  projectType: "static" | "spa";
  languageType: "single" | "multi";
  defaultLanguage?: string;
  installUIPackage: boolean;
  cssLibrary?: "daisyui" | "none";
  useThemeProvider: boolean;
  useJSX: boolean;
  installDependencies: boolean;
}

export interface IPackageVersion {
  "@jay-js/static": string;
  "@jay-js/system": string;
  "@jay-js/ui": string;
  "@jay-js/jsx": string;
  "vite": string;
  "tailwindcss": string;
  "postcss": string;
  "autoprefixer": string;
  "typescript": string;
  "daisyui": string;
  // EXPERIMENTAL
  // "babel/preset-react": string;
  // webpack: string;
  // "webpack-cli": string;
  // "webpack-dev-server": string;
  // rollup: string;
  // "rollup-plugin-node-resolve": string;
  // "rollup-plugin-terser": string;
  // esbuild: string;
  // bun: string;
}

export interface ITsConfigFile {
  compilerOptions: Partial<{
    target: string;
    useDefineForClassFields: boolean;
    module: string;
    lib: Array<string>;
    skipLibCheck: boolean;

    esModuleInterop: boolean;
    moduleResolution: string;
    allowImportingTsExtensions: boolean;
    resolveJsonModule: boolean;
    isolatedModules: boolean;
    noEmit: boolean;
    sourceMap: boolean;

    strict: boolean;
    noUnusedLocals: boolean;
    noUnusedParameters: boolean;
    noFallthroughCasesInSwitch: boolean;
    jsx: "react-jsx";
    jsxImportSource: "@jay-js/jsx/runtime";
    outDir: string;
    allowJs: boolean;
  }>;
  include: ["src"];
}

export interface IPackageFile {
  name: string;
  private: boolean;
  version: string;
  type: string;
  scripts: {
    dev?: string;
    build?: string;
    preview?: string;
    prebuild?: string;
    postbuild?: string;
  };
  dependencies: {
    "@jay-js/system": string;
  };
  devDependencies?: {
    "@jay-js/static"?: string;
    "@jay-js/ui"?: string;
    "@jay-js/jsx"?: string;
    "vite"?: string;
    "tailwindcss"?: string;
    "postcss"?: string;
    "autoprefixer"?: string;
    "typescript"?: string;
    "daisyui"?: string;
  };
  babel?: {
    presets: Array<string>;
  };
}