# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [4.0.0] - 18/09/2025

### ⚠️ BREAKING CHANGES

- **Lifecycle API**: `ondismount` renomeado para `onunmount` em todos os componentes e interface `TLifecycleElement`
- **useDrawer Hook**: Propriedade `for` depreciada em favor de `drawerId` (anteriormente `id`)
- **useDrawer Hook**: Retorno alterado de função simples para objeto com métodos `{open, close, toggle}`
- **useModal Hook**: Propriedade `id` renomeada para `modalId` para maior clareza semântica
- **useToast Hook**: Propriedade `for` renomeada para `toastId` para maior clareza semântica
- **DrawerOverlay**: Interface `TDrawerOverlay` alterada - `for` substituído por `id`
- **Hooks Removidos**: `useListener`, `useRef`, `useToast` (versões antigas) removidos completamente
- **className System**: Sistema `mergeClasses` completamente substituído por utilitário `cn` com `clsx` e `tailwind-merge`

### Adicionado
- Sistema de utilitários `cn` para gerenciamento inteligente de classes CSS
- Integração com `clsx` e `tailwind-merge` para merge otimizado de classes
- Novos hooks: `useDrawer` (refatorado), `useModal`, `useToast` (nova versão)
- Sistema de componentes Toast completamente redesenhado
- Componente TextInput aprimorado com tipagem específica
- Hook `useModal` para controle de modais dialog
- Anotações de tipo de retorno melhoradas em Fragment, useDrawer, useListener e useToast

### Melhorado
- Refatoração completa da gestão de className em todos os componentes UI
- Melhoria significativa na tipagem TypeScript de todos os componentes
- Configuração do Biome atualizada para incluir arquivos JavaScript
- useDrawer aprimorado com controles granulares (open/close/toggle)
- DrawerOverlay com melhor manipulação de eventos e prevenção de comportamento padrão
- Simplificação dos componentes TextArea e TextInput
- Callback `onClose` e `onOpen` no useDrawer agora incluem elementos do drawer
- **Nomenclatura dos Hooks**: Propriedades renomeadas para maior clareza semântica:
  - `useDrawer`: `id` → `drawerId` (mais claro que se refere ao elemento drawer)
  - `useModal`: `id` → `modalId` (mais claro que se refere ao elemento modal)
  - `useToast`: `for` → `toastId` (mais claro que se refere ao container de toast)

### Removido
- Componente RippleEffect descontinuado
- Utilitário mergeClasses obsoleto
- Hooks legados: useListener, useRef, useToast (versões antigas)
- Utilitário lifecycle-handler removido
- Exports não utilizados: serialize, setChildren
- Código comentado e imports não utilizados em vários componentes

### Corrigido
- Verificação de igualdade estrita para imagePosition no componente Card
- Classe 'chat' padrão adicionada ao componente Chat para estilo consistente
- Tipo de botão especificado no ModalBackdrop para melhor acessibilidade
- Anotação de tipo de retorno na função `cn` para melhor segurança de tipos

## [3.7.0] - 10/03/2025

### Adicionado
- Sistema de utilitários `cn` para gerenciamento de classes CSS (versão inicial)
- Integração com `clsx` e `tailwind-merge`
- Novos hooks básicos

### Melhorado
- Atualização de dependências (@biomejs/biome, clsx, tailwind-merge)

## [3.0.0] - Anterior

### Adicionado
- Componente Radio exportado
- Reestruturação major da biblioteca

## Versões Anteriores

Consulte as releases do GitHub para mudanças históricas anteriores à versão 3.0.0.