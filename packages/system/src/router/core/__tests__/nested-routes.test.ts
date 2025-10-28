import { vi } from "vitest";
import type { TRoute } from "../../types";
import { resolvedRoutes, routerOptions } from "../configuration";
import { Router } from "../router";

// Mock the history API
const mockPushState = vi.fn();
const originalPushState = window.history.pushState;
const originalLocation = window.location;

describe("Router - nested routes with same path", () => {
	// Mock elements used in routes
	let SiteLayout: HTMLElement;
	let Home: HTMLElement;
	let About: HTMLElement;
	let CatalogLayout: HTMLElement;
	let Catalog: HTMLElement;
	let Product: HTMLElement;
	let target: HTMLElement;

	beforeEach(() => {
		// Setup DOM elements
		SiteLayout = document.createElement("div");
		SiteLayout.id = "site-layout";

		Home = document.createElement("div");
		Home.id = "home-page";

		About = document.createElement("div");
		About.id = "about-page";

		CatalogLayout = document.createElement("div");
		CatalogLayout.id = "catalog-layout";

		Catalog = document.createElement("div");
		Catalog.id = "catalog-page";

		Product = document.createElement("div");
		Product.id = "product-page";

		// Setup target element
		target = document.createElement("div");
		target.id = "app";
		document.body.appendChild(target);

		// Mock history.pushState
		window.history.pushState = mockPushState;

		// Mock location - mais simplificado para o teste
		Object.defineProperty(window, "location", {
			value: { pathname: "/" },
			writable: true,
		});

		// Reset router state
		resolvedRoutes.clear();
		Object.assign(routerOptions, {
			prefix: "",
			onError: undefined,
		});
	});

	afterEach(() => {
		// Cleanup
		if (target.parentNode) {
			target.parentNode.removeChild(target);
		}

		window.history.pushState = originalPushState;

		// Restore location
		Object.defineProperty(window, "location", {
			value: originalLocation,
			configurable: true,
		});

		// Limpar mocks
		vi.clearAllMocks();
	});

	it("should register routes with index child correctly", () => {
		// Define routes with layout and index child route
		const routes: Array<TRoute> = [
			{
				path: "/",
				element: () => SiteLayout,
				layout: true,
				children: [
					{
						path: "/",
						element: () => Home,
					},
					{
						path: "/about",
						element: () => About,
					},
				],
			},
		];

		// Initialize router
		Router(routes, { target });

		// Verificar se as rotas foram registradas corretamente
		expect(resolvedRoutes.size).toBe(3); // Layout, Home e About

		// Verifique se a estrutura das rotas está correta
		const routesArray = Array.from(resolvedRoutes.values());

		// Encontrar a rota de layout (primeira rota registrada)
		const layoutRoute = routesArray.find((route) => route.layout === true);
		expect(layoutRoute).toBeDefined();
		expect(layoutRoute?.path === "" || layoutRoute?.path === "/").toBeTruthy();

		// Encontrar a rota inicial (com o mesmo caminho que o layout)
		const indexRoute = routesArray.find(
			(route) => !route.layout && (route.path === "" || route.path === "/") && route.parentLayoutId === layoutRoute?.id,
		);
		expect(indexRoute).toBeDefined();

		// Encontrar a rota about
		const aboutRoute = routesArray.find((route) => route.path === "/about");
		expect(aboutRoute).toBeDefined();
		expect(aboutRoute?.parentLayoutId).toBe(layoutRoute?.id);
	});

	it("should register catalog routes with index and detail correctly", () => {
		// Define routes with catalog layout, index, and product detail
		const routes: Array<TRoute> = [
			{
				path: "/",
				element: () => CatalogLayout,
				layout: true,
				children: [
					{
						path: "/",
						element: () => Catalog,
					},
					{
						path: "/product/:id",
						element: () => Product,
					},
				],
			},
		];

		// Initialize router
		Router(routes, { target });

		// Verificar se as rotas foram registradas corretamente
		expect(resolvedRoutes.size).toBe(3); // Layout, Catalog e Product

		// Verifique se a estrutura das rotas está correta
		const routesArray = Array.from(resolvedRoutes.values());

		// Encontrar a rota de layout
		const layoutRoute = routesArray.find((route) => route.layout === true);
		expect(layoutRoute).toBeDefined();
		expect(layoutRoute?.path === "" || layoutRoute?.path === "/").toBeTruthy();

		// Encontrar a rota de catálogo (com o mesmo caminho que o layout)
		const catalogRoute = routesArray.find(
			(route) => !route.layout && (route.path === "" || route.path === "/") && route.parentLayoutId === layoutRoute?.id,
		);
		expect(catalogRoute).toBeDefined();

		// Encontrar a rota de produto
		const productRoute = routesArray.find((route) => route.path.includes("/product/"));
		expect(productRoute).toBeDefined();
		expect(productRoute?.parentLayoutId).toBe(layoutRoute?.id);
	});
});
