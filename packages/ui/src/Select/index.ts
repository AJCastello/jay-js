import { BaseElement, IBaseElement, Typography } from "..";

type Helper = {
  className?: string;
  label: string;
};

export interface ISelect extends IBaseElement {
  className?: string;

  bordered?: boolean;
  ghost?: boolean;

  color?: "select-primary" | "select-secondary" | "select-accent" | "select-success" | "select-warning" | "select-info" | "select-error";
  size?: "select-lg" | "select-md" | "select-sm" | "select-xs";

  options?: Array<Partial<HTMLOptionElement>>,
  label?: string;
  labelAlt?: string;
  helpers?: Array<Helper>;
  disabled?: boolean;
  value?: string;
}

export function Select({
  className,
  bordered,
  ghost,
  size,
  color,
  options,
  label,
  labelAlt,
  helpers,
  disabled,
  value,
  ...props
}: ISelect) {

  const classNameData = [
    "select",
    bordered ? "select-bordered" : "",
    ghost ? "select-ghost" : "",
    size,
    color,
    className || "",
  ].filter(Boolean).join(" ").trim();

  const selectElement = BaseElement({
    tag: "select",
    className: classNameData,
    ...props,
  }) as HTMLSelectElement;

  if (disabled) {
    selectElement.setAttribute("disabled", "");
  }

  options &&
    options.forEach((option) => {
      // TODO: Conditional types
      const opt = BaseElement({
        tag: "option",
      }) as HTMLOptionElement;

      // TODO: Add support for optgroups (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup)
      option.value && (opt.value = option.value);
      option.label && (opt.text = option.label);
      opt.disabled = option.disabled || false;
      opt.selected = value === option.value || false;

      selectElement.append(opt);
    });

  if (label || helpers) {
    const formControl = BaseElement({
      tag: "div",
      className: "form-control",
    });

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
      formControl.append(labelElement);
    }

    formControl.append(selectElement);

    if (helpers) {
      const helperElement = BaseElement({
        tag: "label",
        className: "label",
      });
      helpers.forEach((helper) => {

        const helperText = Typography({
          variant: "span",
          className: `label-text-alt ${helper.className || ""}`,
          content: helper.label,
        });

        helperElement.append(helperText);
      });
      formControl.append(helperElement);
    }
    return formControl;
  }
  return selectElement;
}
