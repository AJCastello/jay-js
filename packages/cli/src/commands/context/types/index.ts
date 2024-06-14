export type TContextCommandArgument = "create" | "c" | "add";

export type TContextCommandOptions = {
  state: string;
  action: string;
  storage: string;
  privateState: string;
  description: string;
};

export type IContextOptions = {
  states: boolean;
  action: boolean;
  storage: boolean;
  spec: boolean;
};

export interface ITemplateFiles {
  [key: string]: (contextName: string, storage: boolean) => string;
}
