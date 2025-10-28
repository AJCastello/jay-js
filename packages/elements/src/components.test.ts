import { vi } from 'vitest';
import { Box } from "./box";
import { Button } from "./button";
import { Form } from "./form";
import { Img } from "./img";
import { Input } from "./input";
import { Link } from "./link";
import { Select } from "./select";
import { TextArea } from "./text-area";
import { Typography } from "./typography";

describe("Component Functions", () => {
	beforeEach(() => {
		document.body.innerHTML = "";
		vi.clearAllMocks();
	});

	describe("Button Component", () => {
		it("should create button element", () => {
			const button = Button();
			expect(button.tagName.toLowerCase()).toBe("button");
		});

		it("should apply button-specific properties", () => {
			const button = Button({
				type: "submit",
				disabled: true,
				children: "Click Me",
			});

			expect(button.type).toBe("submit");
			expect(button.disabled).toBe(true);
			expect(button.textContent).toBe("Click Me");
		});

		it("should handle click events", () => {
			const clickHandler = vi.fn();
			const button = Button({
				listeners: {
					click: clickHandler,
				},
			});

			button.click();
			expect(clickHandler).toHaveBeenCalledTimes(1);
		});
	});

	describe("Input Component", () => {
		it("should create input element", () => {
			const input = Input();
			expect(input.tagName.toLowerCase()).toBe("input");
		});

		it("should apply input-specific properties", () => {
			const input = Input({
				type: "email",
				placeholder: "Enter email",
				required: true,
				value: "test@example.com",
			});

			expect(input.type).toBe("email");
			expect(input.placeholder).toBe("Enter email");
			expect(input.required).toBe(true);
			expect(input.value).toBe("test@example.com");
		});
	});

	describe("TextArea Component", () => {
		it("should create textarea element", () => {
			const textarea = TextArea();
			expect(textarea.tagName.toLowerCase()).toBe("textarea");
		});

		it("should apply textarea properties", () => {
			const textarea = TextArea({
				placeholder: "Enter long text",
				rows: 5,
				cols: 40,
				value: "Multi-line\ntext content",
			});

			expect(textarea.placeholder).toBe("Enter long text");
			expect(textarea.rows).toBe(5);
			expect(textarea.cols).toBe(40);
			expect(textarea.value).toBe("Multi-line\ntext content");
		});
	});

	describe("Select Component", () => {
		it("should create select element", () => {
			const select = Select();
			expect(select.tagName.toLowerCase()).toBe("select");
		});

		it("should apply select properties", () => {
			const select = Select({
				name: "country",
				multiple: true,
				...({ size: 3 } as any),
			});

			expect(select.name).toBe("country");
			expect(select.multiple).toBe(true);
			expect((select as any).size).toBe(3);
		});
	});

	describe("Form Component", () => {
		it("should create form element", () => {
			const form = Form({});
			expect(form.tagName.toLowerCase()).toBe("form");
		});

		it("should apply form properties", () => {
			const form = Form({
				action: "/submit",
				method: "post",
				noValidate: true,
			});

			expect(form.action.endsWith("/submit")).toBe(true);
			expect(form.method).toBe("post");
			expect(form.noValidate).toBe(true);
		});

		it("should handle form submission", () => {
			const submitHandler = vi.fn((e) => e.preventDefault());
			const form = Form({
				listeners: {
					submit: submitHandler,
				},
			});

			form.dispatchEvent(new Event("submit"));
			expect(submitHandler).toHaveBeenCalledTimes(1);
		});
	});

	describe("Box Component", () => {
		it("should create div element", () => {
			const box = Box();
			expect(box.tagName.toLowerCase()).toBe("div");
		});

		it("should apply box properties", () => {
			const box = Box({
				className: "container",
				children: "Box content",
				style: {
					padding: "20px",
					margin: "10px",
				},
			});

			expect(box.className).toBe("container");
			expect(box.textContent).toBe("Box content");
			expect(box.style.padding).toBe("20px");
			expect(box.style.margin).toBe("10px");
		});
	});

	describe("Typography Component", () => {
		it("should create paragraph element by default", () => {
			const typography = Typography();
			expect(typography.tagName.toLowerCase()).toBe("p");
		});

		it("should create specified heading element", () => {
			const h1 = Typography({ tag: "h1" });
			const h2 = Typography({ tag: "h2" });
			const span = Typography({ tag: "span" });

			expect(h1.tagName.toLowerCase()).toBe("h1");
			expect(h2.tagName.toLowerCase()).toBe("h2");
			expect(span.tagName.toLowerCase()).toBe("span");
		});

		it("should apply typography content", () => {
			const typography = Typography({
				tag: "h1",
				children: "Main Heading",
				className: "title",
			});

			expect(typography.textContent).toBe("Main Heading");
			expect(typography.className).toBe("title");
		});
	});

	describe("Link Component", () => {
		it("should create anchor element", () => {
			const link = Link();
			expect(link.tagName.toLowerCase()).toBe("a");
		});

		it("should apply link properties", () => {
			const link = Link({
				href: "https://example.com",
				target: "_blank",
				rel: "noopener noreferrer",
				children: "Visit Example",
			});

			expect(link.href).toBe("https://example.com/");
			expect(link.target).toBe("_blank");
			expect(link.rel).toBe("noopener noreferrer");
			expect(link.textContent).toBe("Visit Example");
		});
	});

	describe("Img Component", () => {
		it("should create img element", () => {
			const img = Img();
			expect(img.tagName.toLowerCase()).toBe("img");
		});

		it("should apply image properties", () => {
			const img = Img({
				src: "/path/to/image.jpg",
				alt: "Description",
				width: 300,
				height: 200,
			});

			expect(img.src.endsWith("/path/to/image.jpg")).toBe(true);
			expect(img.alt).toBe("Description");
			expect(img.width).toBe(300);
			expect(img.height).toBe(200);
		});

		it("should handle image loading events", () => {
			const loadHandler = vi.fn();
			const errorHandler = vi.fn();

			const img = Img({
				src: "/test-image.jpg",
				listeners: {
					load: loadHandler,
					error: errorHandler,
				},
			});

			img.dispatchEvent(new Event("load"));
			img.dispatchEvent(new Event("error"));

			expect(loadHandler).toHaveBeenCalledTimes(1);
			expect(errorHandler).toHaveBeenCalledTimes(1);
		});
	});

	describe("Component Composition", () => {
		it("should compose components together", () => {
			const form = Form({
				children: [
					Input({
						placeholder: "Name",
						name: "name",
						type: "text",
					}),
					Input({
						placeholder: "Email",
						name: "email",
						type: "email",
					}),
					Button({
						type: "submit",
						children: "Submit",
					}),
				],
			});

			expect(form.children.length).toBe(3);
			expect(form.children[0].tagName.toLowerCase()).toBe("input");
			expect(form.children[1].tagName.toLowerCase()).toBe("input");
			expect(form.children[2].tagName.toLowerCase()).toBe("button");

			const nameInput = form.children[0] as HTMLInputElement;
			const emailInput = form.children[1] as HTMLInputElement;
			const submitButton = form.children[2] as HTMLButtonElement;

			expect(nameInput.placeholder).toBe("Name");
			expect(emailInput.type).toBe("email");
			expect(submitButton.textContent).toBe("Submit");
		});

		it("should nest components deeply", () => {
			const container = Box({
				className: "container",
				children: Box({
					className: "inner",
					children: Typography({
						tag: "h1",
						children: "Nested Content",
					}),
				}),
			});

			expect(container.className).toBe("container");
			expect(container.children[0].className).toBe("inner");

			const heading = container.querySelector("h1");
			expect(heading?.textContent).toBe("Nested Content");
		});
	});
});
