---
category: JSX
categoryId: 5
articleId: 2
slug: jsx-configuracao
title: Configuração do JSX
description: Aprenda a configurar o JSX em seu projeto Jay JS usando TypeScript ou Vite para começar a utilizar a sintaxe JSX.
---

# Configuração do JSX

## Referência da API

### Métodos de Configuração

```typescript
// Método 1: TSConfig para projetos TypeScript
// tsconfig.json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@jay-js/jsx"
  }
}

// Método 2: Plugin Vite para projetos Vite
// vite.config.ts
import { defineConfig } from 'vite';
import { jayJsxPlugin } from '@jay-js/jsx';

export default defineConfig({
  plugins: [
    jayJsxPlugin()
  ]
});
```

### Instalação

```bash
# npm
npm install @jay-js/jsx

# yarn
yarn add @jay-js/jsx

# pnpm
pnpm add @jay-js/jsx
```

## Visão Geral

Para utilizar JSX em seu projeto Jay JS, você precisa configurar corretamente o seu ambiente de desenvolvimento. Existem duas maneiras principais de fazer isso:

1. Via configuração do TypeScript
2. Usando o plugin Vite (recomendado para projetos Vite)

Ambos os métodos permitem que você escreva JSX em seus arquivos `.tsx` (TypeScript) ou `.jsx` (JavaScript) sem a necessidade de importar explicitamente o runtime JSX em cada arquivo.

## Método 1: Configuração via TypeScript

Para projetos que usam TypeScript, a maneira mais direta de configurar o JSX é através do arquivo `tsconfig.json`. Esta abordagem permite que o TypeScript compile automaticamente o JSX para as chamadas de função adequadas.

### Passo 1: Instale as dependências

```bash
npm install @jay-js/jsx
```

### Passo 2: Configure o tsconfig.json

Edite ou crie um arquivo `tsconfig.json` na raiz do seu projeto com a seguinte configuração:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@jay-js/jsx",
    // Outras opções do compilador...
  }
}
```

Estas opções dizem ao TypeScript para:
- Usar o modo `react-jsx` para compilação JSX (transformando JSX em chamadas para a função `jsx`)
- Importar automaticamente as funções JSX do pacote `@jay-js/jsx`

### Passo 3: Use JSX em seus arquivos TypeScript

Agora você pode escrever JSX diretamente em arquivos `.tsx` sem precisar importar explicitamente o runtime JSX:

```tsx
// Componente.tsx
function MeuComponente({ texto }) {
  return <div className="componente">{texto}</div>;
}

export default MeuComponente;
```

O TypeScript compilará isso para:

```js
import { jsx } from '@jay-js/jsx';

function MeuComponente({ texto }) {
  return jsx("div", { className: "componente", children: texto });
}

export default MeuComponente;
```

## Método 2: Configuração via Plugin Vite

Para projetos que usam Vite como bundler, o pacote `@jay-js/jsx` fornece um plugin que configura automaticamente o suporte a JSX.

### Passo 1: Instale as dependências

```bash
npm install @jay-js/jsx
npm install vite --save-dev
```

### Passo 2: Configure o vite.config.js ou vite.config.ts

```js
import { defineConfig } from 'vite';
import { jayJsxPlugin } from '@jay-js/jsx';

export default defineConfig({
  plugins: [
    jayJsxPlugin()
    // Outros plugins...
  ]
});
```

O plugin `jayJsxPlugin` configura o Vite para:
- Injetar automaticamente os imports necessários do JSX
- Transformar o JSX em chamadas para as funções do runtime do Jay JS

### Passo 3: Use JSX em seus arquivos

Agora você pode escrever JSX diretamente em seus arquivos `.jsx` ou `.tsx`:

```jsx
// Componente.jsx
function Botao({ texto, onClick }) {
  return (
    <button className="botao" onClick={onClick}>
      {texto}
    </button>
  );
}

export default Botao;
```

## Configuração Manual por Arquivo

Se você não quiser ou não puder configurar globalmente o JSX através do TypeScript ou Vite, ainda pode usar JSX em arquivos individuais adicionando uma diretiva pragmática e importando manualmente o runtime JSX:

```jsx
/** @jsx jsx */
import { jsx } from '@jay-js/jsx';

function MeuComponente({ texto }) {
  return <div>{texto}</div>;
}

export default MeuComponente;
```

A diretiva `/** @jsx jsx */` informa ao compilador para usar a função `jsx` importada para transformar o JSX neste arquivo específico.

## Considerações Importantes

1. **Compatibilidade**: Certifique-se de que todas as dependências estão na versão correta para evitar conflitos.
2. **TypeScript**: Se estiver usando TypeScript, certifique-se de que seu `tsconfig.json` tem as configurações de JSX corretas.
3. **Integração com UI**: O pacote JSX funciona em conjunto com `@jay-js/ui` para renderizar elementos no DOM. Certifique-se de tê-lo instalado também.

```bash
npm install @jay-js/ui
```

No próximo artigo, exploraremos com mais detalhes o runtime JSX e como ele funciona internamente. 