/**
 * Test for the Jay JSX Vite plugin
 */

import jayJsxPlugin from "../vite-plugin/index.js";

describe("Vite Plugin", () => {
	test("returns a valid plugin object", () => {
		const plugin = jayJsxPlugin();

		expect(plugin).toBeDefined();
		expect(plugin.name).toBe("vite-plugin-jay-jsx");
		expect(typeof plugin.config).toBe("function");
	});

	test("plugin config injects JSX runtime", () => {
		const plugin = jayJsxPlugin();
		const config = plugin.config ? plugin.config({}) : {};

		expect(config).toHaveProperty("esbuild");
		expect(config.esbuild).toHaveProperty("jsxInject");
		expect(config.esbuild.jsxInject).toContain("import { jayJSX, Fragment }");
		expect(config.esbuild.jsxInject).toContain("@jay-js/jsx/runtime/jsx-runtime.js");
	});
});
