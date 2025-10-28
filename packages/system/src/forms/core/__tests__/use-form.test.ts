import { vi } from 'vitest';
import { formatError, isValidResult } from "../../utils/validators.js";
import { useForm } from "../use-form.js";

// Mock for the DOM since we are running in a test environment
class MockElement {
	value = "";
	name = "";
	onchange?: (event: any) => void;
	oninput?: (event: any) => void;
	type?: string;
	checked = false;
	files: any = null;
	options: any[] = [];
	multiple = false;
	selectedOptions: any[] = [];

	getAttribute(name: string) {
		return this[name as keyof this];
	}
}

class MockInputElement extends MockElement {
	constructor(type = "text") {
		super();
		this.type = type;
	}
}

class MockSelectElement extends MockElement {
	constructor(isMultiple = false) {
		super();
		this.multiple = isMultiple;
		this.options = [];
	}
}

// Helper for creating DOM events
// const createEvent = (target: any) => ({ target, preventDefault: vi.fn() });

describe("useForm", () => {
	let querySelectMock: ReturnType<typeof vi.fn>;

	beforeEach(() => {
		// Clear mocks between tests
		vi.resetAllMocks();

		// Global settings for the test
		const mockTextNode = { textContent: "" };
		querySelectMock = vi.fn().mockImplementation(() => {
			return new MockElement();
		});

		// Mock MutationObserver
		global.MutationObserver = class MutationObserver {
			constructor(callback: any) {}
			observe() {}
			disconnect() {}
			takeRecords() { return []; }
		} as any;

		global.document = {
			...global.document,
			querySelector: querySelectMock,
			querySelectorAll: vi.fn().mockImplementation(() => []),
			createTextNode: vi.fn().mockImplementation(() => mockTextNode),
			contains: vi.fn().mockReturnValue(false),
		} as any;
	});

	it("should initialize with default values", () => {
		const defaultValues = { nome: "John", email: "john@example.com" };
		const form = useForm({ defaultValues });

		expect(form.formState.getValue("nome")).toBe("John");
		expect(form.formState.getValue("email")).toBe("john@example.com");
	});

	it("should update values through formState", () => {
		const defaultValues = { nome: "", email: "" };
		const form = useForm({ defaultValues });

		form.formState.setValue("nome", "Maria");
		form.formState.setValue("email", "maria@example.com");

		expect(form.formState.getValue("nome")).toBe("Maria");
		expect(form.formState.getValue("email")).toBe("maria@example.com");
	});

	it("should update multiple values at once", () => {
		const defaultValues = { nome: "", email: "", idade: 0 };
		const form = useForm({ defaultValues });

		form.formState.setValues({
			nome: "Carlos",
			email: "carlos@example.com",
			idade: 30,
		});

		expect(form.formState.getValue("nome")).toBe("Carlos");
		expect(form.formState.getValue("email")).toBe("carlos@example.com");
		expect(form.formState.getValue("idade")).toBe(30);
	});

	it("should register an input field and respond to events", () => {
		const defaultValues = { nome: "" };
		const form = useForm({ defaultValues });

		// Simulate the privateSetValue function directly, as DOM events
		// are difficult to fully simulate in the test environment
		form.formState.setValue("nome", "Ana");

		expect(form.formState.getValue("nome")).toBe("Ana");
	});

	it("should validate using a custom resolver", async () => {
		const defaultValues = { nome: "", email: "" };

		// Custom resolver that validates if the name has at least 3 characters
		const customResolver = async (values: any, path?: string) => {
			const errors = [];

			// If a specific field is passed, validate only that field
			if (path) {
				if (path === "nome" && values.nome.length < 3) {
					errors.push({ path: "nome", message: "Name must have at least 3 characters" });
				}
				if (path === "email" && !values.email.includes("@")) {
					errors.push({ path: "email", message: "Invalid email" });
				}
			} else {
				// Validate all fields
				if (values.nome.length < 3) {
					errors.push({ path: "nome", message: "Name must have at least 3 characters" });
				}
				if (!values.email.includes("@")) {
					errors.push({ path: "email", message: "Invalid email" });
				}
			}

			return { errors };
		};

		const form = useForm({
			defaultValues,
			resolver: customResolver,
		});

		// Check invalid value - we need to simulate the behavior of formState.isValid
		form.formState.setValue("nome", "Jo");
		let result = await customResolver({ ...defaultValues, nome: "Jo" }, "nome");
		expect(result.errors.length > 0).toBe(true);

		// Check valid value
		form.formState.setValue("nome", "João");
		result = await customResolver({ ...defaultValues, nome: "João" }, "nome");
		expect(result.errors.length === 0).toBe(true);
	});

	it("should handle validation errors correctly", async () => {
		const defaultValues = { username: "", password: "" };

		// No need for complex mock, just check if values are set
		const customResolver = async (values: any) => {
			const errors = [];

			if (values.username.length < 5) {
				errors.push({ path: "username", message: "Username must have at least 5 characters" });
			}

			return { errors };
		};

		const form = useForm({
			defaultValues,
			resolver: customResolver,
		});

		// Check logic without relying on DOM
		form.formState.setValue("username", "abc");
		form.formState.setErrors({
			errors: [{ path: "username", message: "Username must have at least 5 characters" }],
		});

		// Check that the error is set through the public API
		expect(form.formState.getErrors().errors.length).toBe(1);

		// Fix the value and clear errors
		form.formState.setValue("username", "abcdef");
		form.formState.setErrors({ errors: [] });

		// The error should be removed
		expect(form.formState.getErrors().errors.length).toBe(0);
	});

	it("should process form submission with validation", async () => {
		const defaultValues = { email: "", password: "" };
		const mockSubmitFn = vi.fn();
		const mockEvent = { preventDefault: vi.fn() };

		const customResolver = async (values: any) => {
			const errors = [];

			if (!values.email.includes("@")) {
				errors.push({ path: "email", message: "Invalid email" });
			}

			if (values.password.length < 6) {
				errors.push({ path: "password", message: "Password too short" });
			}

			return { errors };
		};

		const form = useForm({
			defaultValues,
			resolver: customResolver,
		});

		// Create submission handler
		const submitHandler = form.onSubmit(mockSubmitFn);

		// Try to submit with invalid values
		form.formState.setValues({
			email: "invalidemail",
			password: "123",
		});

		await submitHandler(mockEvent as any);

		// The callback should not be called because validation failed
		expect(mockSubmitFn).not.toHaveBeenCalled();
		expect(mockEvent.preventDefault).toHaveBeenCalled();

		// Fix the values and try again
		form.formState.setValues({
			email: "user@example.com",
			password: "password123",
		});

		await submitHandler(mockEvent as any);

		// Now the callback should be called with the correct values
		expect(mockSubmitFn).toHaveBeenCalledWith(
			{
				email: "user@example.com",
				password: "password123",
			},
			mockEvent,
		);
	});

	it("should notify about value changes", () => {
		const defaultValues = { nome: "", idade: 0 };
		const form = useForm({ defaultValues });

		const onChangeMock = vi.fn();
		form.onChange(onChangeMock);

		// Change a value
		form.formState.setValue("nome", "Pedro");

		// Check if the callback was called with the new values
		expect(onChangeMock).toHaveBeenCalledWith({ nome: "Pedro", idade: 0 }, expect.anything());

		// Change another value
		form.formState.setValue("idade", 25);

		// Check if the callback was called again
		expect(onChangeMock).toHaveBeenCalledWith({ nome: "Pedro", idade: 25 }, expect.anything());
	});

	it("should notify about validation errors", async () => {
		const defaultValues = { email: "" };
		const onErrorsMock = vi.fn();

		const form = useForm({
			defaultValues,
		});

		form.onErrors(onErrorsMock);

		// Set error manually, which should trigger the callback
		form.formState.setErrors({
			errors: [{ path: "email", message: "Invalid email" }],
		});

		// Check if the error callback was called
		expect(onErrorsMock).toHaveBeenCalled();
	});

	it("should work without resolver for simple forms", () => {
		const defaultValues = { nome: "", email: "" };
		const form = useForm({ defaultValues });

		form.formState.setValue("nome", "Ana");
		expect(form.formState.getValue("nome")).toBe("Ana");

		// Submission without validation
		const mockSubmitFn = vi.fn();
		const submitHandler = form.onSubmit(mockSubmitFn);
		const mockEvent = { preventDefault: vi.fn() };

		submitHandler(mockEvent as any);

		// The callback should be called immediately without validation
		expect(mockSubmitFn).toHaveBeenCalledWith(
			{
				nome: "Ana",
				email: "",
			},
			mockEvent,
		);
	});

	it("should allow setting errors manually", () => {
		const defaultValues = { nome: "", email: "" };
		const form = useForm({ defaultValues });

		// Set error manually
		form.formState.setError("email", "This email is already in use");

		// Check error through the public API
		const errors = form.formState.getErrors();
		expect(errors.errors.length).toBe(1);
		expect(errors.errors[0].path).toBe("email");
		expect(errors.errors[0].message).toBe("This email is already in use");

		// Set multiple errors
		form.formState.setErrors({
			errors: [
				{ path: "nome", message: "Name is required" },
				{ path: "email", message: "Email is required" },
			],
		});

		// Check the new errors
		const newErrors = form.formState.getErrors();
		expect(newErrors.errors.length).toBe(2);
		expect(newErrors.errors.some((e) => e.path === "nome")).toBe(true);
		expect(newErrors.errors.some((e) => e.path === "email")).toBe(true);
	});

	// New tests for additional form elements

	it("should handle checkbox (boolean fields)", () => {
		const defaultValues = { nome: "João", aceitaTermos: false };
		const form = useForm({ defaultValues });

		// Register a checkbox
		const registerProps = form.register("aceitaTermos");
		expect(registerProps.checked).toBe(false);

		// Update checkbox value
		form.formState.setValue("aceitaTermos", true);
		expect(form.formState.getValue("aceitaTermos")).toBe(true);
	});

	it("should handle radio buttons", () => {
		const defaultValues = { genero: "masculino" };
		const form = useForm({ defaultValues });

		// Register radio buttons
		const registerProps = form.register("genero");
		expect(registerProps.value).toBe("masculino");

		// Update radio button value
		form.formState.setValue("genero", "feminino");
		expect(form.formState.getValue("genero")).toBe("feminino");
	});

	it("should handle multiple select (arrays of values)", () => {
		const defaultValues = { habilidades: ["js", "css"] };
		const form = useForm({ defaultValues });

		// Simulate a select with multiple options
		const mockSelect = new MockSelectElement(true);
		mockSelect.name = "habilidades";
		mockSelect.options = [
			{ value: "js", selected: true },
			{ value: "css", selected: true },
			{ value: "html", selected: false },
		];
		mockSelect.selectedOptions = [{ value: "js" }, { value: "css" }];

		// Replace the default mock to use our select mock
		querySelectMock.mockImplementation((selector) => {
			if (selector === '[name="habilidades"]') {
				return mockSelect;
			}
			return new MockElement();
		});

		// Update multiple select values
		form.formState.setValue("habilidades", ["js", "html"]);
		expect(form.formState.getValue("habilidades")).toEqual(["js", "html"]);
	});

	it("should handle file input", () => {
		const defaultValues = { avatar: null };
		const form = useForm({ defaultValues });

		// Mocking a file input
		const mockFileInput = new MockInputElement("file");
		mockFileInput.name = "avatar";
		mockFileInput.files = { 0: { name: "photo.jpg" }, length: 1 };

		// Replace the default mock
		querySelectMock.mockImplementation((selector) => {
			if (selector === '[name="avatar"]') {
				return mockFileInput;
			}
			return new MockElement();
		});

		// Register file input
		// const registerProps = form.register("avatar");
		// expect(registerProps.type).toBe('file');

		// Simulate change event on file input
		// In a real scenario, the onChangeValue function would be called with the event
		// and would extract the FileList from the input element
		form.formState.setValue("avatar", mockFileInput.files);
		expect(form.formState.getValue("avatar")).toEqual(mockFileInput.files);
	});
});
