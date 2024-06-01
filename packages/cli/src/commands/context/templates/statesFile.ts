import { pascalCase } from "../utils";

export function statesFileTemplate(contextName: string) {
  const formattedName = pascalCase(contextName);
  return `/** jayjs:imports */
import { StateType } from "@jay-js/system";

// interfaces
import { 
  I${formattedName}ContextPrivateStates, 
  I${formattedName}ContextStates,
  /** jayjs:interfaces */
} from "./${contextName}.interfaces";

export class ${formattedName}States implements I${formattedName}ContextStates {
  /** jayjs:contextState */

  constructor(contextStates: I${formattedName}ContextPrivateStates) {
    /** jayjs:constructState */
  }

  /** jayjs:states */

  clear() {
    /** jayjs:clearStates */
  }
}
`;
}
