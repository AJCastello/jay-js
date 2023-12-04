import { IBaseElement } from "../BaseElement/BaseElement.types.js";

interface ILoadingExt extends IBaseElement {
  type?: "loading-spinner" | "loading-dots" | "loading-ring" | "loading-ball" | "loading-bars" | "loading-infinity";
  size?: "loading-xs" | "loading-sm" | "loading-md" | "loading-lg";
}

export type ILoading = ILoadingExt & Partial<Omit<HTMLSpanElement, "style">>;