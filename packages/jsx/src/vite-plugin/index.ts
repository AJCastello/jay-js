
function jayJsxPlugin() {
  return {
    name: "vite-plugin-jay-jsx",
    config(config: any) {
      return {
        esbuild: {
          jsxInject: 'import { jayJSX, Fragment } from "@jay-js/jsx/runtime/jsx-runtime.js";',
        }
      };
    }
  };
};

export default jayJsxPlugin;