---
category: UI
categoryId: 1
articleId: 10
slug: utilities
title: Utilitários
description: Funções utilitárias para manipulação de classes CSS, merge de estilos e outras operações comuns em componentes UI.
---

# Utilitários

Os utilitários do @jay-js/ui fornecem funções auxiliares essenciais para o desenvolvimento eficiente de interfaces. Estas funções encapsulam operações comuns, otimizações e padrões que facilitam a criação e manutenção de componentes UI.

## Referência da API

### cn (Class Names)

Função utilitária para combinar e mesclar classes CSS de forma inteligente, incluindo suporte para classes condicionais e merge automático de classes Tailwind CSS conflitantes.

#### Assinatura da Função
```typescript
function cn(...inputs: ClassValue[]): string
```

#### Parâmetros
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `inputs` | `ClassValue[]` | Array variádico de valores de classe que podem ser strings, objetos, arrays, ou valores condicionais |

#### Tipos Suportados
```typescript
type ClassValue = 
  | string 
  | number 
  | ClassValue[] 
  | { [key: string]: boolean | null | undefined }
  | null 
  | undefined
```

#### Valor de Retorno
Retorna uma string com as classes CSS combinadas e otimizadas, com classes Tailwind conflitantes automaticamente resolvidas.

#### Dependências
- **clsx**: Para combinação flexível de classes
- **tailwind-merge**: Para resolução inteligente de conflitos entre classes Tailwind

## Visão Geral

### cn - Class Names Utility
A função `cn` é o utilitário central para gerenciamento de classes CSS no @jay-js/ui. Ela combina a flexibilidade do `clsx` com a inteligência do `tailwind-merge` para fornecer uma solução completa de gerenciamento de classes.

**Características principais:**
- **Combinação Inteligente**: Merge automático de classes com resolução de conflitos
- **Flexibilidade Total**: Suporte a múltiplos tipos de entrada (strings, objetos, arrays)
- **Otimização Tailwind**: Remove automaticamente classes Tailwind conflitantes
- **Classes Condicionais**: Suporte nativo para aplicação condicional de classes
- **Performance**: Otimizada para uso frequente em componentes

**Benefícios:**
- Reduz conflitos visuais entre classes CSS
- Simplifica lógica condicional de estilos
- Melhora a legibilidade do código
- Garante resultado consistente e previsível

## Uso Básico

### Combinação Simples de Classes
```typescript
import { cn } from '@jay-js/ui';

// Combinação básica de strings
const classes = cn('btn', 'btn-primary', 'w-full');
// Resultado: 'btn btn-primary w-full'

// Com classes base e modificadoras
const buttonClasses = cn(
  'inline-flex items-center justify-center rounded-md',
  'px-4 py-2 text-sm font-medium',
  'bg-blue-600 text-white hover:bg-blue-700'
);
```

### Classes Condicionais
```typescript
import { cn } from '@jay-js/ui';

// Usando objetos para condicionais
const alertClasses = cn('alert', {
  'alert-success': type === 'success',
  'alert-error': type === 'error', 
  'alert-warning': type === 'warning'
});

// Com variáveis booleanas
const isActive = true;
const isDisabled = false;

const linkClasses = cn('nav-link', {
  'active': isActive,
  'disabled': isDisabled,
  'text-muted': !isActive
});
```

### Merge de Classes Tailwind Conflitantes
```typescript
import { cn } from '@jay-js/ui';

// Classes conflitantes são automaticamente resolvidas
const mergedClasses = cn(
  'px-2 py-1 px-4', // px-4 sobrescreve px-2
  'text-red-500 text-blue-500' // text-blue-500 sobrescreve text-red-500
);
// Resultado: 'py-1 px-4 text-blue-500'

// Útil para sobrescrever classes padrão
const customButton = cn(
  'btn btn-primary', // Classes base
  'bg-green-500 hover:bg-green-600', // Sobrescrevem as cores do btn-primary
  props.className // Classes personalizadas do usuário
);
```

### Arrays e Valores Mistos
```typescript
import { cn } from '@jay-js/ui';

// Combinando diferentes tipos
const complexClasses = cn(
  'base-class',
  ['array-class-1', 'array-class-2'],
  {
    'conditional-class': condition,
    'another-conditional': anotherCondition
  },
  undefined, // Valores falsy são ignorados
  null,
  props.className && props.className
);

// Classes aninhadas
const nestedClasses = cn(
  'outer',
  [
    'inner-1',
    {
      'inner-conditional': true,
      'inner-false': false
    }
  ]
);
```

## Casos de Uso Comuns

### Componente com Variações
```typescript
import { cn } from '@jay-js/ui';

function Button({ 
  variant = 'default', 
  size = 'md', 
  disabled = false,
  fullWidth = false,
  className,
  children,
  ...props 
}) {
  const buttonClasses = cn(
    // Classes base
    'inline-flex items-center justify-center',
    'rounded-md font-medium transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    
    // Variações de cor
    {
      'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500': variant === 'primary',
      'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500': variant === 'secondary',
      'bg-transparent border border-gray-300 hover:bg-gray-50': variant === 'outline',
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500': variant === 'danger'
    },
    
    // Tamanhos
    {
      'px-2 py-1 text-xs': size === 'xs',
      'px-3 py-1.5 text-sm': size === 'sm', 
      'px-4 py-2 text-sm': size === 'md',
      'px-6 py-3 text-base': size === 'lg',
      'px-8 py-4 text-lg': size === 'xl'
    },
    
    // Estados
    {
      'opacity-50 cursor-not-allowed': disabled,
      'w-full': fullWidth
    },
    
    // Classes personalizadas do usuário
    className
  );

  return 'button', {
    className: buttonClasses,
    disabled,
    ...props,
    children
  };
}

// Uso
const primaryButton = Button({
  variant: 'primary',
  size: 'lg',
  fullWidth: true,
  className: 'shadow-lg', // Classes adicionais
  children: 'Clique aqui'
});
```

### Sistema de Cards Responsivos
```typescript
import { cn } from '@jay-js/ui';

function Card({ 
  variant = 'default',
  shadow = 'md',
  rounded = 'lg',
  padding = 'md',
  className,
  children 
}) {
  const cardClasses = cn(
    // Base
    'bg-white border',
    
    // Variações
    {
      'border-gray-200': variant === 'default',
      'border-blue-200 bg-blue-50': variant === 'info',
      'border-green-200 bg-green-50': variant === 'success',
      'border-red-200 bg-red-50': variant === 'error',
      'border-yellow-200 bg-yellow-50': variant === 'warning'
    },
    
    // Sombras
    {
      'shadow-sm': shadow === 'sm',
      'shadow-md': shadow === 'md',
      'shadow-lg': shadow === 'lg',
      'shadow-xl': shadow === 'xl',
      'shadow-none': shadow === 'none'
    },
    
    // Bordas arredondadas
    {
      'rounded-none': rounded === 'none',
      'rounded-sm': rounded === 'sm',
      'rounded-md': rounded === 'md', 
      'rounded-lg': rounded === 'lg',
      'rounded-xl': rounded === 'xl',
      'rounded-full': rounded === 'full'
    },
    
    // Padding
    {
      'p-2': padding === 'sm',
      'p-4': padding === 'md',
      'p-6': padding === 'lg',
      'p-8': padding === 'xl',
      'p-0': padding === 'none'
    },
    
    className
  );

  return 'div', {
    className: cardClasses,
    children
  };
}
```

### Layout Responsivo com Grid
```typescript
import { cn } from '@jay-js/ui';

function ResponsiveGrid({ 
  columns = { xs: 1, sm: 2, md: 3, lg: 4 },
  gap = 'md',
  className,
  children 
}) {
  const gridClasses = cn(
    'grid',
    
    // Colunas responsivas
    {
      'grid-cols-1': columns.xs === 1,
      'grid-cols-2': columns.xs === 2,
      'grid-cols-3': columns.xs === 3,
      'grid-cols-4': columns.xs === 4
    },
    
    // Small screens
    columns.sm && {
      'sm:grid-cols-1': columns.sm === 1,
      'sm:grid-cols-2': columns.sm === 2,
      'sm:grid-cols-3': columns.sm === 3,
      'sm:grid-cols-4': columns.sm === 4,
      'sm:grid-cols-5': columns.sm === 5,
      'sm:grid-cols-6': columns.sm === 6
    },
    
    // Medium screens  
    columns.md && {
      'md:grid-cols-1': columns.md === 1,
      'md:grid-cols-2': columns.md === 2,
      'md:grid-cols-3': columns.md === 3,
      'md:grid-cols-4': columns.md === 4,
      'md:grid-cols-5': columns.md === 5,
      'md:grid-cols-6': columns.md === 6
    },
    
    // Large screens
    columns.lg && {
      'lg:grid-cols-1': columns.lg === 1,
      'lg:grid-cols-2': columns.lg === 2,
      'lg:grid-cols-3': columns.lg === 3,
      'lg:grid-cols-4': columns.lg === 4,
      'lg:grid-cols-5': columns.lg === 5,
      'lg:grid-cols-6': columns.lg === 6
    },
    
    // Gaps
    {
      'gap-1': gap === 'xs',
      'gap-2': gap === 'sm',
      'gap-4': gap === 'md',
      'gap-6': gap === 'lg',
      'gap-8': gap === 'xl'
    },
    
    className
  );

  return 'div', {
    className: gridClasses,
    children
  };
}

// Uso
const productGrid = ResponsiveGrid({
  columns: { xs: 1, sm: 2, md: 3, lg: 4 },
  gap: 'lg',
  className: 'my-8',
  children: products.map(product => 
    Card({ 
      key: product.id,
      children: product.name 
    })
  )
});
```

## Padrões Avançados

### Factory de Classes para Componentes
```typescript
import { cn } from '@jay-js/ui';

// Factory para criar geradores de classes
function createClassFactory(baseClasses, variants = {}) {
  return function(props = {}) {
    const { variant, size, state, className, ...variantProps } = props;
    
    return cn(
      baseClasses,
      
      // Aplica variações baseadas em props
      variant && variants[variant],
      size && variants[size],  
      state && variants[state],
      
      // Aplica classes baseadas em props booleanas
      Object.entries(variantProps).reduce((acc, [key, value]) => {
        if (value === true && variants[key]) {
          acc[variants[key]] = true;
        }
        return acc;
      }, {}),
      
      className
    );
  };
}

// Exemplo: Factory para botões
const buttonClassFactory = createClassFactory(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2',
  {
    // Variantes
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    outline: 'bg-transparent border border-gray-300 hover:bg-gray-50',
    
    // Tamanhos
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    
    // Estados
    disabled: 'opacity-50 cursor-not-allowed',
    loading: 'cursor-wait',
    fullWidth: 'w-full'
  }
);

// Uso
const buttonClasses = buttonClassFactory({
  variant: 'primary',
  size: 'lg',
  disabled: true,
  fullWidth: true,
  className: 'shadow-lg'
});
```

### Sistema de Tema Dinâmico
```typescript
import { cn } from '@jay-js/ui';

class ThemeClassManager {
  constructor(themes = {}) {
    this.themes = themes;
    this.currentTheme = 'default';
  }

  // Define tema atual
  setTheme(themeName) {
    this.currentTheme = themeName;
  }

  // Gera classes baseadas no tema atual
  themed(componentType, baseClasses = '', variants = {}) {
    const theme = this.themes[this.currentTheme] || {};
    const themeComponent = theme[componentType] || {};
    
    return (props = {}) => {
      const { variant, className, ...otherProps } = props;
      
      return cn(
        baseClasses,
        themeComponent.base,
        variant && themeComponent.variants?.[variant],
        variant && variants[variant],
        
        // Props baseadas em boolean
        Object.entries(otherProps).reduce((acc, [key, value]) => {
          if (value === true) {
            if (themeComponent[key]) acc.push(themeComponent[key]);
            if (variants[key]) acc.push(variants[key]);
          }
          return acc;
        }, []),
        
        className
      );
    };
  }
}

// Configuração de temas
const themeManager = new ThemeClassManager({
  light: {
    button: {
      base: 'bg-white text-gray-900 border border-gray-300',
      variants: {
        primary: 'bg-blue-600 text-white border-blue-600',
        secondary: 'bg-gray-100 text-gray-800 border-gray-200'
      }
    },
    card: {
      base: 'bg-white border border-gray-200 shadow-sm',
      elevated: 'shadow-lg'
    }
  },
  
  dark: {
    button: {
      base: 'bg-gray-800 text-gray-100 border border-gray-600',
      variants: {
        primary: 'bg-blue-700 text-white border-blue-700',
        secondary: 'bg-gray-700 text-gray-200 border-gray-600'
      }
    },
    card: {
      base: 'bg-gray-800 border border-gray-700 shadow-lg',
      elevated: 'shadow-2xl'
    }
  }
});

// Uso
const buttonClasses = themeManager.themed('button', 'px-4 py-2 rounded')({
  variant: 'primary',
  className: 'w-full'
});

// Mudança de tema
themeManager.setTheme('dark');
```

### Utility para Classes de Animação
```typescript
import { cn } from '@jay-js/ui';

// Utilitário para animações complexas
function createAnimationClasses({
  enter = '',
  enterFrom = '',
  enterTo = '',
  leave = '',
  leaveFrom = '',
  leaveTo = '',
  duration = 200
} = {}) {
  return {
    enter: cn(
      'transition-all ease-out',
      `duration-${duration}`,
      enter,
      enterFrom
    ),
    enterActive: cn(
      'transition-all ease-out',
      `duration-${duration}`,
      enter,
      enterTo
    ),
    leave: cn(
      'transition-all ease-in',
      `duration-${duration}`,
      leave,
      leaveFrom
    ),
    leaveActive: cn(
      'transition-all ease-in',
      `duration-${duration}`,
      leave,
      leaveTo
    )
  };
}

// Animações pré-definidas
const animations = {
  fadeIn: createAnimationClasses({
    enterFrom: 'opacity-0',
    enterTo: 'opacity-100',
    leaveFrom: 'opacity-100', 
    leaveTo: 'opacity-0'
  }),
  
  slideDown: createAnimationClasses({
    enterFrom: 'opacity-0 transform -translate-y-2',
    enterTo: 'opacity-100 transform translate-y-0',
    leaveFrom: 'opacity-100 transform translate-y-0',
    leaveTo: 'opacity-0 transform -translate-y-2'
  }),
  
  scaleIn: createAnimationClasses({
    enterFrom: 'opacity-0 transform scale-95',
    enterTo: 'opacity-100 transform scale-100',
    leaveFrom: 'opacity-100 transform scale-100',
    leaveTo: 'opacity-0 transform scale-95',
    duration: 150
  })
};

// Componente com animação
function AnimatedModal({ isOpen, onClose, children }) {
  const animationClasses = animations.scaleIn;
  
  return 'div', {
    className: cn(
      'fixed inset-0 z-50 flex items-center justify-center',
      isOpen ? 'pointer-events-auto' : 'pointer-events-none'
    ),
    children: [
      // Backdrop
      'div', {
        className: cn(
          'absolute inset-0 bg-black',
          isOpen ? 'opacity-50' : 'opacity-0',
          'transition-opacity duration-200'
        ),
        onClick: onClose
      },
      
      // Modal
      'div', {
        className: cn(
          'bg-white rounded-lg shadow-xl max-w-md mx-4',
          isOpen ? animationClasses.enterActive : animationClasses.leaveActive
        ),
        children
      }
    ]
  };
}
```

## Melhores Práticas

### 1. Ordem Consistente de Classes
```typescript
// Mantenha uma ordem lógica e consistente
const classes = cn(
  // 1. Classes base estruturais
  'flex items-center justify-center',
  
  // 2. Layout e posicionamento  
  'absolute top-0 right-0',
  
  // 3. Dimensões
  'w-full h-12',
  
  // 4. Espaçamento
  'p-4 m-2',
  
  // 5. Tipografia
  'text-sm font-medium',
  
  // 6. Cores e background
  'bg-blue-500 text-white',
  
  // 7. Bordas e formas
  'border border-gray-300 rounded-lg',
  
  // 8. Efeitos visuais
  'shadow-md',
  
  // 9. Estados e transições
  'hover:bg-blue-600 transition-colors',
  
  // 10. Classes condicionais
  {
    'opacity-50': disabled,
    'cursor-not-allowed': disabled
  },
  
  // 11. Classes personalizadas (sempre por último)
  className
);
```

### 2. Reutilização de Padrões
```typescript
// Crie constantes para padrões comuns
const FOCUS_STYLES = 'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500';
const BUTTON_BASE = 'inline-flex items-center justify-center rounded-md font-medium transition-colors';
const CARD_STYLES = 'bg-white border border-gray-200 rounded-lg shadow-sm';

// Use em múltiplos lugares
const buttonClasses = cn(BUTTON_BASE, FOCUS_STYLES, 'px-4 py-2');
const linkClasses = cn(FOCUS_STYLES, 'text-blue-600 hover:text-blue-800');
```

### 3. Validação de Classes
```typescript
// Para desenvolvimento, valide classes importantes
function validateClasses(classes, component = 'Unknown') {
  if (process.env.NODE_ENV === 'development') {
    const invalidPatterns = [
      /\s{2,}/, // Múltiplos espaços
      /^\s|\s$/, // Espaços no início/fim
    ];
    
    invalidPatterns.forEach(pattern => {
      if (pattern.test(classes)) {
        console.warn(`Invalid classes in ${component}: "${classes}"`);
      }
    });
  }
  
  return classes;
}

const safeClasses = cn(
  'btn btn-primary',
  className
);

return validateClasses(safeClasses, 'Button');
```

### 4. Performance com Memoização
```typescript
import { cn } from '@jay-js/ui';

// Para componentes que renderizam frequentemente
const memoizedClasses = useMemo(() => cn(
  'expensive-computation-classes',
  {
    'conditional-class': expensiveCondition
  },
  className
), [expensiveCondition, className]);

// Ou use uma função de cache simples
const classCache = new Map();

function getCachedClasses(key, classFactory) {
  if (!classCache.has(key)) {
    classCache.set(key, classFactory());
  }
  return classCache.get(key);
}
```

## Exemplo Completo: Sistema de Design Tokens

```typescript
import { cn } from '@jay-js/ui';

// Design tokens como classes
const tokens = {
  spacing: {
    xs: 'p-1',
    sm: 'p-2', 
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  },
  
  colors: {
    primary: {
      50: 'bg-blue-50 text-blue-900',
      500: 'bg-blue-500 text-white',
      600: 'bg-blue-600 text-white',
      700: 'bg-blue-700 text-white'
    },
    secondary: {
      50: 'bg-gray-50 text-gray-900',
      500: 'bg-gray-500 text-white',
      600: 'bg-gray-600 text-white'
    }
  },
  
  shadows: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  },
  
  borders: {
    none: 'border-0',
    thin: 'border border-gray-200',
    thick: 'border-2 border-gray-300'
  },
  
  radius: {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md', 
    lg: 'rounded-lg',
    full: 'rounded-full'
  }
};

// Sistema de componentes baseado em tokens
class DesignSystem {
  constructor(customTokens = {}) {
    this.tokens = { ...tokens, ...customTokens };
  }

  // Método principal para combinar tokens
  compose(componentBase, tokenSelections = {}, additionalClasses = '') {
    const {
      spacing,
      color,
      colorVariant = '500',
      shadow,
      border,
      radius,
      ...customProps
    } = tokenSelections;

    return cn(
      componentBase,
      
      // Aplica tokens
      spacing && this.tokens.spacing[spacing],
      color && this.tokens.colors[color]?.[colorVariant],
      shadow && this.tokens.shadows[shadow],
      border && this.tokens.borders[border], 
      radius && this.tokens.radius[radius],
      
      // Props customizadas
      Object.entries(customProps).reduce((acc, [key, value]) => {
        if (value === true && this.tokens[key]) {
          return { ...acc, [this.tokens[key]]: true };
        }
        return acc;
      }, {}),
      
      additionalClasses
    );
  }

  // Componentes específicos
  button(props = {}) {
    return this.compose(
      'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
      {
        spacing: 'md',
        color: 'primary',
        radius: 'md',
        ...props
      }
    );
  }

  card(props = {}) {
    return this.compose(
      'bg-white',
      {
        spacing: 'lg',
        border: 'thin',
        radius: 'lg',
        shadow: 'md',
        ...props
      }
    );
  }

  input(props = {}) {
    return this.compose(
      'w-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500',
      {
        spacing: 'sm',
        border: 'thin',
        radius: 'md',
        ...props
      }
    );
  }

  badge(props = {}) {
    return this.compose(
      'inline-flex items-center px-2 py-1 text-xs font-medium',
      {
        color: 'secondary',
        colorVariant: '50',
        radius: 'full',
        ...props
      }
    );
  }
}

// Instância do design system
const ds = new DesignSystem();

// Uso prático
function MyComponent() {
  return 'div', {
    className: ds.card({ shadow: 'lg' }),
    children: [
      'h2', {
        className: 'text-xl font-bold mb-4',
        children: 'Título do Card'
      },
      
      'p', {
        className: 'text-gray-600 mb-6',
        children: 'Descrição do conteúdo do card...'
      },
      
      'div', {
        className: 'flex gap-3',
        children: [
          'button', {
            className: ds.button({ color: 'primary' }),
            children: 'Ação Principal'
          },
          'button', {
            className: ds.button({ 
              color: 'secondary',
              colorVariant: '500' 
            }),
            children: 'Ação Secundária'
          }
        ]
      },
      
      'div', {
        className: 'mt-4 flex gap-2',
        children: [
          'span', {
            className: ds.badge({ color: 'primary' }),
            children: 'Tag 1'
          },
          'span', {
            className: ds.badge({ 
              color: 'secondary',
              colorVariant: '50' 
            }),
            children: 'Tag 2'
          }
        ]
      }
    ]
  };
}

// Exemplo com form
function LoginForm() {
  return 'form', {
    className: ds.card({ 
      spacing: 'xl',
      shadow: 'xl' 
    }),
    children: [
      'h1', {
        className: 'text-2xl font-bold mb-6 text-center',
        children: 'Login'
      },
      
      'div', {
        className: 'space-y-4',
        children: [
          'div', {
            children: [
              'label', {
                className: 'block text-sm font-medium mb-2',
                children: 'Email'
              },
              'input', {
                type: 'email',
                className: ds.input(),
                placeholder: 'seu@email.com'
              }
            ]
          },
          
          'div', {
            children: [
              'label', {
                className: 'block text-sm font-medium mb-2',
                children: 'Senha'
              },
              'input', {
                type: 'password',
                className: ds.input(),
                placeholder: '••••••••'
              }
            ]
          },
          
          'button', {
            type: 'submit',
            className: cn(
              ds.button({ 
                spacing: 'lg',
                color: 'primary' 
              }),
              'w-full'
            ),
            children: 'Entrar'
          }
        ]
      }
    ]
  };
}
```

Este exemplo completo demonstra como usar a função `cn` para criar um sistema de design robusto e reutilizável, com tokens de design, componentes compostos e máxima flexibilidade de customização.