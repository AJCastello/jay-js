import { vi } from 'vitest';
import { State } from "../../core/state";
import { CombineStates } from "../helpers";

describe("CombineStates", () => {
	it("should combine multiple states into a single state object", () => {
		const firstName = State("John");
		const lastName = State("Doe");
		const age = State(30);

		const person = CombineStates({
			firstName,
			lastName,
			age,
		});

		expect(person.get()).toEqual({
			firstName: "John",
			lastName: "Doe",
			age: 30,
		});
	});

	it("should update combined state when source states change", () => {
		const firstName = State("John");
		const lastName = State("Doe");
		const age = State(30);

		const person = CombineStates({
			firstName,
			lastName,
			age,
		});

		firstName.set("Jane");
		expect(person.get()).toEqual({
			firstName: "Jane",
			lastName: "Doe",
			age: 30,
		});

		lastName.set("Smith");
		expect(person.get()).toEqual({
			firstName: "Jane",
			lastName: "Smith",
			age: 30,
		});

		age.set(25);
		expect(person.get()).toEqual({
			firstName: "Jane",
			lastName: "Smith",
			age: 25,
		});
	});

	it("should notify subscribers when any source state changes", () => {
		const x = State(10);
		const y = State(20);

		const point = CombineStates({
			x,
			y,
		});

		const subscriber = vi.fn();
		point.sub("test", subscriber);

		x.set(15);
		expect(subscriber).toHaveBeenCalledWith({ x: 15, y: 20 });

		y.set(25);
		expect(subscriber).toHaveBeenCalledWith({ x: 15, y: 25 });
	});

	it("should work with nested states", () => {
		const user = State({ name: "John" });
		const settings = State({ darkMode: true });
		const preferences = State({ notifications: false });

		const appState = CombineStates({
			user,
			settings,
			preferences,
		});

		expect(appState.get()).toEqual({
			user: { name: "John" },
			settings: { darkMode: true },
			preferences: { notifications: false },
		});

		user.set({ name: "Jane" });
		expect(appState.get().user).toEqual({ name: "Jane" });

		// Update nested property
		settings.set((current) => {
			current.darkMode = false;
			return current;
		});

		expect(appState.get().settings).toEqual({ darkMode: false });
	});

	it("should support empty state combination", () => {
		const combined = CombineStates({});
		expect(combined.get()).toEqual({});
	});

	it("should support manual updates to combined state", () => {
		const firstName = State("John");
		const lastName = State("Doe");

		const person = CombineStates({
			firstName,
			lastName,
		});

		person.set({ firstName: "Bob", lastName: "Johnson" });
		expect(person.get()).toEqual({ firstName: "Bob", lastName: "Johnson" });

		// Source states remain unchanged
		expect(firstName.get()).toBe("John");
		expect(lastName.get()).toBe("Doe");

		// And updating source still affects combined state
		firstName.set("Alice");
		expect(person.get()).toEqual({ firstName: "Alice", lastName: "Johnson" });
	});

	it("should support value accessor", () => {
		const x = State(10);
		const y = State(20);

		const point = CombineStates({ x, y });

		expect(point.value).toEqual({ x: 10, y: 20 });

		x.set(30);
		expect(point.value).toEqual({ x: 30, y: 20 });

		point.value = { x: 5, y: 15 };
		expect(point.get()).toEqual({ x: 5, y: 15 });
	});

	it("should work with primitive and complex types mixed", () => {
		const name = State("John");
		const age = State(30);
		const address = State({ city: "New York", zip: "10001" });
		const hobbies = State(["reading", "coding"]);

		const user = CombineStates({
			name,
			age,
			address,
			hobbies,
		});

		expect(user.get()).toEqual({
			name: "John",
			age: 30,
			address: { city: "New York", zip: "10001" },
			hobbies: ["reading", "coding"],
		});

		name.set("Jane");
		age.set(25);
		address.set({ city: "Boston", zip: "02108" });
		hobbies.set([...hobbies.get(), "running"]);

		expect(user.get()).toEqual({
			name: "Jane",
			age: 25,
			address: { city: "Boston", zip: "02108" },
			hobbies: ["reading", "coding", "running"],
		});
	});
});
