// types
import { TBuildCommandOptions } from "../types";
import { faceChalk, log } from "../../../utils/terminal";
import inquirer, { QuestionCollection } from "inquirer";

export function buildAction(options: TBuildCommandOptions) {
  function handleBuildCommand(options: TBuildCommandOptions) {
    if (options.prepare) {
      log`Preparing {italic.yellow content}...`;
      return;
    }
    if (options.static) {
      log`Building {italic.blue static} content...`;
      return;
    }
  }

  handleBuildCommand(options);

  const questions: QuestionCollection<{ features: string }> = [
    {
      type: "list",
      name: "features",
      message: "Choose the features/layers you want to add:",
      choices: [
        { name: faceChalk`{yellow Prepare} {italic.gray (search and transform markdown files)}`, value: "prepare" },
        { name: faceChalk`{blue Static} {italic.gray (compiles to static files)}`, value: "static" }
      ],
      loop: false,
    }
  ];

  inquirer
    .prompt(questions)
    .then(async (options) => {
      const { features } = options;
      const featureBoolean = {
        prepare: features === "prepare",
        static: features === "static"
      }
      handleBuildCommand(featureBoolean);
      log`{gray {green ✔}  Project has been successfully built!}`;
    });
}