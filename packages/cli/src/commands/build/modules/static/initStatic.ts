export async function initStatic() {
	const { staticCompiler } = await import("./staticCompiler.js");
	await staticCompiler();
}
