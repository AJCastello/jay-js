# @jay-js/ui

A comprehensive collection of reusable UI components for Jay-JS framework. This package serves as a component registry that can be consumed via the **Jay-JS CLI** to add individual components to your projects, similar to how shadcn/ui works.

## 📦 About This Package

This package contains **60+ UI components** built with:
- **@jay-js/system** - Core primitives and runtime utilities
- **Tailwind CSS** - Utility-first CSS framework
- **daisyUI** - Component library for Tailwind CSS
- **TypeScript** - Full type safety

## 🚀 Installation via CLI

Instead of installing this package directly, use the **Jay-JS CLI** to add specific components to your project:

```bash
# Install the Jay-JS CLI globally
bun add -g @jay-js/cli

# Add individual components to your project
jayjs ui add alert
jayjs ui add card
jayjs ui add button modal

# Components will be downloaded to src/components/ui/
```

## 📁 How It Works

1. **Component Registry**: This package acts as a centralized registry of all available UI components
2. **CLI Integration**: The `@jay-js/cli` downloads components directly from the GitHub repository
3. **Local Installation**: Components are copied to your `src/components/ui/` directory
4. **Full Control**: You own the components and can customize them as needed

## 📚 Available Components

### Layout & Structure
- **Card** (+ card-actions, card-body, card-description, card-figure, card-title)
- **Divider**
- **Footer**
- **Join**
- **Stack**

### Navigation
- **Breadcrumbs**
- **Bottom Navigation** (+ bottom-navigation-item)
- **Navbar** (+ navbar-component)
- **Menu** (+ menu-item, menu-title)
- **Tabs** (+ tab-item)
- **Steps** (+ step-item)

### Data Display
- **Alert**
- **Avatar**
- **Badge**
- **Tooltip**
- **Timeline** (+ timeline-item, timeline-items)
- **Rating**
- **Radial Progress**
- **Loading**

### Feedback
- **Toast** (+ toast-container)
- **Modal** (+ modal-action, modal-backdrop, modal-box)
- **Drawer** (+ drawer-content, drawer-overlay)

### Form Controls
- **Text Input**
- **Toggle**
- **Kbd** (Keyboard shortcuts display)

### Utilities
- **Dropdown** (+ dropdown-content, dropdown-label)
- **Collapse** (+ collapse-content, collapse-title)
- **Swap** (+ swap-item)
- **Chat** (+ chat-component)
- **Diff** (+ diff-item, diff-resizer)
- **Indicator** (+ indicator-item)
- **Resizable Splitter**

## 🎯 Component Usage Example

After adding a component via CLI:

```javascript
import { Alert } from './src/components/ui/alert';

const alertElement = Alert({
  severity: 'alert-info',
  content: 'This is an info alert!'
});

document.body.appendChild(alertElement);
```

## 🧠 Funções de Controle de UI (Handlers)

O pacote inclui funções utilitárias para gerenciamento imperativo de componentes UI. No Jay JS, usamos a convenção `handle*` para deixar explícito que não são React Hooks e podem ser chamados livremente em qualquer contexto:

- `handleToast` - Gerenciamento de notificações toast
- `handleModal` - Controle de estado de modais
- `handleDrawer` - Controle de estado de drawers/gavetas
- `useRef` - Gerenciamento de referências de elementos
- `useListener` - Gerenciamento de event listeners

### Exemplo de uso:

```javascript
import { handleModal } from '@jay-js/ui';

const modal = handleModal({ modalId: 'my-modal' });
modal.open();  // Abre o modal
modal.close(); // Fecha o modal
```

### ⚠️ Nota de Migração (v4.x → v5.x)

As antigas APIs com prefixo `use*` foram renomeadas para `handle*` na versão 4.3.0 para evitar confusão com React Hooks:

| Deprecated (v4.x) | Nova API (v4.3.0+) | Status |
|-------------------|-------------------|--------|
| `useModal` | `handleModal` | ⚠️ Será removido em v5.0.0 |
| `useDrawer` | `handleDrawer` | ⚠️ Será removido em v5.0.0 |
| `useToast` | `handleToast` | ⚠️ Será removido em v5.0.0 |

**As versões antigas (`use*`) continuam funcionando como aliases na v4.3.0, mas serão removidas na v5.0.0.**

## 🎨 Styling

All components use:
- **Tailwind CSS classes** for styling
- **daisyUI components** for consistent design
- **Customizable CSS classes** via `className` prop
- **Tailwind Merge** for intelligent class merging

## Contributing

We welcome contributions from the community. If you find a bug, have a feature request, or want to contribute to the project, please feel free to open an issue or submit a pull request on the project's GitHub repository.

## License

Jay-JS UI is licensed under the MIT License. For more information, please refer to the [LICENSE](LICENSE) file.

---

We hope you enjoy using Jay-JS UI to build stunning web applications. If you have any questions, suggestions, or feedback, please feel free to reach out to us. Happy coding!