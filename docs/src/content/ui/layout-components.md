---
category: UI
categoryId: 1
articleId: 3
slug: layout-components
title: Componentes de Layout
description: Componentes para organização e estruturação de conteúdo, incluindo stack, divider, join e footer.
---

# Componentes de Layout

Os componentes de layout são fundamentais para criar interfaces bem organizadas e estruturadas. Eles fornecem as bases para arranjo de elementos, separação de conteúdo e estruturação de páginas.

## Referência da API

### Stack

Componente para organização de elementos em pilhas verticais ou horizontais.

#### Assinatura da Função
```typescript
function Stack<T extends TBaseTagMap = "div">(
  options: TStack<T>
): HTMLElementTagNameMap[T]
```

#### Parâmetros
| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `direction` | `"vertical" \| "horizontal"` | Direção da pilha |
| `gap` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | Espaçamento entre elementos |
| `align` | `"start" \| "center" \| "end" \| "stretch"` | Alinhamento dos elementos |
| `justify` | `"start" \| "center" \| "end" \| "between" \| "around"` | Justificação dos elementos |

### Divider

Componente para criar separadores visuais entre conteúdos.

#### Assinatura da Função
```typescript
function Divider<T extends TBaseTagMap = "hr">(
  options: TDivider<T>
): HTMLElementTagNameMap[T]
```

#### Parâmetros
| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `orientation` | `"horizontal" \| "vertical"` | Orientação do divisor |
| `variant` | `"solid" \| "dashed" \| "dotted"` | Estilo da linha |
| `size` | `"sm" \| "md" \| "lg"` | Espessura do divisor |

### Join

Componente para união de elementos adjacentes, removendo bordas internas.

#### Assinatura da Função
```typescript
function Join<T extends TBaseTagMap = "div">(
  options: TJoin<T>
): HTMLElementTagNameMap[T]
```

#### Parâmetros
| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `orientation` | `"horizontal" \| "vertical"` | Direção da junção |
| `radius` | `"none" \| "sm" \| "md" \| "lg"` | Raio das bordas externas |

### Footer

Componente para rodapés de página e seções.

#### Assinatura da Função
```typescript
function Footer<T extends TBaseTagMap = "footer">(
  options: TFooter<T>
): HTMLElementTagNameMap[T]
```

#### Parâmetros
| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `variant` | `"simple" \| "complex" \| "minimal"` | Variação do footer |
| `centered` | `boolean` | Centralizar conteúdo |

## Visão Geral

### Stack
O componente Stack é usado para organizar elementos em layouts flexíveis, seja em pilhas verticais ou horizontais. É perfeito para criar layouts responsivos sem a complexidade de CSS Grid ou Flexbox manual.

**Características:**
- Layout flexível (vertical/horizontal)
- Controle de espaçamento entre elementos
- Alinhamento e justificação configuráveis
- Responsivo por padrão
- Suporte a elementos heterogêneos

### Divider
Dividers são elementos visuais que separam conteúdo, melhorando a legibilidade e organização da interface. Podem ser usados tanto horizontalmente quanto verticalmente.

**Características:**
- Orientação flexível (horizontal/vertical)
- Múltiplos estilos de linha
- Espessuras configuráveis
- Integração natural com outros componentes
- Suporte a conteúdo customizado

### Join
O componente Join une elementos adjacentes, removendo bordas internas para criar aparência contínua. Ideal para grupos de botões, inputs ou cards relacionados.

**Características:**
- União perfeita de elementos adjacentes
- Preservação de bordas externas
- Orientação configurável
- Raio de borda customizável
- Otimização visual automática

### Footer
Footer fornece estrutura para rodapés de página, com suporte a diferentes layouts e estilos conforme a necessidade do design.

**Características:**
- Múltiplas variações de layout
- Centralização opcional
- Estrutura semântica correta
- Responsividade integrada
- Suporte a conteúdo rico

## Uso Básico

### Stack - Layouts Flexíveis
```typescript
import { Stack } from '@jay-js/ui';

// Stack vertical com espaçamento médio
const verticalStack = Stack({
  direction: 'vertical',
  gap: 'md',
  children: [
    'h2', { children: 'Título' },
    'p', { children: 'Conteúdo principal' },
    'button', { children: 'Ação' }
  ]
});

// Stack horizontal centralizada
const horizontalStack = Stack({
  direction: 'horizontal',
  gap: 'sm',
  align: 'center',
  justify: 'center',
  children: [
    Button({ children: 'Cancelar' }),
    Button({ children: 'Salvar', className: 'btn-primary' })
  ]
});

// Stack responsiva
const responsiveStack = Stack({
  direction: 'vertical',
  gap: 'lg',
  className: 'md:flex-row', // Horizontal em telas médias+
  children: [
    Card({ children: 'Card 1' }),
    Card({ children: 'Card 2' }),
    Card({ children: 'Card 3' })
  ]
});
```

### Divider - Separadores
```typescript
import { Divider } from '@jay-js/ui';

// Divisor horizontal simples
const horizontalDivider = Divider({
  orientation: 'horizontal'
});

// Divisor com texto
const textDivider = Divider({
  orientation: 'horizontal',
  children: 'ou'
});

// Divisor vertical para sidebar
const verticalDivider = Divider({
  orientation: 'vertical',
  size: 'lg',
  className: 'h-full'
});

// Divisor tracejado
const dashedDivider = Divider({
  orientation: 'horizontal',
  variant: 'dashed',
  className: 'my-4'
});
```

### Join - União de Elementos
```typescript
import { Join, Button } from '@jay-js/ui';

// Grupo de botões unidos
const buttonGroup = Join({
  orientation: 'horizontal',
  children: [
    Button({ children: 'Esquerda' }),
    Button({ children: 'Centro' }),
    Button({ children: 'Direita' })
  ]
});

// Inputs unidos para formulário
const addressInputs = Join({
  orientation: 'horizontal',
  children: [
    TextInput({ placeholder: 'CEP' }),
    TextInput({ placeholder: 'Número' }),
    TextInput({ placeholder: 'Complemento' })
  ]
});

// Cards unidos verticalmente
const cardList = Join({
  orientation: 'vertical',
  radius: 'md',
  children: [
    Card({ children: 'Primeiro item' }),
    Card({ children: 'Segundo item' }),
    Card({ children: 'Terceiro item' })
  ]
});
```

### Footer - Rodapés
```typescript
import { Footer, Stack, Divider } from '@jay-js/ui';

// Footer simples
const simpleFooter = Footer({
  variant: 'simple',
  centered: true,
  children: [
    'p', {
      children: '© 2024 Minha Empresa. Todos os direitos reservados.'
    }
  ]
});

// Footer complexo com múltiplas seções
const complexFooter = Footer({
  variant: 'complex',
  children: [
    Stack({
      direction: 'horizontal',
      gap: 'xl',
      justify: 'between',
      className: 'mb-8',
      children: [
        // Coluna 1
        Stack({
          direction: 'vertical',
          gap: 'sm',
          children: [
            'h3', { children: 'Empresa' },
            'a', { href: '/sobre', children: 'Sobre nós' },
            'a', { href: '/contato', children: 'Contato' },
            'a', { href: '/carreiras', children: 'Carreiras' }
          ]
        }),
        
        // Coluna 2
        Stack({
          direction: 'vertical',
          gap: 'sm',
          children: [
            'h3', { children: 'Produtos' },
            'a', { href: '/features', children: 'Funcionalidades' },
            'a', { href: '/pricing', children: 'Preços' },
            'a', { href: '/docs', children: 'Documentação' }
          ]
        }),
        
        // Coluna 3
        Stack({
          direction: 'vertical',
          gap: 'sm',
          children: [
            'h3', { children: 'Suporte' },
            'a', { href: '/help', children: 'Ajuda' },
            'a', { href: '/faq', children: 'FAQ' },
            'a', { href: '/support', children: 'Suporte técnico' }
          ]
        })
      ]
    }),
    
    Divider({ orientation: 'horizontal' }),
    
    Stack({
      direction: 'horizontal',
      justify: 'between',
      align: 'center',
      className: 'mt-4',
      children: [
        'p', { children: '© 2024 Minha Empresa' },
        Stack({
          direction: 'horizontal',
          gap: 'md',
          children: [
            'a', { href: '/privacy', children: 'Privacidade' },
            'a', { href: '/terms', children: 'Termos' },
            'a', { href: '/cookies', children: 'Cookies' }
          ]
        })
      ]
    })
  ]
});
```

## Casos de Uso Comuns

### Layout de Página Principal
```typescript
import { Stack, Divider, Footer } from '@jay-js/ui';

function MainPageLayout() {
  return Stack({
    direction: 'vertical',
    gap: 'xl',
    className: 'min-h-screen',
    children: [
      // Header
      'header',
      {
        className: 'bg-primary text-white p-6',
        children: 'h1', { children: 'Minha Aplicação' }
      },
      
      // Main content
      'main',
      {
        className: 'flex-1 px-6',
        children: Stack({
          direction: 'vertical',
          gap: 'lg',
          children: [
            'section', { children: 'Conteúdo principal' },
            
            Divider({ orientation: 'horizontal' }),
            
            'section', { children: 'Seção adicional' }
          ]
        })
      },
      
      // Footer
      Footer({
        variant: 'simple',
        children: 'p', {
          children: '© 2024 Minha Aplicação'
        }
      })
    ]
  });
}
```

### Grid Responsivo com Stack
```typescript
import { Stack } from '@jay-js/ui';

function ResponsiveGrid({ items }: { items: any[] }) {
  return Stack({
    direction: 'vertical',
    gap: 'md',
    className: 'md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    children: items.map(item => 
      Card({
        key: item.id,
        children: item.content
      })
    )
  });
}
```

### Formulário com Separadores
```typescript
import { Stack, Divider, Join } from '@jay-js/ui';

function ProfileForm() {
  return Stack({
    direction: 'vertical',
    gap: 'lg',
    children: [
      // Informações pessoais
      Stack({
        direction: 'vertical',
        gap: 'sm',
        children: [
          'h3', { children: 'Informações Pessoais' },
          Join({
            orientation: 'horizontal',
            children: [
              TextInput({ placeholder: 'Nome' }),
              TextInput({ placeholder: 'Sobrenome' })
            ]
          }),
          TextInput({ placeholder: 'Email', type: 'email' })
        ]
      }),
      
      Divider({ orientation: 'horizontal' }),
      
      // Endereço
      Stack({
        direction: 'vertical',
        gap: 'sm',
        children: [
          'h3', { children: 'Endereço' },
          TextInput({ placeholder: 'Rua' }),
          Join({
            orientation: 'horizontal',
            children: [
              TextInput({ placeholder: 'Cidade' }),
              TextInput({ placeholder: 'CEP' })
            ]
          })
        ]
      }),
      
      Divider({ orientation: 'horizontal' }),
      
      // Ações
      Stack({
        direction: 'horizontal',
        gap: 'md',
        justify: 'end',
        children: [
          Button({ children: 'Cancelar' }),
          Button({ 
            children: 'Salvar',
            className: 'btn-primary'
          })
        ]
      })
    ]
  });
}
```

## Padrões Avançados

### Layout Flexível com Breakpoints
```typescript
import { Stack } from '@jay-js/ui';

interface FlexLayoutProps {
  children: HTMLElement[];
  breakpoint?: 'sm' | 'md' | 'lg' | 'xl';
}

function FlexLayout({ children, breakpoint = 'md' }: FlexLayoutProps) {
  const responsiveClasses = {
    sm: 'sm:flex-row',
    md: 'md:flex-row',
    lg: 'lg:flex-row',
    xl: 'xl:flex-row'
  };
  
  return Stack({
    direction: 'vertical',
    gap: 'md',
    className: responsiveClasses[breakpoint],
    children
  });
}
```

### Sidebar Layout com Divider
```typescript
import { Stack, Divider } from '@jay-js/ui';

function SidebarLayout({ 
  sidebar, 
  main 
}: { 
  sidebar: HTMLElement; 
  main: HTMLElement;
}) {
  return Stack({
    direction: 'horizontal',
    gap: 'none',
    className: 'h-screen',
    children: [
      // Sidebar
      'aside',
      {
        className: 'w-64 bg-gray-50 p-4',
        children: sidebar
      },
      
      // Divider vertical
      Divider({
        orientation: 'vertical',
        className: 'h-full'
      }),
      
      // Main content
      'main',
      {
        className: 'flex-1 p-6 overflow-auto',
        children: main
      }
    ]
  });
}
```

### Card Grid com Join
```typescript
import { Join, Card } from '@jay-js/ui';

function CardGrid({ cards }: { cards: any[] }) {
  // Agrupa cards em linhas de 3
  const rows = [];
  for (let i = 0; i < cards.length; i += 3) {
    rows.push(cards.slice(i, i + 3));
  }
  
  return Stack({
    direction: 'vertical',
    gap: 'md',
    children: rows.map((row, index) =>
      Join({
        key: index,
        orientation: 'horizontal',
        radius: 'md',
        children: row.map(card =>
          Card({
            key: card.id,
            className: 'flex-1',
            children: card.content
          })
        )
      })
    )
  });
}
```

## Melhores Práticas

### 1. Hierarquia Visual
```typescript
// Use Stack para criar hierarquia clara
const hierarchicalLayout = Stack({
  direction: 'vertical',
  gap: 'xl', // Espaçamento maior entre seções principais
  children: [
    'h1', { children: 'Título Principal' },
    
    Stack({
      direction: 'vertical',
      gap: 'lg', // Espaçamento médio entre subsecções
      children: [
        'h2', { children: 'Subtítulo' },
        
        Stack({
          direction: 'vertical',
          gap: 'md', // Espaçamento menor entre itens relacionados
          children: [
            'p', { children: 'Parágrafo 1' },
            'p', { children: 'Parágrafo 2' }
          ]
        })
      ]
    })
  ]
});
```

### 2. Responsividade
```typescript
// Combine Stack com classes de utilidade para responsividade
const responsiveLayout = Stack({
  direction: 'vertical',
  gap: 'md',
  className: 'w-full md:flex-row md:gap-lg lg:gap-xl',
  children: components
});
```

### 3. Separação Semântica
```typescript
// Use Divider para separação significativa, não apenas visual
const semanticSeparation = Stack({
  direction: 'vertical',
  gap: 'lg',
  children: [
    'section', { children: 'Seção importante' },
    
    Divider({ 
      orientation: 'horizontal',
      'aria-label': 'Separador entre seções' 
    }),
    
    'section', { children: 'Outra seção importante' }
  ]
});
```

### 4. Join para Consistência
```typescript
// Use Join para elementos que devem aparecer como uma unidade
const unifiedControls = Join({
  orientation: 'horizontal',
  children: [
    Button({ children: 'Anterior' }),
    Button({ children: 'Próximo' })
  ]
});
```

## Exemplo Completo

```typescript
import { Stack, Divider, Join, Footer } from '@jay-js/ui';

// Layout completo de página de produto
function ProductPage({ product }: { product: any }) {
  return Stack({
    direction: 'vertical',
    gap: 'none',
    className: 'min-h-screen',
    children: [
      // Header
      'header',
      {
        className: 'bg-white border-b p-6',
        children: Stack({
          direction: 'horizontal',
          justify: 'between',
          align: 'center',
          children: [
            'h1', { children: product.name },
            Join({
              orientation: 'horizontal',
              children: [
                Button({ children: 'Compartilhar' }),
                Button({ 
                  children: 'Favoritar',
                  variant: 'outline' 
                })
              ]
            })
          ]
        })
      },
      
      // Main content
      'main',
      {
        className: 'flex-1 p-6',
        children: Stack({
          direction: 'vertical',
          gap: 'xl',
          children: [
            // Product info
            Stack({
              direction: 'horizontal',
              gap: 'xl',
              className: 'md:flex-row',
              children: [
                'div',
                {
                  className: 'flex-1',
                  children: 'img', {
                    src: product.image,
                    alt: product.name
                  }
                },
                Stack({
                  direction: 'vertical',
                  gap: 'lg',
                  className: 'flex-1',
                  children: [
                    'h2', { children: product.description },
                    'p', { 
                      className: 'text-2xl font-bold',
                      children: product.price 
                    },
                    Join({
                      orientation: 'horizontal',
                      children: [
                        Button({ 
                          children: 'Adicionar ao Carrinho',
                          className: 'btn-primary flex-1'
                        }),
                        Button({ 
                          children: 'Comprar Agora',
                          className: 'btn-secondary flex-1'
                        })
                      ]
                    })
                  ]
                })
              ]
            }),
            
            Divider({ orientation: 'horizontal' }),
            
            // Product details
            Stack({
              direction: 'vertical',
              gap: 'lg',
              children: [
                'h3', { children: 'Detalhes do Produto' },
                'p', { children: product.details }
              ]
            }),
            
            Divider({ orientation: 'horizontal' }),
            
            // Reviews section
            Stack({
              direction: 'vertical',
              gap: 'lg',
              children: [
                'h3', { children: 'Avaliações' },
                // Reviews content here
              ]
            })
          ]
        })
      },
      
      // Footer
      Footer({
        variant: 'simple',
        centered: true,
        children: [
          'p', {
            children: '© 2024 Loja Virtual. Todos os direitos reservados.'
          }
        ]
      })
    ]
  });
}
```