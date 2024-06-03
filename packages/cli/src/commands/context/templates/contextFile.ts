import { toPascalCase } from "../../../utils/case";

export function contextFileTemplate(contextName: string){
  const formattedName = toPascalCase(contextName);
  return `import { State } from "@jay-js/system";

// interfaces
import {
  I${formattedName}Context,
  I${formattedName}ContextPrivateStates,
  I${formattedName}ContextPrivateStorage,
  I${formattedName}ContextStates,
  I${formattedName}ContextActions,
} from "./${contextName}.interfaces";

// dependencies
import { ${formattedName}States } from "./${contextName}.states";
import { ${formattedName}Actions } from "./${contextName}.actions";

class ${formattedName}Context implements I${formattedName}Context {
  private contextStates: I${formattedName}ContextPrivateStates;
  private storage: I${formattedName}ContextPrivateStorage;

  states: I${formattedName}ContextStates;
  actions: I${formattedName}ContextActions;

  constructor() {
    this.contextStates = {
    };
    
    this.storage = {
    };

    this.states = new ${formattedName}States(this.contextStates);
    this.actions = new ${formattedName}Actions(this.states, this.storage);
  }
}

export const ${contextName}Context = new ${formattedName}Context();
`;
  }
