import { Command } from "commander";
import chalk from "chalk";
import { createContext } from "../modules/createContext.js";
import { addStateMethod } from "../modules/addStateMethod.js";
import { addActionMethod } from "../modules/addActionMethod.js";
import { addStorage } from "../modules/addStorage.js";
import { addPrivateState } from "../modules/addPrivateState.js";

export function registerContextCommand(program: Command) {
  program
    .command("ctx <resource:contextName>")
    .alias("context")
    .description("Create a structured context for your project")
    .option("-s, --state <state>", "Create a method to manage some private state")
    .option("-p, --private <privateState>", "Create a new private state")
    .option("-a, --action <action>", "Create a method to manage some action")
    .option("-t, --storage <storage>", "Create a method to manage some storage")
    .action((argument, options) => {
      const [resource, contextName] = argument.split(":");
      
      function log(message: string) {
        console.log(chalk.green.italic(message));
      }

      if (resource === "add") {
        const optionCount = [options.state, options.action, options.storage].filter(Boolean).length;
        if (optionCount > 1) {
          console.error(chalk.red("Error: Exactly one of --state, --action, or --storage is required for the 'add' action."));
          process.exit(1);
        }
      }

      switch (resource) {
        case "c":
        case "create":
          createContext({ contextName });
          log(`✔ Context "${contextName}" has been successfully created!`);
          break;
        case "add":
          if (options.state) {
            addStateMethod({ contextName, state: options.state });
            log(`✔ "${options.state}" state method added to context "${contextName}"!`);
          } else if (options.private) {
            addPrivateState({ contextName, contextState: options.private })
            log(`✔ "${options.private}" private state added to context "${contextName}"!`);
          } else if (options.action) {
            addActionMethod({ contextName, action: options.action });
            log(`✔ "${options.action}" action method added to context "${contextName}"!`);
          } else if (options.storage) {
            addStorage({ contextName, storage: options.storage });
            log(`✔ "${options.storage}" storage added to context "${contextName}"!`);
          }
          break;
        default:
          console.error(chalk.red(`Error: Invalid resource "${resource}".`));
          break;
      }
    });
}
