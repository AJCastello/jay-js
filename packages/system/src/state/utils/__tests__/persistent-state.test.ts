import { PersistentState } from "../helpers";

describe("PersistentState", () => {
	// Mock localStorage
	const localStorageMock = (() => {
		let store: Record<string, string> = {};
		return {
			getItem: jest.fn((key) => store[key] || null),
			setItem: jest.fn((key, value) => {
				store[key] = value;
			}),
			clear: () => {
				store = {};
			},
			removeItem: jest.fn((key) => {
				delete store[key];
			}),
		};
	})();

	// Replace global localStorage with mock
	Object.defineProperty(window, "localStorage", {
		value: localStorageMock,
		writable: true,
	});

	beforeEach(() => {
		localStorageMock.clear();
		jest.clearAllMocks();
	});

	it("should initialize with default value when no stored value exists", () => {
		const defaultValue = { name: "John", age: 30 };
		const state = PersistentState("user", defaultValue);

		expect(state.get()).toEqual(defaultValue);
		expect(localStorageMock.getItem).toHaveBeenCalledWith("user");
	});

	it("should initialize with stored value from localStorage", () => {
		const storedValue = { name: "Jane", age: 25 };
		localStorageMock.setItem("user", JSON.stringify(storedValue));

		const defaultValue = { name: "John", age: 30 };
		const state = PersistentState("user", defaultValue);

		expect(state.get()).toEqual(storedValue);
		expect(localStorageMock.getItem).toHaveBeenCalledWith("user");
	});

	it("should save to localStorage when state is updated", () => {
		const state = PersistentState("counter", 0);
		state.set(5);

		expect(localStorageMock.setItem).toHaveBeenCalledWith("counter", JSON.stringify(5));
	});

	it("should handle localStorage errors gracefully", () => {
		// Simulate localStorage error
		const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
		localStorageMock.getItem.mockImplementationOnce(() => {
			throw new Error("localStorage error");
		});

		const state = PersistentState("user", { name: "Default" });

		// Should use default value on get error
		expect(state.get()).toEqual({ name: "Default" });

		// Simulate error on setItem
		localStorageMock.setItem.mockImplementationOnce(() => {
			throw new Error("localStorage write error");
		});

		// Should not throw when localStorage.setItem fails
		expect(() => state.set({ name: "John" })).not.toThrow();
		expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining("Error saving state to localStorage"));

		errorSpy.mockRestore();
	});

	it("should update subscribers when state changes", () => {
		const state = PersistentState("test", 0);
		const subscriber = jest.fn();

		state.sub("test-sub", subscriber);
		state.set(10);

		expect(subscriber).toHaveBeenCalledWith(10);
	});

	it("should support all standard state operations", () => {
		const state = PersistentState("test", 0);

		// Test set and get
		state.set(5);
		expect(state.get()).toBe(5);

		// Test value accessor
		expect(state.value).toBe(5);
		state.value = 10;
		expect(state.value).toBe(10);

		// Test triggering
		const subscriber = jest.fn();
		state.sub("test-sub", subscriber);
		state.trigger();
		expect(subscriber).toHaveBeenCalledWith(10);

		// Test unsub
		state.unsub("test-sub");
		state.set(15);
		expect(subscriber).toHaveBeenCalledTimes(1); // Not called again after unsub

		// Test clear
		const newSubscriber = jest.fn();
		state.sub("new-sub", newSubscriber);
		state.clear(20);
		expect(state.get()).toBe(20);
		state.set(25);
		expect(newSubscriber).not.toHaveBeenCalled(); // Subscription was cleared
	});

	it("should parse JSON from localStorage correctly", () => {
		// Test with different data types
		const testCases = [
			{ key: "string-test", value: "hello world" },
			{ key: "number-test", value: 42 },
			{ key: "boolean-test", value: true },
			{ key: "array-test", value: [1, 2, 3] },
			{ key: "object-test", value: { a: 1, b: "test", c: true } },
			{ key: "null-test", value: null },
		];

		testCases.forEach(({ key, value }) => {
			localStorageMock.setItem(key, JSON.stringify(value));
			const state = PersistentState(key, "default");
			expect(state.get()).toEqual(value);
		});
	});
});
