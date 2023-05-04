import { Icon, Section, ISection, Typography } from "..";

type AlertSeverity = "alert-error" | "alert-warning" | "alert-info" | "alert-success";

export interface IAlert extends ISection {
  severity: AlertSeverity;
  className?: string;
}

type IconsNames = "circle-exclamation" | "triangle-exclamation" | "circle-info" | "circle-check";

type IconsType = {
  [key in AlertSeverity]: IconsNames;
};

export function Alert({
  severity,
  content,
  className,
  ...props
}: IAlert): HTMLDivElement {

  const icons: IconsType = {
    "alert-error": "circle-exclamation",
    "alert-warning": "triangle-exclamation",
    "alert-info": "circle-info",
    "alert-success": "circle-check",
  };

  const classNames = [
    "alert",
    severity,
    className || "",
  ].filter(Boolean).join(" ").trim();

  const alert = Section({
    className: classNames,
    content: Section({
      content: [
        Icon({ icon: icons[severity] }),
        Typography({
          variant: "span",
          content: content,
        }),
      ],
    }),
    ...props
  });

  return alert;
}
