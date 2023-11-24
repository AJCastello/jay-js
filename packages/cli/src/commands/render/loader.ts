// node
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve as resolvePath } from "node:path";

// types
import { ResolveContext, ResolveResult } from "../../types/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const imageProxyPath = `file://${resolvePath(__dirname, "proxy.js")}`;

const DEFAULT_EXTENSIONS = [".js", ".jsx", ".es6", ".es", ".mjs", ".ts", ".tsx"]
const ASSETS_EXTENSIONS = [".png", ".jpg", ".jpeg", ".gif", ".svg", ".css"]

function getPackagePath() {
  const packagePath = resolvePath(process.cwd(), "package.json");
  const packageSource = readFileSync(packagePath, "utf8");
  const packageJson = JSON.parse(packageSource);
  const filterDependenciesAndDevDependencies = [
    ...Object.keys(packageJson.dependencies || {}),
    ...Object.keys(packageJson.devDependencies || {}),
  ]
  return filterDependenciesAndDevDependencies;
}

const PACKAGES = getPackagePath();

export function resolve(
  specifier: string | URL,
  context: ResolveContext,
  defaultResolve: (
    specifier: string | URL,
    context: ResolveContext
  ) => Promise<ResolveResult>
): Promise<ResolveResult> {
  if (typeof specifier === "string" && !PACKAGES.includes(specifier)) {
    const extname = path.extname(specifier);

    if (ASSETS_EXTENSIONS.includes(extname!)) {
      const imageUrl = encodeURIComponent(specifier);
      const modifiedProxyPath = `${imageProxyPath}?path=${imageUrl}`;
      return Promise.resolve({
        url: modifiedProxyPath,
        shortCircuit: true
      });
    }

    if (!DEFAULT_EXTENSIONS.includes(extname!)) {
      const dirName = path.dirname(fileURLToPath(context.parentURL as string));
      const resolvedPath = path.resolve(dirName, specifier)

      if (existsSync(`${resolvedPath}.js`)) {
        const resolFile = pathToFileURL(`${resolvedPath}.js`).href
        return Promise.resolve({
          url: pathToFileURL(`${resolvedPath}.js`).href,
          shortCircuit: true,
          format: "module",
        });
      }

      if (existsSync(resolvedPath)) {
        const resolPath = pathToFileURL(`${resolvedPath}/index.js`).href
        return Promise.resolve({
          url: pathToFileURL(`${resolvedPath}/index.js`).href,
          shortCircuit: true,
          format: "module",
        });
      }
    }
   }
  return defaultResolve(specifier, context);
}
