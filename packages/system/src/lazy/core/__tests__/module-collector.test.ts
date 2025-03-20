import { moduleCollector, startModuleCollection, stopModuleCollection } from "../module-collector.js";
import { moduleCache, lazyOptions } from "../configuration.js";

jest.useFakeTimers();

describe("ModuleCollector", () => {
  beforeEach(() => {
    // Reset moduleCache and clear all interval timers
    moduleCache.clear();
    jest.clearAllTimers();
    
    // Reset lazyOptions
    Object.assign(lazyOptions, {
      gcThreshold: 300000, // 5 minutes
      gcInterval: 60000    // 1 minute
    });
    
    // Stop collection to ensure clean state
    stopModuleCollection();
  });
  
  afterEach(() => {
    // Stop collection after each test
    stopModuleCollection();
  });
  
  it("should start and stop module collection", () => {
    // Start collection
    startModuleCollection();
    
    // Check if interval is set
    expect(moduleCollector.interval).not.toBeNull();
    
    // Stop collection
    stopModuleCollection();
    
    // Check if interval is cleared
    expect(moduleCollector.interval).toBeNull();
  });
  
  it("should collect modules that exceed threshold time", () => {
    // Add modules to cache
    const testModule1 = () => document.createElement("div");
    const testModule2 = () => document.createElement("div");
    const testModule3 = () => document.createElement("div");
    
    moduleCache.set("module1", {
      module: testModule1,
      lastUsed: Date.now() - 600000, // 10 minutes ago (exceeds threshold)
      collect: true
    });
    
    moduleCache.set("module2", {
      module: testModule2,
      lastUsed: Date.now() - 100000, // Just under 2 minutes ago (under threshold)
      collect: true
    });
    
    moduleCache.set("module3", {
      module: testModule3,
      lastUsed: Date.now() - 900000, // 15 minutes ago (exceeds threshold)
      collect: false // But collect is false
    });
    
    // Start collection
    startModuleCollection();
    
    // Run timers
    jest.advanceTimersByTime(60000); // 1 minute (one GC cycle)
    
    // Check what was collected
    expect(moduleCache.has("module1")).toBe(false); // Should be collected
    expect(moduleCache.has("module2")).toBe(true);  // Should not be collected
    expect(moduleCache.has("module3")).toBe(true);  // Should not be collected (collect=false)
  });
  
  it("should not collect modules when last used is 0", () => {
    // Add module to cache with lastUsed = 0 (currently in use)
    const testModule = () => document.createElement("div");
    moduleCache.set("activeModule", {
      module: testModule,
      lastUsed: 0, // Currently in use
      collect: true
    });
    
    // Start collection
    startModuleCollection();
    
    // Run timers
    jest.advanceTimersByTime(60000); // 1 minute (one GC cycle)
    
    // Check module was not collected
    expect(moduleCache.has("activeModule")).toBe(true);
  });
  
  it("should run collection at the configured interval", () => {
    // Set custom interval
    lazyOptions.gcInterval = 30000; // 30 seconds
    
    // Add module to cache
    const testModule = () => document.createElement("div");
    moduleCache.set("oldModule", {
      module: testModule,
      lastUsed: Date.now() - 600000, // 10 minutes ago (exceeds threshold)
      collect: true
    });
    
    // Start collection
    startModuleCollection();
    
    // Run timers for less than interval
    jest.advanceTimersByTime(20000); // 20 seconds
    
    // Check module has not been collected yet
    expect(moduleCache.has("oldModule")).toBe(true);
    
    // Run timers to complete interval
    jest.advanceTimersByTime(10000); // Additional 10 seconds
    
    // Check module was collected
    expect(moduleCache.has("oldModule")).toBe(false);
  });
  
  it("should use custom threshold for module collection", () => {
    // Set custom threshold
    lazyOptions.gcThreshold = 120000; // 2 minutes
    
    // Add modules to cache
    const testModule1 = () => document.createElement("div");
    const testModule2 = () => document.createElement("div");
    
    moduleCache.set("module1", {
      module: testModule1,
      lastUsed: Date.now() - 180000, // 3 minutes ago (exceeds new threshold)
      collect: true
    });
    
    moduleCache.set("module2", {
      module: testModule2,
      lastUsed: Date.now() - 90000, // 1.5 minutes ago (under new threshold)
      collect: true
    });
    
    // Start collection
    startModuleCollection();
    
    // Run timers
    jest.advanceTimersByTime(60000); // 1 minute (one GC cycle)
    
    // Check what was collected
    expect(moduleCache.has("module1")).toBe(false); // Should be collected
    expect(moduleCache.has("module2")).toBe(true);  // Should not be collected
  });
});