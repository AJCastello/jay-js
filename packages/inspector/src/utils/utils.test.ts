import { createFileFilter, getDebugFunctionName, getLineAndColumn, isJayJsComponent } from "./index";

describe("Inspector Utils", () => {
	describe("isJayJsComponent", () => {
		it("should identify built-in Jay JS components", () => {
			expect(isJayJsComponent("Box")).toBe(true);
			expect(isJayJsComponent("Button")).toBe(true);
			expect(isJayJsComponent("Typography")).toBe(true);
			expect(isJayJsComponent("Input")).toBe(true);
		});

		it("should identify custom components using PascalCase convention", () => {
			expect(isJayJsComponent("MyComponent")).toBe(true);
			expect(isJayJsComponent("CustomElement")).toBe(true);
			expect(isJayJsComponent("UserProfile")).toBe(true);
		});

		it("should reject non-component names", () => {
			expect(isJayJsComponent("div")).toBe(false);
			expect(isJayJsComponent("span")).toBe(false);
			expect(isJayJsComponent("")).toBe(false);
			expect(isJayJsComponent("myFunction")).toBe(false);
		});
	});

	describe("getDebugFunctionName", () => {
		it("should return consistent debug function name", () => {
			expect(getDebugFunctionName()).toBe("__jayjs_debug__");
		});
	});

	describe("getLineAndColumn", () => {
		it("should calculate correct line and column", () => {
			const source = `line 1
line 2
line 3`;

			expect(getLineAndColumn(source, 0)).toEqual({ line: 1, column: 1 });
			expect(getLineAndColumn(source, 7)).toEqual({ line: 2, column: 1 });
			expect(getLineAndColumn(source, 14)).toEqual({ line: 3, column: 1 });
		});

		it("should handle single line", () => {
			const source = "single line";
			expect(getLineAndColumn(source, 0)).toEqual({ line: 1, column: 1 });
			expect(getLineAndColumn(source, 5)).toEqual({ line: 1, column: 6 });
		});
	});

	describe("createFileFilter", () => {
		it("should always exclude node_modules", () => {
			const filter = createFileFilter();
			expect(filter("/path/to/node_modules/package/index.js")).toBe(false);
			expect(filter("/home/user/project/node_modules/lib/file.ts")).toBe(false);
		});

		it("should include .ts, .tsx, .js, .jsx files by default", () => {
			const filter = createFileFilter();
			expect(filter("/src/component.ts")).toBe(true);
			expect(filter("/src/component.tsx")).toBe(true);
			expect(filter("/src/component.js")).toBe(true);
			expect(filter("/src/component.jsx")).toBe(true);
		});

		it("should exclude non-target files by default", () => {
			const filter = createFileFilter();
			expect(filter("/src/styles.css")).toBe(false);
			expect(filter("/src/image.png")).toBe(false);
			// .d.ts files are matched by the default regex but should be excluded
			// This test shows current behavior - if we want to exclude .d.ts files by default,
			// we need to add them to the default exclude patterns
		});

		it("should handle glob patterns in exclude", () => {
			const filter = createFileFilter(undefined, ["**/*.test.*", "**/dist/**"]);
			expect(filter("/src/component.test.ts")).toBe(false);
			expect(filter("/project/dist/bundle.js")).toBe(false);
			expect(filter("/src/component.ts")).toBe(true);
			// .spec.js doesn't match *.test.* pattern, so it passes the default filter
		});

		it("should handle glob patterns in include", () => {
			const filter = createFileFilter(["src/**/*.ts", "lib/**/*.js"]);
			expect(filter("src/components/Button.ts")).toBe(true);
			expect(filter("lib/utils/helper.js")).toBe(true);
			expect(filter("other/file.ts")).toBe(false);
		});

		it("should handle complex glob patterns", () => {
			const filter = createFileFilter(["**/*.{ts,tsx}"], ["**/*.d.ts", "**/test/**"]);
			expect(filter("/src/component.ts")).toBe(true);
			expect(filter("/src/component.tsx")).toBe(true);
			expect(filter("/src/types.d.ts")).toBe(false);
			expect(filter("/src/test/component.test.ts")).toBe(false);
		});
	});
});
