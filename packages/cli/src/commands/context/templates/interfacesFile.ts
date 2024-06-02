import { pascalCase } from "../utils/index.js";

export function interfacesFileTemplate(contextName: string) {
  const formattedName = pascalCase(contextName);
  return `// jay-js
import { StateType } from "@jay-js/system";

/** jayjs:interface */

export interface I${formattedName}ContextPrivateStates {
  /** jayjs:contextState */
}

export interface I${formattedName}ContextStates {
  /** jayjs:states */
  clear: () => void;
}

export interface I${formattedName}ContextActions {
  /** jayjs:actions */
  clear: () => void;
}

export interface I${formattedName}ContextPrivateStorage {
  /** jayjs:storage */
}

export interface I${formattedName}Context {
  states: I${formattedName}ContextStates;
  actions: I${formattedName}ContextActions;
}
`;
}