# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [4.2.0] - 27/10/2025

### Adicionado
- **Componente Button** com estilização DaisyUI completa
  - Suporte a 8 cores (primary, secondary, accent, neutral, success, warning, info, error)
  - 5 tamanhos disponíveis (xs, sm, md, lg, xl)
  - 6 variantes (outline, dash, soft, ghost, link, active)
  - Modifiers: wide, block, square, circle, disabled
  - Baseado no Button primitivo do @jay-js/elements

- **Componente Select** com estilização DaisyUI completa
  - Suporte a 8 cores (primary, secondary, accent, neutral, success, warning, info, error)
  - 5 tamanhos disponíveis (xs, sm, md, lg, xl)
  - Variante ghost (select-ghost)
  - Suporte a largura total (fullWidth)
  - Baseado no Select primitivo do @jay-js/elements

- **Componente Textarea** com estilização DaisyUI completa
  - Suporte a 8 cores (primary, secondary, accent, neutral, success, warning, info, error)
  - 5 tamanhos disponíveis (xs, sm, md, lg, xl)
  - Variante ghost (textarea-ghost)
  - Suporte a largura total (fullWidth)
  - Baseado no TextArea primitivo do @jay-js/elements

- **Componente Link** com estilização DaisyUI completa
  - Suporte a 8 cores (primary, secondary, accent, neutral, success, warning, info, error)
  - Variante hover (link-hover) para underline apenas no hover
  - Adiciona classe link do DaisyUI para sublinhado
  - Baseado no Link primitivo do @jay-js/elements

- **Componente Progress** com estilização DaisyUI completa
  - Suporte a 8 cores (primary, secondary, accent, neutral, success, warning, info, error)
  - Suporte a indeterminate (sem valor)
  - Baseado no Progress primitivo do @jay-js/elements

### Melhorado
- Biblioteca agora possui cobertura completa dos componentes básicos de formulário DaisyUI
- Padrão consistente entre todos os componentes estilizados
- Melhor separação entre elementos primitivos (@jay-js/elements) e estilizados (@jay-js/ui)

## [4.1.0] - 26/10/2025

### Adicionado
- **Componente Checkbox** com estilização DaisyUI completa
  - Suporte a 8 cores (primary, secondary, accent, neutral, success, warning, info, error)
  - 5 tamanhos disponíveis (xs, sm, md, lg, xl)
  - Suporte a estado indeterminado (indeterminate)
  - Baseado no Input primitivo do @jay-js/elements

- **Componente Radio** com estilização DaisyUI completa
  - Suporte a 8 cores (primary, secondary, accent, neutral, success, warning, info, error)
  - 5 tamanhos disponíveis (xs, sm, md, lg, xl)
  - Baseado no Input primitivo do @jay-js/elements

- **Componente FileInput** com estilização DaisyUI completa
  - Suporte a 8 cores (primary, secondary, accent, neutral, success, warning, info, error)
  - 5 tamanhos disponíveis (xs, sm, md, lg, xl)
  - Variante ghost (file-input-ghost)
  - Suporte a largura total (fullWidth)
  - Baseado no Input primitivo do @jay-js/elements

- **Componente Range** com estilização DaisyUI completa
  - Suporte a 8 cores (primary, secondary, accent, neutral, success, warning, info, error)
  - 5 tamanhos disponíveis (xs, sm, md, lg, xl)
  - Baseado no Input primitivo do @jay-js/elements

### Melhorado
- Componentes de formulário agora seguem padrão consistente de estilização
- Melhor separação de responsabilidades entre @jay-js/elements (primitivos) e @jay-js/ui (estilizados)

## [Unreleased]

### Adicionado
- **Componente DatePicker** para seleção individual de data com calendário interativo
  - Calendário visual completo com navegação mês/ano
  - Suporte para seleção de horário (withTime) com interface de rolagem de horas/minutos
  - Validação de intervalo de datas (minDate/maxDate)
  - Indicação visual de data selecionada e data atual
  - Suporte multi-idioma (pt-BR, en-US, es-ES)
  - Tamanhos personalizáveis (btn-xs, btn-sm, btn-md, btn-lg, btn-xl)
  - Cores DaisyUI (btn-primary, btn-secondary, btn-accent, etc.)
  - Estados disabled
  - Callbacks onSelect para captura de data selecionada
  - **Sistema de reatividade**: Usa `State` e `Effect` do @jay-js/system para gerenciamento reativo de estado

- **Componente DateRangePicker** aprimorado para seleção de intervalo de datas
  - Utiliza dois componentes DatePicker para início e fim
  - Validação automática de intervalo (data final >= data inicial)
  - Mensagens de erro contextuais quando intervalo inválido
  - Callbacks individuais (onStartChange, onEndChange) e combinado (onSelectRange)
  - Opções de layout: horizontal ou vertical
  - Suporte para seleção de horário (withTime)
  - Validação dinâmica de intervalo configurável (validateRange)
  - Espaçamento configurável entre campos (gap-1 até gap-6)
  - Suporte multi-idioma herdado do DatePicker
  - Cores e tamanhos personalizáveis
  - **Sistema de reatividade**: Usa `State` e `Effect` do @jay-js/system para validação reativa e mensagens de erro

### Melhorado
- Adicionada peer dependency `@jay-js/system` para suporte ao sistema de reatividade
- **Lifecycle Management**: DatePicker e DateRangePicker agora implementam `onunmount` para cleanup determinístico
  - Libera todos os states criados (currentDate, selectedDate, currentView, selectedHour, selectedMinute, startDate, endDate, startError, endError)
  - Previne vazamentos de memória em SPAs com componentes dinâmicos
  - Segue as melhores práticas do framework Jay JS para gerenciamento de ciclo de vida
- **DatePicker visual aprimorado**: Data selecionada agora exibe fundo colorido com cor primária configurada
  - Remove `btn-ghost` quando data está selecionada para exibir background colorido
  - Aplica cor do botão (btn-primary, btn-secondary, etc.) automaticamente no estado selecionado
  - Melhora contraste e feedback visual da data atualmente selecionada
- **DateRangePicker com destaque de intervalo**: Datas entre início e fim agora exibem fundo semi-transparente
  - Adiciona propriedades `rangeStart` e `rangeEnd` ao DatePicker para suporte a intervalos
  - Datas inicial e final (bordas do intervalo) recebem cor cheia para melhor destaque
  - Datas intermediárias recebem `bg-primary/10` (fundo semi-transparente)
  - DateRangePicker recria DatePickers reativamente quando datas mudam para atualizar destaque visual
  - Melhora feedback visual do intervalo de datas selecionado com contraste adequado

### Corrigido
- **DatePicker locale fallback**: Adiciona fallback para pt-BR quando locale não é fornecido ou é inválido
  - Previne erros quando `locale` está undefined ou não existe no objeto LOCALES
  - Usa pt-BR como idioma padrão em caso de locale inválido
  - Melhora robustez do componente para diferentes configurações

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