import { Command } from "commander";
import { prepareAction } from "../action/prepareAction";

export function registerPrepareCommand(program: Command) {
  program
    .command("prepare")
    .description("Prepare content for static site generation")
    .option("-s, --static", "Prepare static content")
    .action(prepareAction);
}