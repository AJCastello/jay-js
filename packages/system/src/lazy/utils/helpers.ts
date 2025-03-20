import { ILazyModule } from "../types.js";
import { prefetchModule } from "../core/module-loader.js";

export function prefetchModules(configs: ILazyModule[]): void {
  configs.forEach(prefetchModule);
}
