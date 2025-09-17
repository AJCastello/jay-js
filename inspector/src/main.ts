import { Routes } from "@/routes";
import "./debug-utils";

Routes();

// Debug panel adicional no console
setTimeout(() => {
	console.log(`
🔍 === JayJS INSPECTOR TEST APP ===

Aplicação carregada com debug automático!

Comandos disponíveis:
• jayjsDebugReport()     - Relatório completo
• jayjsDebugCommands()   - Comandos manuais

Inspector Controls:
• Shift + Alt + J        - Ativar/desativar inspector
• Shift + Click          - Abrir componente no editor

Verifique:
• Panel de debug no canto superior direito da tela
• Status na página principal
• Console para relatórios detalhados

=== DEBUG AUTOMÁTICO INICIADO ===
	`);
}, 3000);

