export function toCamelCase(input: string): string {
	return input
		.toLowerCase()
		.replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""))
		.replace(/^(.)/, (c) => c.toLowerCase());
}

export function toPascalCase(input: string): string {
	return input
		.toLowerCase()
		.replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""))
		.replace(/^(.)/, (c) => c.toUpperCase());
}

export function toSnakeCase(input: string): string {
	return input.toLowerCase().replace(/[-_\s]+/g, "_");
}

export function toKebabCase(input: string): string {
	return input.toLowerCase().replace(/[-_\s]+/g, "-");
}
