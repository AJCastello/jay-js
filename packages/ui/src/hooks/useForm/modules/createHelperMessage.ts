
import { Typography } from "../../../components";
import * as yup from "yup";

export function createHelperMessage(error: yup.ValidationError) {
  return Typography({
    children: error.message,
    className: "pl-1 pb-1 flex items-center text-sm"
  });
}
