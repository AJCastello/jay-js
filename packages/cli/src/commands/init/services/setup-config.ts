import type { IPackageFile, IPackageVersion, ITsConfigFile } from "../types/index.js";

export const packageVersion: IPackageVersion = {
	"@jay-js/static": "^1.3.0",
	"@jay-js/system": "^4.0.0",
	"@jay-js/elements": "^1.2.0",
	"@jay-js/jsx": "^1.3.0",
	vite: "^7.1.0",
	tailwindcss: "^4.1.0",
	"@tailwindcss/vite": "^4.1.0",
	typescript: "~5.9.0",
};

export const tsConfigFile: ITsConfigFile = {
	compilerOptions: {
		target: "ES6",
		module: "ESNext",
		moduleResolution: "node",
		strict: true,
		esModuleInterop: true,
		sourceMap: true,
		lib: ["DOM", "ESNext"],
		outDir: "dist",
		allowJs: true,
	},
	include: ["src"],
};

export const packageFile: IPackageFile = {
	name: "",
	private: true,
	version: "1.0.0",
	type: "module",
	scripts: {},
	dependencies: {
		"@jay-js/system": packageVersion["@jay-js/system"],
		"@jay-js/elements": packageVersion["@jay-js/elements"],
	},
	devDependencies: {},
};
