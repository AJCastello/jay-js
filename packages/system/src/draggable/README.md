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
- **Droppable**: Make an HTML element a droppable area where draggable elements 

**Helpers:**
- **createSortableList**: Easily create sortable lists with drag-and-drop functionality.
- **createFileDropZone**: Create drop zones for file uploads via drag-and-drop.
- **createDragGroup**: Enable dragging items between multiple containers.
can be dropped.

## Installation

To install the library, you can use npm or yarn:

With npm:

```bash
npm i @jay-js/system
```

With yarn:

```bash
yarn add @jay-js/system
```

## Usage

### Draggable

Makes an HTML element draggable.

#### Example:

```typescript
import { Draggable, selector } from "@jay-js/system";

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
import { Droppable, selector } from "@jay-js/system";

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
import { createSortableList, selector } from "@jay-js/system";

const container = selector("#sortable-list") as HTMLElement;

createSortableList(container, ".sortable-item", (items) => {
  console.log("Sorted items:", items);
});
```

### createFileDropZone

Creates a drop zone that accepts file drag-and-drop.

#### Example:

```typescript
import { createFileDropZone, selector } from "@jay-js/system";

const dropZone = selector("#file-drop-zone") as HTMLElement;

createFileDropZone(dropZone, (files) => {
  console.log("Dropped files:", files);
});
```

### createDragGroup

Creates a group of elements that can be dragged between containers.

#### Example:

```typescript
import { createDragGroup, selectors } from "@jay-js/system";

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
