import { IJayJSCLIInitOptions } from "../../init/types";

export interface IJayJsRunnerOptions {
  init: IJayJSCLIInitOptions;
  context: {
    name: string;
    actions: [
      {
        name: string,
        description: string
      }
    ];
    states: [
      {
        name: string,
        description: string
      }
    ];
  };
  module: {
    name: string;
    service: [
      {
        name: string,
        description: string
      }
    ];
    repository: [
      {
        name: string,
        description: string
      }
    ];
    http: [
      {
        name: string,
        description: string
      }
    ];
    
  };
}
