import type { IJayJSCLIInitOptions } from "../types";

function staticImports() {
	return `import { jayJsViteStatic } from "@jay-js/static/vite-plugin";
import path from "path";\n`;
}

export function viteConfigFile(options: IJayJSCLIInitOptions): string {
	const hasStaticType = options.type === "static";
	const hasPlugins = hasStaticType;
	const isTypeScript = options.javascriptVariant === "ts";

	return `import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
${hasStaticType ? staticImports() : ""}
export default defineConfig({${
		isTypeScript
			? `
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "@jay-js/system",
  },`
			: `
  esbuild: {
    jsxInject: 'import { jsx, Fragment } from "@jay-js/system/jsx-runtime";',
  },`
	}
  ${
		hasPlugins
			? `plugins: [
    tailwindcss(),${
			hasStaticType
				? `
    jayJsViteStatic({
      contentPath: path.resolve(__dirname, "./src/content")
    })`
				: ""
		}
  ],`
			: `plugins: [tailwindcss()],`
	}
});`;
}
