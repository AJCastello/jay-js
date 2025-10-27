import type { Command } from "commander";
import { ui } from "../action/ui-action.js";

export function registerUiCommand(program: Command) {
	const uiCmd = program.command("ui").description("Manage UI components");

	uiCmd
		.command("add")
		.description("Add UI component(s) to your project")
		.argument("<components...>", "Component name(s) to add (e.g., card, card-title, button)")
		.action(async (components: string[]) => {
			await ui(components);
		});
}
