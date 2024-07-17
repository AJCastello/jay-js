const element = document.createElement("div");

export function NotFound() {
  element.innerHTML = "Not Found.";
  return element;
}

export function ErrorImport() {
  element.innerHTML = "Error Importing Module.";
  return element;
}

export function ModuleWrapper() {
  const element = document.createElement("jayjs-lazy-slot");
  return element;
}
