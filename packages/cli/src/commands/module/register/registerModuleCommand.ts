// libs
import { Command } from "commander";

// action
import { moduleAction } from "../action/moduleAction.js";

export function registerModuleCommand(program: Command) {
  program
    .command("md <resource:moduleName>")
    .alias("module")
    .description("Create a structured module for your project")
    .option("-s, --service <service>", "Create a method to service layer")
    .option("-r, --repo <repository>", "Create a method to repository layer")
    .option("-h, --http <http>", "Create a method to http layer")
    .option("-m, --models <models>", "Create a models function")    
    .action(moduleAction);
}
