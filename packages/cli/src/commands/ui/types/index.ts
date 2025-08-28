export interface ComponentDownloadOptions {
  components: string[];
  targetPath?: string;
}

export interface GitHubApiFile {
  name: string;
  path: string;
  type: "file" | "dir";
  download_url: string;
  size: number;
}