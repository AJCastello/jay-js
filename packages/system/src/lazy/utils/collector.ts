import { IImportedModule, ILazyOptions } from "../types.js";
import { moduleCache, lazyOptions, addConfigChangeListener, removeConfigChangeListener } from "../core/configuration.js";

export class ModuleCollector {
  private static instance: ModuleCollector | null = null;
  private collectorInterval: ReturnType<typeof setInterval> | null = null;
  private idleTime = 0;
  private idleOptions = {
    passive: true,
    capture: true
  };

  private constructor() {
    this.setupEventListeners();
    this.startCollector();
    this.setupIdleMonitor();
    addConfigChangeListener(this.handleConfigChange.bind(this));
  }

  public static getInstance(): ModuleCollector {
    if (!ModuleCollector.instance) {
      ModuleCollector.instance = new ModuleCollector();
    }
    return ModuleCollector.instance;
  }

  private handleConfigChange(options: ILazyOptions): void {
    if (this.collectorInterval) {
      clearInterval(this.collectorInterval);
      this.startCollector();
    }
  }

  private setupEventListeners(): void {
    window.addEventListener("mousemove", this.resetIdle.bind(this), this.idleOptions);
    window.addEventListener("keypress", this.resetIdle.bind(this), this.idleOptions);
  }

  private resetIdle(): void {
    this.idleTime = 0;
    if (!this.collectorInterval) {
      this.startCollector();
    }
  }

  private startCollector(): void {
    this.collectorInterval = setInterval(
      this.runCollector.bind(this), 
      lazyOptions.gcInterval || 60000
    );
  }

  private runCollector(): void {
    const toRemove = [];
    const gcThreshold = lazyOptions.gcThreshold ? lazyOptions.gcThreshold / 60000 : 5;
    
    for (const [key, module] of moduleCache) {
      if (module.lastUsed > gcThreshold && module.collect) {
        toRemove.push({ key, module });
      } else {
        module.lastUsed++;
      }
    }
    
    for (const { key, module } of toRemove) {
      moduleCache.delete(key);
      module.lastUsed = 0;
      module.collect = false;
    }
    
    if (toRemove.length > 0) {
      console.log("Garbage collector removed modules:", toRemove.map(item => item.key));
    }

    this.idleTime++;
    if (this.idleTime > 6) {
      if (this.collectorInterval) {
        clearInterval(this.collectorInterval);
        this.collectorInterval = null;
      }
      
      for (const [_, module] of moduleCache) {
        module.lastUsed = 0;
      }
    }
  }

  private setupIdleMonitor(): void {
    setInterval(() => {
      this.idleTime++;
      if (this.idleTime > 3) {
        for (const [_, module] of moduleCache) {
          module.lastUsed = 0;
        }
      }
    }, 60000);
  }

  public dispose(): void {
    if (this.collectorInterval) {
      clearInterval(this.collectorInterval);
      this.collectorInterval = null;
    }
    window.removeEventListener("mousemove", this.resetIdle.bind(this), this.idleOptions);
    window.removeEventListener("keypress", this.resetIdle.bind(this), this.idleOptions);
    removeConfigChangeListener(this.handleConfigChange.bind(this));
    ModuleCollector.instance = null;
  }
}

// Initialize the collector singleton
ModuleCollector.getInstance();