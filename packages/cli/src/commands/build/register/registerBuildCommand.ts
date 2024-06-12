import { Command } from "commander";
import { buildAction } from "../action/buildAction";

export function registerBuildCommand(program: Command) {
  program
    .command("build")
    .description("Build content for static site generation")
    .option("-p, --prepare", "Prepare static content")
    .option("-s, --static", "Prepare static content")
    .action(buildAction);
}