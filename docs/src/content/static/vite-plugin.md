---
category: Static
categoryId: 1
articleId: 2
slug: vite-plugin
title: Vite Plugin
description: Configuração e uso do plugin Vite para geração de sites estáticos
---

# Vite Plugin

## Referência da API

### jayJsViteStatic()

```typescript
function jayJsViteStatic(options: IJayJsViteOptions): VitePlugin
```

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `options` | `IJayJsViteOptions` | Configurações do plugin |

### IJayJsViteOptions

```typescript
interface IJayJsViteOptions {
  contentPath: string;
}
```

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `contentPath` | `string` | Caminho para o diretório de conteúdo |

### Retorno

Retorna um objeto de plugin do Vite com:
- `name`: "jay-js-vite"
- `transform()`: Função de transformação para arquivos

## Visão Geral

O plugin `jayJsViteStatic` é o núcleo do sistema de geração de sites estáticos do Jay JS. Ele se integra ao processo de build do Vite para transformar arquivos Markdown e processar coleções automaticamente.

## Configuração

### Configuração Básica

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import { jayJsViteStatic } from '@jay-js/static';

export default defineConfig({
  plugins: [
    jayJsViteStatic({
      contentPath: 'src/content'
    })
  ]
});
```

### Estrutura de Diretórios

```
src/
  content/           ← contentPath
    blog/            ← diretório de coleção
      post-1.md
      post-2.md
    docs/            ← outra coleção
      guide-1.md
      guide-2.md
    blog.collection.js    ← gerado automaticamente
    docs.collection.js    ← gerado automaticamente
```

## Como Funciona

### 1. Transformação de Markdown

O plugin intercepta arquivos `.md` e os transforma:

**Arquivo original (post.md):**
```markdown
---
title: Meu Post
date: 2024-01-01
category: tutorial
---

# Conteúdo do Post

Este é um exemplo de post.
```

**Arquivo transformado (post.js):**
```javascript
export default {
  "title": "Meu Post",
  "date": "2024-01-01",
  "category": "tutorial",
  "content": "<h1>Conteúdo do Post</h1>\n<p>Este é um exemplo de post.</p>"
};
```

### 2. Detecção de useCollection

O plugin analisa arquivos `.ts`, `.js`, `.tsx`, `.jsx` em busca de:

```typescript
// Detecta esta sintaxe
const collection = useCollection({
  dir: 'blog',
  metadata: ['title', 'date']
});
```

### 3. Construção de Coleções

Quando `useCollection` é detectado:
1. Lê todos os arquivos do diretório especificado
2. Processa cada arquivo Markdown
3. Extrai metadados especificados
4. Gera arquivo `.collection.js`

## Exemplos de Uso

### Blog Simples

```typescript
// pages/BlogPage.ts
const blog = useCollection({
  dir: 'blog'
});

// Resultado em blog.collection.js:
export default [
  {
    title: "Post 1",
    content: "<h1>Conteúdo HTML</h1>...",
    date: "2024-01-01"
  },
  {
    title: "Post 2", 
    content: "<h1>Outro Conteúdo</h1>...",
    date: "2024-01-02"
  }
];
```

### Com Metadados Específicos

```typescript
// pages/DocsPage.ts
const docs = useCollection({
  dir: 'documentation',
  metadata: ['title', 'category', 'order']
});

// Resultado: apenas title, category, order são incluídos
```

### Múltiplas Coleções

```typescript
// pages/HomePage.ts
const blog = useCollection({
  dir: 'blog',
  metadata: ['title', 'excerpt', 'date']
});

const projects = useCollection({
  dir: 'projects',
  metadata: ['name', 'description', 'tech']
});
```

## Configurações Avançadas

### Diferentes Formatos

O sistema suporta diferentes formatos de saída:

```typescript
// Gera JSON em vez de JS
const collection = useCollection({
  dir: 'data',
  format: 'json'
});
// Resultado: data.collection.json
```

### Sufixos Personalizados

```typescript
const collection = useCollection({
  dir: 'posts',
  suffix: 'index'
});
// Resultado: posts.index.js
```

## Processo de Build

Durante o build do Vite:

1. **Análise**: Plugin analisa todos os arquivos do projeto
2. **Detecção**: Identifica chamadas de `useCollection`
3. **Processamento**: Processa arquivos Markdown nos diretórios especificados
4. **Geração**: Cria arquivos de coleção automaticamente
5. **Transformação**: Converte arquivos Markdown em módulos JavaScript

## Integração com TypeScript

O plugin funciona perfeitamente com TypeScript:

```typescript
interface BlogPost {
  title: string;
  date: string;
  category: string;
  content: string;
}

const blog = useCollection<BlogPost>({
  dir: 'blog',
  metadata: ['title', 'date', 'category']
});
```

## Melhores Práticas

1. **Organize por Funcionalidade**: Crie diretórios para diferentes tipos de conteúdo
2. **Use Metadados Consistentes**: Mantenha estrutura consistente no frontmatter
3. **Especifique Metadados**: Use o array `metadata` para controlar o que é incluído
4. **Nomeação Clara**: Use nomes descritivos para diretórios e arquivos
5. **Estrutura Hierárquica**: Organize conteúdo de forma lógica