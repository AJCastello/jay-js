import { describe, expect, it, vi } from "vitest";
import { state } from "../state.js";
import { effect } from "../../utils/helpers.js";

describe("State", () => {
	it("should create a state with initial value", () => {
		const myState = state(10);
		expect(myState.get()).toBe(10);
	});

	it("should update state value with set", () => {
		const myState = state(10);
		myState.set(20);
		expect(myState.get()).toBe(20);
	});

	it("should update state using a function", () => {
		const myState = state(10);
		myState.set((current) => current + 5);
		expect(myState.get()).toBe(15);
	});

	it("should notify subscribers when state changes", () => {
		const myState = state(10);
		const subscriber = vi.fn();

		myState.sub("test", subscriber);
		myState.set(20);

		expect(subscriber).toHaveBeenCalledWith(20);
	});

	it("should not notify subscribers when silent option is true", () => {
		const myState = state(10);
		const subscriber = vi.fn();

		myState.sub("test", subscriber);
		myState.set(20, { silent: true });

		expect(subscriber).not.toHaveBeenCalled();
	});

	it("should only notify specific subscriber when target option is provided", () => {
		const myState = state(10);
		const subscriber1 = vi.fn();
		const subscriber2 = vi.fn();

		myState.sub("sub1", subscriber1);
		myState.sub("sub2", subscriber2);

		myState.set(20, { target: "sub1" });

		expect(subscriber1).toHaveBeenCalledWith(20);
		expect(subscriber2).not.toHaveBeenCalled();
	});

	it("should notify multiple target subscribers when target is an array", () => {
		const myState = state(10);
		const subscriber1 = vi.fn();
		const subscriber2 = vi.fn();
		const subscriber3 = vi.fn();

		myState.sub("sub1", subscriber1);
		myState.sub("sub2", subscriber2);
		myState.sub("sub3", subscriber3);

		myState.set(20, { target: ["sub1", "sub3"] });

		expect(subscriber1).toHaveBeenCalledWith(20);
		expect(subscriber2).not.toHaveBeenCalled();
		expect(subscriber3).toHaveBeenCalledWith(20);
	});

	it("should run subscriber immediately if run parameter is true", () => {
		const myState = state(10);
		const subscriber = vi.fn();

		myState.sub("test", subscriber, true);

		expect(subscriber).toHaveBeenCalledWith(10);
	});

	it("should unsubscribe a subscriber", () => {
		const myState = state(10);
		const subscriber = vi.fn();

		myState.sub("test", subscriber);
		myState.unsub("test");
		myState.set(20);

		expect(subscriber).not.toHaveBeenCalled();
	});

	it("should manually trigger all subscribers with trigger method", () => {
		const myState = state(10);
		const subscriber = vi.fn();

		myState.sub("test", subscriber);
		myState.trigger();

		expect(subscriber).toHaveBeenCalledWith(10);
	});

	it("should manually trigger specific subscriber with trigger method", () => {
		const myState = state(10);
		const subscriber1 = vi.fn();
		const subscriber2 = vi.fn();

		myState.sub("sub1", subscriber1);
		myState.sub("sub2", subscriber2);
		myState.trigger("sub1");

		expect(subscriber1).toHaveBeenCalledWith(10);
		expect(subscriber2).not.toHaveBeenCalled();
	});

	it("should manually trigger multiple specific subscribers with trigger method", () => {
		const myState = state(10);
		const subscriber1 = vi.fn();
		const subscriber2 = vi.fn();
		const subscriber3 = vi.fn();

		myState.sub("sub1", subscriber1);
		myState.sub("sub2", subscriber2);
		myState.sub("sub3", subscriber3);
		myState.trigger("sub1", "sub3");

		expect(subscriber1).toHaveBeenCalledWith(10);
		expect(subscriber2).not.toHaveBeenCalled();
		expect(subscriber3).toHaveBeenCalledWith(10);
	});

	it("should clear all subscriptions with clear method", () => {
		const myState = state(10);
		const subscriber = vi.fn();

		myState.sub("test", subscriber);
		myState.clear();
		myState.set(20);

		expect(subscriber).not.toHaveBeenCalled();
	});

	it("should clear subscriptions and set new value with clear method", () => {
		const myState = state(10);
		const subscriber = vi.fn();

		myState.sub("test", subscriber);
		myState.clear(20);

		expect(myState.get()).toBe(20);

		myState.set(30);
		expect(subscriber).not.toHaveBeenCalled();
	});

	it("should support value getter", () => {
		const myState = state(10);
		expect(myState.value).toBe(10);
	});

	it("should support value setter", () => {
		const myState = state(10);
		myState.value = 20;
		expect(myState.get()).toBe(20);
	});

	it("should not notify when setting same primitive value", () => {
		const myState = state(false);
		const subscriber = vi.fn();

		myState.sub("test", subscriber);
		myState.value = false;
		expect(subscriber).not.toHaveBeenCalled();

		myState.value = true;
		expect(subscriber).toHaveBeenCalledTimes(1);

		myState.value = true;
		expect(subscriber).toHaveBeenCalledTimes(1);
	});

	it("should subscribe and notify only the accessed target key", () => {
		const person = state({ name: "John", age: 30 });
		const personEffect = vi.fn(() => {
			// Accessing property should create a targeted subscription
			person.value.name;
		});

		effect(personEffect);
		expect(personEffect).toHaveBeenCalledTimes(1);

		// Same value: no-op
		person.value.name = "John";
		expect(personEffect).toHaveBeenCalledTimes(1);

		// Different value: notify only target 'name'
		person.value.name = "Doe";
		expect(personEffect).toHaveBeenCalledTimes(2);

		// Changing another property should not notify 'name' target subscribers
		person.value.age = 31;
		expect(personEffect).toHaveBeenCalledTimes(2);
	});

	it("should support keyed-tracking with symbol keys", () => {
		const secret = Symbol("secret");
		const myState = state({ [secret]: "a", other: "x" } as Record<string | symbol, string>);

		const secretEffect = vi.fn(() => {
			myState.value[secret];
		});

		effect(secretEffect);
		expect(secretEffect).toHaveBeenCalledTimes(1);

		myState.value.other = "y";
		expect(secretEffect).toHaveBeenCalledTimes(1);

		myState.value[secret] = "b";
		expect(secretEffect).toHaveBeenCalledTimes(2);
	});

	it("should support keyed-tracking with array indices", () => {
		const numbers = state([10, 20, 30]);
		const numberEffect = vi.fn(() => {
			numbers.value[0];
		});

		effect(numberEffect);
		expect(numberEffect).toHaveBeenCalledTimes(1);

		numbers.value[1] = 25;
		expect(numberEffect).toHaveBeenCalledTimes(1);

		numbers.value[0] = 11;
		expect(numberEffect).toHaveBeenCalledTimes(2);
	});

	it("should NOT invalidate index-specific effects on structural array mutations", () => {
		const numbers = state([1, 2, 3]);
		const indexEffect = vi.fn(() => {
			numbers.value[0];
		});

		effect(indexEffect);
		expect(indexEffect).toHaveBeenCalledTimes(1);

		numbers.value.push(4);
		expect(indexEffect).toHaveBeenCalledTimes(1);
	});

	it("should invalidate global effects on structural array mutations", () => {
		const numbers = state([1, 2, 3]);
		const globalEffect = vi.fn(() => {
			numbers.value.forEach(n => n);
		});

		effect(globalEffect);
		expect(globalEffect).toHaveBeenCalledTimes(1);

		numbers.value.push(4);
		expect(globalEffect).toHaveBeenCalledTimes(2);
	});

	it("should invalidate length watchers on structural array mutations", () => {
		const numbers = state([1, 2, 3]);
		const lengthEffect = vi.fn(() => {
			numbers.value.length;
		});

		effect(lengthEffect);
		expect(lengthEffect).toHaveBeenCalledTimes(1);

		numbers.value.push(4);
		expect(lengthEffect).toHaveBeenCalledTimes(2);
	});
});
