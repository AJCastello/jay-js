---
category: UI
categoryId: 1
articleId: 6
slug: interactive-components
title: Componentes Interativos
description: Componentes para interação do usuário, incluindo dropdown, collapse, drawer, toggle, swap e controles interativos.
---

# Componentes Interativos

Os componentes interativos são elementos fundamentais para criar interfaces dinâmicas e responsivas. Esta categoria inclui controles que respondem a ações do usuário, alterando estados, exibindo conteúdo condicional e fornecendo feedback imediato.

## Referência da API

### Dropdown

Menu suspenso com conteúdo expansível controlado por um elemento de ativação.

#### Componentes Relacionados
- **Dropdown**: Container principal do dropdown
- **DropdownLabel**: Elemento que ativa o dropdown
- **DropdownContent**: Conteúdo que aparece quando expandido

#### Assinatura da Função
```typescript
function Dropdown<T extends TBaseTagMap = "div">(
  options: TDropdown<T>
): HTMLElementTagNameMap[T]

function DropdownLabel<T extends TBaseTagMap = "label">(
  options: TDropdownLabel<T>
): HTMLElementTagNameMap[T]

function DropdownContent<T extends TBaseTagMap = "ul">(
  options: TDropdownContent<T>
): HTMLElementTagNameMap[T]
```

### Collapse

Componente para conteúdo expansível e retrátil.

#### Componentes Relacionados
- **Collapse**: Container principal do collapse
- **CollapseTitle**: Título/botão que controla a expansão
- **CollapseContent**: Conteúdo que pode ser expandido/retraído

#### Assinatura da Função
```typescript
function Collapse<T extends TBaseTagMap = "div">(
  options: TCollapse<T>
): HTMLElementTagNameMap[T]

function CollapseTitle<T extends TBaseTagMap = "summary">(
  options: TCollapseTitle<T>
): HTMLElementTagNameMap[T]

function CollapseContent<T extends TBaseTagMap = "div">(
  options: TCollapseContent<T>
): HTMLElementTagNameMap[T]
```

### Drawer

Painel deslizante que aparece a partir das bordas da tela.

#### Componentes Relacionados
- **Drawer**: Container principal do drawer
- **DrawerContent**: Conteúdo principal do drawer
- **DrawerOverlay**: Overlay/backdrop por trás do drawer

#### Assinatura da Função
```typescript
function Drawer<T extends TBaseTagMap = "div">(
  options: TDrawer<T>
): HTMLElementTagNameMap[T]

function DrawerContent<T extends TBaseTagMap = "div">(
  options: TDrawerContent<T>
): HTMLElementTagNameMap[T]

function DrawerOverlay<T extends TBaseTagMap = "div">(
  options: TDrawerOverlay<T>
): HTMLElementTagNameMap[T]
```

### Toggle

Interruptor binário para ativar/desativar funcionalidades.

#### Assinatura da Função
```typescript
function Toggle<T extends TBaseTagMap = "input">(
  options: TToggle<T>
): HTMLElementTagNameMap[T]
```

### Swap

Alternador que permite trocar entre dois estados visuais.

#### Componentes Relacionados
- **Swap**: Container principal do swap
- **SwapItem**: Item individual dentro do swap

#### Assinatura da Função
```typescript
function Swap<T extends TBaseTagMap = "label">(
  options: TSwap<T>
): HTMLElementTagNameMap[T]

function SwapItem<T extends TBaseTagMap = "div">(
  options: TSwapItem<T>
): HTMLElementTagNameMap[T]
```

## Visão Geral

### Dropdown - Menus Suspensos
O sistema Dropdown oferece uma solução completa para criar menus suspensos, seletores e listas de ações. É composto por três partes: o container, o elemento de ativação e o conteúdo expansível.

**Características principais:**
- Estrutura modular com componentes específicos
- Controle de abertura via CSS ou JavaScript
- Posicionamento flexível
- Suporte a navegação por teclado

### Collapse - Conteúdo Expansível
O Collapse permite criar seções de conteúdo que podem ser expandidas e retraídas, ideal para FAQs, acordeões e seções opcionais de formulários.

**Características principais:**
- Baseado em elementos HTML nativos (details/summary)
- Animações suaves de abertura/fechamento
- Múltiplos colapses podem funcionar independentemente
- Acessibilidade nativa

### Drawer - Painéis Deslizantes
O Drawer cria painéis laterais que deslizam da borda da tela, perfeitos para navegação mobile, configurações ou conteúdo secundário.

**Características principais:**
- Desliza de qualquer borda da tela
- Overlay opcional com backdrop
- Controle programático via hooks
- Responsivo para diferentes tamanhos de tela

### Toggle - Interruptores
O Toggle fornece controles binários elegantes para ativar/desativar funcionalidades, preferências ou estados.

**Características principais:**
- Design moderno e acessível
- Múltiplas variações visuais
- Estados disabled e readonly
- Integração com formulários

### Swap - Alternadores Visuais
O Swap permite alternar entre dois estados visuais, como ícones de favorito, botões de play/pause ou modo claro/escuro.

**Características principais:**
- Transições suaves entre estados
- Flexibilidade total no conteúdo
- Controle via checkbox ou JavaScript
- Animações CSS personalizáveis

## Uso Básico

### Dropdown Simples
```typescript
import { Dropdown, DropdownLabel, DropdownContent } from '@jay-js/ui';

// Dropdown de ações
const actionsDropdown = Dropdown({
  className: 'dropdown',
  children: [
    DropdownLabel({
      tabIndex: 0,
      className: 'btn btn-primary m-1',
      children: 'Ações'
    }),
    DropdownContent({
      tabIndex: 0,
      className: 'dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52',
      children: [
        'li', { 
          children: ['a', { children: 'Editar' }] 
        },
        'li', { 
          children: ['a', { children: 'Excluir' }] 
        },
        'li', { 
          children: ['a', { children: 'Compartilhar' }] 
        }
      ]
    })
  ]
});
```

### Collapse para FAQ
```typescript
import { Collapse, CollapseTitle, CollapseContent } from '@jay-js/ui';

// Seção de FAQ expansível
const faqItem = Collapse({
  className: 'collapse collapse-arrow bg-base-200',
  children: [
    CollapseTitle({
      className: 'collapse-title text-xl font-medium',
      children: 'Como funciona o sistema de pontos?'
    }),
    CollapseContent({
      className: 'collapse-content',
      children: [
        'p', {
          children: 'O sistema de pontos recompensa usuários por atividades realizadas na plataforma. Cada ação tem um valor específico em pontos.'
        }
      ]
    })
  ]
});
```

### Drawer de Navegação
```typescript
import { Drawer, DrawerContent, DrawerOverlay } from '@jay-js/ui';

// Drawer lateral para mobile
const navigationDrawer = Drawer({
  className: 'drawer lg:drawer-open',
  children: [
    'input', {
      id: 'drawer-toggle',
      type: 'checkbox',
      className: 'drawer-toggle'
    },
    'div', {
      className: 'drawer-content flex flex-col',
      children: [
        // Conteúdo principal
        'main', { children: 'Conteúdo da página...' }
      ]
    },
    'div', {
      className: 'drawer-side',
      children: [
        DrawerOverlay({
          htmlFor: 'drawer-toggle',
          ariaLabel: 'Fechar drawer'
        }),
        DrawerContent({
          className: 'min-h-full w-80 bg-base-200 text-base-content',
          children: [
            // Menu de navegação
            'ul', {
              className: 'menu p-4 space-y-2',
              children: [
                'li', { 
                  children: ['a', { children: 'Dashboard' }] 
                },
                'li', { 
                  children: ['a', { children: 'Perfil' }] 
                },
                'li', { 
                  children: ['a', { children: 'Configurações' }] 
                }
              ]
            }
          ]
        })
      ]
    }
  ]
});
```

### Toggle de Configuração
```typescript
import { Toggle } from '@jay-js/ui';

// Toggle para modo escuro
const darkModeToggle = Toggle({
  type: 'checkbox',
  className: 'toggle toggle-primary',
  id: 'dark-mode',
  onChange: (event) => {
    document.documentElement.setAttribute(
      'data-theme', 
      event.target.checked ? 'dark' : 'light'
    );
  }
});

// Wrapper com label
const darkModeControl = 'div', {
  className: 'form-control',
  children: [
    'label', {
      className: 'label cursor-pointer',
      children: [
        'span', { 
          className: 'label-text',
          children: 'Modo Escuro' 
        },
        darkModeToggle
      ]
    }
  ]
};
```

### Swap de Ícones
```typescript
import { Swap, SwapItem } from '@jay-js/ui';

// Swap entre ícones de favorito
const favoriteSwap = Swap({
  className: 'swap swap-rotate',
  children: [
    'input', {
      type: 'checkbox',
      className: 'swap-input'
    },
    SwapItem({
      className: 'swap-off fill-current w-6 h-6',
      children: ['svg', {
        viewBox: '0 0 24 24',
        children: ['path', {
          d: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
        }]
      }]
    }),
    SwapItem({
      className: 'swap-on fill-current w-6 h-6 text-red-500',
      children: ['svg', {
        viewBox: '0 0 24 24',
        children: ['path', {
          d: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
        }]
      }]
    })
  ]
});
```

## Casos de Uso Comuns

### Menu de Contexto com Dropdown
```typescript
import { Dropdown, DropdownLabel, DropdownContent } from '@jay-js/ui';

function ContextMenu({ items, trigger }) {
  return Dropdown({
    className: 'dropdown dropdown-end',
    children: [
      DropdownLabel({
        tabIndex: 0,
        className: 'btn btn-ghost btn-circle',
        children: trigger || '⋮'
      }),
      DropdownContent({
        tabIndex: 0,
        className: 'dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52',
        children: items.map((item, index) => {
          if (item.divider) {
            return 'div', { 
              key: index,
              className: 'divider my-1' 
            };
          }
          
          return 'li', {
            key: index,
            children: ['a', {
              className: item.disabled ? 'disabled' : '',
              onClick: item.disabled ? null : item.action,
              children: [
                item.icon && 'span', { 
                  className: 'mr-2',
                  children: item.icon 
                },
                item.label
              ]
            }]
          };
        })
      })
    ]
  });
}

// Uso
const articleActions = ContextMenu({
  items: [
    { icon: '✏️', label: 'Editar', action: () => editArticle() },
    { icon: '👁️', label: 'Visualizar', action: () => viewArticle() },
    { divider: true },
    { icon: '🗑️', label: 'Excluir', action: () => deleteArticle() }
  ]
});
```

### Acordeão com Múltiplos Colapses
```typescript
import { Collapse, CollapseTitle, CollapseContent } from '@jay-js/ui';

function Accordion({ sections, allowMultiple = false }) {
  let currentOpen = null;
  
  const toggleSection = (index) => {
    if (!allowMultiple && currentOpen !== null && currentOpen !== index) {
      // Fecha seção anteriormente aberta
      const prevCollapse = document.querySelector(`#collapse-${currentOpen}`);
      if (prevCollapse) prevCollapse.open = false;
    }
    currentOpen = index;
  };

  return 'div', {
    className: 'join join-vertical w-full',
    children: sections.map((section, index) => 
      Collapse({
        id: `collapse-${index}`,
        className: 'collapse collapse-arrow join-item border border-base-300',
        children: [
          CollapseTitle({
            className: 'collapse-title text-xl font-medium',
            onClick: () => toggleSection(index),
            children: section.title
          }),
          CollapseContent({
            className: 'collapse-content',
            children: [
              'div', { 
                className: 'pt-2',
                children: section.content 
              }
            ]
          })
        ]
      })
    )
  };
}

// Uso
const faqAccordion = Accordion({
  sections: [
    {
      title: 'Como criar uma conta?',
      content: 'Para criar uma conta, clique no botão "Registrar" e preencha o formulário...'
    },
    {
      title: 'Como redefinir minha senha?',
      content: 'Vá para a página de login e clique em "Esqueci minha senha"...'
    },
    {
      title: 'Como cancelar minha assinatura?',
      content: 'Acesse as configurações da conta e clique em "Gerenciar Assinatura"...'
    }
  ],
  allowMultiple: false
});
```

### Painel de Configurações com Toggles
```typescript
import { Toggle } from '@jay-js/ui';

function SettingsPanel({ settings, onSettingChange }) {
  const createToggle = (setting) => 
    'div', {
      className: 'form-control',
      children: [
        'label', {
          className: 'label cursor-pointer',
          children: [
            'div', {
              children: [
                'span', { 
                  className: 'label-text font-medium',
                  children: setting.label 
                },
                'span', { 
                  className: 'label-text-alt text-sm opacity-70',
                  children: setting.description 
                }
              ]
            },
            Toggle({
              type: 'checkbox',
              className: `toggle ${setting.color || 'toggle-primary'}`,
              checked: setting.value,
              onChange: (e) => onSettingChange(setting.key, e.target.checked)
            })
          ]
        }
      ]
    };

  return 'div', {
    className: 'card bg-base-100 shadow-lg',
    children: [
      'div', { className: 'card-body' },
      [
        'h2', { 
          className: 'card-title mb-4',
          children: 'Preferências' 
        },
        'div', { 
          className: 'space-y-4',
          children: settings.map(createToggle)
        }
      ]
    ]
  };
}

// Uso
const userSettings = SettingsPanel({
  settings: [
    {
      key: 'notifications',
      label: 'Notificações',
      description: 'Receber notificações por email',
      value: true,
      color: 'toggle-primary'
    },
    {
      key: 'darkMode',
      label: 'Modo Escuro',
      description: 'Usar tema escuro da interface',
      value: false,
      color: 'toggle-secondary'
    },
    {
      key: 'autoSave',
      label: 'Salvamento Automático',
      description: 'Salvar automaticamente durante a edição',
      value: true,
      color: 'toggle-accent'
    }
  ],
  onSettingChange: (key, value) => {
    console.log(`Configuração ${key} alterada para:`, value);
    // Implementar lógica de salvamento
  }
});
```

## Padrões Avançados

### Dropdown Multi-nível
```typescript
import { Dropdown, DropdownLabel, DropdownContent } from '@jay-js/ui';

function MultiLevelDropdown({ menu }) {
  const createMenuItem = (item) => {
    if (item.children) {
      return 'li', {
        children: [
          Dropdown({
            className: 'dropdown dropdown-hover dropdown-right',
            children: [
              DropdownLabel({
                className: 'justify-between',
                children: [
                  item.label,
                  '▶'
                ]
              }),
              DropdownContent({
                className: 'dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52',
                children: item.children.map(createMenuItem)
              })
            ]
          })
        ]
      };
    }

    return 'li', {
      children: ['a', {
        onClick: item.action,
        children: item.label
      }]
    };
  };

  return Dropdown({
    className: 'dropdown',
    children: [
      DropdownLabel({
        tabIndex: 0,
        className: 'btn btn-primary',
        children: 'Menu Principal'
      }),
      DropdownContent({
        tabIndex: 0,
        className: 'dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52',
        children: menu.map(createMenuItem)
      })
    ]
  });
}
```

### Drawer Responsivo com Hook
```typescript
import { Drawer, DrawerContent, DrawerOverlay, handleDrawer } from '@jay-js/ui';

function ResponsiveNavigation({ navigationItems }) {
  const drawer = handleDrawer({ id: 'main-navigation' });

  const NavigationMenu = () => 'ul', {
    className: 'menu p-4 w-80 space-y-2',
    children: navigationItems.map(item => 
      'li', {
        children: ['a', {
          href: item.href,
          className: item.active ? 'active' : '',
          onClick: () => {
            // Fecha drawer em mobile após navegação
            if (window.innerWidth < 1024) {
              drawer.close();
            }
          },
          children: [
            item.icon && 'span', { 
              className: 'mr-3',
              children: item.icon 
            },
            item.label
          ]
        }]
      })
    )
  };

  return [
    // Botão do menu mobile
    'div', {
      className: 'navbar lg:hidden',
      children: ['button', {
        className: 'btn btn-square btn-ghost',
        onClick: drawer.toggle,
        children: '☰'
      }]
    },

    // Drawer
    Drawer({
      className: 'drawer lg:drawer-open',
      children: [
        'input', {
          id: 'main-navigation',
          type: 'checkbox',
          className: 'drawer-toggle'
        },
        
        // Conteúdo principal
        'div', {
          className: 'drawer-content',
          children: ['main', { 
            className: 'min-h-screen p-4',
            children: 'Conteúdo da página...' 
          }]
        },

        // Sidebar
        'div', {
          className: 'drawer-side z-40',
          children: [
            DrawerOverlay({
              htmlFor: 'main-navigation'
            }),
            DrawerContent({
              className: 'min-h-full bg-base-200',
              children: NavigationMenu()
            })
          ]
        }
      ]
    })
  ];
}
```

### Sistema de Swap Interativo
```typescript
import { Swap, SwapItem } from '@jay-js/ui';

class InteractiveSwap {
  static create({ states, onChange, className = '' }) {
    let currentState = 0;
    
    const updateSwap = (swapElement) => {
      const input = swapElement.querySelector('.swap-input');
      if (input) {
        input.checked = currentState === 1;
        onChange?.(states[currentState], currentState);
      }
    };

    return Swap({
      className: `swap ${className}`,
      children: [
        'input', {
          type: 'checkbox',
          className: 'swap-input',
          onChange: function() {
            currentState = this.checked ? 1 : 0;
            onChange?.(states[currentState], currentState);
          }
        },
        SwapItem({
          className: 'swap-off',
          children: states[0].content
        }),
        SwapItem({
          className: 'swap-on', 
          children: states[1].content
        })
      ]
    });
  }

  static multiState({ states, onChange, className = '' }) {
    let currentIndex = 0;
    
    return 'div', {
      className: `cursor-pointer ${className}`,
      onClick: function() {
        currentIndex = (currentIndex + 1) % states.length;
        this.innerHTML = '';
        this.appendChild(states[currentIndex].content);
        onChange?.(states[currentIndex], currentIndex);
      },
      children: states[0].content
    };
  }
}

// Uso - Swap binário
const themeSwap = InteractiveSwap.create({
  states: [
    { 
      id: 'light',
      content: '☀️' 
    },
    { 
      id: 'dark',
      content: '🌙' 
    }
  ],
  onChange: (state, index) => {
    document.documentElement.setAttribute('data-theme', state.id);
  },
  className: 'swap-rotate text-2xl'
});

// Uso - Swap multi-estado
const statusSwap = InteractiveSwap.multiState({
  states: [
    { id: 'available', content: '🟢' },
    { id: 'busy', content: '🟡' },
    { id: 'away', content: '🔴' },
    { id: 'invisible', content: '⚫' }
  ],
  onChange: (state, index) => {
    updateUserStatus(state.id);
  },
  className: 'text-xl'
});
```

## Melhores Práticas

### 1. Acessibilidade em Dropdowns
```typescript
// Sempre inclua navegação por teclado e ARIA
const accessibleDropdown = Dropdown({
  children: [
    DropdownLabel({
      tabIndex: 0,
      'aria-haspopup': true,
      'aria-expanded': false,
      onKeyDown: (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          // Lógica de abertura
        }
      }
    }),
    DropdownContent({
      role: 'menu',
      'aria-labelledby': 'dropdown-label'
    })
  ]
});
```

### 2. Estados Consistentes em Toggles
```typescript
// Mantenha consistência visual nos estados
const consistentToggle = Toggle({
  className: 'toggle toggle-primary',
  disabled: false,
  'aria-describedby': 'toggle-description'
});
```

### 3. Feedback Visual em Swaps
```typescript
// Forneça feedback claro sobre mudanças de estado
const feedbackSwap = Swap({
  className: 'swap swap-rotate transition-all duration-300',
  onChange: (e) => {
    // Feedback visual temporário
    e.target.closest('.swap').classList.add('animate-pulse');
    setTimeout(() => {
      e.target.closest('.swap').classList.remove('animate-pulse');
    }, 300);
  }
});
```

### 4. Gerenciamento de Estado em Colapses
```typescript
// Use atributos HTML nativos quando possível
const nativeCollapse = Collapse({
  tag: 'details',
  open: false, // Estado inicial
  onToggle: (e) => {
    console.log('Collapse toggled:', e.target.open);
  }
});
```

## Exemplo Completo: Interface de Administração

```typescript
import { 
  Dropdown, DropdownLabel, DropdownContent,
  Collapse, CollapseTitle, CollapseContent,
  Drawer, DrawerContent, DrawerOverlay,
  Toggle, Swap, SwapItem,
  handleDrawer
} from '@jay-js/ui';

function AdminInterface({ user, settings, onSettingsChange }) {
  const sidebarDrawer = handleDrawer({ id: 'admin-sidebar' });
  
  return 'div', {
    className: 'min-h-screen bg-base-100',
    children: [
      // Header
      'header', {
        className: 'navbar bg-base-300 shadow-lg',
        children: [
          'div', { className: 'navbar-start' },
          [
            'button', {
              className: 'btn btn-square btn-ghost lg:hidden',
              onClick: sidebarDrawer.toggle,
              children: '☰'
            }
          ],
          
          'div', { className: 'navbar-center' },
          ['h1', { 
            className: 'text-xl font-bold',
            children: 'Admin Dashboard' 
          }],

          'div', { className: 'navbar-end space-x-2' },
          [
            // Toggle de tema
            Swap({
              className: 'swap swap-rotate',
              children: [
                'input', {
                  type: 'checkbox',
                  className: 'theme-controller',
                  value: 'dark',
                  onChange: (e) => {
                    document.documentElement.setAttribute(
                      'data-theme', 
                      e.target.checked ? 'dark' : 'light'
                    );
                  }
                },
                SwapItem({
                  className: 'swap-off fill-current w-6 h-6',
                  children: '☀️'
                }),
                SwapItem({
                  className: 'swap-on fill-current w-6 h-6',
                  children: '🌙'
                })
              ]
            }),

            // Menu do usuário
            Dropdown({
              className: 'dropdown dropdown-end',
              children: [
                DropdownLabel({
                  tabIndex: 0,
                  className: 'btn btn-ghost btn-circle avatar',
                  children: ['div', {
                    className: 'w-10 rounded-full',
                    children: ['img', { 
                      src: user.avatar,
                      alt: user.name 
                    }]
                  }]
                }),
                DropdownContent({
                  tabIndex: 0,
                  className: 'dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52',
                  children: [
                    'li', { children: ['a', { children: 'Perfil' }] },
                    'li', { children: ['a', { children: 'Configurações' }] },
                    'div', { className: 'divider' },
                    'li', { children: ['a', { children: 'Sair' }] }
                  ]
                })
              ]
            })
          ]
        ]
      },

      // Layout principal com drawer
      Drawer({
        className: 'drawer lg:drawer-open',
        children: [
          'input', {
            id: 'admin-sidebar',
            type: 'checkbox',
            className: 'drawer-toggle'
          },

          // Conteúdo principal
          'div', {
            className: 'drawer-content flex flex-col',
            children: [
              'main', {
                className: 'flex-1 p-6',
                children: [
                  // Seção de configurações
                  'div', { className: 'max-w-4xl mx-auto space-y-6' },
                  [
                    'h2', { 
                      className: 'text-2xl font-bold mb-6',
                      children: 'Configurações do Sistema' 
                    },

                    // Acordeão de configurações
                    'div', { className: 'join join-vertical w-full' },
                    [
                      // Configurações gerais
                      Collapse({
                        className: 'collapse collapse-arrow join-item border border-base-300',
                        children: [
                          CollapseTitle({
                            className: 'collapse-title text-xl font-medium',
                            children: 'Configurações Gerais'
                          }),
                          CollapseContent({
                            className: 'collapse-content',
                            children: [
                              'div', { className: 'space-y-4 pt-4' },
                              [
                                // Toggle de manutenção
                                'div', { className: 'form-control' },
                                ['label', {
                                  className: 'label cursor-pointer',
                                  children: [
                                    'div', {
                                      children: [
                                        'span', { 
                                          className: 'label-text font-medium',
                                          children: 'Modo Manutenção' 
                                        },
                                        'span', { 
                                          className: 'label-text-alt',
                                          children: 'Ativar página de manutenção' 
                                        }
                                      ]
                                    },
                                    Toggle({
                                      type: 'checkbox',
                                      className: 'toggle toggle-warning',
                                      checked: settings.maintenance,
                                      onChange: (e) => onSettingsChange('maintenance', e.target.checked)
                                    })
                                  ]
                                }],

                                // Toggle de registros
                                'div', { className: 'form-control' },
                                ['label', {
                                  className: 'label cursor-pointer',
                                  children: [
                                    'div', {
                                      children: [
                                        'span', { 
                                          className: 'label-text font-medium',
                                          children: 'Permitir Registros' 
                                        },
                                        'span', { 
                                          className: 'label-text-alt',
                                          children: 'Novos usuários podem se registrar' 
                                        }
                                      ]
                                    },
                                    Toggle({
                                      type: 'checkbox',
                                      className: 'toggle toggle-primary',
                                      checked: settings.allowRegistration,
                                      onChange: (e) => onSettingsChange('allowRegistration', e.target.checked)
                                    })
                                  ]
                                }]
                              ]
                            ]
                          })
                        ]
                      }),

                      // Configurações de segurança
                      Collapse({
                        className: 'collapse collapse-arrow join-item border border-base-300',
                        children: [
                          CollapseTitle({
                            className: 'collapse-title text-xl font-medium',
                            children: 'Configurações de Segurança'
                          }),
                          CollapseContent({
                            className: 'collapse-content',
                            children: [
                              'div', { className: 'space-y-4 pt-4' },
                              [
                                'div', { className: 'form-control' },
                                ['label', {
                                  className: 'label cursor-pointer',
                                  children: [
                                    'div', {
                                      children: [
                                        'span', { 
                                          className: 'label-text font-medium',
                                          children: 'Autenticação de Dois Fatores' 
                                        },
                                        'span', { 
                                          className: 'label-text-alt',
                                          children: 'Obrigatório para todos os usuários' 
                                        }
                                      ]
                                    },
                                    Toggle({
                                      type: 'checkbox',
                                      className: 'toggle toggle-success',
                                      checked: settings.require2FA,
                                      onChange: (e) => onSettingsChange('require2FA', e.target.checked)
                                    })
                                  ]
                                }]
                              ]
                            ]
                          })
                        ]
                      })
                    ]
                  ]
                ]
              }
            ]
          },

          // Sidebar
          'div', {
            className: 'drawer-side z-40',
            children: [
              DrawerOverlay({
                htmlFor: 'admin-sidebar'
              }),
              DrawerContent({
                className: 'min-h-full w-80 bg-base-200 text-base-content',
                children: [
                  'div', { className: 'p-4' },
                  [
                    'h3', { 
                      className: 'font-bold text-lg mb-4',
                      children: 'Navegação' 
                    },
                    'ul', {
                      className: 'menu space-y-2',
                      children: [
                        'li', { children: ['a', { children: '📊 Dashboard' }] },
                        'li', { children: ['a', { children: '👥 Usuários' }] },
                        'li', { children: ['a', { children: '⚙️ Configurações' }] },
                        'li', { children: ['a', { children: '📈 Relatórios' }] }
                      ]
                    }
                  ]
                ]
              })
            ]
          }
        ]
      })
    ]
  };
}
```

Este exemplo completo demonstra como combinar todos os componentes interativos para criar uma interface administrativa robusta, com navegação responsiva, configurações organizadas e controles intuitivos.