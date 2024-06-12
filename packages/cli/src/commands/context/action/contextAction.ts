import { log } from "../../../utils/terminal";
import { createContext } from "../modules/createContext";
import { TContextCommandArgument, TContextCommandOptions } from "../types";
import { addHandler } from "./addHandler";

export function contextAction(argument: TContextCommandArgument, options: TContextCommandOptions) {
  const [resource, contextName] = argument.split(":");
  const { state, action, storage, privateState, description } = options;

  if (resource === "add") {
    const optionCount = [
      state,
      action,
      storage,
      privateState
    ].filter(Boolean).length;
    if (optionCount > 1) {
      log`Error: Exactly one of --state, --action, or --storage is required for the 'add' action.`
      process.exit(1);
    }
  }

  switch (resource) {
    case "c":
    case "create":
      createContext(contextName);
      break;
    case "add":
      addHandler(contextName, options);
      break;
    default:
      log`Error: Invalid resource "${resource}".`
      break;
  }
}