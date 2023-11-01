import { IJayJsOptions } from "../types/index.js";

export let jayJsOptions: IJayJsOptions = {
  build: {
    srcDir: "src",
    distDir: "dist",
    outDir: "public_temp",
  }
};

export function jayJsDefineOptions(options: IJayJsOptions) {
  jayJsOptions = { ...jayJsOptions, ...options };
  return jayJsOptions;
}
