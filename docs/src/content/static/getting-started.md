---
category: Static
categoryId: 1
articleId: 4
slug: getting-started
title: Getting Started
description: Guia para começar a usar o @jay-js/static em seus projetos
---

# Getting Started

## Referência da API

### Instalação

```bash
npm install @jay-js/static
```

### Configuração Básica

```typescript
// vite.config.ts
import { jayJsViteStatic } from '@jay-js/static';

export default defineConfig({
  plugins: [jayJsViteStatic({ contentPath: 'src/content' })]
});
```

### Uso Básico

```typescript
const collection = useCollection({
  dir: 'posts'
});
```

## Visão Geral

Este guia mostra como configurar e usar o @jay-js/static em um projeto do zero. O sistema permite criar sites estáticos com conteúdo em Markdown que é automaticamente processado durante o build.

## Passo 1: Instalação

### Instalar o Pacote

```bash
npm install @jay-js/static
```

### Dependências

O pacote inclui:
- `gray-matter`: Para processar frontmatter YAML
- `marked`: Para converter Markdown para HTML

## Passo 2: Configuração do Vite

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

### Configuração Avançada

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import { jayJsViteStatic } from '@jay-js/static';

export default defineConfig({
  plugins: [
    jayJsViteStatic({
      contentPath: 'content'  // Caminho personalizado
    })
  ]
});
```

## Passo 3: Estrutura de Arquivos

### Criar Estrutura de Conteúdo

```
src/
  content/
    blog/
      post-1.md
      post-2.md
    docs/
      guide-1.md
      guide-2.md
```

### Exemplo de Arquivo Markdown

```markdown
---
title: Meu Primeiro Post
date: 2024-01-01
category: tutorial
author: João Silva
published: true
---

# Bem-vindo ao Blog

Este é o conteúdo do primeiro post do blog.

## Seção

Aqui temos mais conteúdo com **texto em negrito** e *itálico*.

- Lista item 1
- Lista item 2
- Lista item 3
```

## Passo 4: Usando Coleções

### Definir uma Coleção

```typescript
// src/pages/BlogPage.ts
import { useCollection } from '@jay-js/static';

const blogPosts = useCollection({
  dir: 'blog'
});

export function BlogPage() {
  return `
    <div>
      <h1>Blog Posts</h1>
      ${blogPosts.map(post => `
        <article>
          <h2>${post.title}</h2>
          <p>Data: ${post.date}</p>
          <p>Autor: ${post.author}</p>
          <div>${post.content}</div>
        </article>
      `).join('')}
    </div>
  `;
}
```

### Com Metadados Específicos

```typescript
const blogPosts = useCollection({
  dir: 'blog',
  metadata: ['title', 'date', 'author', 'category']
});
// Não inclui o conteúdo HTML, apenas metadados
```

## Passo 5: TypeScript (Opcional)

### Definir Tipos

```typescript
// src/types/content.ts
export interface BlogPost {
  title: string;
  date: string;
  category: string;
  author: string;
  published: boolean;
  content: string;
}

export interface DocPage {
  title: string;
  section: string;
  order: number;
  content: string;
}
```

### Usar com Tipos

```typescript
import { BlogPost } from '../types/content';

const blogPosts = useCollection<BlogPost>({
  dir: 'blog',
  metadata: ['title', 'date', 'author', 'category']
});
```

## Exemplo Completo: Blog Simples

### 1. Estrutura de Arquivos

```
projeto/
├── vite.config.ts
├── src/
│   ├── content/
│   │   └── blog/
│   │       ├── primeiro-post.md
│   │       └── segundo-post.md
│   ├── pages/
│   │   └── BlogPage.ts
│   └── main.ts
```

### 2. Configuração Vite

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

### 3. Conteúdo do Blog

```markdown
---
title: Primeiro Post
date: 2024-01-01
author: João
category: tutorial
---

# Primeiro Post

Este é o primeiro post do blog!
```

```markdown
---
title: Segundo Post
date: 2024-01-02
author: Maria
category: dicas
---

# Segundo Post

Aqui temos dicas úteis.
```

### 4. Página do Blog

```typescript
// src/pages/BlogPage.ts
const blogPosts = useCollection({
  dir: 'blog'
});

export function BlogPage() {
  return `
    <div class="blog">
      <h1>Meu Blog</h1>
      ${blogPosts.map(post => `
        <article class="post">
          <header>
            <h2>${post.title}</h2>
            <div class="meta">
              <span>Por ${post.author}</span>
              <span>${new Date(post.date).toLocaleDateString()}</span>
              <span>Categoria: ${post.category}</span>
            </div>
          </header>
          <div class="content">
            ${post.content}
          </div>
        </article>
      `).join('')}
    </div>
  `;
}
```

### 5. Arquivo Principal

```typescript
// src/main.ts
import { BlogPage } from './pages/BlogPage';

document.getElementById('app')!.innerHTML = BlogPage();
```

## Resultado

Durante o build, o sistema:

1. **Detecta** a chamada `useCollection` em `BlogPage.ts`
2. **Processa** todos os arquivos `.md` em `src/content/blog/`
3. **Gera** automaticamente `src/content/blog.collection.js`:

```javascript
export default [
  {
    "title": "Primeiro Post",
    "date": "2024-01-01",
    "author": "João",
    "category": "tutorial",
    "content": "<h1>Primeiro Post</h1>\n<p>Este é o primeiro post do blog!</p>"
  },
  {
    "title": "Segundo Post",
    "date": "2024-01-02", 
    "author": "Maria",
    "category": "dicas",
    "content": "<h1>Segundo Post</h1>\n<p>Aqui temos dicas úteis.</p>"
  }
];
```

## Próximos Passos

1. **Explore Exemplos**: Veja a documentação de exemplos para casos mais complexos
2. **Personalize Metadados**: Use o array `metadata` para controlar dados incluídos
3. **Organize Conteúdo**: Crie múltiplas coleções para diferentes tipos de conteúdo
4. **Adicione Estilos**: Use CSS para estilizar o conteúdo processado
5. **Deploy**: Configure deploy para seu site estático