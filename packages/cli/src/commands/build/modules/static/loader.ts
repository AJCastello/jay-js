// node

import { readFile } from "node:fs/promises";
import path, { dirname, resolve as resolvePath } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// types
import type { ResolveContext, ResolveResult } from "../../../../types/index.js";
import { checkFileExists } from "../../../../utils/filesystem.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const imageProxyPath = `file://${resolvePath(__dirname, "proxy.js")}`;

const DEFAULT_EXTENSIONS = [".js", ".jsx", ".es6", ".es", ".mjs", ".ts", ".tsx"];
const ASSETS_EXTENSIONS = [".png", ".jpg", ".jpeg", ".gif", ".svg", ".css"];

async function getPackagePath() {
	const packagePath = resolvePath(process.cwd(), "package.json");
	const packageSource = await readFile(packagePath, "utf8");
	const packageJson = JSON.parse(packageSource);
	const filterDependenciesAndDevDependencies = [
		...Object.keys(packageJson.dependencies || {}),
		...Object.keys(packageJson.devDependencies || {}),
	];
	return filterDependenciesAndDevDependencies.filter((dep) => !dep.startsWith("@jay-js/jsx"));
}

export async function resolve(
	specifier: string | URL,
	context: ResolveContext,
	defaultResolve: (specifier: string | URL, context: ResolveContext) => Promise<ResolveResult>,
): Promise<ResolveResult> {
	const PACKAGES = await getPackagePath();

	if (typeof specifier === "string" && !PACKAGES.includes(specifier)) {
		const extname = path.extname(specifier);

		if (ASSETS_EXTENSIONS.includes(extname)) {
			const imageUrl = encodeURIComponent(specifier);
			const modifiedProxyPath = `${imageProxyPath}?path=${imageUrl}`;
			return await Promise.resolve({
				url: modifiedProxyPath,
				shortCircuit: true,
			});
		}

		if (!DEFAULT_EXTENSIONS.includes(extname)) {
			const dirName = path.dirname(fileURLToPath(context.parentURL as string));
			const resolvedPath = path.resolve(dirName, specifier);

			if (specifier.startsWith("@jay-js/jsx")) {
				const modulePath = path.resolve(process.cwd(), "node_modules", `${specifier}.js`);
				if (await checkFileExists(modulePath)) {
					return await Promise.resolve({
						url: pathToFileURL(modulePath).href,
						shortCircuit: true,
						format: "module",
					});
				}
			}

			if (await checkFileExists(`${resolvedPath}.js`)) {
				return await Promise.resolve({
					url: pathToFileURL(`${resolvedPath}.js`).href,
					shortCircuit: true,
					format: "module",
				});
			}

			if (await checkFileExists(resolvedPath)) {
				return await Promise.resolve({
					url: pathToFileURL(`${resolvedPath}/index.js`).href,
					shortCircuit: true,
					format: "module",
				});
			}
		}
	}
	return defaultResolve(specifier, context);
}
