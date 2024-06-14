import { toPascalCase } from "../../../utils/case";
import { filterFormat } from "../utils";

export function actionsFileTemplate(contextName: string, storage: boolean) {
  const formattedName = toPascalCase(contextName);

  const imports = filterFormat(
    `I${formattedName}ContextStates`,
    `I${formattedName}ContextActions`,
    storage && `I${formattedName}ContextPrivateStorage`
  ).join(",\n  ");

  const constructorParams = filterFormat(
    `states: I${formattedName}ContextStates`,
    storage && `storage: I${formattedName}ContextPrivateStorage`
  ).join(",\n    ");

  const constructor = filterFormat(
    `this.states = states`,
    storage && `this.storage = storage`
  ).join(";\n    ");

  const properties = filterFormat(
    `states: I${formattedName}ContextStates`,
    storage && `private storage: I${formattedName}ContextPrivateStorage`
  ).join(";\n  ");
  

  return `import {\n  ${imports}\n} from "./${contextName}.interfaces";

export class ${formattedName}Actions implements I${formattedName}ContextActions {
  ${properties}

  constructor(
    ${constructorParams}
    ) {
    ${constructor}
  }

  /** jayjs:actions */

  clear() {
    this.states.clear();
  }
}
`;
}