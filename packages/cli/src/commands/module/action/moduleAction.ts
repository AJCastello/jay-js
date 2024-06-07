// modules
import { createModule } from "../modules/createModule";
import { addService } from "../modules/addService";
import { addHttp } from "../modules/addHttp";
import { addModels } from "../modules/addModels";
import { addRepository } from "../modules/addRepository";

// types
import { TArgument, TOptions } from "../types";

export function moduleAction(argument: TArgument, options: TOptions) {
  const [resource, moduleName] = argument.split(":");

  switch (resource) {
    case "c":
    case "create":
      createModule({ moduleName });
      break;
    case "add":
      options.service && addService({ moduleName, service: options.service });
      options.http && addHttp({ moduleName, http: options.http });
      options.models && addModels({ moduleName, models: options.models });
      options.repository && addRepository({ moduleName, repository: options.repository });
      break;
    default:
      console.error(`Error: Invalid resource "${resource}".`);
      break;
  }
}