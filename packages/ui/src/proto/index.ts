interface HTMLElement {
  content: string | HTMLElement | Node | (string | HTMLElement | Node)[];
}

Object.defineProperty(HTMLElement.prototype, "content", {
  get: function getContent() {
    if (!this.innerHTML) return null;
    return this.innerHTML;
  },
  set: function setContent(value) {

    if (typeof this.append === "function") {
      this.innerHTML = "";
      if (Array.isArray(value)) {
        value.forEach((item) => {
          this.append(item);
        });
      } else {
        value && this.append(value);
      }
    } else {
      // in case the user tries to set the content of an element that doesn't support it
      // (e.g., <input> or <img>)
      console.warn("JayJS: Cannot set property 'content' of type 'string' to 'value'.");
    }
  },
  enumerable: true,
  configurable: true
});
