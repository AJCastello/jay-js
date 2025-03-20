import { State } from "../state.js";

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
		const subscriber = jest.fn();

		state.sub("test", subscriber);
		state.set(20);

		expect(subscriber).toHaveBeenCalledWith(20);
	});

	it("should not notify subscribers when silent option is true", () => {
		const state = State(10);
		const subscriber = jest.fn();

		state.sub("test", subscriber);
		state.set(20, { silent: true });

		expect(subscriber).not.toHaveBeenCalled();
	});

	it("should only notify specific subscriber when target option is provided", () => {
		const state = State(10);
		const subscriber1 = jest.fn();
		const subscriber2 = jest.fn();

		state.sub("sub1", subscriber1);
		state.sub("sub2", subscriber2);

		state.set(20, { target: "sub1" });

		expect(subscriber1).toHaveBeenCalledWith(20);
		expect(subscriber2).not.toHaveBeenCalled();
	});

	it("should notify multiple target subscribers when target is an array", () => {
		const state = State(10);
		const subscriber1 = jest.fn();
		const subscriber2 = jest.fn();
		const subscriber3 = jest.fn();

		state.sub("sub1", subscriber1);
		state.sub("sub2", subscriber2);
		state.sub("sub3", subscriber3);

		state.set(20, { target: ["sub1", "sub3"] });

		expect(subscriber1).toHaveBeenCalledWith(20);
		expect(subscriber2).not.toHaveBeenCalled();
		expect(subscriber3).toHaveBeenCalledWith(20);
	});

	it("should not update state if new value is equal to current and force is false", () => {
		const state = State({ count: 10 });
		const subscriber = jest.fn();

		state.sub("test", subscriber);
		state.set({ count: 10 });

		expect(subscriber).not.toHaveBeenCalled();
	});

	it("should update state even if new value is equal when force option is true", () => {
		const state = State({ count: 10 });
		const subscriber = jest.fn();

		state.sub("test", subscriber);
		state.set({ count: 10 }, { force: true });

		expect(subscriber).toHaveBeenCalled();
	});

	it("should run subscriber immediately if run parameter is true", () => {
		const state = State(10);
		const subscriber = jest.fn();

		state.sub("test", subscriber, true);

		expect(subscriber).toHaveBeenCalledWith(10);
	});

	it("should unsubscribe a subscriber", () => {
		const state = State(10);
		const subscriber = jest.fn();

		state.sub("test", subscriber);
		state.unsub("test");
		state.set(20);

		expect(subscriber).not.toHaveBeenCalled();
	});

	it("should manually trigger all subscribers with trigger method", () => {
		const state = State(10);
		const subscriber = jest.fn();

		state.sub("test", subscriber);
		state.trigger();

		expect(subscriber).toHaveBeenCalledWith(10);
	});

	it("should manually trigger specific subscriber with trigger method", () => {
		const state = State(10);
		const subscriber1 = jest.fn();
		const subscriber2 = jest.fn();

		state.sub("sub1", subscriber1);
		state.sub("sub2", subscriber2);
		state.trigger("sub1");

		expect(subscriber1).toHaveBeenCalledWith(10);
		expect(subscriber2).not.toHaveBeenCalled();
	});

	it("should manually trigger multiple specific subscribers with trigger method", () => {
		const state = State(10);
		const subscriber1 = jest.fn();
		const subscriber2 = jest.fn();
		const subscriber3 = jest.fn();

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
		const subscriber = jest.fn();

		state.sub("test", subscriber);
		state.clear();
		state.set(20);

		expect(subscriber).not.toHaveBeenCalled();
	});

	it("should clear subscriptions and set new value with clear method", () => {
		const state = State(10);
		const subscriber = jest.fn();

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
});
