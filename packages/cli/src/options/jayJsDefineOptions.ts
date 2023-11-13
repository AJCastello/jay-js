import { IJayJsOptions } from "../types/index.js";

export let jayJsOptions: IJayJsOptions = {
  build: {
    srcDir: "src",
    outDir: "dist",
    transformedDir: "transformed",
    contentDir: "content",
    contentTransformedDir: "content_transformed",
  }
};

export function jayJsDefineOptions(options: IJayJsOptions) {
  jayJsOptions = { ...jayJsOptions, ...options };
  return jayJsOptions;
}
