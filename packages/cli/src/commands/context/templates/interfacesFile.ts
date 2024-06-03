import { toPascalCase } from "../../../utils/case";

export function interfacesFileTemplate(contextName: string) {
  const formattedName = toPascalCase(contextName);
  return `import { StateType } from "@jay-js/system";

export interface I${formattedName}ContextPrivateStates {
}

export interface I${formattedName}ContextStates {
  clear: () => void;
}

export interface I${formattedName}ContextActions {
  clear: () => void;
}

export interface I${formattedName}ContextPrivateStorage {
}

export interface I${formattedName}Context {
  states: I${formattedName}ContextStates;
  actions: I${formattedName}ContextActions;
}
`;
}