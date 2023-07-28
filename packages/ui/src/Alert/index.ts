import { Icon, Section, ISection, Typography } from "..";

type AlertSeverity = "alert-error" | "alert-warning" | "alert-info" | "alert-success";

export interface IAlert extends ISection {
  severity: AlertSeverity;
  className?: string;
}

type IconsNames = "ph-warning-circle" | "ph-warning" | "ph-info" | "ph-check-circle";

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
    "alert-error": "ph-warning-circle",
    "alert-warning": "ph-warning",
    "alert-info": "ph-info",
    "alert-success": "ph-check-circle",
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
        Icon({ icon: `ph-duotone ${icons[severity]}` }),
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
