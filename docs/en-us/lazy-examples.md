---
category: Lazy Loading
categoryId: 4
articleId: 5
slug: lazy-examples
title: Practical Examples
description: Real-world examples and patterns for using the lazy loading system in various scenarios.
---

# Practical Examples

## API Reference

```typescript
import { 
  LazyModule, 
  setLazyOptions, 
  ModuleCollector 
} from "@jay-js/system";
```

## Overview

This guide provides practical examples of how to use the lazy loading system in real-world applications. These examples demonstrate common patterns and best practices for different scenarios.

## Basic Component Loading

The simplest use case for lazy loading is to defer the loading of a component until it's needed:

```javascript
import { LazyModule } from "@jay-js/system";

// Create a function that returns a lazy-loaded component
function LazyUserProfile() {
  return LazyModule({
    module: "UserProfile",
    import: () => import("./components/UserProfile.js")
  });
}

// Use the lazy component when needed
document.getElementById("profile-container").appendChild(LazyUserProfile());
```

## Conditional Module Loading

You can conditionally load modules based on user actions or application state:

```javascript
import { LazyModule } from "@jay-js/system";

// Create a button that loads a module when clicked
function createFeatureButton(featureName, containerID) {
  const button = document.createElement("button");
  button.textContent = `Load ${featureName}`;
  
  button.addEventListener("click", () => {
    const container = document.getElementById(containerID);
    
    // Clear previous content
    container.innerHTML = "";
    
    // Load the feature module
    const lazyFeature = LazyModule({
      module: featureName,
      import: () => import(`./features/${featureName}.js`)
    });
    
    container.appendChild(lazyFeature);
  });
  
  return button;
}

// Usage
document.body.appendChild(createFeatureButton("DataVisualizer", "viz-container"));
document.body.appendChild(createFeatureButton("SettingsPanel", "settings-container"));
```

## Dynamic Dashboard Widgets

Implement a dashboard with widgets that load only when added:

```javascript
import { LazyModule } from "@jay-js/system";

class Dashboard {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.widgets = new Map();
  }
  
  addWidget(widgetId, widgetType) {
    // Create widget container
    const widgetContainer = document.createElement("div");
    widgetContainer.className = "widget-container";
    widgetContainer.dataset.widgetId = widgetId;
    
    // Create loading indicator
    const loader = document.createElement("div");
    loader.className = "widget-loader";
    loader.innerHTML = "<span>Loading widget...</span>";
    
    // Lazy load the widget
    const widget = LazyModule({
      module: widgetType,
      import: () => import(`./widgets/${widgetType}.js`),
      params: {
        id: widgetId,
        dashboard: this
      }
    }, loader);
    
    widgetContainer.appendChild(widget);
    this.container.appendChild(widgetContainer);
    this.widgets.set(widgetId, widgetContainer);
    
    return widgetContainer;
  }
  
  removeWidget(widgetId) {
    const widget = this.widgets.get(widgetId);
    if (widget) {
      widget.remove();
      this.widgets.delete(widgetId);
    }
  }
}

// Usage
const dashboard = new Dashboard("main-dashboard");
dashboard.addWidget("widget1", "WeatherWidget");
dashboard.addWidget("widget2", "StockWidget");
dashboard.addWidget("widget3", "CalendarWidget");
```

## Tabbed Interface

Create a tabbed interface where content is loaded only when a tab is activated:

```javascript
import { LazyModule } from "@jay-js/system";

class TabbedInterface {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.tabsContainer = document.createElement("div");
    this.tabsContainer.className = "tabs-header";
    this.contentContainer = document.createElement("div");
    this.contentContainer.className = "tabs-content";
    
    this.container.appendChild(this.tabsContainer);
    this.container.appendChild(this.contentContainer);
    
    this.tabs = [];
    this.activeTab = null;
  }
  
  addTab(tabId, tabTitle, contentModule) {
    // Create tab button
    const tab = document.createElement("button");
    tab.className = "tab-button";
    tab.textContent = tabTitle;
    tab.dataset.tabId = tabId;
    
    tab.addEventListener("click", () => this.activateTab(tabId));
    
    this.tabsContainer.appendChild(tab);
    this.tabs.push({
      id: tabId,
      button: tab,
      module: contentModule
    });
    
    // Activate first tab automatically
    if (this.tabs.length === 1) {
      this.activateTab(tabId);
    }
  }
  
  activateTab(tabId) {
    // Clear active state
    this.tabs.forEach(tab => {
      tab.button.classList.remove("active");
    });
    
    // Set new active tab
    const tab = this.tabs.find(t => t.id === tabId);
    if (tab) {
      tab.button.classList.add("active");
      this.activeTab = tabId;
      
      // Clear content container
      this.contentContainer.innerHTML = "";
      
      // Load tab content
      const content = LazyModule({
        module: tab.module,
        import: () => import(`./tabs/${tab.module}.js`),
        params: { tabId }
      });
      
      this.contentContainer.appendChild(content);
    }
  }
}

// Usage
const tabs = new TabbedInterface("app-tabs");
tabs.addTab("home", "Home", "HomeTab");
tabs.addTab("profile", "Profile", "ProfileTab");
tabs.addTab("settings", "Settings", "SettingsTab");
tabs.addTab("reports", "Reports", "ReportsTab");
```

## Lazy Loading Routes

Implement a simple router with lazy-loaded pages:

```javascript
import { LazyModule } from "@jay-js/system";

class Router {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.routes = new Map();
    this.currentRoute = null;
    
    // Listen for URL changes
    window.addEventListener("popstate", () => this.handleRouteChange());
    
    // Initial route
    this.handleRouteChange();
  }
  
  addRoute(path, component) {
    this.routes.set(path, component);
  }
  
  navigate(path) {
    history.pushState(null, "", path);
    this.handleRouteChange();
  }
  
  handleRouteChange() {
    const path = window.location.pathname;
    const route = this.routes.get(path) || this.routes.get("*");
    
    if (route && path !== this.currentRoute) {
      this.currentRoute = path;
      this.container.innerHTML = "";
      
      const page = LazyModule({
        module: route,
        import: () => import(`./pages/${route}.js`),
        params: { router: this, path }
      });
      
      this.container.appendChild(page);
    }
  }
}

// Usage
const router = new Router("app-container");
router.addRoute("/", "HomePage");
router.addRoute("/about", "AboutPage");
router.addRoute("/products", "ProductsPage");
router.addRoute("/contact", "ContactPage");
router.addRoute("*", "NotFoundPage");

// Create navigation
const nav = document.createElement("nav");
const links = [
  { path: "/", text: "Home" },
  { path: "/about", text: "About" },
  { path: "/products", text: "Products" },
  { path: "/contact", text: "Contact" }
];

links.forEach(link => {
  const a = document.createElement("a");
  a.href = link.path;
  a.textContent = link.text;
  a.addEventListener("click", (e) => {
    e.preventDefault();
    router.navigate(link.path);
  });
  nav.appendChild(a);
});

document.body.insertBefore(nav, document.getElementById("app-container"));
```

## Optimizing Memory Usage

Configure the lazy loading system to optimize memory usage for your application:

```javascript
import { setLazyOptions } from "@jay-js/system";

// Function to apply the appropriate configuration based on device capability
function configureForDevice() {
  const memory = navigator.deviceMemory || 4; // Default to 4GB if not available
  
  if (memory <= 2) {
    // Low-memory devices: aggressive collection
    setLazyOptions({
      gcThreshold: 120000,  // 2 minutes
      gcInterval: 30000     // 30 seconds
    });
  } else if (memory <= 4) {
    // Medium-memory devices: default settings
    setLazyOptions({
      gcThreshold: 300000,  // 5 minutes
      gcInterval: 60000     // 1 minute
    });
  } else {
    // High-memory devices: relaxed collection
    setLazyOptions({
      gcThreshold: 600000,  // 10 minutes
      gcInterval: 180000    // 3 minutes
    });
  }
}

// Apply configuration on startup
configureForDevice();
```

## Dynamic Import of Libraries

Lazy load third-party libraries only when needed:

```javascript
import { LazyModule } from "@jay-js/system";

// Create a function to lazy load a chart library
function createChart(containerId, chartData) {
  const container = document.getElementById(containerId);
  
  // Create loader
  const loader = document.createElement("div");
  loader.className = "chart-loader";
  loader.textContent = "Loading chart...";
  
  // Lazy load the chart module
  const chart = LazyModule({
    module: "ChartModule",
    import: async () => {
      // Import the chart library first
      const ChartJS = await import("chart.js");
      
      // Then return a module that creates charts
      return {
        ChartModule: (params) => {
          const { data } = params;
          const canvas = document.createElement("canvas");
          
          // Create the chart
          new ChartJS.Chart(canvas, {
            type: "line",
            data: data,
            options: {
              responsive: true
            }
          });
          
          return canvas;
        }
      };
    },
    params: {
      data: chartData
    }
  }, loader);
  
  container.appendChild(chart);
}

// Usage
createChart("chart-container", {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [{
    label: "Sales",
    data: [12, 19, 3, 5, 2]
  }]
});
```

These examples demonstrate the flexibility and power of the lazy loading system in various real-world scenarios. You can adapt these patterns to your specific application needs to optimize performance and memory usage. 