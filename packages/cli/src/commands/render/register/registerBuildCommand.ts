import { Command } from "commander";

export function registerBuildCommand(program: Command) {
  program
    .command("build")
    .description("Compiling the project")
    .option("--static", "Compiles the project to a static site")
    .action(async (options) => {
      if (options.static) {
        const { render } = await import("../index.js");
        await render();
      } else {
        console.log("Other build options are not yet available");
      }
    });
}