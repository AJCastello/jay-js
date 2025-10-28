---
category: UI
categoryId: 1
articleId: 1
slug: overview
title: Visão Geral dos Componentes UI
description: Uma visão geral abrangente do sistema de componentes UI do pacote @jay-js/ui para construção de interfaces modernas e responsivas.
---

# Componentes UI

O pacote `@jay-js/ui` oferece uma biblioteca abrangente de componentes UI reutilizáveis, projetados para criar interfaces modernas, responsivas e acessíveis. Todos os componentes são construídos com TypeScript e oferecem tipagem completa, garantindo uma experiência de desenvolvimento robusta.

## Características Principais

### Arquitetura Moderna
- **TypeScript First**: Componentes totalmente tipados com suporte completo ao IntelliSense
- **Flexibilidade de Tags**: Suporte para diferentes tags HTML através do sistema de elementos base
- **Composição**: Componentes projetados para serem compostos e reutilizados
- **Acessibilidade**: Seguem as melhores práticas de acessibilidade web

### Sistema de Design
- **Consistência**: Todos os componentes seguem um sistema de design unificado
- **Customização**: Fácil personalização através de classes CSS e propriedades
- **Responsividade**: Componentes adaptáveis a diferentes tamanhos de tela
- **Temas**: Suporte a diferentes variações visuais e temas

## Categorias de Componentes

### Layout e Estrutura
Componentes para organização e estruturação de conteúdo:
- **Stack**: Organização de elementos em pilhas verticais ou horizontais
- **Divider**: Separadores visuais entre conteúdos
- **Join**: União de elementos adjacentes
- **Footer**: Rodapés de página

### Exibição de Dados
Componentes para apresentação de informações:
- **Badge**: Rótulos e marcadores
- **Avatar**: Representação de usuários
- **Card**: Cartões de conteúdo com título, descrição e ações
- **Rating**: Sistemas de avaliação
- **Timeline**: Linhas do tempo para eventos
- **Radial Progress**: Indicadores de progresso circular
- **Indicator**: Indicadores visuais de status

### Navegação
Componentes para navegação e orientação:
- **Navbar**: Barras de navegação principais
- **Bottom Navigation**: Navegação inferior para mobile
- **Breadcrumbs**: Trilhas de navegação
- **Tabs**: Navegação em abas
- **Menu**: Menus de navegação e contexto
- **Steps**: Indicadores de etapas em processos

### Feedback e Notificações
Componentes para comunicação com o usuário:
- **Alert**: Mensagens de alerta e informação
- **Loading**: Indicadores de carregamento
- **Toast**: Notificações temporárias
- **Modal**: Janelas modais
- **Tooltip**: Dicas contextuais

### Controles Interativos
Componentes para interação do usuário:
- **Dropdown**: Menus suspensos
- **Collapse**: Conteúdo expansível
- **Drawer**: Gavetas deslizantes
- **Toggle**: Interruptores e alternadores
- **Swap**: Alternadores de conteúdo

### Formulários
Componentes para entrada de dados:
- **Text Input**: Campos de texto

### Componentes Especializados
Componentes para casos de uso específicos:
- **Chat**: Sistema de mensagens
- **Diff**: Comparação de código/texto
- **KBD**: Representação de teclas do teclado
- **Resizable Splitter**: Divisores redimensionáveis

## Hooks Utilitários

O pacote também inclui hooks personalizados para funcionalidades comuns:

- **useDrawer**: Gerenciamento de estado de gavetas
- **useModal**: Controle de modais
- **useToast**: Sistema de notificações
- **useRef**: Referências de elementos
- **useListener**: Gerenciamento de event listeners

## Instalação

```bash
npm install @jay-js/ui
```

ou

```bash
yarn add @jay-js/ui
```

## Importação

### Importação Individual
```typescript
// Componentes específicos
import { Alert, Badge, Card } from '@jay-js/ui';

// Hooks específicos
import { useModal, useToast } from '@jay-js/ui';
```

### Importação Completa
```typescript
// Todos os componentes e hooks
import * as UI from '@jay-js/ui';
```

## Padrões de Uso

### Estrutura Básica de Componente
```typescript
import { ComponentName } from '@jay-js/ui';

// Uso básico
const element = ComponentName({
  // propriedades específicas do componente
  variant: 'primary',
  size: 'md',
  // propriedades HTML padrão
  className: 'custom-class',
  id: 'my-element'
});
```

### Tipagem TypeScript
```typescript
import type { TAlert } from '@jay-js/ui';

// Função que utiliza o tipo do componente
function createAlert(options: TAlert<'div'>) {
  return Alert(options);
}
```

### Customização com Classes CSS
```typescript
const customAlert = Alert({
  severity: 'alert-success',
  className: 'my-custom-alert border-2',
  // conteúdo HTML
});
```

## Sistema de Propriedades

### Propriedades Base
Todos os componentes herdam propriedades HTML padrão:
- `className`: Classes CSS adicionais
- `id`: Identificador único
- `style`: Estilos inline
- `onClick`, `onMouseOver`, etc.: Event handlers

### Propriedades Específicas
Cada componente possui suas próprias propriedades tipadas:
- **Variações**: `variant`, `color`, `size`
- **Estados**: `state`, `severity`, `direction`
- **Comportamento**: `disabled`, `loading`, `active`

## Melhores Práticas

### 1. Tipagem Consistente
```typescript
// Use os tipos exportados para consistency
import type { TBadge, TAlert } from '@jay-js/ui';
```

### 2. Composição de Componentes
```typescript
// Combine componentes para funcionalidades complexas
const ProfileCard = () => {
  return Card({
    children: [
      Avatar({ state: 'avatar-online' }),
      Badge({ color: 'badge-primary', children: 'VIP' })
    ]
  });
};
```

### 3. Acessibilidade
```typescript
// Sempre inclua propriedades de acessibilidade
const button = Alert({
  role: 'button',
  'aria-label': 'Fechar alerta',
  tabIndex: 0
});
```

### 4. Responsividade
```typescript
// Use classes responsivas quando necessário
const responsiveCard = Card({
  className: 'w-full md:w-1/2 lg:w-1/3'
});
```

## Próximos Passos

Explore as documentações específicas de cada categoria de componentes para aprender sobre:
- APIs detalhadas de cada componente
- Exemplos práticos de uso
- Padrões avançados de composição
- Casos de uso reais
- Melhores práticas específicas

Cada componente possui documentação completa com exemplos interativos e guias de implementação.