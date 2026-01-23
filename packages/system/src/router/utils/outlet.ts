export function Outlet(): HTMLDivElement {
	const outlet = document.createElement("div");
	outlet.style.display = "contents";
	outlet.dataset.router = "outlet";
	return outlet;
}
