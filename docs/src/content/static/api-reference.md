---
category: Static
categoryId: 1
articleId: 3
slug: api-reference
title: API Reference
description: Referência completa da API do @jay-js/static
---

# API Reference

## Referência da API

### Funções Principais

| Função | Descrição |
|--------|-----------|
| `jayJsViteStatic()` | Plugin principal do Vite para geração estática |
| `parseMarkdown()` | Processa arquivos Markdown com frontmatter |
| `buildCollection()` | Constrói coleções de conteúdo |

### Tipos e Interfaces

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

## jayJsViteStatic()

```typescript
function jayJsViteStatic(options: IJayJsViteOptions): VitePlugin
```

Plugin principal que integra o sistema de geração estática ao Vite.

### Parâmetros

| Nome | Tipo | Obrigatório | Descrição |
|------|------|------------|-----------|
| `options` | `IJayJsViteOptions` | Sim | Configurações do plugin |

### IJayJsViteOptions

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `contentPath` | `string` | - | Caminho para o diretório raiz do conteúdo |

### Retorno

Retorna um objeto plugin do Vite com:
- `name: "jay-js-vite"`
- `transform(src: string, id: string)`: Função de transformação

### Exemplo

```typescript
import { jayJsViteStatic } from '@jay-js/static';

export default defineConfig({
  plugins: [
    jayJsViteStatic({
      contentPath: 'src/content'
    })
  ]
});
```

## parseMarkdown()

```typescript
function parseMarkdown(src: string): any
```

Processa conteúdo Markdown com frontmatter YAML.

### Parâmetros

| Nome | Tipo | Descrição |
|------|------|-----------|
| `src` | `string` | Conteúdo Markdown com frontmatter |

### Retorno

Retorna um objeto com:
- Propriedades do frontmatter como propriedades do objeto
- `content`: HTML convertido do Markdown

### Exemplo

```typescript
const markdownContent = `---
title: Exemplo
date: 2024-01-01
---

# Título

Conteúdo do post.`;

const result = parseMarkdown(markdownContent);
// {
//   title: "Exemplo",
//   date: "2024-01-01",
//   content: "<h1>Título</h1>\n<p>Conteúdo do post.</p>"
// }
```

## buildCollection()

```typescript
function buildCollection(config: IBuildCollection): Array<any>
```

Constrói uma coleção de conteúdo a partir de arquivos em um diretório.

### Parâmetros

| Nome | Tipo | Descrição |
|------|------|-----------|
| `config` | `IBuildCollection` | Configuração da coleção |

### IBuildCollection

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `contentPath` | `string` | - | Caminho base do conteúdo |
| `dir` | `string` | - | Diretório específico da coleção |
| `format` | `string` | `"js"` | Formato do arquivo (`"js"` ou `"json"`) |
| `metadata` | `Array<string>` | `[]` | Campos de metadata a incluir |
| `suffix` | `string` | `"collection"` | Sufixo do arquivo gerado |

### Retorno

Array com objetos processados de cada arquivo da coleção.

### Exemplo

```typescript
const collection = buildCollection({
  contentPath: 'src/content',
  dir: 'blog',
  metadata: ['title', 'date', 'category'],
  format: 'js',
  suffix: 'collection'
});
// Gera: src/content/blog.collection.js
```

## useCollection()

```typescript
function useCollection<T = any>(config: {
  dir: string;
  metadata?: Array<string>;
  format?: string;
  suffix?: string;
}): Array<T>
```

Função especial detectada pelo plugin para construir coleções automaticamente.

### Parâmetros de Configuração

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `dir` | `string` | - | Diretório da coleção |
| `metadata` | `Array<string>` | `undefined` | Campos específicos a incluir |
| `format` | `string` | `"js"` | Formato do arquivo |
| `suffix` | `string` | `"collection"` | Sufixo do arquivo |

### Exemplo com TypeScript

```typescript
interface BlogPost {
  title: string;
  date: string;
  content: string;
  category?: string;
}

const blog = useCollection<BlogPost>({
  dir: 'blog',
  metadata: ['title', 'date', 'category']
});
```

## Utilitários Internos

### extractUseCollectionData()

```typescript
function extractUseCollectionData(src: string): ExtractedData | null
```

Extrai informações de chamadas `useCollection` do código fonte.

### reduceMetadata()

```typescript
function reduceMetadata(data: any, metadata?: Array<string>): any
```

Filtra objeto para incluir apenas metadados especificados.

### writeCollection()

```typescript
function writeCollection(collection: Array<any>, filePath: string, format: string): void
```

Escreve coleção processada no arquivo especificado.

## Padrões de Uso

### Coleção Simples

```typescript
// Todos os metadados incluídos
const posts = useCollection({
  dir: 'blog'
});
```

### Coleção com Metadados Filtrados

```typescript
// Apenas campos especificados
const posts = useCollection({
  dir: 'blog',
  metadata: ['title', 'excerpt', 'date']
});
```

### Múltiplos Formatos

```typescript
// Arquivo JavaScript (padrão)
const posts = useCollection({
  dir: 'blog',
  format: 'js'
});

// Arquivo JSON
const data = useCollection({
  dir: 'data',
  format: 'json'
});
```

### Sufixos Personalizados

```typescript
// Gera: blog.index.js
const posts = useCollection({
  dir: 'blog',
  suffix: 'index'
});

// Gera: blog.data.js
const posts = useCollection({
  dir: 'blog',
  suffix: 'data'
});
```

## Tratamento de Erros

### parseMarkdown()

Em caso de erro no processamento:
```typescript
// Retorna objeto padrão
{
  content: ""
}
```

### buildCollection()

Erros são propagados para o sistema de build do Vite.

## Integração com Vite

O plugin se integra ao ciclo de vida do Vite:

1. **Durante o build**: Processa todos os arquivos
2. **Em desenvolvimento**: Hot reload funciona com mudanças no conteúdo
3. **Transformação**: Arquivos Markdown se tornam módulos JavaScript
4. **Coleta**: Coleções são reconstruídas quando necessário