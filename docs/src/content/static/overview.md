---
category: Static
categoryId: 1
articleId: 1
slug: overview
title: Overview
description: Uma visão geral das funcionalidades de geração de sites estáticos do pacote @jay-js/static.
---

# Static Package Overview

O **@jay-js/static** é o pacote de geração de sites estáticos do Jay JS framework, oferecendo ferramentas poderosas para criar websites ultra-rápidos, otimizados para SEO e com excelente performance através de pré-renderização e geração estática.

## O que é o Static Package?

O Static package é uma solução completa para Static Site Generation (SSG) que transforma aplicações Jay JS dinâmicas em sites estáticos otimizados. Ele combina a flexibilidade do desenvolvimento dinâmico com a performance e confiabilidade de sites estáticos.

## Principais Funcionalidades

### 🚀 **Static Site Generation**
- Pré-renderização de todas as páginas
- Geração de HTML, CSS e JS otimizados
- Build-time data fetching
- Arquivos estáticos prontos para deploy

### ⚡ **Performance Optimization**
- Code splitting automático
- Lazy loading de recursos
- Otimização de imagens
- Minificação de assets

### 🔍 **SEO Enhancement**
- Meta tags otimizadas
- Structured data support
- Sitemap generation automático
- Open Graph e Twitter Cards

### 📊 **Build Analytics**
- Relatórios de performance
- Bundle size analysis
- Core Web Vitals metrics
- Optimization recommendations

## Modos de Geração

### **Full Static Generation**
```typescript
import { staticBuild } from '@jay-js/static';

// Gerar site completamente estático
await staticBuild({
  mode: 'static',
  outputDir: './dist',
  pages: [
    '/',
    '/about',
    '/products',
    '/contact'
  ]
});
```

### **Hybrid Generation**
```typescript
import { staticBuild } from '@jay-js/static';

// Combinar páginas estáticas com dinâmicas
await staticBuild({
  mode: 'hybrid',
  staticPages: ['/', '/about'],
  dynamicPages: ['/api/*', '/user/*'],
  outputDir: './dist'
});
```

### **Incremental Static Regeneration**
```typescript
import { staticBuild } from '@jay-js/static';

// Regeneração incremental de páginas
await staticBuild({
  mode: 'isr',
  revalidate: 3600, // 1 hora
  pages: ['/blog/*', '/products/*']
});
```

## Data Fetching Strategies

### **Build-time Data**
```typescript
import { getStaticData } from '@jay-js/static';

// Buscar dados no momento do build
export const BlogPage = getStaticData(async () => {
  const posts = await fetch('/api/posts').then(r => r.json());
  return { posts };
});
```

### **Static Props**
```typescript
import { getStaticProps } from '@jay-js/static';

// Props estáticas para componentes
export const ProductPage = getStaticProps(async ({ params }) => {
  const product = await getProduct(params.id);
  return {
    props: { product },
    revalidate: 86400 // 24 horas
  };
});
```

## Optimizations Features

### **Asset Optimization**
- Compressão automática de imagens
- WebP conversion
- CSS purging
- JavaScript minification

### **Caching Strategy**
```typescript
import { cacheConfig } from '@jay-js/static';

cacheConfig({
  static: '1y',      // Assets estáticos
  html: '1h',        // Páginas HTML
  api: '5m',         // Dados de API
  images: '30d'      // Imagens otimizadas
});
```

### **Bundle Analysis**
```typescript
import { analyzeBuild } from '@jay-js/static';

// Análise detalhada do build
const report = await analyzeBuild('./dist');
console.log('Bundle size:', report.totalSize);
console.log('Largest chunks:', report.largestChunks);
```

## Vantagens do Static Package

- **⚡ Performance**: Sites ultra-rápidos com recursos pré-carregados
- **🔍 SEO**: Excelente indexação em motores de busca
- **💰 Custo**: Hospedagem barata em CDNs
- **🛡️ Segurança**: Redução da superfície de ataque
- **⚖️ Escalabilidade**: Suporte a milhões de visitantes
- **🌐 Global**: Distribuição via CDN mundial

## Deploy Targets

### **Popular Platforms**
```bash
# Netlify
npx @jay-js/static deploy --target netlify

# Vercel
npx @jay-js/static deploy --target vercel

# GitHub Pages
npx @jay-js/static deploy --target github

# AWS S3 + CloudFront
npx @jay-js/static deploy --target aws
```

### **Custom Deploy**
```typescript
import { deploy } from '@jay-js/static';

await deploy({
  target: 'custom',
  uploadCommand: 'rsync -r ./dist/ user@server:/var/www/',
  postDeploy: 'sudo systemctl reload nginx'
});
```

## Configuração Avançada

```typescript
// jay-static.config.js
export default {
  build: {
    outDir: './dist',
    minify: true,
    sourcemap: false
  },
  seo: {
    defaultTitle: 'My Static Site',
    defaultDescription: 'Built with Jay JS Static',
    generateSitemap: true
  },
  optimization: {
    images: true,
    css: true,
    fonts: true
  }
};
```

## Compatibilidade

O Static package é compatível com:
- **Jay JS framework** (todas as versões)
- **Node.js** 18+
- **Principais CDNs** e plataformas de hosting
- **CI/CD pipelines**

## Instalação e Uso

Para instalar o @jay-js/static no seu projeto:

```bash
npm install @jay-js/static
```

```typescript
import { staticBuild } from '@jay-js/static';

// Build básico para produção
await staticBuild({
  mode: 'static',
  outputDir: './dist'
});
```

O @jay-js/static é a solução ideal para criar sites estáticos de alta performance com toda a flexibilidade do Jay JS framework.