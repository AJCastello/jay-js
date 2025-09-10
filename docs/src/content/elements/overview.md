---
category: Elements
categoryId: 1
articleId: 1
slug: elements-overview
title: Visão Geral do Elements
description: Biblioteca headless de elementos HTML fundamentais com TypeScript, lifecycle management e Promise-based children para o Jay JS framework.
---

# Visão Geral do @jay-js/elements

O **@jay-js/elements** é uma biblioteca headless de elementos HTML fundamentais, projetada especificamente para o ecossistema Jay JS. Esta biblioteca oferece uma abordagem inovadora para construção de interfaces, fornecendo funcionalidade sem imposições de estilo, permitindo total liberdade criativa aos desenvolvedores.

## O que é uma Biblioteca Headless?

Uma biblioteca headless fornece toda a funcionalidade e lógica necessária para componentes de interface, mas sem nenhuma opinião sobre aparência ou estilos. Isso significa que você recebe:

- **Funcionalidade completa**: Gerenciamento de estado, eventos, ciclo de vida
- **Flexibilidade total**: Aplique qualquer estilo, framework CSS ou design system
- **Zero dependências**: Nenhuma dependência externa, apenas JavaScript puro
- **Performance otimizada**: Sem CSS desnecessário ou estilos conflitantes

## Filosofia e Benefícios

### 🎯 **Funcionalidade Sem Opiniões**
Cada elemento fornece toda a lógica necessária sem impor estilos específicos. Você mantém controle total sobre a apresentação visual.

### 🔧 **Base Unificada**
Todos os componentes estendem a função `Base`, garantindo consistência na API e comportamento em toda a biblioteca.

### ⚡ **Ciclo de Vida Integrado**
Utiliza Web Standards para custom elements, fornecendo callbacks `onmount` e `onunmount` nativos para gerenciamento de ciclo de vida.

### 🔄 **Carregamento Assíncrono**
Suporte nativo para conteúdo baseado em Promise, permitindo carregamento lazy e dinâmico de elementos filhos.

### 🛡️ **Segurança de Tipos**
TypeScript completo com suporte a generics, garantindo desenvolvimento seguro e autocompletar inteligente.

## Arquitetura Principal

### Função Base
Todos os elementos são construídos sobre a função `Base`, que fornece:

```typescript
import { Base } from '@jay-js/elements';

const elemento = Base({
  tag: 'div',
  className: 'minha-classe',
  children: 'Conteúdo',
  onmount: () => console.log('Elemento montado'),
  onunmount: () => console.log('Elemento desmontado')
});
```

### Custom Elements com Ciclo de Vida
Quando você usa callbacks `onmount` ou `onunmount`, o elemento automaticamente registra um custom element:

```typescript
import { Button } from '@jay-js/elements';

const botao = Button({
  children: 'Clique aqui',
  onmount: (element) => {
    console.log('Botão foi adicionado ao DOM');
  },
  onunmount: (element) => {
    console.log('Botão foi removido do DOM');
    // Cleanup de event listeners, timers, etc.
  }
});
```

### Conteúdo Baseado em Promise
Carregue conteúdo de forma assíncrona sem bloquear a renderização:

```typescript
import { Box } from '@jay-js/elements';

const container = Box({
  children: fetch('/api/dados')
    .then(response => response.text())
    .then(text => document.createTextNode(text))
});
```

## Componentes Organizados por Categoria

### 🧩 **Elementos Base**
Funcionalidades fundamentais para toda a biblioteca:
- **Base**: Função fundamental que todos os elementos estendem
- **uniKey**: Geração de chaves únicas para elementos
- **useRef**: Sistema de referências para acesso direto ao DOM

### 📝 **Elementos de Formulário**
Elementos para construção de formulários interativos:
- **Form**: Container de formulário com validação
- **Input**: Campo de entrada genérico
- **TextInput**: Campo de texto especializado
- **TextArea**: Área de texto multilinhas
- **Button**: Botão interativo com estados
- **Checkbox**: Caixa de seleção
- **Radio**: Botão de opção
- **Range**: Controle deslizante de intervalo
- **Select**: Lista suspensa
- **SelectItem**: Item de opção para Select
- **FileInput**: Seletor de arquivos

### 🎨 **Elementos de Interface**
Componentes para estrutura e apresentação:
- **Box**: Container genérico flexível
- **Section**: Seção semântica
- **Link**: Link navegável
- **Img**: Elemento de imagem
- **Fragment**: Fragment de documento
- **Outlet**: Ponto de inserção para roteamento

### 📝 **Tipografia**
Elementos para texto e conteúdo:
- **Typography**: Sistema tipográfico completo (h1-h6, p, span, etc.)

### 📋 **Elementos de Lista**
Para organização de conteúdo em listas:
- **List**: Container de lista
- **ListItem**: Item individual de lista

### 📊 **Elementos de Controle**
Para feedback visual e interação:
- **Progress**: Barra de progresso

## Instalação

```bash
npm install @jay-js/elements
```

## Uso Básico

### Exemplo Simples
```typescript
import { Button, Input, Box } from '@jay-js/elements';

// Criar um botão
const meuBotao = Button({
  className: 'btn btn-primary',
  children: 'Salvar',
  onclick: () => alert('Clicado!')
});

// Criar um input
const meuInput = Input({
  type: 'text',
  placeholder: 'Digite seu nome...',
  className: 'input input-bordered'
});

// Container
const container = Box({
  className: 'p-4 space-y-4',
  children: [meuInput, meuBotao]
});

document.body.appendChild(container);
```

### Exemplo com Ciclo de Vida
```typescript
import { TextInput } from '@jay-js/elements';

const inputComValidacao = TextInput({
  placeholder: 'Email',
  className: 'input',
  onmount: (element) => {
    // Setup de validação quando montado
    element.addEventListener('blur', validarEmail);
  },
  onunmount: (element) => {
    // Cleanup quando desmontado
    element.removeEventListener('blur', validarEmail);
  }
});
```

### Exemplo com Conteúdo Assíncrono
```typescript
import { Box } from '@jay-js/elements';

const containerComDados = Box({
  className: 'loading-container',
  children: carregarDados().then(dados => {
    return Box({
      className: 'dados-carregados',
      children: dados.map(item => 
        Box({ children: item.nome, className: 'item' })
      )
    });
  })
});
```

## Diferenciais no Ecossistema Jay JS

### 🔗 **Integração Perfeita**
Projetado especificamente para trabalhar em harmonia com outros pacotes Jay JS:
- **@jay-js/system**: Integração com estado reativo e roteamento
- **@jay-js/ui**: Base para componentes de alto nível
- **@jay-js/jsx**: Suporte para sintaxe JSX-like

### 🚀 **Performance Nativa**
- Zero dependências externas
- Utiliza APIs nativas do navegador
- Overhead mínimo de runtime
- Tree-shaking automático

### 🛠️ **Flexibilidade Máxima**
- Funciona com qualquer framework CSS (Tailwind, Bootstrap, etc.)
- Compatível com qualquer design system
- Personalizável em todos os aspectos

### 🔒 **Segurança de Tipos Avançada**
- TypeScript completo com generics
- Inferência de tipos inteligente
- Autocompletar preciso para todas as propriedades HTML

## Exemplo de Integração Completa

```typescript
import { 
  Form, 
  TextInput, 
  Button, 
  Box,
  Progress 
} from '@jay-js/elements';

// Formulário completo com validação
const formularioContato = Form({
  className: 'max-w-md mx-auto p-6 bg-white rounded-lg shadow',
  onsubmit: async (event) => {
    event.preventDefault();
    // Lógica de envio
  },
  children: [
    // Campo de nome
    TextInput({
      name: 'nome',
      placeholder: 'Seu nome',
      className: 'input input-bordered w-full mb-4',
      required: true
    }),

    // Campo de email
    TextInput({
      type: 'email',
      name: 'email', 
      placeholder: 'Seu email',
      className: 'input input-bordered w-full mb-4',
      required: true
    }),

    // Barra de progresso (inicialmente oculta)
    Progress({
      className: 'progress progress-primary w-full mb-4 hidden',
      max: 100,
      value: 0
    }),

    // Botão de envio
    Button({
      type: 'submit',
      className: 'btn btn-primary w-full',
      children: 'Enviar Mensagem'
    })
  ]
});

document.body.appendChild(formularioContato);
```

## Próximos Passos

- **[Guia de Instalação](./installation)**: Como instalar e configurar
- **[Elementos Base](./base-elements)**: Entenda a função Base e utilitários
- **[Elementos de Formulário](./form-elements)**: Guia completo de formulários
- **[Elementos de Interface](./ui-elements)**: Containers e elementos visuais
- **[Ciclo de Vida](./lifecycle)**: Gerenciamento avançado de componentes
- **[Integração com Jay JS](./jayjs-integration)**: Como usar com outros pacotes

---

O **@jay-js/elements** é a fundação sólida para construir interfaces modernas, performáticas e totalmente personalizáveis no ecossistema Jay JS. Sua abordagem headless garante que você tenha toda a funcionalidade necessária sem compromissos de design, oferecendo a liberdade criativa que todo desenvolvedor deseja.