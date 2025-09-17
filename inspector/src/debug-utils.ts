// Debug utilities for JayJS Inspector testing
export function createDebugPanel() {
	// Create floating debug panel
	const panel = document.createElement('div');
	panel.id = 'jayjs-debug-panel';
	panel.style.cssText = `
		position: fixed;
		top: 10px;
		right: 10px;
		width: 300px;
		background: #fff;
		border: 1px solid #ccc;
		border-radius: 8px;
		box-shadow: 0 4px 12px rgba(0,0,0,0.15);
		z-index: 10000;
		font-family: monospace;
		font-size: 12px;
		max-height: 50vh;
		overflow-y: auto;
	`;

	const header = document.createElement('div');
	header.style.cssText = `
		background: #f8f9fa;
		padding: 8px 12px;
		border-bottom: 1px solid #dee2e6;
		font-weight: bold;
		display: flex;
		justify-content: space-between;
		align-items: center;
	`;
	header.innerHTML = `
		<span>🔍 JayJS Inspector Debug</span>
		<button onclick="this.closest('#jayjs-debug-panel').style.display='none'"
				style="border:none;background:none;cursor:pointer;font-size:16px;">×</button>
	`;

	const content = document.createElement('div');
	content.id = 'debug-panel-content';
	content.style.cssText = 'padding: 12px; line-height: 1.4;';

	panel.appendChild(header);
	panel.appendChild(content);
	document.body.appendChild(panel);

	return {
		panel,
		update: (html: string) => {
			content.innerHTML = html;
		},
		log: (message: string, type: 'info' | 'success' | 'error' = 'info') => {
			const colors = {
				info: '#007bff',
				success: '#28a745',
				error: '#dc3545'
			};
			content.innerHTML += `<div style="color: ${colors[type]}; margin-bottom: 4px;">${message}</div>`;
			content.scrollTop = content.scrollHeight;
		}
	};
}

export function runComprehensiveDebug() {
	const debugPanel = createDebugPanel();

	debugPanel.log('🚀 Iniciando debug abrangente...', 'info');

	// Test 1: Inspector availability
	const inspectorAvailable = !!(window as any).__JAYJS_INSPECTOR__;
	const debugFnAvailable = !!(window as any).__jayjs_debug__;
	const configAvailable = !!(window as any).__JAYJS_INSPECTOR_CONFIG__;

	debugPanel.log(`Inspector Runtime: ${inspectorAvailable ? '✅' : '❌'}`, inspectorAvailable ? 'success' : 'error');
	debugPanel.log(`Debug Function: ${debugFnAvailable ? '✅' : '❌'}`, debugFnAvailable ? 'success' : 'error');
	debugPanel.log(`Config Available: ${configAvailable ? '✅' : '❌'}`, configAvailable ? 'success' : 'error');

	// Test 2: Elements detection
	setTimeout(() => {
		const elements = document.querySelectorAll('[data-jayjs-component]');
		debugPanel.log(`📋 Elementos detectados: ${elements.length}`, elements.length > 0 ? 'success' : 'error');

		elements.forEach((el, i) => {
			debugPanel.log(`  ${i+1}. ${el.dataset.jayjsComponent}`, 'info');
		});

		// Test 3: Plugin health check
		fetch('/__jayjs-inspector/health')
			.then(r => {
				debugPanel.log(`🏥 Health status: ${r.status}`, r.ok ? 'success' : 'error');
				return r.text();
			})
			.then(data => {
				try {
					const json = JSON.parse(data);
					debugPanel.log('✅ Plugin Vite: ATIVO', 'success');
					debugPanel.log(`Timestamp: ${json.timestamp}`, 'info');
				} catch (e) {
					debugPanel.log('❌ Plugin Vite: INATIVO', 'error');
					debugPanel.log('Retornando HTML ao invés de JSON', 'error');
				}

				// Test 4: Transformation check
				checkTransformation(debugPanel);
			})
			.catch(err => {
				debugPanel.log(`❌ Erro: ${err.message}`, 'error');
			});

	}, 500);

	// Test 5: Manual element registration
	setTimeout(() => {
		testManualRegistration(debugPanel);
	}, 1000);

	return debugPanel;
}

function checkTransformation(debugPanel: ReturnType<typeof createDebugPanel>) {
	debugPanel.log('🔧 Verificando transformação...', 'info');

	const scripts = Array.from(document.querySelectorAll('script:not([src])'));
	let foundTransformed = false;

	scripts.forEach(script => {
		const content = script.textContent || '';
		if (content.includes('__jayjs_debug__') && content.length > 500) {
			foundTransformed = true;
			const matches = content.match(/component:\s*['"](.*?)['"],/g);
			if (matches) {
				debugPanel.log('✅ Código transformado encontrado', 'success');
				matches.forEach(match => {
					const component = match.match(/['"](.*?)['"]/)?.[1];
					debugPanel.log(`  - ${component}`, 'info');
				});
			}
		}
	});

	if (!foundTransformed) {
		debugPanel.log('❌ Nenhuma transformação encontrada', 'error');
		debugPanel.log('Possíveis causas:', 'info');
		debugPanel.log('  • Plugin Vite não configurado', 'info');
		debugPanel.log('  • Import path incorreto', 'info');
		debugPanel.log('  • Componentes não detectados', 'info');
	}
}

function testManualRegistration(debugPanel: ReturnType<typeof createDebugPanel>) {
	debugPanel.log('🧪 Testando registro manual...', 'info');

	const testDiv = document.createElement('div');
	testDiv.textContent = 'Elemento de teste';
	testDiv.style.cssText = `
		position: fixed;
		bottom: 10px;
		left: 10px;
		padding: 8px;
		background: #fff3cd;
		border: 1px solid #ffeaa7;
		border-radius: 4px;
		z-index: 9999;
		font-size: 12px;
	`;

	document.body.appendChild(testDiv);

	if ((window as any).__jayjs_debug__) {
		try {
			const registeredElement = (window as any).__jayjs_debug__(testDiv, {
				component: 'TestElement',
				file: '/debug-test/manual.ts',
				line: 1,
				column: 1
			});

			if (registeredElement.dataset.jayjsComponent) {
				debugPanel.log('✅ Registro manual: SUCESSO', 'success');
				debugPanel.log(`Componente: ${registeredElement.dataset.jayjsComponent}`, 'info');
			} else {
				debugPanel.log('❌ Registro manual: FALHOU', 'error');
			}
		} catch (error) {
			debugPanel.log(`❌ Erro no registro: ${error}`, 'error');
		}
	} else {
		debugPanel.log('❌ __jayjs_debug__ não disponível', 'error');
	}

	// Remove test element after 3 seconds
	setTimeout(() => {
		testDiv.remove();
	}, 3000);
}

// Auto-start debug when loaded
if (typeof window !== 'undefined') {
	// Wait for page to load
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', () => {
			setTimeout(() => runComprehensiveDebug(), 2000);
		});
	} else {
		setTimeout(() => runComprehensiveDebug(), 2000);
	}
}