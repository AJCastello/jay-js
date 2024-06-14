export async function buildAction(options: any) {
  if (options.static) {
    const { render } = await import("../index.js");
    await render();
  } else {
    console.log("Other build options are not yet available");
  }
}