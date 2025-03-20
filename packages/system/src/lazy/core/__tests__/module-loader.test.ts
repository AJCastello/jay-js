import { loadFromCache, loadModule } from "../module-loader.js";
import { moduleCache, lazyOptions } from "../configuration.js";
import { TLazyModule } from "../../types.js";

const mockReplaceWith = jest.fn();

describe("Module Loader", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    moduleCache.clear();

    Object.assign(lazyOptions, {
      gcThreshold: 300000,
      gcInterval: 60000
    });
  });

  describe("loadFromCache", () => {
    it("should load a module from cache", () => {
      const mockModule = jest.fn(() => document.createElement("div"));
      moduleCache.set("TestModule", {
        module: mockModule,
        lastUsed: 5,
        collect: true
      });

      const config: TLazyModule = {
        module: "TestModule",
        import: jest.fn(),
        props: { test: "value" }
      };

      const result = loadFromCache(config);

      expect(mockModule).toHaveBeenCalledWith({ test: "value" });
      expect(moduleCache.get("TestModule")?.lastUsed).toBe(0);
      expect(result).toBeInstanceOf(HTMLElement);
    });

    it("should throw an error when module is not found in cache", () => {
      const config: TLazyModule = {
        module: "NonExistentModule",
        import: jest.fn()
      };

      expect(() => loadFromCache(config)).toThrow("Module NonExistentModule not found in cache");
    });
  });

  describe("loadModule", () => {
    beforeEach(() => {
      Element.prototype.replaceWith = mockReplaceWith;
    });

    it("should load a named export module successfully", async () => {
      const mockModuleFn = jest.fn(() => document.createElement("div"));
      const mockImportFn = jest.fn(() => Promise.resolve({
        TestModule: mockModuleFn
      }));

      const config: TLazyModule = {
        module: "TestModule",
        import: mockImportFn,
        props: { test: "value" }
      };

      const moduleSection = document.createElement("div");

      await loadModule(config, moduleSection);

      expect(mockImportFn).toHaveBeenCalled();
      expect(moduleCache.has("TestModule")).toBe(true);
      expect(moduleCache.get("TestModule")?.module).toBe(mockModuleFn);
      expect(moduleCache.get("TestModule")?.lastUsed).toBe(0);
      expect(moduleCache.get("TestModule")?.collect).toBe(true);
      expect(mockReplaceWith).toHaveBeenCalled();
    });

    it("should handle default export when named export is not found", async () => {
      const mockDefaultFn = jest.fn(() => document.createElement("div"));
      const mockImportFn = jest.fn(() => Promise.resolve({
        default: mockDefaultFn
      }));

      const config: TLazyModule = {
        module: "TestModule",
        import: mockImportFn
      };

      const moduleSection = document.createElement("div");
      const consoleSpy = jest.spyOn(console, "warn").mockImplementation();

      await loadModule(config, moduleSection);

      expect(consoleSpy).toHaveBeenCalledWith(
        "Named export 'TestModule' not found, using default export instead."
      );
      expect(moduleCache.has("TestModule")).toBe(true);
      expect(moduleCache.get("TestModule")?.module).toBe(mockDefaultFn);

      consoleSpy.mockRestore();
    });

    it("should respect collect property from config", async () => {
      const mockModuleFn = jest.fn(() => document.createElement("div"));
      const mockImportFn = jest.fn(() => Promise.resolve({
        TestModule: mockModuleFn
      }));

      const config: TLazyModule = {
        module: "TestModule",
        import: mockImportFn,
        collect: false
      };

      const moduleSection = document.createElement("div");

      await loadModule(config, moduleSection);

      expect(moduleCache.get("TestModule")?.collect).toBe(false);
    });

    it("should log error when module loading fails", async () => {
      const mockError = new Error("Import failed");
      const mockImportFn = jest.fn(() => Promise.reject(mockError));

      const config: TLazyModule = {
        module: "TestModule",
        import: mockImportFn
      };

      const moduleSection = document.createElement("div");
      const consoleSpy = jest.spyOn(console, "error").mockImplementation();

      await loadModule(config, moduleSection);

      expect(consoleSpy).toHaveBeenCalledWith(
        "Error importing module TestModule:",
        mockError
      );

      consoleSpy.mockRestore();
    });
  });
});