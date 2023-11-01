import { IJayJsOptions } from "../types/index.js";

export let jayJsOptions: IJayJsOptions = {
  build: {
    srcPath: "src",
    distPath: "dist",
    outDir: "public_temp",
  }
};

export function jayJsDefineOptions(options: IJayJsOptions) {
  jayJsOptions = { ...jayJsOptions, ...options };
  return jayJsOptions;
}
