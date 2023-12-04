import { IBaseElement } from "../BaseElement/index.js";

export interface ITooltip extends IBaseElement {
  tip?: string;
  color?: "tooltip-primary" | "tooltip-secondary" | "tooltip-accent" | "tooltip-info" | "tooltip-success" | "tooltip-warning" | "tooltip-error";
  position?: "tooltip-top" | "tooltip-bottom" | "tooltip-left" | "tooltip-right";
  forceOpen?: boolean;
}
