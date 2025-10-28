import type { IJayJsViteOptions } from "../types/index.js";

export let jayJsViteOptions: IJayJsViteOptions = {
	contentPath: "/src/content",
};

export function jayJsViteDefineOptions(options: IJayJsViteOptions) {
	jayJsViteOptions = { ...jayJsViteOptions, ...options };
	return jayJsViteOptions;
}
