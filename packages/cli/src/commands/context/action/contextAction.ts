// modules
import { addStorage } from "../modules/addStorage";
import { createContext } from "../modules/createContext";
import { addStateMethod } from "../modules/addStateMethod";
import { addPrivateState } from "../modules/addPrivateState";
import { addActionMethod } from "../modules/addActionMethod";

// types
import { TArgument, TOptions } from "../types";

export function contextAction(argument: TArgument, options: TOptions) {
  const [resource, contextName] = argument.split(":");

  if (resource === "add") {
    const optionCount = [options.state, options.action, options.storage, options.private].filter(Boolean).length;
    if (optionCount > 1) {
      console.error("Error: Exactly one of --state, --action, or --storage is required for the 'add' action.");
      process.exit(1);
    }
  }

  switch (resource) {
    case "c":
    case "create":
      createContext({ contextName });
      break;
    case "add":
      options.state && addStateMethod({ contextName, state: options.state });
      options.private && addPrivateState({ contextName, contextState: options.private })
      options.action && addActionMethod({ contextName, action: options.action });
      options.storage && addStorage({ contextName, storage: options.storage });
      break;
    default:
      console.error(`Error: Invalid resource "${resource}".`);
      break;
  }
}