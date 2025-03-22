/**
 * It returns a string of random characters of a specified length.
 * @param [length=10] - The length of the key you want to generate.
 * @returns A string of random characters.
 */
export function uniKey(length = 10): string {
	let key = "";
	const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz0123456789";
	for (let i = 0; i < length; i++) {
		key += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return key;
}
