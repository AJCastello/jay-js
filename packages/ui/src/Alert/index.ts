import { Icon, Section, ISection, Typography } from "..";

export interface IAlert extends ISection {
  severity: string;
  className?: string;
}

type IconsType = {
  [key: string]: string;
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

  const alert = Section({
    className: `alert alert-${severity} ${className || ""}`,
    content: Section({
      content: [
        Icon({ icon: icons[`alert-${severity}`] }),
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
