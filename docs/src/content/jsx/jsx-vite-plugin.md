---
category: JSX
categoryId: 5
articleId: 5
slug: jsx-vite-plugin
title: Plugin Vite para JSX
description: Aprenda a configurar e utilizar o plugin Vite para JSX do Jay JS, simplificando a integração do JSX em seus projetos Vite.
---

# Plugin Vite para JSX

## Referência da API

### Interface do Plugin

```typescript
// Tipo do plugin
interface Plugin {
  name: string;
  config?: (config: any) => any;
  [key: string]: any;
}

// Função que cria o plugin
function jayJsxPlugin(): Plugin;
```

### Uso Básico

```typescript
// vite.config.js ou vite.config.ts
import { defineConfig } from 'vite';
import { jayJsxPlugin } from '@jay-js/jsx';

export default defineConfig({
  plugins: [
    jayJsxPlugin()
    // Outros plugins do Vite...
  ]
});
```

## Visão Geral

O plugin Vite para JSX do Jay JS é uma ferramenta que simplifica significativamente a configuração do JSX em projetos que utilizam o bundler Vite. Este plugin configura automaticamente o Vite para processar arquivos JSX/TSX e utilizar o runtime JSX do Jay JS, sem a necessidade de configuração manual em cada arquivo.

## Como o Plugin Funciona

Internamente, o plugin `jayJsxPlugin` modifica a configuração do Vite para:

1. Injetar automaticamente os imports necessários do runtime JSX do Jay JS
2. Configurar o compilador esbuild (usado pelo Vite) para transformar corretamente o JSX
3. Garantir que as funções do runtime JSX sejam usadas para transformar as expressões JSX

Isso elimina a necessidade de:
- Configurar manualmente o TypeScript para JSX
- Adicionar comentários de pragma JSX em cada arquivo
- Importar manualmente o runtime JSX em cada arquivo

## Instalação e Configuração

### Passo 1: Instale as Dependências

Primeiro, instale o pacote `@jay-js/jsx` junto com o Vite:

```bash
# npm
npm install @jay-js/jsx
npm install vite --save-dev

# ou com yarn
yarn add @jay-js/jsx
yarn add vite --dev

# ou com pnpm
pnpm add @jay-js/jsx
pnpm add vite --save-dev
```

### Passo 2: Configure o Plugin no Vite

Crie ou edite o arquivo `vite.config.js` (ou `vite.config.ts` para projetos TypeScript) na raiz do seu projeto:

```js
import { defineConfig } from 'vite';
import { jayJsxPlugin } from '@jay-js/jsx';

export default defineConfig({
  plugins: [
    jayJsxPlugin(),
    // Você pode adicionar outros plugins aqui
  ],
  // Outras configurações do Vite...
});
```

### Passo 3: Use JSX em seus Arquivos

Agora você pode usar JSX diretamente em seus arquivos `.jsx` ou `.tsx` sem configuração adicional:

```jsx
// src/components/Exemplo.jsx
function Exemplo({ titulo }) {
  return (
    <div className="exemplo">
      <h2>{titulo}</h2>
      <p>Este é um componente JSX configurado com o plugin Vite</p>
    </div>
  );
}

export default Exemplo;
```

## Implementação do Plugin

Para os curiosos sobre como o plugin funciona internamente, aqui está uma explicação da implementação:

```javascript
function jayJsxPlugin() {
  return {
    name: "vite-plugin-jay-jsx",
    config(config) {
      return {
        esbuild: {
          jsxInject: 'import { jayJSX, Fragment } from "@jay-js/jsx/runtime/jsx-runtime.js";',
        }
      };
    }
  };
}
```

O plugin utiliza a opção `jsxInject` do esbuild, que injeta automaticamente o import necessário em todos os arquivos JSX processados pelo Vite. Isso garante que as funções do runtime JSX do Jay JS estejam disponíveis sem imports explícitos.

## Benefícios do Plugin Vite

Utilizar o plugin Vite para JSX traz várias vantagens:

1. **Configuração simplificada**: Elimina a necessidade de configurar o JSX manualmente
2. **Consistência**: Garante que todos os arquivos do projeto usem o mesmo runtime JSX
3. **Integração com HMR**: Funciona perfeitamente com o Hot Module Replacement do Vite
4. **Performance**: Aproveita o rápido tempo de compilação do Vite
5. **Desenvolvimento sem atrito**: Permite focar no desenvolvimento sem preocupações com configuração

## Compatibilidade com Outros Plugins

O plugin JSX do Jay JS é compatível com outros plugins populares do Vite:

### React Developer Tools

Se você está migrando de React para Jay JS ou usa ambos na mesma aplicação, o plugin é compatível com a extensão React Developer Tools.

### TypeScript

O plugin funciona perfeitamente com TypeScript, permitindo escrever JSX em arquivos `.tsx`:

```tsx
// Exemplo com TypeScript
interface BotaoProps {
  texto: string;
  onClick?: () => void;
  tipo?: 'primario' | 'secundario' | 'perigo';
}

function Botao({ texto, onClick, tipo = 'primario' }: BotaoProps) {
  return (
    <button 
      className={`btn btn-${tipo}`} 
      onClick={onClick}
    >
      {texto}
    </button>
  );
}
```

## Modo de Desenvolvimento vs. Produção

O plugin Vite para JSX do Jay JS é inteligente o suficiente para alternar automaticamente entre os modos de desenvolvimento e produção:

- **Modo de Desenvolvimento**: Usa a função `jsxDEV` para fornecer mais informações de depuração
- **Modo de Produção**: Usa a função `jsx` otimizada para melhor performance

Isso é gerenciado automaticamente pelo Vite com base no modo de compilação atual.

## Configurações Avançadas

Embora o plugin funcione bem com as configurações padrão, há situações em que você pode querer personalizá-lo:

### Configuração Manual do esbuild

Se você precisar de mais controle sobre a transformação JSX, pode configurar diretamente as opções do esbuild no seu `vite.config.js`:

```js
import { defineConfig } from 'vite';
import { jayJsxPlugin } from '@jay-js/jsx';

export default defineConfig({
  plugins: [jayJsxPlugin()],
  esbuild: {
    // Configurações personalizadas do esbuild
    jsxFactory: 'jayJSX',
    jsxFragment: 'Fragment',
    // Outras opções...
  }
});
```

## Solução de Problemas

### Problemas Comuns e Soluções

| Problema | Solução |
|----------|---------|
| JSX não está sendo transformado | Verifique se o plugin está corretamente configurado no array `plugins` |
| Erros de "JSX não está definido" | Certifique-se de que o plugin está antes de outros plugins que podem afetar o JSX |
| Erros de tipos TypeScript | Verifique se as configurações de JSX no seu `tsconfig.json` não conflitam com o plugin |
| Elementos não renderizam | Confirme se você tem o `@jay-js/ui` instalado, pois ele é necessário para a renderização |

## Exemplo de Projeto Completo

Aqui está um exemplo de estrutura de projeto Vite utilizando o plugin JSX do Jay JS:

```
meu-projeto/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   ├── App.tsx
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   └── About.tsx
│   ├── main.ts
│   └── style.css
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

Com um arquivo `vite.config.ts` configurado:

```typescript
import { defineConfig } from 'vite';
import { jayJsxPlugin } from '@jay-js/jsx';

export default defineConfig({
  plugins: [jayJsxPlugin()],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});
```

No próximo artigo, exploraremos como integrar o JSX do Jay JS com TypeScript para obter tipagem completa e uma experiência de desenvolvimento mais robusta. 