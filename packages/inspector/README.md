# 🔍 Jay JS Inspector

Plugin de inspeção para desenvolvimento com Jay JS - funcionalidade click-to-source similar ao React DevTools.

## ✨ Recursos

- 🎯 **Click-to-Source**: Clique em qualquer componente Jay JS no browser para abrir o arquivo fonte no editor
- 📍 **Navegação Precisa**: Vai direto para a linha exata onde o componente está definido
- 🚀 **Zero Overhead em Produção**: Ativo apenas em modo desenvolvimento
- ⚡ **Integração com Vite**: Integração perfeita com Vite dev server
- 🎨 **Overlay Visual**: Hover para destacar componentes com metadados
- 🔧 **Multi-Editor**: Suporte para VS Code, Cursor, WebStorm, Atom

## 📦 Instalação

```bash
npm install @jay-js/inspector --save-dev
```

## 🚀 Uso Básico

Adicione o plugin ao seu `vite.config.js`:

```typescript
import { defineConfig } from 'vite';
import { jayJsInspector } from '@jay-js/inspector';

export default defineConfig({
  plugins: [
    jayJsInspector({
      enabled: process.env.NODE_ENV === 'development',
    }),
  ],
});
```

## ⚙️ Configuração

```typescript
jayJsInspector({
  // Ativar/desativar o inspector (padrão: NODE_ENV === 'development')
  enabled: boolean;

  // Editor para abrir arquivos (padrão: 'code')
  editor: 'vscode' | 'code' | 'cursor' | 'webstorm' | 'atom';

  // Combinação de teclas para ativar inspetor (padrão: 'shift+click')
  activationKey: 'click' | 'shift+click' | 'ctrl+click' | 'alt+click';

  // Estilos personalizados do overlay
  overlayStyles?: {
    backgroundColor?: string;    // Cor de fundo
    borderColor?: string;       // Cor da borda
    borderWidth?: string;       // Largura da borda
    borderStyle?: string;       // Estilo da borda
    opacity?: number;           // Opacidade
  };

  // Padrões de inclusão/exclusão de arquivos
  include?: string[];          // Padrões para incluir
  exclude?: string[];          // Padrões para excluir
})
```

## 🎮 Como Usar

### 1. Ativar o Inspector
- Pressione **Shift+Cmd+I** (Mac) ou **Shift+Ctrl+I** (Windows/Linux) para alternar o modo inspector
- Ou use a combinação configurada em `activationKey`

### 2. Inspecionar Componentes
- **Hover**: Passe o mouse sobre componentes para ver o highlight
- **Click**: Use a combinação de teclas configurada (padrão: Shift+Click) para abrir no editor

### 3. Informações Exibidas
- Nome do componente (ex: `<Box>`, `<Button>`)
- Nome do arquivo
- Número da linha
- Metadados adicionais no tooltip

## 🏗️ Como Funciona

O inspector funciona em 3 etapas:

1. **Build-time**: Plugin Vite instrumenta chamadas de componentes Jay JS com metadados
2. **Runtime**: Inspector detecta cliques e extrai metadados dos elementos
3. **Editor**: Comunica com seu editor via Vite dev server para abrir o arquivo

### Transformação de Código

```typescript
// Antes (código original)
function MyComponent() {
  return Box({
    children: Typography({ children: "Hello" })
  })
}

// Depois (instrumentado automaticamente)
function MyComponent() {
  return __jayjs_debug__(Box({
    children: __jayjs_debug__(Typography({ children: "Hello" }), {
      component: 'Typography',
      file: '/src/MyComponent.ts',
      line: 3,
      column: 15
    })
  }), {
    component: 'Box',
    file: '/src/MyComponent.ts',
    line: 2,
    column: 10
  })
}
```

## 🎯 Componentes Suportados

O inspector detecta automaticamente todos os componentes Jay JS:

- `Base`, `Box`, `Button`, `Typography`
- `Input`, `TextInput`, `TextArea`
- `Checkbox`, `Radio`, `Select`, `SelectItem`
- `Form`, `Link`, `Img`
- `List`, `ListItem`, `Section`
- `Progress`, `Range`, `FileInput`
- `Fragment`, `Outlet`

## 🔧 Requisitos

- **Vite**: 4.0+ ou 5.0+
- **Node.js**: 16+
- **Jay JS Elements**: Qualquer versão compatível
- **Editor**: Um dos editores suportados instalado

## 📋 Editores Suportados

| Editor | Comando | Configuração |
|--------|---------|--------------|
| VS Code | `code` | `editor: 'code'` ou `'vscode'` |
| Cursor | `cursor` | `editor: 'cursor'` |
| WebStorm | `webstorm` | `editor: 'webstorm'` |
| Atom | `atom` | `editor: 'atom'` |

## 🐛 Troubleshooting

### Inspector não aparece
- Verifique se `enabled: true` no config
- Confirme que está em modo desenvolvimento
- Abra as DevTools do browser para ver logs

### Editor não abre
- Verifique se o editor está instalado e no PATH
- Teste o comando manualmente: `code --goto arquivo.ts:10:1`
- Verifique os logs do servidor Vite

### Componentes não são detectados
- Confirme que está usando componentes Jay JS
- Verifique se os arquivos estão nos padrões `include`
- Veja se não estão nos padrões `exclude`

## 📝 Exemplo Completo

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import { jayJsInspector } from '@jay-js/inspector';

export default defineConfig({
  plugins: [
    jayJsInspector({
      enabled: process.env.NODE_ENV === 'development',
      editor: 'code',
      activationKey: 'shift+click',
      overlayStyles: {
        backgroundColor: 'rgba(65, 184, 131, 0.2)',
        borderColor: '#41b883',
        borderWidth: '2px',
        borderStyle: 'solid',
        opacity: 0.8,
      },
      include: ['src/**/*.{ts,tsx,js,jsx}'],
      exclude: ['**/*.test.*', '**/*.spec.*'],
    }),
  ],
  server: {
    port: 3000,
  },
});
```

```typescript
// src/App.ts
import { Box, Typography, Button } from '@jay-js/elements';

function App() {
  return Box({
    className: 'app',
    children: [
      Typography({
        tag: 'h1',
        children: 'Minha App Jay JS'
      }),
      Button({
        children: 'Clique em mim!',
        listeners: {
          click: () => alert('Olá!')
        }
      })
    ]
  });
}
```

## 📄 Licença

MIT

## 🤝 Contribuição

Contribuições são bem-vindas! Veja o [repositório principal](https://github.com/AJCastello/jay-js) para guidelines.

---

**💡 Dica**: Use o inspector para navegar rapidamente pelo código e entender a estrutura de componentes em projetos grandes!