---
category: UI
categoryId: 1
articleId: 4
slug: navigation-components
title: Componentes de Navegação
description: Componentes para navegação e orientação do usuário, incluindo navbar, tabs, menu, breadcrumbs e bottom navigation.
---

# Componentes de Navegação

Os componentes de navegação são essenciais para orientar os usuários através da aplicação, fornecendo acesso rápido a diferentes seções e funcionalidades.

## Referência da API

### Navbar

Barra de navegação principal da aplicação.

#### Componentes Relacionados
- **Navbar**: Container principal da barra de navegação
- **NavbarComponent**: Componente individual dentro da navbar

#### Assinatura da Função
```typescript
function Navbar<T extends TBaseTagMap = "nav">(
  options: TNavbar<T>
): HTMLElementTagNameMap[T]
```

#### Parâmetros
| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `variant` | `"fixed" \| "sticky" \| "static"` | Posicionamento da navbar |
| `size` | `"sm" \| "md" \| "lg"` | Altura da navbar |
| `theme` | `"light" \| "dark" \| "transparent"` | Tema visual |

### Bottom Navigation

Navegação inferior otimizada para dispositivos móveis.

#### Componentes Relacionados
- **BottomNavigation**: Container da navegação inferior
- **BottomNavigationItem**: Item individual da navegação

#### Assinatura da Função
```typescript
function BottomNavigation<T extends TBaseTagMap = "nav">(
  options: TBottomNavigation<T>
): HTMLElementTagNameMap[T]
```

### Tabs

Sistema de navegação em abas.

#### Componentes Relacionados
- **Tabs**: Container das abas
- **TabItem**: Item individual de aba

#### Assinatura da Função
```typescript
function Tabs<T extends TBaseTagMap = "div">(
  options: TTabs<T>
): HTMLElementTagNameMap[T]
```

#### Parâmetros
| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `variant` | `"bordered" \| "lifted" \| "boxed"` | Estilo visual das abas |
| `size` | `"sm" \| "md" \| "lg"` | Tamanho das abas |
| `alignment` | `"start" \| "center" \| "end"` | Alinhamento das abas |

### Menu

Sistema de menu hierárquico.

#### Componentes Relacionados
- **Menu**: Container do menu
- **MenuItem**: Item individual do menu
- **MenuTitle**: Título de seção do menu

#### Assinatura da Função
```typescript
function Menu<T extends TBaseTagMap = "ul">(
  options: TMenu<T>
): HTMLElementTagNameMap[T]
```

### Breadcrumbs

Navegação hierárquica em forma de migalhas de pão.

#### Assinatura da Função
```typescript
function Breadcrumbs<T extends TBaseTagMap = "nav">(
  options: TBreadcrumbs<T>
): HTMLElementTagNameMap[T]
```

### Steps

Indicador de progresso em etapas.

#### Componentes Relacionados
- **Steps**: Container dos steps
- **StepItem**: Item individual de step

#### Assinatura da Função
```typescript
function Steps<T extends TBaseTagMap = "ul">(
  options: TSteps<T>
): HTMLElementTagNameMap[T]
```

## Visão Geral

### Navbar
A Navbar é o componente de navegação principal, geralmente posicionada no topo da aplicação. Fornece acesso rápido às principais seções e funcionalidades.

**Características:**
- Posicionamento flexível (fixo, sticky, estático)
- Temas adaptativos (claro, escuro, transparente)
- Suporte a logos, menus e ações
- Responsividade integrada
- Suporte a dropdown menus

### Bottom Navigation
Navegação otimizada para dispositivos móveis, posicionada na parte inferior da tela para facilitar o acesso com o polegar.

**Características:**
- Design otimizado para mobile
- Máximo de 5 itens recomendado
- Ícones com rótulos opcionais
- Estados ativos/inativos
- Badges de notificação suportadas

### Tabs
Sistema de navegação em abas para organizar conteúdo relacionado em uma interface compacta.

**Características:**
- Múltiplas variações visuais
- Alinhamento configurável
- Suporte a ícones e badges
- Navegação via teclado
- Estados ativos e desabilitados

### Menu
Sistema de menu hierárquico para navegação em aplicações complexas, ideal para sidebars e dropdowns.

**Características:**
- Estrutura hierárquica
- Títulos de seção
- Ícones e badges
- Estados expandido/colapsado
- Navegação via teclado

### Breadcrumbs
Navegação hierárquica que mostra a localização atual do usuário na estrutura da aplicação.

**Características:**
- Navegação hierárquica clara
- Separadores customizáveis
- Links clicáveis para navegação
- Truncamento inteligente
- Suporte a ícones

### Steps
Indicador visual de progresso em processos multi-etapas, como wizards e formulários longos.

**Características:**
- Indicação clara de progresso
- Estados: completo, ativo, pendente
- Navegação bidirecional opcional
- Orientação horizontal/vertical
- Suporte a ícones e descrições

## Uso Básico

### Navbar Principal
```typescript
import { Navbar, NavbarComponent } from '@jay-js/ui';

// Navbar básica
const navbar = Navbar({
  variant: 'sticky',
  size: 'md',
  theme: 'light',
  children: [
    // Logo
    NavbarComponent({
      children: [
        'img', {
          src: '/logo.png',
          alt: 'Logo da empresa',
          className: 'h-8 w-auto'
        }
      ]
    }),
    
    // Menu principal
    NavbarComponent({
      className: 'flex-1 justify-center',
      children: [
        'a', { href: '/', children: 'Início' },
        'a', { href: '/produtos', children: 'Produtos' },
        'a', { href: '/sobre', children: 'Sobre' },
        'a', { href: '/contato', children: 'Contato' }
      ]
    }),
    
    // Ações do usuário
    NavbarComponent({
      children: [
        Button({ 
          children: 'Login',
          variant: 'outline'
        }),
        Button({ 
          children: 'Cadastrar',
          className: 'btn-primary'
        })
      ]
    })
  ]
});
```

### Bottom Navigation Mobile
```typescript
import { BottomNavigation, BottomNavigationItem } from '@jay-js/ui';

const bottomNav = BottomNavigation({
  children: [
    BottomNavigationItem({
      icon: 'home',
      label: 'Início',
      active: true,
      href: '/'
    }),
    BottomNavigationItem({
      icon: 'search',
      label: 'Buscar',
      href: '/search'
    }),
    BottomNavigationItem({
      icon: 'heart',
      label: 'Favoritos',
      href: '/favorites',
      badge: 3 // Número de favoritos
    }),
    BottomNavigationItem({
      icon: 'user',
      label: 'Perfil',
      href: '/profile'
    })
  ]
});
```

### Tabs para Conteúdo
```typescript
import { Tabs, TabItem } from '@jay-js/ui';

const contentTabs = Tabs({
  variant: 'bordered',
  size: 'md',
  children: [
    TabItem({
      active: true,
      children: 'Visão Geral'
    }),
    TabItem({
      children: 'Especificações'
    }),
    TabItem({
      children: 'Avaliações'
    }),
    TabItem({
      children: 'FAQ'
    })
  ]
});
```

### Menu Hierárquico
```typescript
import { Menu, MenuItem, MenuTitle } from '@jay-js/ui';

const sidebarMenu = Menu({
  children: [
    MenuTitle({
      children: 'Navegação Principal'
    }),
    MenuItem({
      icon: 'dashboard',
      children: 'Dashboard',
      active: true
    }),
    MenuItem({
      icon: 'users',
      children: 'Usuários'
    }),
    
    MenuTitle({
      children: 'Configurações'
    }),
    MenuItem({
      icon: 'settings',
      children: 'Configurações Gerais'
    }),
    MenuItem({
      icon: 'security',
      children: 'Segurança'
    }),
    MenuItem({
      icon: 'billing',
      children: 'Faturamento',
      badge: 'Novo'
    })
  ]
});
```

### Breadcrumbs
```typescript
import { Breadcrumbs } from '@jay-js/ui';

const breadcrumb = Breadcrumbs({
  separator: '/',
  children: [
    'a', { href: '/', children: 'Início' },
    'a', { href: '/produtos', children: 'Produtos' },
    'a', { href: '/categoria', children: 'Eletrônicos' },
    'span', { children: 'Smartphone XYZ' } // Item atual (sem link)
  ]
});
```

### Steps Indicator
```typescript
import { Steps, StepItem } from '@jay-js/ui';

const wizardSteps = Steps({
  orientation: 'horizontal',
  children: [
    StepItem({
      status: 'completed',
      title: 'Informações Pessoais',
      description: 'Nome, email, telefone'
    }),
    StepItem({
      status: 'active',
      title: 'Endereço',
      description: 'Endereço de entrega'
    }),
    StepItem({
      status: 'pending',
      title: 'Pagamento',
      description: 'Método de pagamento'
    }),
    StepItem({
      status: 'pending',
      title: 'Confirmação',
      description: 'Revisar e confirmar'
    })
  ]
});
```

## Casos de Uso Comuns

### Layout Responsivo com Navbar
```typescript
import { Navbar, NavbarComponent, BottomNavigation } from '@jay-js/ui';

function ResponsiveNavigation() {
  // Navbar para desktop
  const desktopNav = Navbar({
    variant: 'sticky',
    className: 'hidden md:flex',
    children: [
      // Logo e menu
    ]
  });
  
  // Bottom nav para mobile
  const mobileNav = BottomNavigation({
    className: 'md:hidden',
    children: [
      // Items de navegação
    ]
  });
  
  return [desktopNav, mobileNav];
}
```

### Dashboard com Menu Lateral
```typescript
import { Menu, MenuItem, MenuTitle } from '@jay-js/ui';

function DashboardSidebar() {
  return Menu({
    className: 'w-64 h-full bg-gray-50 p-4',
    children: [
      MenuTitle({ children: 'Overview' }),
      MenuItem({
        icon: 'chart-line',
        children: 'Analytics',
        active: true
      }),
      MenuItem({
        icon: 'users',
        children: 'Usuários',
        badge: '1.2k'
      }),
      
      MenuTitle({ children: 'Gestão' }),
      MenuItem({
        icon: 'box',
        children: 'Produtos'
      }),
      MenuItem({
        icon: 'truck',
        children: 'Pedidos',
        badge: '23'
      }),
      
      MenuTitle({ children: 'Configurações' }),
      MenuItem({
        icon: 'cog',
        children: 'Configurações'
      }),
      MenuItem({
        icon: 'logout',
        children: 'Sair'
      })
    ]
  });
}
```

### Wizard Multi-Step
```typescript
import { Steps, StepItem, Tabs, TabItem } from '@jay-js/ui';

function MultiStepWizard({ currentStep = 0 }) {
  const steps = [
    { title: 'Básico', description: 'Informações básicas' },
    { title: 'Detalhes', description: 'Informações detalhadas' },
    { title: 'Revisão', description: 'Revisar dados' },
    { title: 'Confirmação', description: 'Confirmar criação' }
  ];
  
  return [
    // Indicador de progresso
    Steps({
      orientation: 'horizontal',
      className: 'mb-8',
      children: steps.map((step, index) =>
        StepItem({
          key: index,
          status: index < currentStep ? 'completed' :
                  index === currentStep ? 'active' : 'pending',
          title: step.title,
          description: step.description
        })
      )
    }),
    
    // Conteúdo da etapa atual
    'div',
    {
      className: 'step-content',
      children: getStepContent(currentStep)
    },
    
    // Navegação entre etapas
    'div',
    {
      className: 'flex justify-between mt-8',
      children: [
        Button({
          children: 'Anterior',
          disabled: currentStep === 0,
          onClick: () => goToPreviousStep()
        }),
        Button({
          children: currentStep === steps.length - 1 ? 'Finalizar' : 'Próximo',
          className: 'btn-primary',
          onClick: () => goToNextStep()
        })
      ]
    }
  ];
}
```

## Padrões Avançados

### Navbar com Dropdown
```typescript
import { Navbar, NavbarComponent, Dropdown } from '@jay-js/ui';

function NavbarWithDropdown() {
  return Navbar({
    children: [
      NavbarComponent({
        children: [
          // Menu com dropdown
          Dropdown({
            trigger: Button({ 
              children: 'Produtos',
              variant: 'ghost' 
            }),
            content: DropdownContent({
              children: [
                'a', { href: '/smartphones', children: 'Smartphones' },
                'a', { href: '/laptops', children: 'Laptops' },
                'a', { href: '/acessorios', children: 'Acessórios' }
              ]
            })
          })
        ]
      })
    ]
  });
}
```

### Tabs com Conteúdo Dinâmico
```typescript
import { Tabs, TabItem } from '@jay-js/ui';

function DynamicTabs({ tabs, activeTab, onTabChange }) {
  return [
    // Tab headers
    Tabs({
      variant: 'lifted',
      children: tabs.map((tab, index) =>
        TabItem({
          key: tab.id,
          active: activeTab === index,
          onClick: () => onTabChange(index),
          children: tab.label
        })
      )
    }),
    
    // Tab content
    'div',
    {
      className: 'tab-content p-6',
      children: tabs[activeTab]?.content
    }
  ];
}
```

### Breadcrumbs Inteligentes
```typescript
import { Breadcrumbs } from '@jay-js/ui';

function SmartBreadcrumbs({ path }: { path: string }) {
  const segments = path.split('/').filter(Boolean);
  const maxVisible = 3;
  
  let breadcrumbItems = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const isLast = index === segments.length - 1;
    
    return isLast ? 
      'span', { key: index, children: formatSegment(segment) } :
      'a', { 
        key: index, 
        href, 
        children: formatSegment(segment) 
      };
  });
  
  // Truncar se muitos itens
  if (breadcrumbItems.length > maxVisible) {
    breadcrumbItems = [
      breadcrumbItems[0],
      'span', { children: '...' },
      ...breadcrumbItems.slice(-2)
    ];
  }
  
  return Breadcrumbs({
    separator: '>',
    children: breadcrumbItems
  });
}
```

## Melhores Práticas

### 1. Hierarquia de Navegação
```typescript
// Mantenha hierarquia clara na navegação
const navigationHierarchy = {
  primary: Navbar,      // Navegação principal
  secondary: Tabs,      // Navegação de seção
  tertiary: Menu,       // Navegação detalhada
  contextual: Breadcrumbs // Navegação de contexto
};
```

### 2. Responsividade
```typescript
// Adapte a navegação para diferentes dispositivos
const responsiveNav = [
  // Desktop: Navbar completa
  Navbar({
    className: 'hidden lg:flex',
    children: fullMenuItems
  }),
  
  // Tablet: Navbar compacta
  Navbar({
    className: 'hidden md:flex lg:hidden',
    children: compactMenuItems
  }),
  
  // Mobile: Bottom navigation
  BottomNavigation({
    className: 'md:hidden',
    children: mobileMenuItems
  })
];
```

### 3. Estados de Navegação
```typescript
// Indique claramente o estado atual
function NavigationWithStates({ currentPath }) {
  return Menu({
    children: menuItems.map(item => 
      MenuItem({
        ...item,
        active: item.path === currentPath,
        disabled: item.disabled,
        badge: item.notifications
      })
    )
  });
}
```

### 4. Acessibilidade
```typescript
// Inclua propriedades de acessibilidade
const accessibleNav = Navbar({
  role: 'navigation',
  'aria-label': 'Navegação principal',
  children: [
    NavbarComponent({
      children: [
        'a', {
          href: '/',
          'aria-current': 'page', // Para página atual
          children: 'Início'
        }
      ]
    })
  ]
});
```

## Exemplo Completo

```typescript
import { 
  Navbar, NavbarComponent, 
  BottomNavigation, BottomNavigationItem,
  Tabs, TabItem, 
  Menu, MenuItem, MenuTitle,
  Breadcrumbs, Steps, StepItem 
} from '@jay-js/ui';

// Sistema completo de navegação
function CompleteNavigationSystem({ 
  user, 
  currentPath, 
  currentStep,
  breadcrumbPath 
}) {
  
  // Navegação principal (desktop)
  const mainNavbar = Navbar({
    variant: 'sticky',
    theme: 'light',
    className: 'hidden md:flex',
    children: [
      // Logo
      NavbarComponent({
        children: [
          'a', {
            href: '/',
            children: [
              'img', { src: '/logo.svg', alt: 'Logo', className: 'h-8' }
            ]
          }
        ]
      }),
      
      // Menu principal
      NavbarComponent({
        className: 'flex-1 justify-center gap-6',
        children: [
          'a', { 
            href: '/', 
            className: currentPath === '/' ? 'text-primary' : '',
            children: 'Início' 
          },
          'a', { 
            href: '/produtos', 
            className: currentPath.startsWith('/produtos') ? 'text-primary' : '',
            children: 'Produtos' 
          },
          'a', { 
            href: '/servicos',
            className: currentPath.startsWith('/servicos') ? 'text-primary' : '',
            children: 'Serviços' 
          }
        ]
      }),
      
      // Área do usuário
      NavbarComponent({
        children: user ? [
          // Usuário logado
          Dropdown({
            trigger: Avatar({ src: user.avatar }),
            content: DropdownContent({
              children: [
                MenuItem({ children: 'Perfil', href: '/perfil' }),
                MenuItem({ children: 'Configurações', href: '/config' }),
                'hr',
                MenuItem({ children: 'Sair', onClick: logout })
              ]
            })
          })
        ] : [
          // Usuário não logado
          Button({ 
            children: 'Entrar',
            variant: 'outline',
            href: '/login'
          })
        ]
      })
    ]
  });
  
  // Navegação mobile
  const mobileNav = BottomNavigation({
    className: 'md:hidden',
    children: [
      BottomNavigationItem({
        icon: 'home',
        label: 'Início',
        active: currentPath === '/',
        href: '/'
      }),
      BottomNavigationItem({
        icon: 'search',
        label: 'Buscar',
        active: currentPath === '/buscar',
        href: '/buscar'
      }),
      BottomNavigationItem({
        icon: 'heart',
        label: 'Favoritos',
        active: currentPath === '/favoritos',
        href: '/favoritos',
        badge: user?.favorites?.length
      }),
      BottomNavigationItem({
        icon: 'user',
        label: 'Perfil',
        active: currentPath === '/perfil',
        href: user ? '/perfil' : '/login'
      })
    ]
  });
  
  // Breadcrumbs
  const breadcrumbs = breadcrumbPath ? Breadcrumbs({
    className: 'mb-4',
    children: generateBreadcrumbs(breadcrumbPath)
  }) : null;
  
  // Steps para processos
  const stepsIndicator = currentStep !== undefined ? Steps({
    className: 'mb-6',
    children: processSteps.map((step, index) =>
      StepItem({
        key: index,
        status: index < currentStep ? 'completed' :
                index === currentStep ? 'active' : 'pending',
        title: step.title,
        description: step.description
      })
    )
  }) : null;
  
  return {
    mainNavbar,
    mobileNav,
    breadcrumbs,
    stepsIndicator
  };
}

// Função para gerar breadcrumbs dinamicamente
function generateBreadcrumbs(path: string) {
  const segments = path.split('/').filter(Boolean);
  
  return segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const isLast = index === segments.length - 1;
    const label = formatBreadcrumbLabel(segment);
    
    return isLast ?
      'span', { key: index, children: label } :
      'a', { key: index, href, children: label };
  });
}
```