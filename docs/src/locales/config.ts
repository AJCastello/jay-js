import type { Ti18nOptions } from "@jay-js/system";

export default {
	defaultLocale: "pt-br",
	nestedKeys: false,
	saveToLocalStorage: true,
	languages: [
		{
			code: "pt-br",
			import: async () => (await import("./languages/pt-br")).default,
		},
		// {
		//   code: "es-es",
		//   import: async () => (await import("./languages/es-es")).default
		// },
		// {
		//   code: "pt-pt",
		//   import: async () => (await import("./languages/pt-pt")).default
		// },
		{
			code: "en-us",
			import: async () => (await import("./languages/en-us")).default,
		},
		// {
		//   code: "fr-fr",
		//   import: async () => (await import("./languages/fr-fr")).default
		// }
	],
} as Partial<Ti18nOptions>;
