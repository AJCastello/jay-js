import { Command } from "commander";
import { buildAction } from "../action/buildAction";

export function registerBuildCommand(program: Command) {
  program
    .command("build")
    .description("Compiling the project")
    .option("--static", "Compiles the project to a static site")
    .action(buildAction);
}