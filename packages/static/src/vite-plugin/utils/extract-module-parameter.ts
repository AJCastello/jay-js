export function extractModuleParameter(module: string, line: string) {
	const regex = new RegExp(`"${module}\\(([^")]+)\\)"`);
	const match = line.match(regex);
	return match ? match[1].trim() : null;
}
