import type { Listener } from "../../components/Base/Base.types";
import { useListener } from "../use-listener";

describe("useListener", () => {
	it("should execute the matching event listener function", () => {
		// Arrange
		const mockHandler = jest.fn();
		const listeners: Listener = {
			click: mockHandler,
		};

		// Act
		useListener("click", listeners);

		// Assert
		expect(mockHandler).toHaveBeenCalled();
	});

	it("should not execute non-matching event listener functions", () => {
		// Arrange
		const mockClickHandler = jest.fn();
		const mockInputHandler = jest.fn();
		const listeners: Listener = {
			click: mockClickHandler,
			input: mockInputHandler,
		};

		// Act
		useListener("click", listeners);

		// Assert
		expect(mockClickHandler).toHaveBeenCalled();
		expect(mockInputHandler).not.toHaveBeenCalled();
	});

	it("should handle the case when no matching listener is found", () => {
		// Arrange
		const mockHandler = jest.fn();
		const listeners: Listener = {
			click: mockHandler,
		};

		// Act & Assert (should not throw)
		expect(() => {
			useListener("input", listeners);
		}).not.toThrow();
		expect(mockHandler).not.toHaveBeenCalled();
	});

	it("should handle empty listeners object", () => {
		// Arrange
		const listeners: Listener = {};

		// Act & Assert (should not throw)
		expect(() => {
			useListener("click", listeners);
		}).not.toThrow();
	});
});
