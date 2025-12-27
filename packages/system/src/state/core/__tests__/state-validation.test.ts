import { describe, it, expect } from "vitest";
import { state } from "../state.js";

describe("State - Input Validation", () => {
	it("should throw error for empty subscription ID", () => {
		const myState = state(10);
		const effect = () => {};

		expect(() => myState.sub("", effect)).toThrow(TypeError);
		expect(() => myState.sub("", effect)).toThrow("Subscription ID must be a non-empty string");
	});

	it("should throw error for non-string subscription ID", () => {
		const myState = state(10);
		const effect = () => {};

		expect(() => myState.sub(null as any, effect)).toThrow(TypeError);
		expect(() => myState.sub(undefined as any, effect)).toThrow(TypeError);
		expect(() => myState.sub(123 as any, effect)).toThrow(TypeError);
		expect(() => myState.sub({} as any, effect)).toThrow(TypeError);
	});

	it("should throw error for invalid subscription ID characters", () => {
		const myState = state(10);
		const effect = () => {};

		expect(() => myState.sub("invalid id", effect)).toThrow(Error);
		expect(() => myState.sub("invalid id", effect)).toThrow("Invalid subscription ID");
		expect(() => myState.sub("invalid@id", effect)).toThrow("Invalid subscription ID");
		expect(() => myState.sub("invalid/id", effect)).toThrow("Invalid subscription ID");
		expect(() => myState.sub("invalid\\id", effect)).toThrow("Invalid subscription ID");
		expect(() => myState.sub("invalid$id", effect)).toThrow("Invalid subscription ID");
		expect(() => myState.sub("invalid#id", effect)).toThrow("Invalid subscription ID");
	});

	it("should accept valid subscription IDs", () => {
		const myState = state(10);
		const effect = () => {};

		expect(() => myState.sub("validId", effect)).not.toThrow();
		expect(() => myState.sub("valid_id", effect)).not.toThrow();
		expect(() => myState.sub("valid-id", effect)).not.toThrow();
		expect(() => myState.sub("ValidId123", effect)).not.toThrow();
		expect(() => myState.sub("valid_id_123", effect)).not.toThrow();
		expect(() => myState.sub("valid-id-456", effect)).not.toThrow();
		expect(() => myState.sub("VALID_ID", effect)).not.toThrow();
	});

	it("should throw error for non-function effect", () => {
		const myState = state(10);

		expect(() => myState.sub("test", null as any)).toThrow(TypeError);
		expect(() => myState.sub("test", null as any)).toThrow("Effect must be a function");
		expect(() => myState.sub("test", undefined as any)).toThrow(TypeError);
		expect(() => myState.sub("test", "not a function" as any)).toThrow(TypeError);
		expect(() => myState.sub("test", 123 as any)).toThrow(TypeError);
		expect(() => myState.sub("test", {} as any)).toThrow(TypeError);
	});

	it("should accept valid effect function", () => {
		const myState = state(10);
		const effect1 = () => {};
		const effect2 = (data: number) => console.log(data);
		const effect3 = function namedEffect(data: number) { return data; };

		expect(() => myState.sub("test1", effect1)).not.toThrow();
		expect(() => myState.sub("test2", effect2)).not.toThrow();
		expect(() => myState.sub("test3", effect3)).not.toThrow();
	});

	it("should validate both ID and effect together", () => {
		const myState = state(10);

		expect(() => myState.sub("", null as any)).toThrow(TypeError);
		expect(() => myState.sub("invalid id", null as any)).toThrow();
	});
});
