import { Typography } from "@jay-js/ui";
import * as yup from "yup";

export function createHelperMessage(error: yup.ValidationError) {
  return Typography({
    content: error.message,
    className: "pl-1 pb-1 flex items-center text-sm"
  });
}
