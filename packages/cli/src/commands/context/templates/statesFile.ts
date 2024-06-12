import { toPascalCase } from "../../../utils/case";

export function statesFileTemplate(contextName: string) {
  const formattedName = toPascalCase(contextName);
  return `import { StateType } from "@jay-js/system";

// interfaces
import { 
  I${formattedName}ContextPrivateStates, 
  I${formattedName}ContextStates,
} from "./${contextName}.interfaces";

export class ${formattedName}States implements I${formattedName}ContextStates {

  constructor(privateStates: I${formattedName}ContextPrivateStates) {
  }

  /** jayjs:states */

  clear() {
  }
}
`;
}
