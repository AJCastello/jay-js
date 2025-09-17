import { Box, Typography, Button } from "@jay-js/elements";

export function Home() {
	// Auto-debug quando a página carregar
	setTimeout(() => {
		runInspectorDebug();
	}, 1000);

	return Box({
		style: {
			padding: "20px",
			border: "1px solid #ccc",
			margin: "20px",
			fontFamily: "Arial, sans-serif"
		},
		children: [
			Typography({
				tag: "h1",
				children: "🔍 JayJS Inspector Test App",
				style: { color: "#333", marginBottom: "20px" }
			}),
			Typography({
				tag: "p",
				children: "✅ Inspector configurado e funcionando!",
				style: { color: "#28a745", marginBottom: "15px" }
			}),
			Typography({
				tag: "p",
				children: "Instruções:",
				style: { fontWeight: "bold", marginBottom: "10px" }
			}),
			Typography({
				tag: "ul",
				style: { marginBottom: "20px" },
				children: [
					Typography({
						tag: "li",
						children: "Pressione Shift + Alt + J para ativar inspector",
						style: { marginBottom: "5px" }
					}),
					Typography({
						tag: "li",
						children: "Shift + Click nos elementos para abrir no editor",
						style: { marginBottom: "5px" }
					}),
					Typography({
						tag: "li",
						children: "Veja o console para relatório de debug automático",
						style: { marginBottom: "5px" }
					})
				]
			}),
			Button({
				children: "🎯 Elemento Testável - Clique aqui!",
				style: {
					padding: "15px 25px",
					backgroundColor: "#007bff",
					color: "white",
					border: "none",
					borderRadius: "5px",
					cursor: "pointer",
					fontSize: "16px",
					marginBottom: "20px"
				},
				listeners: {
					click: () => {
						alert("Button funcionando! Agora teste o inspector com Shift+Click");
						console.log("🎯 Button clicked - Inspector deve detectar este elemento");
					}
				}
			}),
			Typography({
				tag: "div",
				style: {
					backgroundColor: "#f8f9fa",
					padding: "15px",
					borderRadius: "5px",
					border: "1px solid #dee2e6"
				},
				children: [
					Typography({
						tag: "strong",
						children: "Status do Debug:",
						style: { display: "block", marginBottom: "10px" }
					}),
					Typography({
						tag: "div",
						id: "debug-status",
						children: "🔄 Carregando debug automático..."
					})
				]
			})
		]
	});
}

// Função de debug automático
function runInspectorDebug() {
	console.group('🔍 JayJS Inspector - Debug Automático Iniciado');

	// 1. Testar plugin Vite
	console.log('🏥 Testando plugin Vite...');
	fetch('/__jayjs-inspector/health')
		.then(r => {
			console.log('Status HTTP:', r.status, r.statusText);
			return r.text();
		})
		.then(data => {
			console.log('Resposta do health check:', data.substring(0, 200) + '...');
			try {
				const json = JSON.parse(data);
				console.log('✅ Plugin Vite ATIVO:', json);
				updateDebugStatus('✅ Plugin Vite: ATIVO');
			} catch (e) {
				console.log('❌ Plugin Vite NÃO configurado - retornando HTML');
				updateDebugStatus('❌ Plugin Vite: INATIVO (retornando HTML)');
			}
		})
		.catch(err => {
			console.log('❌ Erro no health check:', err);
			updateDebugStatus('❌ Plugin Vite: ERRO na conexão');
		});

	// 2. Verificar componentes
	setTimeout(() => {
		console.log('🔍 Verificando componentes JayJS...');
		const elements = document.querySelectorAll('[data-jayjs-component]');
		console.log(`📋 Elementos JayJS encontrados: ${elements.length}`);

		elements.forEach((el, i) => {
			const htmlEl = el as HTMLElement;
			console.log(`  ${i+1}. ${htmlEl.dataset.jayjsComponent} (${htmlEl.dataset.jayjsFile}:${htmlEl.dataset.jayjsLine})`, el);
		});

		// 3. Testar inspector functions
		console.log('🧪 Testando funções do inspector...');
		console.log('window.__JAYJS_INSPECTOR__:', typeof (window as any).__JAYJS_INSPECTOR__);
		console.log('window.__jayjs_debug__:', typeof (window as any).__jayjs_debug__);
		console.log('window.__JAYJS_INSPECTOR_CONFIG__:', !!(window as any).__JAYJS_INSPECTOR_CONFIG__);

		// 4. Gerar relatório completo
		if ((window as any).jayjsDebugReport) {
			console.log('📊 Gerando relatório completo...');
			(window as any).jayjsDebugReport();
		} else {
			console.log('❌ jayjsDebugReport não disponível');
		}

		// 5. Atualizar status na UI
		const statusDiv = document.getElementById('debug-status');
		if (statusDiv) {
			const totalElements = elements.length;
			const inspectorActive = !!(window as any).__JAYJS_INSPECTOR__;
			const debugFnActive = !!(window as any).__jayjs_debug__;

			statusDiv.innerHTML = `
				<div>🔧 Inspector Runtime: ${inspectorActive ? '✅ ATIVO' : '❌ INATIVO'}</div>
				<div>🎯 Debug Function: ${debugFnActive ? '✅ ATIVO' : '❌ INATIVO'}</div>
				<div>📋 Elementos Detectados: ${totalElements}</div>
				<div style="margin-top: 10px;">
					<strong>Instruções:</strong><br>
					1. Abra DevTools (F12)<br>
					2. Veja o console para relatório completo<br>
					3. Pressione Shift+Alt+J para ativar inspector<br>
					4. Shift+Click nos elementos acima
				</div>
			`;
		}

		console.groupEnd();
	}, 500);
}

function updateDebugStatus(message: string) {
	const statusDiv = document.getElementById('debug-status');
	if (statusDiv) {
		statusDiv.innerHTML += `<div>${message}</div>`;
	}
}