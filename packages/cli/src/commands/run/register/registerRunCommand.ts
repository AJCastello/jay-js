import { Command } from "commander";
import { runAction } from "../action/runAction";

export function registerRunCommand(program: Command) {
  program
    .command("run <jayjs-file>")
    .description("Runs a Jay JS file")
    .action(runAction);
}