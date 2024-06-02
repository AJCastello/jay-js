import chalk from "chalk";
import { Command } from "commander";
import inquirer, { QuestionCollection } from "inquirer";
import { init } from "../index.js";
// import { face } from "../../../utils/terminal.js";

export function registerInitCommand(program: Command) {
  program
    .command("init")
    .description("Starts the project setup")
    .action(() => {
      console.log(chalk.bold("Welcome to the Jay JS CLI setup"));
      console.log(chalk.gray.italic("You can abort the installation at any time by pressing Ctrl+C.\n"));

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
            { name: chalk.blueBright("TypeScript"), value: "ts" },
            { name: chalk.yellow("JavaScript"), value: "js" },
          ],
          loop: false,
        },
        {
          type: "list",
          name: "buildTool",
          message: "What build tool do you want to use?",
          choices: [
            { name: chalk.greenBright("Vite"), value: "vite" }
          ],
          loop: false,
        },
        {
          type: "list",
          name: "projectType",
          message: "What is the project type?",
          choices: [
            { name: `${chalk.greenBright("SPA/PWA")} ${chalk.italic.gray("Single page app/Web app")}`, value: "spa" },
            { name: `${chalk.blueBright("Content/Static site")} ${chalk.italic.gray("Compiles to static files")}`, value: "static" },
          ],
          loop: false,
        },
        {
          type: "list",
          name: "languageType",
          message: "Is the project single or multi-language?",
          choices: [
            { name: chalk.yellow("Single language"), value: "single" },
            { name: chalk.blueBright("Multi-language"), value: "multi" },
          ],
          loop: false,
        },
        // {
        //   when: (answers) => answers.languageType === "multi",
        //   type: "input",
        //   name: "defaultLanguage",
        //   message: chalk.bold("Enter the default language code (e.g., en-us):\n") +
        //     new inquirer.Separator("Other languages can be added later using the i18n command of the Jay JS CLI"),
        //   default: "en-us",
        // },
        {
          type: "confirm",
          name: "installUIPackage",
          message: `${chalk.bold("Install the @jay-js/ui package?")} ${chalk.italic.gray("(Recommended)")}`,
          default: true,
        },
        {
          when: (answers) => answers.installUIPackage,
          type: "list",
          name: "cssLibrary",
          message: chalk.bold("Tailwind CSS component plugin:"),
          choices: [
            new inquirer.Separator("It integrate seamlessly with @jay-js/ui leveraging its class names for styling."),
            { name: chalk.blueBright("daisyUI"), value: "daisyui" },
          ],
          loop: false,
        },
        // {
        //   type: "confirm",
        //   name: "useThemeProvider",
        //   message: chalk.bold("Do you want to use the theme provider utility? (recommended)\n") +
        //     new inquirer.Separator("useThemeProvider from @jay-js/ui utility to handle dark mode and other theme settings.\n"),
        //   default: true,
        // },
        {
          type: "confirm",
          name: "useJSX",
          message: "Would you like to use JSX?",
          default: true,
        },
        {
          type: "list",
          name: "installDependencies",
          message: "Install dependencies?",
          choices: [
            { name: chalk.red.italic("No, I will install them myself"), value: "none" },
            { name: `${chalk.blueBright("PNPM")} ${chalk.gray.italic("(Recommended)")}`, value: "pnpm" },
            { name: chalk.yellow("NPM"), value: "npm" },
            { name: chalk.greenBright("Yarn"), value: "yarn" },
          ],
          loop: false
        },
      ];

      inquirer
        .prompt(questions)
        .then(async (options) => {
          //const { init } = await import("../index.js");
          await init(options);
          // face.endProgress();
          // console.log(chalk.greenBright.bold(`✔ Project ${options.projectName} has been successfully set up!`));
        });
    });
}