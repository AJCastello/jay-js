import type { Command } from "commander";
import { buildAction } from "../action/build-action";

export function registerBuildCommand(program: Command) {
	program
		.command("build")
		.description("Build content for static site generation")
		.option("-p, --prepare", "Prepare static content")
		.option("-s, --static", "Compile to static files")
		.action(buildAction);
}
