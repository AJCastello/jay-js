export interface IJayJsRunnerOptions {
  init: IInit;
  ctx: ICtx;
}

export interface ICtx {
  name: string;
  resources: IResources;
}

export interface IResources {
  actions: IAction[];
  states: IAction[];
}

export interface IAction {
  name: string;
  commit: string;
}

export interface IInit {
  name: string;
  variant: string;
  builder: string;
  type: string;
  i18n: boolean;
  jsx: boolean;
  ui: IUi;
  manager: IManager;
}

export interface IManager {
  install: string;
}

export interface IUi {
  type: string;
  plugin: string;
}