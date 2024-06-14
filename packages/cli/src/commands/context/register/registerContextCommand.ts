// libs
import { Command } from "commander";

// action
import { contextAction } from "../action/contextAction.js";

export function registerContextCommand(program: Command) {
  program
    .command("ctx <resource:contextName>")
    .alias("context")
    .description("Create a structured context for your project")
    .option("-s, --state <state>", "Create a method to manage some private state")
    .option("-p, --private-state <contextState>", "Create a new private state")
    .option("-a, --action <action>", "Create a method to manage some action")
    .option("-t, --storage <storage>", "Create a method to manage some storage")
    .option("-d, --description <description>", "Add a description to the method")
    .action(contextAction);
}
