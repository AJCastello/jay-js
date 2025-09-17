import { MyComponent } from "@/components/my-component";
import { Box, Typography, Button } from "@jay-js/elements";

export function Home() {
	// Debug simples no carregamento
	setTimeout(() => {
		checkInspector();
	}, 1000);

	return Box({
		style: { padding: "20px", fontFamily: "Arial" },
		children: [
			Typography({
				tag: "h1",
				children: "JayJS Inspector Test"
			}),
			Typography({
				tag: "p",
				children: "Elementos para testar inspector:"
			}),
			Button({
				children: "Test Button",
				style: {
					padding: "10px 20px",
					background: "#007bff",
					color: "white",
					border: "none",
					marginBottom: "10px"
				}
			}),
			Typography({
				tag: "div",
				id: "status",
				style: {
					background: "#f5f5f5",
					padding: "10px",
					marginTop: "20px"
				},
				children: "Loading..."
			}),
			MyComponent()
		]
	});
}

function checkInspector() {
	const status = document.getElementById('status');

	// Verificações essenciais
	const elementCount = document.querySelectorAll('[data-jayjs-component]').length;
	const hasInspector = !!(window as any).__JAYJS_INSPECTOR__;
	const hasDebugFn = !!(window as any).__jayjs_debug__;

	// Health check
	fetch('/__jayjs-inspector/health')
		.then(r => r.text())
		.then(data => {
			const isHealthy = data.includes('{"status":"ok"');

			if (status) {
				status.innerHTML = `
					Plugin Vite: ${isHealthy ? '✅' : '❌'}<br>
					Inspector: ${hasInspector ? '✅' : '❌'}<br>
					Debug Function: ${hasDebugFn ? '✅' : '❌'}<br>
					Elements: ${elementCount}<br><br>
					${!isHealthy ? 'PROBLEMA: Plugin não configurado<br>' : ''}
					${elementCount === 0 ? 'PROBLEMA: Nenhum elemento detectado<br>' : ''}
					<br>Press Shift+Alt+J, then Shift+Click elements
				`;
			}
		})
		.catch(() => {
			if (status) {
				status.innerHTML = `❌ Plugin Vite não conectado`;
			}
		});
}