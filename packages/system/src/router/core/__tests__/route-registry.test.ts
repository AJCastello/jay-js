import { vi } from 'vitest';
import type { TRoute } from "../../types";
import { routerOptions } from "../configuration";
import { Routes } from "../route-registry";

// Função auxiliar para ajudar nas verificações de caminho
const normalizePath = (path: string) => path || "/";

describe("Routes - route registration", () => {
	// Mock the DOM selector
	const mockSelector = vi.fn();
	vi.mock("../../../utils/dom/query", () => ({
		selector: (query: string) => mockSelector(query),
	}));

	// Save route IDs for testing relationships
	let routeIds: string[] = [];

	beforeEach(() => {
		// Reset mocks and data
		mockSelector.mockReset();
		routeIds = [];

		// Reset router options
		Object.assign(routerOptions, {
			prefix: "",
			onError: undefined,
		});
	});

	it("should correctly register a layout route with index child route", () => {
		// Define mock elements
		const Layout = document.createElement("div");
		const Home = document.createElement("div");
		const About = document.createElement("div");

		// Define routes structure matching the example
		const routes: Array<TRoute> = [
			{
				path: "/",
				element: Layout,
				layout: true,
				children: [
					{
						path: "/",
						element: Home,
					},
					{
						path: "/about",
						element: About,
					},
				],
			},
		];

		// Mock the target
		const mockTarget = document.createElement("div");

		// Register routes
		const registeredRoutes = Routes(routes, mockTarget);

		// Expect 3 routes to be registered (layout, home, about)
		expect(registeredRoutes).toHaveLength(3);

		// Check layout route
		const layoutRoute = registeredRoutes[0];
		expect(normalizePath(layoutRoute.path)).toBe("/");
		expect(layoutRoute.layout).toBe(true);
		expect(layoutRoute.element).toBe(Layout);

		// Store layout ID for use in child tests
		const layoutId = layoutRoute.id;

		// Check home route (index route)
		const homeRoute = registeredRoutes[1];
		expect(normalizePath(homeRoute.path)).toBe("/"); // Should be the same as parent (special case for index routes)
		expect(homeRoute.element).toBe(Home);
		expect(homeRoute.parentLayoutId).toBe(layoutId);

		// Check about route
		const aboutRoute = registeredRoutes[2];
		expect(aboutRoute.path).toBe("/about");
		expect(aboutRoute.element).toBe(About);
		expect(aboutRoute.parentLayoutId).toBe(layoutId);
	});

	it("should correctly register a catalog layout with index and detail routes", () => {
		// Define mock elements
		const CatalogLayout = document.createElement("div");
		const Catalog = document.createElement("div");
		const Product = document.createElement("div");

		// Define routes structure matching the second example
		const routes: Array<TRoute> = [
			{
				path: "/",
				element: CatalogLayout,
				layout: true,
				children: [
					{
						path: "/",
						element: Catalog,
					},
					{
						path: "/product/:id",
						element: Product,
					},
				],
			},
		];

		// Mock the target
		const mockTarget = document.createElement("div");

		// Register routes
		const registeredRoutes = Routes(routes, mockTarget);

		// Expect 3 routes to be registered (layout, catalog, product)
		expect(registeredRoutes).toHaveLength(3);

		// Check layout route
		const layoutRoute = registeredRoutes[0];
		expect(normalizePath(layoutRoute.path)).toBe("/");
		expect(layoutRoute.layout).toBe(true);
		expect(layoutRoute.element).toBe(CatalogLayout);

		// Store layout ID for use in child tests
		const layoutId = layoutRoute.id;

		// Check catalog route (index route)
		const catalogRoute = registeredRoutes[1];
		expect(normalizePath(catalogRoute.path)).toBe("/"); // Should be the same as parent (special case for index routes)
		expect(catalogRoute.element).toBe(Catalog);
		expect(catalogRoute.parentLayoutId).toBe(layoutId);

		// Check product route
		const productRoute = registeredRoutes[2];
		expect(productRoute.path).toBe("/product/:id");
		expect(productRoute.element).toBe(Product);
		expect(productRoute.parentLayoutId).toBe(layoutId);
	});

	it("should handle nested layouts with index routes at multiple levels", () => {
		// Define mock elements
		const MainLayout = document.createElement("div");
		const Home = document.createElement("div");
		const AdminLayout = document.createElement("div");
		const AdminHome = document.createElement("div");
		const AdminUsers = document.createElement("div");

		// Define routes with multiple levels of nesting
		const routes: Array<TRoute> = [
			{
				path: "/",
				element: MainLayout,
				layout: true,
				children: [
					{
						path: "/",
						element: Home,
					},
					{
						path: "/admin",
						element: AdminLayout,
						layout: true,
						children: [
							{
								path: "/", // Index route within /admin
								element: AdminHome,
							},
							{
								path: "/users",
								element: AdminUsers,
							},
						],
					},
				],
			},
		];

		// Mock the target
		const mockTarget = document.createElement("div");

		// Register routes
		const registeredRoutes = Routes(routes, mockTarget);

		// Expect 5 routes to be registered
		expect(registeredRoutes).toHaveLength(5);

		// Check main layout route
		const mainLayoutRoute = registeredRoutes[0];
		expect(normalizePath(mainLayoutRoute.path)).toBe("/");
		expect(mainLayoutRoute.layout).toBe(true);

		// Store IDs for reference in child tests
		const mainLayoutId = mainLayoutRoute.id;

		// Check home route (index route of main layout)
		const homeRoute = registeredRoutes[1];
		expect(normalizePath(homeRoute.path)).toBe("/");
		expect(homeRoute.parentLayoutId).toBe(mainLayoutId);

		// Check admin layout route
		const adminLayoutRoute = registeredRoutes[2];
		expect(adminLayoutRoute.path).toBe("/admin");
		expect(adminLayoutRoute.layout).toBe(true);
		expect(adminLayoutRoute.parentLayoutId).toBe(mainLayoutId);

		// Store admin layout ID
		const adminLayoutId = adminLayoutRoute.id;

		// Check admin home route (index route of admin layout)
		const adminHomeRoute = registeredRoutes[3];
		expect(adminHomeRoute.path).toBe("/admin"); // Should match the parent admin layout path
		expect(adminHomeRoute.element).toBe(AdminHome);
		expect(adminHomeRoute.parentLayoutId).toBe(adminLayoutId);

		// Check admin users route
		const adminUsersRoute = registeredRoutes[4];
		expect(adminUsersRoute.path).toBe("/admin/users");
		expect(adminUsersRoute.element).toBe(AdminUsers);
		expect(adminUsersRoute.parentLayoutId).toBe(adminLayoutId);
	});

	it("should handle prefix option correctly with index routes", () => {
		// Set a prefix in router options
		Object.assign(routerOptions, {
			prefix: "/app",
		});

		// Define mock elements
		const Layout = document.createElement("div");
		const Home = document.createElement("div");

		// Define routes
		const routes: Array<TRoute> = [
			{
				path: "/",
				element: Layout,
				layout: true,
				children: [
					{
						path: "/",
						element: Home,
					},
				],
			},
		];

		// Mock the target
		const mockTarget = document.createElement("div");

		// Register routes
		const registeredRoutes = Routes(routes, mockTarget);

		// Check layout route
		const layoutRoute = registeredRoutes[0];
		expect(layoutRoute.path).toBe("/app");

		// Check home route (index route)
		const homeRoute = registeredRoutes[1];
		expect(homeRoute.path).toBe("/app"); // Should include prefix but not duplicate the path
	});
});
