import { init } from "../../init/action/initAction";
import { IJayJsRunnerOptions } from "../types";

export async function cliRunner(options: IJayJsRunnerOptions){
  
  options.init && await init(options.init);

}