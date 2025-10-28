---
category: Static
categoryId: 1
articleId: 6
slug: best-practices
title: Best Practices
description: Melhores práticas para usar o @jay-js/static de forma eficiente e escalável
---

# Best Practices

## Referência da API

### Padrões Recomendados

| Padrão | Descrição |
|--------|-----------|
| Metadados Específicos | Use array `metadata` para controlar dados incluídos |
| Estrutura Organizada | Organize conteúdo em diretórios lógicos |
| Tipos TypeScript | Defina interfaces para conteúdo estruturado |
| Nomeação Consistente | Use convenções consistentes para arquivos e campos |

## Visão Geral

Esta seção apresenta as melhores práticas para usar o @jay-js/static de forma eficiente, escalável e maintível. Seguindo essas diretrizes, você criará projetos mais robustos e fáceis de manter.

## 1. Organização de Arquivos

### Estrutura Recomendada

```
src/
  content/
    blog/              ← Uma categoria por diretório
      2024-01-post-1.md
      2024-02-post-2.md
    docs/              ← Separar por tipo de conteúdo
      getting-started.md
      api-reference.md
    projects/          ← Diferentes tipos de conteúdo
      project-1.md
      project-2.md
    authors/           ← Dados de referência
      author-1.md
    categories/        ← Metadados estruturais
      tech.md
      design.md
```

### Nomeação de Arquivos

```markdown
✅ Bom:
- 2024-01-01-primeiro-post.md
- getting-started-guide.md
- project-website-redesign.md

❌ Evite:
- Post 1.md (espaços)
- primeiro_post.md (underscores)
- GETTING-STARTED.MD (maiúsculas)
```

### Convenções de Slug

```yaml
---
title: "Meu Primeiro Post"
slug: meu-primeiro-post    # kebab-case
date: 2024-01-01
---
```

## 2. Estrutura de Frontmatter

### Campos Obrigatórios

```yaml
---
title: string          # Sempre obrigatório
slug: string           # Para URLs amigáveis
date: YYYY-MM-DD       # ISO format para datas
published: boolean     # Controle de publicação
---
```

### Campos Opcionais Comuns

```yaml
---
# Metadados básicos
title: "Título do Post"
slug: titulo-do-post
date: 2024-01-01
published: true

# Organização
category: tutorial
tags: [javascript, react, tutorial]
author: João Silva

# SEO e social
description: "Descrição para SEO"
excerpt: "Resumo curto do conteúdo"
image: hero.jpg

# Controle de exibição
featured: true
order: 1
level: beginner
---
```

### Tipos de Dados Consistentes

```yaml
---
# Strings
title: "String simples"
multiline: |
  String de múltiplas
  linhas usando YAML

# Números
order: 1
rating: 4.5
price: 99.99

# Booleanos
published: true
featured: false

# Arrays
tags: [tag1, tag2, tag3]
authors: 
  - João Silva
  - Maria Santos

# Objetos
author:
  name: João Silva
  email: joao@example.com
  bio: Desenvolvedor Full Stack
---
```

## 3. Performance e Otimização

### Use Metadados Específicos

```typescript
// ❌ Evite: Carrega todo o conteúdo
const posts = useCollection({
  dir: 'blog'
});

// ✅ Melhor: Apenas metadados para listagens
const postsList = useCollection({
  dir: 'blog',
  metadata: ['title', 'date', 'excerpt', 'author', 'category']
});

// ✅ Conteúdo completo apenas quando necessário
const fullPosts = useCollection({
  dir: 'blog'  // Para páginas individuais
});
```

### Separar Coleções por Uso

```typescript
// ✅ Coleções específicas para diferentes necessidades
const blogPreviews = useCollection({
  dir: 'blog',
  metadata: ['title', 'excerpt', 'date', 'slug']
});

const blogArchive = useCollection({
  dir: 'blog', 
  metadata: ['title', 'date', 'category', 'slug']
});

const featuredPosts = useCollection({
  dir: 'blog',
  metadata: ['title', 'excerpt', 'image', 'slug', 'featured']
});
```

### Processamento Eficiente

```typescript
// ✅ Filtre e ordene no JavaScript, não no build
export function BlogPage() {
  const allPosts = useCollection({ dir: 'blog' });
  
  // Processamento eficiente no runtime
  const publishedPosts = allPosts
    .filter(post => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10); // Limit para performance

  return renderPosts(publishedPosts);
}
```

## 4. TypeScript e Tipagem

### Definir Interfaces Específicas

```typescript
// src/types/content.ts
export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  published: boolean;
  author: string;
  category: string;
  tags: string[];
  excerpt?: string;
  content: string;
}

export interface Author {
  name: string;
  email: string;
  bio: string;
  avatar?: string;
  social?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

export interface ProjectData {
  title: string;
  slug: string;
  status: 'planning' | 'development' | 'completed' | 'archived';
  client: string;
  year: number;
  technologies: string[];
  images: string[];
  featured: boolean;
  content: string;
}
```

### Usar Tipos nas Coleções

```typescript
import { BlogPost, Author } from '../types/content';

// Tipagem forte para melhor DX
const blogPosts = useCollection<BlogPost>({
  dir: 'blog',
  metadata: ['title', 'date', 'author', 'category', 'excerpt']
});

const authors = useCollection<Author>({
  dir: 'authors'
});

// TypeScript irá validar o uso dos dados
function renderPost(post: BlogPost) {
  return `
    <article>
      <h1>${post.title}</h1>
      <p>Por ${post.author} em ${new Date(post.date).toLocaleDateString()}</p>
      <p>${post.excerpt}</p>
    </article>
  `;
}
```

### Tipos Utilitários

```typescript
// Tipos derivados para diferentes contextos
type BlogPostPreview = Pick<BlogPost, 'title' | 'excerpt' | 'date' | 'slug'>;
type BlogPostMetadata = Omit<BlogPost, 'content'>;
type FeaturedPost = BlogPost & { featured: true };

// Uso em coleções específicas
const previews = useCollection<BlogPostPreview>({
  dir: 'blog',
  metadata: ['title', 'excerpt', 'date', 'slug']
});
```

## 5. Manutenibilidade

### Estrutura de Componentes

```typescript
// src/components/blog/
export class BlogPostCard {
  static render(post: BlogPostPreview) {
    return `
      <div class="blog-post-card">
        <h3><a href="/blog/${post.slug}">${post.title}</a></h3>
        <p class="excerpt">${post.excerpt}</p>
        <time class="date">${new Date(post.date).toLocaleDateString()}</time>
      </div>
    `;
  }
}

export class BlogPostList {
  static render(posts: BlogPostPreview[]) {
    return `
      <div class="blog-post-list">
        ${posts.map(post => BlogPostCard.render(post)).join('')}
      </div>
    `;
  }
}
```

### Utilitários de Conteúdo

```typescript
// src/utils/content.ts
export const contentUtils = {
  // Filtrar por status de publicação
  filterPublished<T extends { published?: boolean }>(items: T[]): T[] {
    return items.filter(item => item.published !== false);
  },

  // Ordenar por data
  sortByDate<T extends { date: string }>(items: T[], desc = true): T[] {
    return [...items].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return desc ? dateB - dateA : dateA - dateB;
    });
  },

  // Filtrar por categoria
  filterByCategory<T extends { category?: string }>(items: T[], category: string): T[] {
    return items.filter(item => item.category === category);
  },

  // Paginação
  paginate<T>(items: T[], page: number, perPage: number = 10) {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return {
      items: items.slice(start, end),
      totalPages: Math.ceil(items.length / perPage),
      currentPage: page,
      hasNext: end < items.length,
      hasPrev: page > 1
    };
  }
};
```

## 6. SEO e Acessibilidade

### Metadados para SEO

```yaml
---
title: "Título Otimizado para SEO"
description: "Descrição concisa e informativa (máximo 160 caracteres)"
keywords: [palavra-chave-1, palavra-chave-2]
author: "Nome do Autor"
image: seo-image.jpg
imageAlt: "Descrição da imagem para acessibilidade"
---
```

### Estrutura Semântica

```typescript
export function BlogPost(post: BlogPost) {
  return `
    <article itemscope itemtype="http://schema.org/BlogPosting">
      <header>
        <h1 itemprop="headline">${post.title}</h1>
        <div class="meta">
          <time itemprop="datePublished" datetime="${post.date}">
            ${new Date(post.date).toLocaleDateString()}
          </time>
          <span itemprop="author">${post.author}</span>
        </div>
      </header>
      <div itemprop="articleBody">
        ${post.content}
      </div>
    </article>
  `;
}
```

## 7. Deployment e Build

### Otimização de Build

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [
    jayJsViteStatic({
      contentPath: 'src/content'
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          content: ['./src/content/**/*.collection.js']
        }
      }
    }
  }
});
```

### Cache de Coleções

```typescript
// Cache de coleções para melhor performance
const collectionCache = new Map();

function getCachedCollection(dir: string, metadata?: string[]) {
  const key = `${dir}-${metadata?.join(',') || 'all'}`;
  
  if (!collectionCache.has(key)) {
    const collection = useCollection({ dir, metadata });
    collectionCache.set(key, collection);
  }
  
  return collectionCache.get(key);
}
```

## 8. Testing e Validação

### Validação de Conteúdo

```typescript
// src/utils/validation.ts
export function validateBlogPost(post: any): post is BlogPost {
  return (
    typeof post.title === 'string' &&
    typeof post.date === 'string' &&
    typeof post.content === 'string' &&
    /^\d{4}-\d{2}-\d{2}$/.test(post.date) // Validar formato de data
  );
}

export function validateCollection<T>(
  collection: any[], 
  validator: (item: any) => item is T
): T[] {
  return collection.filter(validator);
}
```

### Testes de Coleção

```typescript
// tests/collections.test.ts
import { describe, it, expect } from 'vitest';

describe('Blog Collection', () => {
  it('should have all required fields', () => {
    const posts = useCollection({ dir: 'blog' });
    
    posts.forEach(post => {
      expect(post).toHaveProperty('title');
      expect(post).toHaveProperty('date');
      expect(post).toHaveProperty('content');
      expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  it('should sort posts by date', () => {
    const posts = useCollection({ dir: 'blog' });
    const sorted = posts.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    expect(sorted[0].date >= sorted[1].date).toBe(true);
  });
});
```

## 9. Resumo das Melhores Práticas

### ✅ Faça

- Use metadados específicos para listas
- Organize conteúdo em diretórios lógicos
- Defina tipos TypeScript para conteúdo
- Use convenções consistentes de nomeação
- Processe e filtre no JavaScript
- Valide estrutura de conteúdo
- Otimize para SEO e acessibilidade

### ❌ Evite

- Carregar conteúdo completo desnecessariamente
- Misturar tipos de conteúdo em um diretório
- Usar espaços ou caracteres especiais em nomes
- Processar dados durante o build quando possível no runtime
- Ignorar tipagem TypeScript
- Duplicar lógica de processamento

Seguindo essas práticas, você terá projetos mais eficientes, maintíveis e escaláveis com o @jay-js/static.