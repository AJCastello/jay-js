import * as yup from "yup";
import { createHelperMessage } from "../modules/createHelperMessage";
import { changeClass } from "./changeClass";
import { useFormOptions } from "../modules/useFormDefineOptions";

export function updateUI(element: HTMLElement, error: yup.ValidationError | null) {
  if (useFormOptions.showHelper) {

    const helper = element.closest(".form-control")?.querySelector(`[data-helper="${element.id}"]`) as HTMLElement;
    if (helper) {
      if (error) {
        if (useFormOptions.customHelperContainer) {
          helper.content = useFormOptions.customHelperContainer(error);
        } else {
          helper.content = createHelperMessage(error);
        }
      } else {
        helper.content = "";
      }
    }
  }

  if (error) {
    changeClass(element, error.type?.startsWith("warning") ? "input-warning" : "input-error");
  } else {
    changeClass(element);
  }
}