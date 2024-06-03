// modules
import { createLocale } from "../modules/createLocale";
import { addText } from "../modules/addText";

// types
import { TArgument, TOptions } from "../types";

export function i18nAction(argument: TArgument, options: TOptions) {
  const [resource, value] = argument.split(":");
  const { translate } = options;

  switch (resource) {
    case "c":
    case "create":
      createLocale({ value });
      break;
    case "add":
      addText({ value, translate });
      break;
    default:
      console.error(`Error: Invalid resource "${resource}".`);
      break;
  }
}
