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
		{
			code: "en-us",
			import: async () => (await import("./languages/en-us")).default,
		},
	],
} as Partial<Ti18nOptions>;
