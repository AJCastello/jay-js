export function findScriptAndSrc(inputString: string): { script: string; src: string } | null {
	const scriptRegex = /<script [^>]*src="(\/src\/main.ts)"[^>]*><\/script>/;
	const match = inputString.match(scriptRegex);
	if (match && match[1]) {
		return { script: match[0], src: match[1] };
	}
	return null;
}
