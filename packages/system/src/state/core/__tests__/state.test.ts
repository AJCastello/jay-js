import { describe, expect, it, vi } from "vitest";
import { State } from "../state.js";
import { Effect } from "../../utils/helpers.js";

describe("State", () => {
	it("should create a state with initial value", () => {
		const state = State(10);
		expect(state.get()).toBe(10);
	});

	it("should update state value with set", () => {
		const state = State(10);
		state.set(20);
		expect(state.get()).toBe(20);
	});

	it("should update state using a function", () => {
		const state = State(10);
		state.set((current) => current + 5);
		expect(state.get()).toBe(15);
	});

	it("should notify subscribers when state changes", () => {
		const state = State(10);
		const subscriber = vi.fn();

		state.sub("test", subscriber);
		state.set(20);

		expect(subscriber).toHaveBeenCalledWith(20);
	});

	it("should not notify subscribers when silent option is true", () => {
		const state = State(10);
		const subscriber = vi.fn();

		state.sub("test", subscriber);
		state.set(20, { silent: true });

		expect(subscriber).not.toHaveBeenCalled();
	});

	it("should only notify specific subscriber when target option is provided", () => {
		const state = State(10);
		const subscriber1 = vi.fn();
		const subscriber2 = vi.fn();

		state.sub("sub1", subscriber1);
		state.sub("sub2", subscriber2);

		state.set(20, { target: "sub1" });

		expect(subscriber1).toHaveBeenCalledWith(20);
		expect(subscriber2).not.toHaveBeenCalled();
	});

	it("should notify multiple target subscribers when target is an array", () => {
		const state = State(10);
		const subscriber1 = vi.fn();
		const subscriber2 = vi.fn();
		const subscriber3 = vi.fn();

		state.sub("sub1", subscriber1);
		state.sub("sub2", subscriber2);
		state.sub("sub3", subscriber3);

		state.set(20, { target: ["sub1", "sub3"] });

		expect(subscriber1).toHaveBeenCalledWith(20);
		expect(subscriber2).not.toHaveBeenCalled();
		expect(subscriber3).toHaveBeenCalledWith(20);
	});

	it("should run subscriber immediately if run parameter is true", () => {
		const state = State(10);
		const subscriber = vi.fn();

		state.sub("test", subscriber, true);

		expect(subscriber).toHaveBeenCalledWith(10);
	});

	it("should unsubscribe a subscriber", () => {
		const state = State(10);
		const subscriber = vi.fn();

		state.sub("test", subscriber);
		state.unsub("test");
		state.set(20);

		expect(subscriber).not.toHaveBeenCalled();
	});

	it("should manually trigger all subscribers with trigger method", () => {
		const state = State(10);
		const subscriber = vi.fn();

		state.sub("test", subscriber);
		state.trigger();

		expect(subscriber).toHaveBeenCalledWith(10);
	});

	it("should manually trigger specific subscriber with trigger method", () => {
		const state = State(10);
		const subscriber1 = vi.fn();
		const subscriber2 = vi.fn();

		state.sub("sub1", subscriber1);
		state.sub("sub2", subscriber2);
		state.trigger("sub1");

		expect(subscriber1).toHaveBeenCalledWith(10);
		expect(subscriber2).not.toHaveBeenCalled();
	});

	it("should manually trigger multiple specific subscribers with trigger method", () => {
		const state = State(10);
		const subscriber1 = vi.fn();
		const subscriber2 = vi.fn();
		const subscriber3 = vi.fn();

		state.sub("sub1", subscriber1);
		state.sub("sub2", subscriber2);
		state.sub("sub3", subscriber3);
		state.trigger("sub1", "sub3");

		expect(subscriber1).toHaveBeenCalledWith(10);
		expect(subscriber2).not.toHaveBeenCalled();
		expect(subscriber3).toHaveBeenCalledWith(10);
	});

	it("should clear all subscriptions with clear method", () => {
		const state = State(10);
		const subscriber = vi.fn();

		state.sub("test", subscriber);
		state.clear();
		state.set(20);

		expect(subscriber).not.toHaveBeenCalled();
	});

	it("should clear subscriptions and set new value with clear method", () => {
		const state = State(10);
		const subscriber = vi.fn();

		state.sub("test", subscriber);
		state.clear(20);

		expect(state.get()).toBe(20);

		state.set(30);
		expect(subscriber).not.toHaveBeenCalled();
	});

	it("should support value getter", () => {
		const state = State(10);
		expect(state.value).toBe(10);
	});

	it("should support value setter", () => {
		const state = State(10);
		state.value = 20;
		expect(state.get()).toBe(20);
	});

	it("should not notify when setting same primitive value", () => {
		const state = State(false);
		const subscriber = vi.fn();

		state.sub("test", subscriber);
		state.value = false;
		expect(subscriber).not.toHaveBeenCalled();

		state.value = true;
		expect(subscriber).toHaveBeenCalledTimes(1);

		state.value = true;
		expect(subscriber).toHaveBeenCalledTimes(1);
	});

	it("should subscribe and notify only the accessed target key", () => {
		const person = State({ name: "John", age: 30 });
		const effect = vi.fn(() => {
			// Accessing property should create a targeted subscription
			person.value.name;
		});

		Effect(effect);
		expect(effect).toHaveBeenCalledTimes(1);

		// Same value: no-op
		person.value.name = "John";
		expect(effect).toHaveBeenCalledTimes(1);

		// Different value: notify only target 'name'
		person.value.name = "Doe";
		expect(effect).toHaveBeenCalledTimes(2);

		// Changing another property should not notify 'name' target subscribers
		person.value.age = 31;
		expect(effect).toHaveBeenCalledTimes(2);
	});

	it("should support keyed-tracking with symbol keys", () => {
		const secret = Symbol("secret");
		const state = State({ [secret]: "a", other: "x" } as Record<string | symbol, string>);

		const effect = vi.fn(() => {
			state.value[secret];
		});

		Effect(effect);
		expect(effect).toHaveBeenCalledTimes(1);

		state.value.other = "y";
		expect(effect).toHaveBeenCalledTimes(1);

		state.value[secret] = "b";
		expect(effect).toHaveBeenCalledTimes(2);
	});

	it("should support keyed-tracking with array indices", () => {
		const numbers = State([10, 20, 30]);
		const effect = vi.fn(() => {
			numbers.value[0];
		});

		Effect(effect);
		expect(effect).toHaveBeenCalledTimes(1);

		numbers.value[1] = 25;
		expect(effect).toHaveBeenCalledTimes(1);

		numbers.value[0] = 11;
		expect(effect).toHaveBeenCalledTimes(2);
	});

	it("should NOT invalidate index-specific effects on structural array mutations", () => {
		const numbers = State([1, 2, 3]);
		const indexEffect = vi.fn(() => {
			numbers.value[0];
		});

		Effect(indexEffect);
		expect(indexEffect).toHaveBeenCalledTimes(1);

		numbers.value.push(4);
		expect(indexEffect).toHaveBeenCalledTimes(1);
	});

	it("should invalidate global effects on structural array mutations", () => {
		const numbers = State([1, 2, 3]);
		const globalEffect = vi.fn(() => {
			numbers.value.forEach(n => n);
		});

		Effect(globalEffect);
		expect(globalEffect).toHaveBeenCalledTimes(1);

		numbers.value.push(4);
		expect(globalEffect).toHaveBeenCalledTimes(2);
	});

	it("should invalidate length watchers on structural array mutations", () => {
		const numbers = State([1, 2, 3]);
		const lengthEffect = vi.fn(() => {
			numbers.value.length;
		});

		Effect(lengthEffect);
		expect(lengthEffect).toHaveBeenCalledTimes(1);

		numbers.value.push(4);
		expect(lengthEffect).toHaveBeenCalledTimes(2);
	});
});
