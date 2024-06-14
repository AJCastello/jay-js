// libs
import { Command } from "commander";
import { i18nAction } from "../action/i18nAction";

export function registerI18nCommand(program: Command) {
  program
    .command("i18n <resource:value>")
    .alias("intl")
    .description("Create a structured context for your project")
    .option("-t, --translate", "Create a method to manage some private state")
    .action(i18nAction);
}
