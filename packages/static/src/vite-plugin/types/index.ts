export interface IJayJsViteOptions {
  contentPath: string;
}

export interface Metadata {
  [key: string]: any;
}

export interface IBuildCollection {
  contentPath: string;
  dir: string;
  format?: string;
  metadata?: Array<string>;
  suffix?: string;
}
