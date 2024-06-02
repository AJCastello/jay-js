import { pascalCase } from "../utils";

export function actionsFileTemplate(contextName: string) {
  const formattedName = pascalCase(contextName);
  return `
// context interface
import { I${formattedName}ContextStates, I${formattedName}ContextActions, I${formattedName}ContextPrivateStorage } from "./${contextName}.interfaces";

export class ${formattedName}Actions implements I${formattedName}ContextActions {
  states: I${formattedName}ContextStates;
  private storage: I${formattedName}ContextPrivateStorage;

  constructor(states: I${formattedName}ContextStates, storage: I${formattedName}ContextPrivateStorage) {
    this.states = states;
    this.storage = storage;
  }

  /** jayjs:actions */

  clear() {
    this.states.clear();
  }
}
`;
}