import { init } from "../../init/action/initAction";
import { IJayJsRunnerOptions } from "../types";

export async function cliRunner(options: IJayJsRunnerOptions) {
  console.log((options as any).ctx.resources);
  console.log((options as any).module.resources);
  
  // options.init && await init(options.init);
  // options.ctx && await init(options.init);
  

}