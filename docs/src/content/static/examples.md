---
category: Static
categoryId: 1
articleId: 5
slug: examples
title: Examples
description: Exemplos práticos de uso do @jay-js/static para diferentes cenários
---

# Examples

## Referência da API

### Exemplos Incluídos

| Exemplo | Descrição |
|---------|-----------|
| Blog Básico | Site de blog com posts em Markdown |
| Documentação | Sistema de documentação multi-seção |
| Portfolio | Portfolio de projetos com galeria |
| E-commerce | Catálogo de produtos estático |

## Visão Geral

Esta seção apresenta exemplos práticos de como usar o @jay-js/static em diferentes tipos de projetos. Cada exemplo mostra padrões comuns e boas práticas.

## Exemplo 1: Blog Pessoal

### Estrutura do Projeto

```
blog-project/
├── vite.config.ts
├── src/
│   ├── content/
│   │   ├── posts/
│   │   │   ├── 2024-01-01-primeiro-post.md
│   │   │   ├── 2024-01-15-tutorial-js.md
│   │   │   └── 2024-02-01-dicas-css.md
│   │   └── authors/
│   │       ├── joao.md
│   │       └── maria.md
│   ├── components/
│   │   ├── BlogPost.ts
│   │   ├── PostList.ts
│   │   └── AuthorCard.ts
│   └── pages/
│       ├── HomePage.ts
│       └── PostPage.ts
```

### Configuração

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

### Posts do Blog

```markdown
---
title: Meu Primeiro Post
slug: primeiro-post
date: 2024-01-01
author: João Silva
category: pessoal
tags: [blog, início]
excerpt: Este é meu primeiro post no novo blog
featured: true
---

# Bem-vindo ao meu blog!

Este é o primeiro post do meu novo blog pessoal...
```

### Página Inicial

```typescript
// src/pages/HomePage.ts
interface BlogPost {
  title: string;
  slug: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  excerpt: string;
  featured: boolean;
  content: string;
}

const blogPosts = useCollection<BlogPost>({
  dir: 'posts',
  metadata: ['title', 'slug', 'date', 'author', 'category', 'excerpt', 'featured']
});

const authors = useCollection({
  dir: 'authors',
  metadata: ['name', 'bio', 'avatar']
});

export function HomePage() {
  const featuredPosts = blogPosts
    .filter(post => post.featured)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const recentPosts = blogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return `
    <div class="homepage">
      <section class="hero">
        <h1>Meu Blog Pessoal</h1>
        <p>Compartilhando conhecimento e experiências</p>
      </section>

      <section class="featured-posts">
        <h2>Posts em Destaque</h2>
        <div class="posts-grid">
          ${featuredPosts.map(post => `
            <article class="featured-post">
              <h3><a href="/post/${post.slug}">${post.title}</a></h3>
              <p class="excerpt">${post.excerpt}</p>
              <div class="meta">
                <span>Por ${post.author}</span>
                <time>${new Date(post.date).toLocaleDateString()}</time>
              </div>
            </article>
          `).join('')}
        </div>
      </section>

      <section class="recent-posts">
        <h2>Posts Recentes</h2>
        ${recentPosts.map(post => `
          <article class="recent-post">
            <h3><a href="/post/${post.slug}">${post.title}</a></h3>
            <p>${post.excerpt}</p>
            <span class="category">${post.category}</span>
          </article>
        `).join('')}
      </section>
    </div>
  `;
}
```

## Exemplo 2: Site de Documentação

### Estrutura do Projeto

```
docs-site/
├── src/
│   ├── content/
│   │   ├── guides/
│   │   │   ├── getting-started.md
│   │   │   ├── configuration.md
│   │   │   └── deployment.md
│   │   ├── api/
│   │   │   ├── functions.md
│   │   │   ├── components.md
│   │   │   └── utilities.md
│   │   └── examples/
│   │       ├── basic-usage.md
│   │       └── advanced-patterns.md
│   └── components/
│       ├── Sidebar.ts
│       ├── DocPage.ts
│       └── Navigation.ts
```

### Conteúdo da Documentação

```markdown
---
title: Getting Started
section: guides
order: 1
level: beginner
lastUpdated: 2024-01-01
contributors: [João, Maria]
---

# Getting Started

Este guia mostra como começar a usar nossa ferramenta...

## Instalação

```bash
npm install nossa-ferramenta
```

## Configuração Básica

...
```

### Sistema de Navegação

```typescript
// src/components/Sidebar.ts
interface DocPage {
  title: string;
  section: string;
  order: number;
  level: string;
  lastUpdated: string;
  contributors: string[];
}

const guides = useCollection<DocPage>({
  dir: 'guides',
  metadata: ['title', 'section', 'order', 'level']
});

const apiDocs = useCollection<DocPage>({
  dir: 'api',
  metadata: ['title', 'section', 'order']
});

const examples = useCollection<DocPage>({
  dir: 'examples',
  metadata: ['title', 'section', 'order', 'level']
});

export function Sidebar() {
  const sections = [
    { title: 'Guias', items: guides.sort((a, b) => a.order - b.order) },
    { title: 'API', items: apiDocs.sort((a, b) => a.order - b.order) },
    { title: 'Exemplos', items: examples.sort((a, b) => a.order - b.order) }
  ];

  return `
    <nav class="sidebar">
      ${sections.map(section => `
        <div class="section">
          <h3>${section.title}</h3>
          <ul>
            ${section.items.map(item => `
              <li>
                <a href="/docs/${item.section}/${item.title.toLowerCase().replace(/\s+/g, '-')}">
                  ${item.title}
                </a>
                ${item.level ? `<span class="level ${item.level}">${item.level}</span>` : ''}
              </li>
            `).join('')}
          </ul>
        </div>
      `).join('')}
    </nav>
  `;
}
```

## Exemplo 3: Portfolio de Projetos

### Estrutura do Projeto

```
portfolio/
├── src/
│   ├── content/
│   │   ├── projects/
│   │   │   ├── website-redesign.md
│   │   │   ├── mobile-app.md
│   │   │   └── dashboard-tool.md
│   │   ├── skills/
│   │   │   ├── frontend.md
│   │   │   ├── backend.md
│   │   │   └── design.md
│   │   └── testimonials/
│   │       ├── client-1.md
│   │       └── client-2.md
│   └── pages/
│       ├── PortfolioPage.ts
│       └── ProjectDetails.ts
```

### Projeto Individual

```markdown
---
title: Website Redesign
category: web-design
status: completed
client: Empresa ABC
year: 2024
duration: 3 months
technologies: [React, TypeScript, Tailwind CSS]
images: [hero.jpg, desktop.jpg, mobile.jpg]
featured: true
---

# Website Redesign para Empresa ABC

## Desafio

A empresa precisava modernizar seu site corporativo...

## Solução

Desenvolvi uma nova interface focada em UX/UI...

## Resultados

- 40% aumento no tempo de permanência
- 25% melhoria na taxa de conversão
```

### Página do Portfolio

```typescript
// src/pages/PortfolioPage.ts
interface Project {
  title: string;
  category: string;
  status: string;
  client: string;
  year: number;
  duration: string;
  technologies: string[];
  images: string[];
  featured: boolean;
  content: string;
}

const projects = useCollection<Project>({
  dir: 'projects',
  metadata: ['title', 'category', 'status', 'client', 'year', 'technologies', 'featured']
});

const skills = useCollection({
  dir: 'skills',
  metadata: ['title', 'level', 'tools']
});

export function PortfolioPage() {
  const featuredProjects = projects.filter(p => p.featured);
  const categorizedProjects = projects.reduce((acc, project) => {
    if (!acc[project.category]) acc[project.category] = [];
    acc[project.category].push(project);
    return acc;
  }, {} as Record<string, Project[]>);

  return `
    <div class="portfolio">
      <header class="hero">
        <h1>Meu Portfolio</h1>
        <p>Desenvolvedor Full Stack | Designer UI/UX</p>
      </header>

      <section class="featured-projects">
        <h2>Projetos em Destaque</h2>
        <div class="projects-grid">
          ${featuredProjects.map(project => `
            <div class="project-card featured">
              <h3>${project.title}</h3>
              <p class="client">Cliente: ${project.client}</p>
              <p class="year">${project.year}</p>
              <div class="technologies">
                ${project.technologies.map(tech => `<span class="tech">${tech}</span>`).join('')}
              </div>
              <a href="/project/${project.title.toLowerCase().replace(/\s+/g, '-')}" class="view-project">
                Ver Projeto
              </a>
            </div>
          `).join('')}
        </div>
      </section>

      <section class="all-projects">
        <h2>Todos os Projetos</h2>
        ${Object.entries(categorizedProjects).map(([category, categoryProjects]) => `
          <div class="category">
            <h3>${category.replace('-', ' ').toUpperCase()}</h3>
            <div class="projects-list">
              ${categoryProjects.map(project => `
                <div class="project-item">
                  <h4>${project.title}</h4>
                  <span class="status ${project.status}">${project.status}</span>
                  <p>${project.duration} - ${project.client}</p>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </section>

      <section class="skills">
        <h2>Habilidades</h2>
        <div class="skills-grid">
          ${skills.map(skill => `
            <div class="skill-card">
              <h4>${skill.title}</h4>
              <div class="skill-level level-${skill.level}">
                <span>${skill.level}</span>
              </div>
              <ul class="tools">
                ${skill.tools.map(tool => `<li>${tool}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      </section>
    </div>
  `;
}
```

## Exemplo 4: Catálogo de Produtos

### Estrutura

```
ecommerce/
├── src/
│   ├── content/
│   │   ├── products/
│   │   │   ├── smartphone-x1.md
│   │   │   ├── laptop-pro.md
│   │   │   └── headphones-wireless.md
│   │   ├── categories/
│   │   │   ├── electronics.md
│   │   │   └── accessories.md
│   │   └── brands/
│   │       ├── techcorp.md
│   │       └── gadgetplus.md
```

### Produto Individual

```markdown
---
title: Smartphone X1
sku: SMT-X1-128
price: 899.99
category: smartphones
brand: TechCorp
inStock: true
rating: 4.5
reviews: 127
features: [Camera 48MP, Battery 5000mAh, 5G, Water resistant]
colors: [black, white, blue]
storage: [128GB, 256GB, 512GB]
images: [front.jpg, back.jpg, side.jpg]
---

# Smartphone X1

## Especificações

O Smartphone X1 é o mais avançado da linha...
```

### Catálogo

```typescript
interface Product {
  title: string;
  sku: string;
  price: number;
  category: string;
  brand: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  features: string[];
  colors: string[];
  storage: string[];
}

const products = useCollection<Product>({
  dir: 'products',
  metadata: ['title', 'sku', 'price', 'category', 'brand', 'inStock', 'rating', 'features']
});

const categories = useCollection({
  dir: 'categories'
});

export function CatalogPage() {
  const productsByCategory = products.reduce((acc, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  return `
    <div class="catalog">
      <header>
        <h1>Nosso Catálogo</h1>
        <div class="filters">
          <select id="category-filter">
            <option value="">Todas as categorias</option>
            ${categories.map(cat => `<option value="${cat.slug}">${cat.title}</option>`).join('')}
          </select>
        </div>
      </header>

      <div class="products-grid">
        ${products.map(product => `
          <div class="product-card" data-category="${product.category}">
            <div class="product-image">
              <img src="/images/products/${product.sku}-thumb.jpg" alt="${product.title}">
              ${!product.inStock ? '<span class="out-of-stock">Fora de estoque</span>' : ''}
            </div>
            <div class="product-info">
              <h3>${product.title}</h3>
              <p class="brand">${product.brand}</p>
              <div class="rating">
                ${'★'.repeat(Math.floor(product.rating))} (${product.reviews})
              </div>
              <p class="price">R$ ${product.price.toFixed(2)}</p>
              <div class="features">
                ${product.features.slice(0, 3).map(feature => `<span class="feature">${feature}</span>`).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
```

## Dicas para Todos os Exemplos

### 1. Performance
```typescript
// Use metadata específicos para listas
const postsList = useCollection({
  dir: 'posts',
  metadata: ['title', 'date', 'excerpt'] // Sem 'content' para listas
});

// Use conteúdo completo apenas para páginas individuais
const fullPost = useCollection({
  dir: 'posts'
});
```

### 2. Organização
```typescript
// Organize por funcionalidade
const blog = useCollection({ dir: 'blog' });
const pages = useCollection({ dir: 'pages' });
const products = useCollection({ dir: 'products' });
```

### 3. Filtragem e Ordenação
```typescript
// Sempre processe no JavaScript
const sortedPosts = posts
  .filter(post => post.published)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
```

Estes exemplos mostram padrões reais de uso do @jay-js/static em diferentes tipos de projetos, demonstrando sua flexibilidade e poder para geração de sites estáticos.