import { Command } from "commander";

export function registerPrepareCommand(program: Command) {
  program
    .command("prepare")
    .description("Prepare content for static site generation")
    .option("--static", "Prepare static content")
    .action(async (options) => {
      const { prepare } = await import("../index.js");
      await prepare();
    });
}