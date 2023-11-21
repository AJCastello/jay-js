import * as yup from "yup";
import { createHelperMessage } from "../modules/createHelperMessage.js";
import { changeClass } from "./changeClass.js";
import { useFormOptions } from "../modules/useFormDefineOptions.js";

export function updateUI(element: HTMLElement, error: yup.ValidationError | null) {
  if (useFormOptions.showHelper) {
    const helper = element.closest(".form-control")?.querySelector(`[data-helper="${element.id}"]`) as HTMLElement;
    if (helper) {
      helper.innerHTML = "";
      if (error) {
        if (useFormOptions.customHelperContainer) {
          helper.append(useFormOptions.customHelperContainer(error));
        } else {
          helper.append(createHelperMessage(error));
        }
      }
    }
  }
  if (error) {
    changeClass(element, error.type?.startsWith("warning") ? "input-warning" : "input-error");
  } else {
    changeClass(element);
  }
}