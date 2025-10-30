export async function initStatic() {
	const { staticCompiler } = await import("./static-compiler.js");
	await staticCompiler();
}
