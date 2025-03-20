import { render } from "../render.js";

describe("Render Utility", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="app"></div>
      <div id="container" class="test-container"></div>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it("should render string content to target element", () => {
    const app = document.getElementById('app');
    render(app, "Hello World");
    
    expect(app?.innerHTML).toBe("Hello World");
  });

  it("should render DOM element to target element", () => {
    const paragraph = document.createElement('p');
    paragraph.textContent = "Test paragraph";
    
    render('#app', paragraph);
    
    const app = document.getElementById('app');
    expect(app?.innerHTML).toBe("<p>Test paragraph</p>");
  });

  it("should render array of elements to target", () => {
    const p1 = document.createElement('p');
    p1.textContent = "First";
    
    const p2 = document.createElement('p');
    p2.textContent = "Second";
    
    render('#app', [p1, p2]);
    
    const app = document.getElementById('app');
    expect(app?.childNodes.length).toBe(2);
    expect(app?.innerHTML).toBe("<p>First</p><p>Second</p>");
  });

  it("should replace content by default", () => {
    const app = document.getElementById('app');
    if (app) app.innerHTML = "<div>Original</div>";
    
    render('#app', "New Content");
    
    expect(app?.innerHTML).toBe("New Content");
  });

  it("should append content when insert option is 'append'", () => {
    const app = document.getElementById('app');
    if (app) app.innerHTML = "<div>Original</div>";
    
    render('#app', " Appended", { insert: "append" });
    
    expect(app?.innerHTML).toBe("<div>Original</div> Appended");
  });

  it("should prepend content when insert option is 'prepend'", () => {
    const app = document.getElementById('app');
    if (app) app.innerHTML = "<div>Original</div>";
    
    render('#app', "Prepended ", { insert: "prepend" });
    
    expect(app?.innerHTML).toBe("Prepended <div>Original</div>");
  });

  it("should handle array content with append option", () => {
    const app = document.getElementById('app');
    if (app) app.innerHTML = "<span>Original</span>";
    
    const p1 = document.createElement('p');
    p1.textContent = "First";
    
    const p2 = document.createElement('p');
    p2.textContent = "Second";
    
    render('#app', [p1, p2], { insert: "append" });
    
    expect(app?.innerHTML).toBe("<span>Original</span><p>First</p><p>Second</p>");
  });

  it("should handle array content with prepend option", () => {
    const app = document.getElementById('app');
    if (app) app.innerHTML = "<span>Original</span>";
    
    const p1 = document.createElement('p');
    p1.textContent = "First";
    
    const p2 = document.createElement('p');
    p2.textContent = "Second";
    
    render('#app', [p1, p2], { insert: "prepend" });
    
    expect(app?.innerHTML).toBe("<p>First</p><p>Second</p><span>Original</span>");
  });

  it("should accept selector string as target", () => {
    render('#container', "Target by selector");
    
    const container = document.getElementById('container');
    expect(container?.innerHTML).toBe("Target by selector");
  });

  it("should do nothing if target is null", () => {
    const initialHTML = document.body.innerHTML;
    render(null, "Content");
    
    expect(document.body.innerHTML).toBe(initialHTML);
  });

  it("should do nothing if content is null or undefined", () => {
    const app = document.getElementById('app');
    if (app) app.innerHTML = "Original";
    
    render('#app', null);
    expect(app?.innerHTML).toBe("Original");
    
    render('#app', undefined);
    expect(app?.innerHTML).toBe("Original");
  });

  it("should do nothing if target element is not found", () => {
    const initialHTML = document.body.innerHTML;
    render('#non-existent', "Content");
    
    expect(document.body.innerHTML).toBe(initialHTML);
  });
});