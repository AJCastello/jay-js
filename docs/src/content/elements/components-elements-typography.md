---
category: Components
categoryId: 2
articleId: 4
slug: components-elements-typography
title: Tipografia
description: Documentação do componente Typography para renderização de todos os tipos de elementos textuais como parágrafos, títulos, spans e labels.
---



## Tipografia

### Typography

**Propósito**: Componente flexível para todos os elementos de texto (p, h1-h6, span, label, etc.).

**Assinatura TypeScript**:
```typescript
function Typography<T extends TBaseTagMap = "p">(
  props?: TTypography<T>
): HTMLElementTagNameMap[T]
```

**Exemplo de Uso**:
```typescript
import { Typography } from '@jay-js/elements';

// Parágrafo básico
const paragraph = Typography({
  children: 'Este é um parágrafo de exemplo.'
});

// Títulos de diferentes níveis
const mainTitle = Typography({
  tag: 'h1',
  className: 'text-4xl font-bold mb-4',
  children: 'Título Principal'
});

const subTitle = Typography({
  tag: 'h2',
  className: 'text-2xl font-semibold mb-3 text-primary',
  children: 'Subtítulo'
});

const sectionTitle = Typography({
  tag: 'h3',
  className: 'text-xl font-medium mb-2',
  children: 'Título da Seção'
});

// Span inline
const highlight = Typography({
  tag: 'span',
  className: 'bg-yellow-200 px-1 rounded',
  children: 'texto destacado'
});

// Label para formulários
const inputLabel = Typography({
  tag: 'label',
  htmlFor: 'email-input',
  className: 'label-text font-medium',
  children: 'Endereço de Email'
});

// Texto com formatação rica
const richText = Typography({
  tag: 'p',
  className: 'text-base leading-relaxed',
  children: [
    'Este parágrafo contém ',
    Typography({
      tag: 'strong',
      children: 'texto em negrito'
    }),
    ', ',
    Typography({
      tag: 'em',
      children: 'texto em itálico'
    }),
    ' e ',
    Typography({
      tag: 'span',
      className: 'text-primary underline',
      children: 'texto colorido'
    }),
    '.'
  ]
});

// Citação
const quote = Typography({
  tag: 'blockquote',
  className: 'border-l-4 border-primary pl-4 italic text-lg',
  children: 'Esta é uma citação importante que merece destaque.'
});

// Código inline
const inlineCode = Typography({
  tag: 'code',
  className: 'bg-gray-100 px-2 py-1 rounded text-sm font-mono',
  children: 'const example = "código";'
});

// Texto responsivo
const responsiveText = Typography({
  tag: 'h1',
  className: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold',
  children: 'Título Responsivo'
});

// Texto com truncamento
const truncatedText = Typography({
  tag: 'p',
  className: 'truncate max-w-xs',
  title: 'Este é um texto muito longo que será truncado com reticências',
  children: 'Este é um texto muito longo que será truncado com reticências'
});

// Link estilizado como texto
const textLink = Typography({
  tag: 'a',
  href: '/saiba-mais',
  className: 'text-primary hover:underline cursor-pointer',
  children: 'Saiba mais sobre este tópico'
});
```

---