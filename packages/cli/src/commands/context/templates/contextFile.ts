import { toPascalCase } from "../../../utils/case";
import { filterFormat } from "../utils";

export function contextFileTemplate(contextName: string, storage: boolean){
  const formattedName = toPascalCase(contextName);

  const interfaceImports = filterFormat(
    `I${formattedName}Context`,
    `I${formattedName}ContextPrivateStates`,
    `I${formattedName}ContextStates`,
    `I${formattedName}ContextActions`,
    storage && `I${formattedName}ContextPrivateStorage`
  ).join(",\n  ");

  const properties = filterFormat(
    `private privateStates: I${formattedName}ContextPrivateStates`,
    storage && `private storage: I${formattedName}ContextPrivateStorage`,
    `states: I${formattedName}ContextStates`,
    `actions: I${formattedName}ContextActions`
  ).join(";\n  ");

  return `import { State } from "@jay-js/system";

// interfaces
import {\n  ${interfaceImports},\n} from "./${contextName}.interfaces";

// dependencies
import { ${formattedName}States } from "./${contextName}.states";
import { ${formattedName}Actions } from "./${contextName}.actions";

class ${formattedName}Context implements I${formattedName}Context {
  ${properties}

  constructor() {
    this.privateStates = {
    };
    ${storage ? `\n    this.storage = {\n    };\n` : ""}
    this.states = new ${formattedName}States(this.privateStates);
    this.actions = new ${formattedName}Actions(this.states${storage ? ", this.storage" : ""});
  }
}

export const ${contextName}Context = new ${formattedName}Context();
`;
  }
