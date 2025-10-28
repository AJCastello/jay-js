import { vi } from 'vitest';
import { lazyOptions, moduleCache, setLazyOptions } from "../configuration.js";

describe("Lazy Configuration", () => {
	beforeEach(() => {
		moduleCache.clear();
		Object.assign(lazyOptions, {});
	});

	describe("moduleCache", () => {
		it("should store and retrieve modules correctly", () => {
			const mockModule = vi.fn();

			moduleCache.set("TestModule", {
				module: mockModule,
				lastUsed: 0,
				collect: true,
			});

			const cachedModule = moduleCache.get("TestModule");

			expect(cachedModule).toBeDefined();
			expect(cachedModule?.module).toBe(mockModule);
			expect(cachedModule?.lastUsed).toBe(0);
			expect(cachedModule?.collect).toBe(true);
		});

		it("should check if a module exists in cache", () => {
			const mockModule = vi.fn();

			moduleCache.set("TestModule", {
				module: mockModule,
				lastUsed: 0,
				collect: true,
			});

			expect(moduleCache.has("TestModule")).toBe(true);
			expect(moduleCache.has("NonExistentModule")).toBe(false);
		});

		it("should delete modules from cache", () => {
			const mockModule = vi.fn();

			moduleCache.set("TestModule", {
				module: mockModule,
				lastUsed: 0,
				collect: true,
			});

			moduleCache.delete("TestModule");

			expect(moduleCache.has("TestModule")).toBe(false);
		});

		it("should clear all modules from cache", () => {
			moduleCache.set("Module1", {
				module: vi.fn(),
				lastUsed: 0,
				collect: true,
			});

			moduleCache.set("Module2", {
				module: vi.fn(),
				lastUsed: 0,
				collect: true,
			});

			moduleCache.clear();

			expect(moduleCache.has("Module1")).toBe(false);
			expect(moduleCache.has("Module2")).toBe(false);
		});
	});

	describe("configureLazy", () => {
		it("should update lazyOptions with provided configuration", () => {
			setLazyOptions({
				gcThreshold: 180000,
				gcInterval: 45000,
			});

			expect(lazyOptions).toEqual({
				gcThreshold: 180000,
				gcInterval: 45000,
			});
		});

		it("should partially update lazyOptions when only some options are provided", () => {
			setLazyOptions({
				gcThreshold: 300000,
			});

			expect(lazyOptions.gcThreshold).toBe(300000);
			expect(lazyOptions.gcInterval).toBe(45000);
		});

		it("should not update properties if undefined values are provided", () => {
			setLazyOptions({
				gcThreshold: undefined,
				gcInterval: undefined,
			});

			expect(lazyOptions.gcThreshold).toBe(300000);
			expect(lazyOptions.gcInterval).toBe(45000);
		});
	});
});
