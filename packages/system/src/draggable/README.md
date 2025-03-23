# Draggable Utilities - @jay-js/system

A set of utilities for creating draggable and droppable elements in modern web applications. These utilities are part of the `@jay-js/system` package and provide flexible APIs for implementing drag-and-drop functionality.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Draggable](#draggable)
  - [Droppable](#droppable)
- [Helpers](#helpers)
  - [createSortableList](#createsortablelist)
  - [createFileDropZone](#createfiledropzone)
  - [createDragGroup](#createdraggroup)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Draggable**: Make an HTML element draggable.
- **Droppable**: Make an HTML element a droppable area where draggable elements can be dropped.

**Helpers:**
- **createSortableList**: Easily create sortable lists with drag-and-drop functionality.
- **createFileDropZone**: Create drop zones for file uploads via drag-and-drop.
- **createDragGroup**: Enable dragging items between multiple containers.

## Installation

To install the library, you can use npm or yarn:

With npm:

```bash
npm i @jay-js/system @jay-js/ui
```

With yarn:

```bash
yarn add @jay-js/system @jay-js/ui
```

## Usage

### Draggable

Makes an HTML element draggable.

#### Example:

```typescript
import { Draggable, selector, render } from "@jay-js/system";
import { Box, Card } from "@jay-js/ui";

// Create a draggable card
render(document.body, 
  Box({
    id: "draggable-container",
    children: [
      Card({
        id: "draggable",
        p: 4,
        children: "Drag me!"
      })
    ]
  })
);

const draggableElement = selector("#draggable") as HTMLElement;

Draggable(draggableElement, {
  onDragStart: (event) => {
    console.log("Drag started", event);
  },
  onDragEnd: (event) => {
    console.log("Drag ended", event);
  }
});
```

### Droppable

Makes an HTML element a droppable area where draggable elements can be dropped.

#### Example:

```typescript
import { Droppable, selector, render } from "@jay-js/system";
import { Box, Card } from "@jay-js/ui";

// Create a droppable zone
render(document.body, 
  Box({
    id: "droppable",
    class: "drop-zone",
    style: "min-height: 150px; border: 2px dashed #ccc; padding: 20px;",
    children: "Drop here"
  })
);

const droppableElement = selector("#droppable") as HTMLElement;

Droppable(droppableElement, {
  dragOverClass: "drag-over",
  onDragOver: (event) => {
    console.log("Dragging over", event);
  },
  onDrop: (event, draggedItem) => {
    console.log("Dropped item", draggedItem);
  }
});
```

## Helpers

### createSortableList

Creates a sortable list with drag-and-drop functionality.

#### Example:

```typescript
import { createSortableList, selector, render } from "@jay-js/system";
import { List, ListItem } from "@jay-js/ui";

// Create a sortable list
render(document.body, 
  List({
    id: "sortable-list",
    children: [
      ListItem({ class: "sortable-item", children: "Item 1" }),
      ListItem({ class: "sortable-item", children: "Item 2" }),
      ListItem({ class: "sortable-item", children: "Item 3" }),
      ListItem({ class: "sortable-item", children: "Item 4" })
    ]
  })
);

const container = selector("#sortable-list") as HTMLElement;

createSortableList(container, ".sortable-item", (items) => {
  console.log("Sorted items:", items);
});
```

### createFileDropZone

Creates a drop zone that accepts file drag-and-drop.

#### Example:

```typescript
import { createFileDropZone, selector, render } from "@jay-js/system";
import { Box, FileInput } from "@jay-js/ui";

// Create a file drop zone
render(document.body, 
  Box({
    id: "file-drop-zone",
    class: "file-dropzone",
    style: "border: 3px dashed #ccc; border-radius: 5px; padding: 25px; text-align: center;",
    children: [
      "Drag and drop files here",
      FileInput({
        id: "file-input",
        label: "or select files",
        multiple: true
      })
    ]
  })
);

const dropZone = selector("#file-drop-zone") as HTMLElement;

createFileDropZone(dropZone, (files) => {
  console.log("Dropped files:", files);
});
```

### createDragGroup

Creates a group of elements that can be dragged between containers.

#### Example:

```typescript
import { createDragGroup, selectors, render } from "@jay-js/system";
import { Box, Card } from "@jay-js/ui";

// Create multiple containers with draggable items
render(document.body, 
  Box({
    class: "drag-group-container",
    style: "display: flex; gap: 20px;",
    children: [
      Box({
        class: "drag-container",
        style: "padding: 10px; border: 1px solid #ddd; flex: 1;",
        children: [
          Card({ class: "draggable-item", children: "Item A" }),
          Card({ class: "draggable-item", children: "Item B" })
        ]
      }),
      Box({
        class: "drag-container",
        style: "padding: 10px; border: 1px solid #ddd; flex: 1;",
        children: [
          Card({ class: "draggable-item", children: "Item C" }),
          Card({ class: "draggable-item", children: "Item D" })
        ]
      })
    ]
  })
);

const containers = Array.from(selectors(".drag-container")) as HTMLElement[];

createDragGroup(containers, ".draggable-item", (source, target, item) => {
  console.log("Item moved from", source, "to", target, "Item:", item);
});
```

## Contributing

We welcome contributions to the project! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch with your changes.
3. Submit a pull request to the main branch.

Before submitting a pull request, please make sure your code follows our coding standards and passes all tests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
