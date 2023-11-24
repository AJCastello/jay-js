#!/usr/bin/env node

// terminal
import chalk from "chalk";
import { Command } from "commander";
import inquirer, { QuestionCollection } from "inquirer";

const program = new Command();

program
  .command("build")
  .description("Compiling the project")
  .option("--static", "Compiles the project to a static site")
  .action(async (options) => {
    if (options.static) {
      const { render } = await import("../commands/render/index.js");
      await render();
    } else {
      console.log("Other build options are not yet available");
    }
  });

program
  .command("prepare")
  .description("Prepare content for static site generation")
  .option("--static", "Prepare static content")
  .action(async (options) => {
    const { prepare } = await import("../commands/prepare/index.js");
    await prepare();
  });

  

program
  .command("init")
  .description("Starts the project setup")
  .action(() => {
    console.log(chalk.bold("Welcome to the Jay JS CLI setup"));
    console.log("You can abort the installation at any time by pressing Ctrl+C.\n");

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
          { name: chalk.green("Vite"), value: "vite" }
        ],
        loop: false,
      },
      {
        type: "list",
        name: "projectType",
        message: "What is the project type?",
        choices: [
          { name: chalk.green("SPA/PWA - single page app / progressive enhancement (Web apps)"), value: "spa" },
          { name: chalk.blue("Content/static site - compiled to HTML, CSS, and JS (Blogs, Landing pages, etc.)"), value: "static" },
        ],
        loop: false,
      },
      {
        type: "list",
        name: "languageType",
        message: "Is the project single or multi-language?",
        choices: [
          { name: chalk.yellow("Single language"), value: "single" },
          { name: chalk.blue("Multi-language - will use @jay-js/system i18n package"), value: "multi" },
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
        message: chalk.bold("Install the @jay-js/ui package? (recommended)\n") +
          new inquirer.Separator("It also installs Tailwind CSS, PostCSS and autoprefixer as dependencies."),
        default: true,
      },
      {
        when: (answers) => answers.installUIPackage,
        type: "list",
        name: "cssLibrary",
        message: chalk.bold("Tailwind CSS component plugin:"),
        choices: [
          new inquirer.Separator("It integrate seamlessly with @jay-js/ui leveraging its class names for styling."),
          { name: chalk.blue("daisy UI (recommended)"), value: "daisyui" }
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
        type: "confirm",
        name: "installDependencies",
        message: "Do you want to install dependencies now (with PNPM)?",
        default: true,
      },
    ];

    inquirer
      .prompt(questions)
      .then(async (options) => {
        const { init } = await import("../commands/init/index.js");
        await init(options);
      });
  });

program.parse(process.argv);
