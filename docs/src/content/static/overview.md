---
category: Static
categoryId: 1
articleId: 1
slug: overview
title: Static Overview
description: A powerful static site generation tool for Jay JS applications with Vite plugin integration
---

# Static Overview

## Referência da API

### Plugin Principal

| Função | Descrição |
|--------|-----------|
| `jayJsViteStatic()` | Plugin do Vite para geração de sites estáticos |

### Tipos de Interface

```typescript
interface IJayJsViteOptions {
  contentPath: string;
}

interface IBuildCollection {
  contentPath: string;
  dir: string;
  format?: string;
  metadata?: Array<string>;
  suffix?: string;
}

interface Metadata {
  [key: string]: any;
}
```

## Visão Geral

O @jay-js/static é uma ferramenta poderosa para geração de sites estáticos que se integra perfeitamente com o ecossistema Jay JS. Fornece um plugin do Vite que automatiza o processamento de arquivos Markdown, construção de coleções e transformação de conteúdo para aplicações web modernas.

## Características Principais

- **Plugin do Vite**: Integração nativa com o Vite para processamento eficiente
- **Processamento de Markdown**: Conversão automática de arquivos `.md` para HTML
- **Sistema de Coleções**: Construção automática de coleções de conteúdo
- **Metadados**: Suporte completo para frontmatter YAML
- **TypeScript**: Suporte nativo ao TypeScript com tipos bem definidos
- **Configuração Flexível**: Opções de configuração personalizáveis

## Funcionalidades

### 1. Processamento de Markdown
- Converte automaticamente arquivos `.md` em objetos JavaScript/TypeScript
- Processa frontmatter YAML para metadados
- Usa `gray-matter` para análise de frontmatter
- Usa `marked` para conversão Markdown para HTML

### 2. Sistema de Coleções
- Detecta automaticamente chamadas de `useCollection`
- Constrói coleções de conteúdo baseadas em diretórios
- Suporte para metadados filtrados
- Geração automática de arquivos de coleção

### 3. Transformação de Arquivos
- Processa arquivos `.ts`, `.js`, `.tsx`, `.jsx`
- Detecta e processa chamadas de `useCollection`
- Mantém compatibilidade com o sistema de módulos

## Conceitos Básicos

### Plugin do Vite
O plugin intercepta arquivos durante o processo de build do Vite e os transforma conforme necessário.

### Coleções
Uma coleção é um conjunto de arquivos de conteúdo (geralmente Markdown) organizados em um diretório e processados como um grupo.

### Metadados
Informações estruturadas no frontmatter dos arquivos Markdown que são extraídas e disponibilizadas no JavaScript/TypeScript.

### useCollection
Uma função especial que indica ao sistema onde e como construir coleções de conteúdo.

## Casos de Uso

### Blogs Estáticos
Ideal para criar sistemas de blog onde posts são escritos em Markdown e automaticamente processados.

### Documentação
Perfeito para sites de documentação com múltiplas seções e categorias.

### Sites de Conteúdo
Adequado para qualquer site que precisa gerenciar conteúdo estruturado.

### Sistemas de CMS Simples
Funciona como um CMS baseado em arquivos para projetos que não precisam de banco de dados.

## Exemplo Básico

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

```typescript
// Em um arquivo de componente
const blogCollection = useCollection({
  dir: 'blog',
  metadata: ['title', 'date', 'category']
});
```

O sistema automaticamente:
1. Detecta a chamada `useCollection`
2. Lê todos os arquivos no diretório `src/content/blog/`
3. Processa o Markdown e extrai metadados
4. Gera um arquivo `blog.collection.js` com a coleção completa