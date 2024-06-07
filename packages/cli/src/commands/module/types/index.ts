export type TArgument = "create" | "c" | "add";

export type TOptions = {
  service: string;
  http: string;
  models: string;
  repository: string;
};

export interface ITemplateFiles {
  [key: string]: (moduleName: string, features: Array<string>) => string;
}