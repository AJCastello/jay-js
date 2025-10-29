import type { Command } from "commander";
import inquirer, { type QuestionCollection } from "inquirer";
import { faceChalk, log } from "../../../utils/terminal.js";
import { init } from "../action/initAction.js";

export function registerInitCommand(program: Command) {
	program
		.command("init")
		.description("Starts the project setup")
		.action(() => {
			log`{bold Welcome to the {green Jay JS} CLI setup}`;
			log`{gray You can abort the installation at any time by pressing Ctrl+C.}\n`;

			const questions: QuestionCollection<any> = [
				{
					type: "input",
					name: "projectName",
					message: "Enter the project name:",
					default: "jay-js-project",
				},
				{
					type: "list",
					name: "javascriptVariant",
					message: "Select a variant:",
					choices: [
						{ name: faceChalk`{blueBright TypeScript}`, value: "ts" },
						{ name: faceChalk`{yellow JavaScript}`, value: "js" },
					],
					loop: false,
				},
				{
					type: "list",
					name: "buildTool",
					message: "What build tool do you want to use?",
					choices: [{ name: faceChalk`{greenBright Vite}`, value: "vite" }],
					loop: false,
				},
				{
					type: "list",
					name: "type",
					message: "What is the project type?",
					choices: [
						{ name: faceChalk`{greenBright SPA/PWA} {italic.gray Single page app/Web app}`, value: "spa" },
						{
							name: faceChalk`{blueBright Content/Static site} {italic.gray Compiles to static files}`,
							value: "static",
						},
					],
					loop: false,
				},
				{
					type: "list",
					name: "language",
					message: "Is the project single or multi-language?",
					choices: [
						{ name: faceChalk`{yellow Single language}`, value: "single" },
						{ name: faceChalk`{blueBright Multi-language}`, value: "multi" },
					],
					loop: false,
				},
				// {
				//   when: (answers) => answers.language === "multi",
				//   type: "input",
				//   name: "defaultLanguage",
				//   message: "Enter the default language code (e.g., en-us):\n" +
				//     new inquirer.Separator("Other languages can be added later using the i18n command of the Jay JS CLI"),
				//   default: "en-us",
				// },
				{
					type: "confirm",
					name: "useJSX",
					message: "Would you like to use JSX?",
					default: true,
				},
				{
					type: "confirm",
					name: "useTests",
					message: faceChalk`{bold Would you like to set up tests?} {italic.gray (Recommended)}`,
					default: true,
				},
				{
					when: (answers) => answers.useTests,
					type: "list",
					name: "testLibrary",
					message: faceChalk`{bold Test library}`,
					choices: [
						new inquirer.Separator("Choose a testing library to set up tests."),
						{ name: faceChalk`{greenBright Vitest}`, value: "vitest" },
					],
					loop: false,
				},
				{
					type: "list",
					name: "installDependencies",
					message: "Install dependencies?",
					choices: [
						{ name: faceChalk`{red.italic No, I will install them myself}`, value: "none" },
						{ name: faceChalk`{yellow NPM} {italic.gray (Recommended)}`, value: "npm" },
						{ name: faceChalk`{blueBright Yarn}`, value: "yarn" },
						{ name: faceChalk`{green PNPM}`, value: "pnpm" },
					],
					loop: false,
				},
				// open with the code
			];

			inquirer.prompt(questions).then(async (options) => {
				await init(options);
			});
		});
}
