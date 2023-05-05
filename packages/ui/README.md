# @jay-js/ui

Jay-JS UI is a modern, lightweight, and fully customizable UI component library for building responsive and scalable web applications. It is built with simplicity and flexibility in mind, making it easy to use and adapt to various web projects.

You can use it headless or with Tailwind CSS with daisyUI plugin (already included in the package) to create stunning user interfaces for your web applications.

## Installation

To install Jay-JS UI, simply run the following command in your project directory:

**Using npm:**

```bash
npm install @jay-js/ui
```

**Using yarn:**

```bash
yarn add @jay-js/ui
```

## Usage

To start using Jay-JS UI components in your application, simply import the desired components and their respective interfaces. Here's a basic example of using the Button component:

```javascript
import { Button, IButton } from "@jay-js/ui";

const myButton = Button({
  content: "Click me",
  color: "btn-primary",
  onclick: () => {
    console.log("Button clicked!");
  },
});

document.body.appendChild(myButton);
```

## Components

Jay-JS UI offers a wide range of components that can be easily customized to fit your application's style and requirements. Here are some of the available components:

- Alert
- BaseElement
- Button
- Card
- CheckBox
- Divider
- Dropdown
- Form
- Icon
- IconButton
- Img
- Input
- Link
- ResizableSplitter
- RippleEffect
- Section
- Select
- Space
- Tabs
- TextArea
- Toggle
- Typography

Each component comes with its own set of customizable properties and optional event listeners. To learn more about each component and its available options, please refer to the respective component documentation.

## Customization

Jay-JS UI components are designed to be easily customizable through the use of CSS classes, inline styles, and JavaScript style objects. You can control the appearance and behavior of each component to match your application's design system or personal preferences.

Here's an example of customizing the appearance of a Button component using inline styles and a custom CSS class:

```javascript
const myButton = Button({
  content: "Custom Button",
  className: "my-custom-button",
  style: {
    backgroundColor: "#007BFF",
    borderRadius: "5px",
    padding: "10px 20px",
  },
});
```

In your CSS file, you can target the custom class to apply additional styles:

```css
.my-custom-button:hover {
  background-color: #0056b3;
}
```

## Contributing

We welcome contributions from the community. If you find a bug, have a feature request, or want to contribute to the project, please feel free to open an issue or submit a pull request on the project's GitHub repository.

## License

Jay-JS UI is licensed under the MIT License. For more information, please refer to the [LICENSE](LICENSE) file.

---

We hope you enjoy using Jay-JS UI to build stunning web applications. If you have any questions, suggestions, or feedback, please feel free to reach out to us. Happy coding!