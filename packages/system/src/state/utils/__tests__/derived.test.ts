import { State } from "../../core/state.js";
import { Derived } from "../helpers.js";

describe("Derived", () => {
  it("should create a derived state with initial calculated value", () => {
    const count = State(10);
    const doubled = Derived(() => count.value * 2);
    
    expect(doubled.get()).toBe(20);
  });

  it("should update when source state changes", () => {
    const count = State(10);
    const doubled = Derived(() => count.value * 2);
    
    count.set(15);
    expect(doubled.get()).toBe(30);
  });

  it("should handle multiple source states", () => {
    const count = State(10);
    const factor = State(2);
    const result = Derived(() => count.value * factor.value);
    
    expect(result.get()).toBe(20);
    
    count.set(15);
    expect(result.get()).toBe(30);
    
    factor.set(3);
    expect(result.get()).toBe(45);
  });

  it("should support complex calculations", () => {
    const firstName = State("John");
    const lastName = State("Doe");
    const age = State(30);
    
    const person = Derived(() => ({
      fullName: `${firstName.value} ${lastName.value}`,
      isAdult: age.value >= 18
    }));
    
    expect(person.get()).toEqual({
      fullName: "John Doe",
      isAdult: true
    });
    
    firstName.set("Jane");
    expect(person.get().fullName).toBe("Jane Doe");
    
    age.set(15);
    expect(person.get().isAdult).toBe(false);
  });

  it("should maintain correct value when source state changes to the same value", () => {
    const count = State(10);
    const doubled = Derived(() => count.value * 2);
    
    expect(doubled.get()).toBe(20);
    
    count.set(10); // Same value
    expect(doubled.get()).toBe(20); // Value should still be the same
  });

  it("should support nested derived states", () => {
    const count = State(10);
    const doubled = Derived(() => count.value * 2);
    const quadrupled = Derived(() => doubled.value * 2);
    
    expect(quadrupled.get()).toBe(40);
    
    count.set(15);
    expect(doubled.get()).toBe(30);
    expect(quadrupled.get()).toBe(60);
  });

  it("should allow manual updates to derived state", () => {
    const count = State(10);
    const doubled = Derived(() => count.value * 2);
    
    doubled.set(50); // Manually overriding the derived value
    expect(doubled.get()).toBe(50);
    
    count.set(15); // Recalculates based on source
    expect(doubled.get()).toBe(30);
  });
});