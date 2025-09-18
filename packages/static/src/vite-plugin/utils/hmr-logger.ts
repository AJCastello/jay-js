export class HMRLogger {
  private isDev: boolean = false;

  constructor(isDev: boolean = false) {
    this.isDev = isDev;
  }

  info(message: string, ...args: any[]) {
    if (this.isDev) {
      console.log(`[jay-js-vite] ${message}`, ...args);
    }
  }

  success(message: string, ...args: any[]) {
    if (this.isDev) {
      console.log(`✅ [jay-js-vite] ${message}`, ...args);
    }
  }

  warn(message: string, ...args: any[]) {
    if (this.isDev) {
      console.warn(`⚠️  [jay-js-vite] ${message}`, ...args);
    }
  }

  error(message: string, error?: any) {
    console.error(`❌ [jay-js-vite] ${message}`, error);
  }

  hmrUpdate(type: 'markdown' | 'collection', filename: string, collectionName?: string) {
    if (!this.isDev) return;

    switch (type) {
      case 'markdown':
        this.success(`HMR: Updated Markdown file: ${filename}${collectionName ? ` → Collection: ${collectionName}` : ''}`);
        break;
      case 'collection':
        this.success(`HMR: Updated collection: ${filename}`);
        break;
    }
  }

  collectionRebuilt(collectionName: string, fileCount?: number) {
    if (this.isDev) {
      this.success(`HMR: Rebuilt collection "${collectionName}"${fileCount ? ` (${fileCount} files)` : ''}`);
    }
  }
}

export const hmrLogger = new HMRLogger(process.env.NODE_ENV === 'development');