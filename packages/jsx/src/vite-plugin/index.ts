
function jayJsxPlugin() {
  return {
    name: "vite-plugin-jay-jsx",
    config(config: any) {
      return {
        esbuild: {
          jsxInject: 'import { jayJSX, Fragment } from "@jay-js/jsx/runtime/jsx-runtime";',
        }
      };
    }
  };
};

export default jayJsxPlugin;