import { fileURLToPath } from "url";
import { dirname, resolve as resolvePath } from "path";
import { ResolveContext, ResolveResult } from "../types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const imageProxyPath = `file://${resolvePath(__dirname, "proxy.js")}`;

export function resolve(
  specifier: string | URL,
  context: ResolveContext,
  defaultResolve: (
    specifier: string | URL,
    context: ResolveContext
  ) => Promise<ResolveResult>
): Promise<ResolveResult> {
  if (typeof specifier === "string") {
    const extname = specifier.split(".").pop();
    if (["jpg", "png", "jpeg", "gif", "svg", "css"].includes(extname!)) {
      const imageUrl = encodeURIComponent(specifier);
      const modifiedProxyPath = `${imageProxyPath}?path=${imageUrl}`;

      return Promise.resolve({
        url: modifiedProxyPath,
        shortCircuit: true,
      });
    }
  }

  return defaultResolve(specifier, context);
}
