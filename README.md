# JAY-JS

# @jay-js/system

`@jay-js/system` is a versatile and lightweight JavaScript library designed to help streamline your front-end development with useful utilities and components. It includes functionality for handling drag and drop, lazy-loading modules, managing application state, and client-side routing.

## Installation

You can install the `@jay-js/system` package using either npm or yarn:

**Using npm:**

```bash
npm install @jay-js/system
```

**Using yarn:**

```bash
yarn add @jay-js/system
```

## Usage

### Draggable

Easily enable drag and drop functionality for your elements:

```javascript
import { Draggable } from "@jay-js/system";

const element = document.getElementById("my-draggable-element");
Draggable(element,{
  onDragStart: (event) => {
    console.log("drag started", event);
  },
  onDrop: (event, element) => {
    console.log("dropped", event, element);
  }
});
```

### LazyModule (Lazy Loading)

Lazy-load your modules to improve the performance of your application:

```javascript
import { LazyModule } from "@jay-js/system";

const loaderElement = document.createElement("div");
loaderElement.innerHTML = "Loading...";

function MyLazyComponent(){
  return LazyModule({
    module: "MyComponent",
    import: () => import("./components/MyComponent"),
  }, loaderElement);
};

document.body.appendChild(MyLazyComponent());
```

### State

Manage your application state efficiently:

```javascript
import { State } from "@jay-js/system";

interface Person {
  name: string;
  age: number;
}

const person = State<Person>({
  name: "John",
  age: 30,
});

person.sub("mySubscription", (data) => {
  console.log("data changed", data);
});

person.set((data) => {
  data.name = "Jane";
  return data;
});

```

### Router

Implement client-side routing with ease:

```javascript
import { Router, Navigate } from "@jay-js/system";

const routes = [
  {
    path: "/",
    element: () => document.createElement("div"),
    target: document.getElementById("app"),
  },
  {
    path: "/about",
    element: () => document.createElement("div"),
    target: document.getElementById("app"),
  },
];

Router(routes);

document.getElementById("about-link").addEventListener("click", () => {
  Navigate("/about");
});
```

## Additional Information

The `@jay-js/system` library is designed to be flexible and efficient. Its components and utilities can be easily integrated into your projects to improve your development experience. As your project grows, you can rely on the `@jay-js/system` library to keep your codebase maintainable and performant.



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