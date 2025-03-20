import { LazyModule } from "../lazy-module.js";
import { moduleCache } from "../configuration.js";
import * as moduleLoader from "../module-loader.js";

// Mock the moduleLoader functions
jest.mock("../module-loader.js", () => ({
  loadFromCache: jest.fn(),
  loadModule: jest.fn()
}));

// Mock the uniKey function
jest.mock("../../../utils/index.js", () => ({
  uniKey: jest.fn(() => "test-key-123")
}));

describe("LazyModule", () => {
  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();
    
    // Clear the module cache
    moduleCache.clear();
    
    // Mock implementation of loadFromCache
    (moduleLoader.loadFromCache as jest.Mock).mockImplementation(() => {
      const element = document.createElement("div");
      element.textContent = "Cached Module";
      return element;
    });
    
    // Mock implementation of loadModule
    (moduleLoader.loadModule as jest.Mock).mockImplementation((lazy, moduleSection) => {
      const element = document.createElement("div");
      element.textContent = "Loaded Module";
      return element;
    });
  });

  it("should throw an error when module is undefined", () => {
    expect(() => {
      LazyModule(undefined as any);
    }).toThrow("Module is undefined");
  });

  it("should generate a default module ID when module name is not provided", () => {
    const lazyConfig = {
      import: jest.fn(() => Promise.resolve({ default: () => {} }))
    };
    
    LazyModule(lazyConfig);
    
    expect(moduleLoader.loadModule).toHaveBeenCalledWith(
      expect.objectContaining({
        module: "default_test-key-123",
        import: lazyConfig.import
      }),
      expect.any(HTMLElement)
    );
  });

  it("should return from cache when module is already cached", () => {
    const lazyConfig = {
      module: "TestModule",
      import: jest.fn(() => Promise.resolve({ TestModule: () => {} }))
    };
    
    // Add the module to cache
    moduleCache.set("TestModule", {
      module: () => {},
      lastUsed: 0,
      collect: true
    });
    
    LazyModule(lazyConfig);
    
    expect(moduleLoader.loadFromCache).toHaveBeenCalledWith(lazyConfig);
    expect(moduleLoader.loadModule).not.toHaveBeenCalled();
  });

  it("should call loadModule when module is not cached", () => {
    const lazyConfig = {
      module: "TestModule",
      import: jest.fn(() => Promise.resolve({ TestModule: () => {} }))
    };
    
    LazyModule(lazyConfig);
    
    expect(moduleLoader.loadFromCache).not.toHaveBeenCalled();
    expect(moduleLoader.loadModule).toHaveBeenCalledWith(
      lazyConfig,
      expect.any(HTMLElement)
    );
  });

  it("should use custom loader element when provided", () => {
    const lazyConfig = {
      module: "TestModule",
      import: jest.fn(() => Promise.resolve({ TestModule: () => {} }))
    };
    
    const customLoader = document.createElement("custom-loader");
    customLoader.textContent = "Loading...";
    
    LazyModule(lazyConfig, customLoader);
    
    expect(moduleLoader.loadModule).toHaveBeenCalledWith(
      lazyConfig,
      customLoader
    );
  });

  it("should use default element when loader is not provided", () => {
    const lazyConfig = {
      module: "TestModule",
      import: jest.fn(() => Promise.resolve({ TestModule: () => {} }))
    };
    
    LazyModule(lazyConfig);
    
    expect(moduleLoader.loadModule).toHaveBeenCalledWith(
      lazyConfig,
      expect.any(HTMLElement)
    );
    
    // Verify that the default element is jayjs-lazy-slot
    const moduleSection = (moduleLoader.loadModule as jest.Mock).mock.calls[0][1];
    expect(moduleSection.tagName.toLowerCase()).toBe("jayjs-lazy-slot");
  });
});