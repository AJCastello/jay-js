import { Section, BaseElement, Typography, IBaseElement } from "..";

// imask
import IMask from "imask";

// style
import "./Input.style.css";

interface Helper {
  className?: string;
  label: string;
}

type FormControlContent = string | HTMLElement | Node | (string | HTMLElement | Node)[]

export interface IInput extends IBaseElement {
  type?: string;
  value?: string;
  label?: string;
  labelAlt?: string;
  helpers?: Array<Helper>;
  className?: string;
  placeholder?: string;
  bordered?: boolean;
  ghost?: boolean;
  color?: "input-primary" |  "input-secondary" |  "input-accent" |  "input-success" |  "input-warning" |  "input-info" |  "input-error" ;
  size?: "input-lg" | "input-md" | "input-sm" | "input-xs";
  mask?: any;
  startAdornment?: (inputElement: HTMLInputElement) => HTMLElement;
  endAdornment?: (inputElement: HTMLInputElement) => HTMLElement;
}

export function Input({
  type,
  value,
  label,
  labelAlt,
  helpers,
  className,
  placeholder,
  bordered,
  ghost,
  color,
  size,
  mask,
  startAdornment,
  endAdornment,
  ...props
}: IInput & Partial<HTMLInputElement>): HTMLInputElement | HTMLDivElement {

  const classNameProps = [
    "input",
    bordered ? "input-bordered" : "",
    ghost ? "input-ghost" : "",
    color,
    size,
    className || "",
    "input-placeholder"
  ].filter(Boolean).join(" ").trim();

  // Create the input element 
  const inputElement = BaseElement({
    tag: "input",
    className: classNameProps,
    ...props
  }) as HTMLInputElement;

  type && (inputElement.type = type);
  value && (inputElement.value = value);
  inputElement.placeholder = " ";

  if (mask) {
    IMask(inputElement, mask);
  }

  const formControlContent: FormControlContent = [];

  // Create startAdornment and endAdornment containers if provided
  const startAdornmentContainer = startAdornment && Section({
    className: "absolute left-3 top-1/2 z-10 transform -translate-y-1/2",
    content: startAdornment(inputElement)
  });

  const endAdornmentContainer = endAdornment && Section({
    className: "absolute right-3 top-1/2 z-10 transform -translate-y-1/2",
    content: endAdornment(inputElement)
  });

  // Create and append the label if provided
  if (label) {
    const labelElement = BaseElement({
      tag: "label",
      className: "label",
    });

    const labelText = Typography({
      variant: "span",
      className: "label-text",
      content: label,
    });

    labelElement.append(labelText);

    if (labelAlt) {
      const labelTextAlt = Typography({
        variant: "span",
        className: "label-text-alt",
        content: labelAlt,
      });
      labelElement.append(labelTextAlt);
    }
    formControlContent.push(labelElement);
  }

  if (placeholder) {
    const placeholderElement = Typography({
      variant: "label",
      className: "input-placeholder-label bg-base-100 rounded px-2",
      content: placeholder
    });

    formControlContent.push(Section({
      className: "relative w-full flex flex-col",
      content: [inputElement, placeholderElement]
    }));
  } else {
    formControlContent.push(inputElement);
  }

  // Create and append the helpers if provided
  if (helpers) {
    const helperElement = BaseElement({
      tag: "label",
      className: "label",
    });
    helpers.forEach((helper) => {
      const helperText = Typography({
        variant: "span",
        className: `label-text-alt ${helper.className || ""}`.trim(),
        content: helper.label,
      });

      helperElement.append(helperText);
    });
    formControlContent.push(helperElement);
  }

  // Append startAdornment and endAdornment containers if provided
  startAdornmentContainer && formControlContent.push(startAdornmentContainer);
  endAdornmentContainer && formControlContent.push(endAdornmentContainer);

  // TODO: allow for custom styles
  const formControl = Section({
    className: "form-control relative",
    content: formControlContent
  });

  return formControl;
}

