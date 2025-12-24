import { describe, it, expect } from "vitest";
import { State } from "../state.js";

describe("State - Input Validation", () => {
	it("should throw error for empty subscription ID", () => {
		const state = State(10);
		const effect = () => {};

		expect(() => state.sub("", effect)).toThrow(TypeError);
		expect(() => state.sub("", effect)).toThrow("Subscription ID must be a non-empty string");
	});

	it("should throw error for non-string subscription ID", () => {
		const state = State(10);
		const effect = () => {};

		expect(() => state.sub(null as any, effect)).toThrow(TypeError);
		expect(() => state.sub(undefined as any, effect)).toThrow(TypeError);
		expect(() => state.sub(123 as any, effect)).toThrow(TypeError);
		expect(() => state.sub({} as any, effect)).toThrow(TypeError);
	});

	it("should throw error for invalid subscription ID characters", () => {
		const state = State(10);
		const effect = () => {};

		expect(() => state.sub("invalid id", effect)).toThrow(Error);
		expect(() => state.sub("invalid id", effect)).toThrow("Invalid subscription ID");
		expect(() => state.sub("invalid@id", effect)).toThrow("Invalid subscription ID");
		expect(() => state.sub("invalid/id", effect)).toThrow("Invalid subscription ID");
		expect(() => state.sub("invalid\\id", effect)).toThrow("Invalid subscription ID");
		expect(() => state.sub("invalid$id", effect)).toThrow("Invalid subscription ID");
		expect(() => state.sub("invalid#id", effect)).toThrow("Invalid subscription ID");
	});

	it("should accept valid subscription IDs", () => {
		const state = State(10);
		const effect = () => {};

		expect(() => state.sub("validId", effect)).not.toThrow();
		expect(() => state.sub("valid_id", effect)).not.toThrow();
		expect(() => state.sub("valid-id", effect)).not.toThrow();
		expect(() => state.sub("ValidId123", effect)).not.toThrow();
		expect(() => state.sub("valid_id_123", effect)).not.toThrow();
		expect(() => state.sub("valid-id-456", effect)).not.toThrow();
		expect(() => state.sub("VALID_ID", effect)).not.toThrow();
	});

	it("should throw error for non-function effect", () => {
		const state = State(10);

		expect(() => state.sub("test", null as any)).toThrow(TypeError);
		expect(() => state.sub("test", null as any)).toThrow("Effect must be a function");
		expect(() => state.sub("test", undefined as any)).toThrow(TypeError);
		expect(() => state.sub("test", "not a function" as any)).toThrow(TypeError);
		expect(() => state.sub("test", 123 as any)).toThrow(TypeError);
		expect(() => state.sub("test", {} as any)).toThrow(TypeError);
	});

	it("should accept valid effect function", () => {
		const state = State(10);
		const effect1 = () => {};
		const effect2 = (data: number) => console.log(data);
		const effect3 = function namedEffect(data: number) { return data; };

		expect(() => state.sub("test1", effect1)).not.toThrow();
		expect(() => state.sub("test2", effect2)).not.toThrow();
		expect(() => state.sub("test3", effect3)).not.toThrow();
	});

	it("should validate both ID and effect together", () => {
		const state = State(10);

		expect(() => state.sub("", null as any)).toThrow(TypeError);
		expect(() => state.sub("invalid id", null as any)).toThrow();
	});
});
