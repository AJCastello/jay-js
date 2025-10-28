---
category: UI
categoryId: 1
articleId: 5
slug: data-display-components
title: Componentes de Exibição de Dados
description: Componentes para apresentação e visualização de informações, incluindo badge, avatar, card, rating, timeline e indicadores de progresso.
---

# Componentes de Exibição de Dados

Os componentes de exibição de dados são essenciais para apresentar informações de forma clara, organizada e visualmente atraente. Esta categoria inclui componentes que mostram dados estruturados, status, progresso e representações visuais.

## Referência da API

### Badge

Rótulos e marcadores para destacar status, categorias ou informações importantes.

#### Assinatura da Função
```typescript
function Badge<T extends TBaseTagMap = "div">(
  options: IBadge<T>
): HTMLElementTagNameMap[T]
```

#### Parâmetros
| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `variant` | `"badge-outline" \| "badge-dash" \| "badge-soft"` | Variação visual do badge |
| `color` | `"badge-primary" \| "badge-secondary" \| "badge-accent" \| "badge-ghost" \| "badge-info" \| "badge-success" \| "badge-warning" \| "badge-error"` | Cor do badge |
| `size` | `"badge-xl" \| "badge-lg" \| "badge-md" \| "badge-sm" \| "badge-xs"` | Tamanho do badge |

### Avatar

Representação visual de usuários, incluindo estados online/offline.

#### Assinatura da Função
```typescript
function Avatar<T extends TBaseTagMap = "div">(
  options: IAvatar<T>
): HTMLElementTagNameMap[T]
```

#### Parâmetros
| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `state` | `"avatar-online" \| "avatar-offline"` | Estado de presença do usuário |

### Card

Cartões de conteúdo compostos por múltiplos subcomponentes.

#### Componentes Relacionados
- **Card**: Container principal do cartão
- **CardTitle**: Título do cartão
- **CardBody**: Corpo/conteúdo principal
- **CardDescription**: Descrição adicional
- **CardActions**: Área de ações/botões
- **CardFigure**: Área para imagens/mídia

#### Assinatura da Função
```typescript
function Card<T extends TBaseTagMap = "div">(
  options: TCard<T>
): HTMLElementTagNameMap[T]
```

### Rating

Sistema de avaliação com estrelas ou outros elementos visuais.

#### Assinatura da Função
```typescript
function Rating<T extends TBaseTagMap = "div">(
  options: TRating<T>
): HTMLElementTagNameMap[T]
```

### Timeline

Componentes para exibição de eventos cronológicos.

#### Componentes Relacionados
- **Timeline**: Container principal da linha do tempo
- **TimelineItems**: Container para múltiplos itens
- **TimelineItem**: Item individual da timeline

#### Assinatura da Função
```typescript
function Timeline<T extends TBaseTagMap = "ul">(
  options: TTimeline<T>
): HTMLElementTagNameMap[T]
```

### Radial Progress

Indicador de progresso circular.

#### Assinatura da Função
```typescript
function RadialProgress<T extends TBaseTagMap = "div">(
  options: TRadialProgress<T>
): HTMLElementTagNameMap[T]
```

### Indicator

Indicadores visuais de status ou notificações.

#### Componentes Relacionados
- **Indicator**: Container do indicador
- **IndicatorItem**: Item individual dentro do indicador

#### Assinatura da Função
```typescript
function Indicator<T extends TBaseTagMap = "div">(
  options: TIndicator<T>
): HTMLElementTagNameMap[T]
```

## Visão Geral

### Badge - Marcadores e Rótulos
O componente Badge é perfeito para destacar status, categorias, notificações ou qualquer informação que precisa chamar atenção. Oferece várias cores e variações visuais.

**Características principais:**
- Múltiplas variações visuais (outline, dash, soft)
- Paleta completa de cores temáticas
- Diferentes tamanhos (xs a xl)
- Integração com outros componentes

### Avatar - Representação de Usuários
O Avatar fornece uma representação visual consistente para usuários, com suporte a estados de presença online/offline.

**Características principais:**
- Estados de presença integrados
- Flexibilidade para imagens ou iniciais
- Tamanhos variados através de classes CSS
- Integração com sistemas de autenticação

### Card - Cartões de Conteúdo
O sistema Card oferece uma estrutura flexível e composável para apresentar conteúdo organizado. É composto por vários subcomponentes que podem ser combinados conforme necessário.

**Características principais:**
- Arquitetura modular e composável
- Componentes especializados para diferentes tipos de conteúdo
- Suporte a imagens, ações e descrições
- Layout flexível e responsivo

### Rating - Sistema de Avaliações
O componente Rating permite criar sistemas de avaliação interativos ou apenas para exibição.

**Características principais:**
- Suporte a diferentes elementos visuais
- Configuração flexível de escala
- Estados interativos e readonly
- Customização visual completa

### Timeline - Linhas do Tempo
O sistema Timeline é ideal para mostrar eventos cronológicos, histórico de atividades ou fluxos de processo.

**Características principais:**
- Estrutura hierárquica clara
- Suporte a múltiplos itens
- Layout vertical ou horizontal
- Personalização visual completa

### Radial Progress - Indicadores Circulares
O RadialProgress oferece uma forma elegante de mostrar progresso ou estatísticas em formato circular.

**Características principais:**
- Design circular atraente
- Suporte a valores percentuais
- Customização de cores e tamanhos
- Animações suaves

### Indicator - Indicadores Visuais
O sistema Indicator é perfeito para mostrar notificações, badges de status ou destacar elementos específicos.

**Características principais:**
- Container flexível para múltiplos indicadores
- Posicionamento preciso
- Cores e tamanhos variados
- Integração com outros componentes

## Uso Básico

### Badge Simples
```typescript
import { Badge } from '@jay-js/ui';

// Badge básico
const statusBadge = Badge({
  color: 'badge-success',
  children: 'Ativo'
});

// Badge com variação
const outlineBadge = Badge({
  color: 'badge-primary',
  variant: 'badge-outline',
  size: 'badge-lg',
  children: 'Premium'
});
```

### Avatar com Estado
```typescript
import { Avatar } from '@jay-js/ui';

// Avatar com estado online
const userAvatar = Avatar({
  state: 'avatar-online',
  className: 'w-12 h-12 rounded-full',
  children: [
    'img', { 
      src: '/user-photo.jpg', 
      alt: 'Usuário' 
    }
  ]
});
```

### Card Composto
```typescript
import { 
  Card, CardTitle, CardBody, 
  CardDescription, CardActions, CardFigure 
} from '@jay-js/ui';

const productCard = Card({
  className: 'max-w-sm shadow-lg',
  children: [
    CardFigure({
      children: ['img', { 
        src: '/product.jpg', 
        alt: 'Produto' 
      }]
    }),
    CardBody({
      children: [
        CardTitle({
          children: 'Nome do Produto'
        }),
        CardDescription({
          children: 'Descrição detalhada do produto...'
        })
      ]
    }),
    CardActions({
      children: [
        'button', { 
          className: 'btn btn-primary',
          children: 'Comprar'
        }
      ]
    })
  ]
});
```

### Timeline de Eventos
```typescript
import { Timeline, TimelineItems, TimelineItem } from '@jay-js/ui';

const eventTimeline = Timeline({
  children: TimelineItems({
    children: [
      TimelineItem({
        children: [
          'div', { className: 'timeline-start' },
          ['strong', { children: '2024' }]
        ]
      }),
      TimelineItem({
        children: [
          'div', { className: 'timeline-middle' },
          ['div', { className: 'timeline-content' }],
          ['p', { children: 'Evento importante aconteceu' }]
        ]
      })
    ]
  })
});
```

## Casos de Uso Comuns

### Sistema de Status com Badge
```typescript
import { Badge } from '@jay-js/ui';

function StatusIndicator({ status, children }) {
  const colorMap = {
    active: 'badge-success',
    pending: 'badge-warning', 
    inactive: 'badge-error',
    draft: 'badge-ghost'
  };

  return Badge({
    color: colorMap[status] || 'badge-info',
    children
  });
}

// Uso
const userStatus = StatusIndicator({ 
  status: 'active', 
  children: 'Online' 
});
```

### Galeria de Cards de Produtos
```typescript
import { Card, CardTitle, CardBody, CardActions, Badge } from '@jay-js/ui';

function ProductGrid({ products }) {
  return products.map(product => 
    Card({
      className: 'card-compact shadow-lg',
      children: [
        CardBody({
          children: [
            'div', { className: 'flex justify-between items-start' },
            [
              CardTitle({
                children: product.name
              }),
              Badge({
                color: product.featured ? 'badge-primary' : 'badge-ghost',
                children: product.featured ? 'Destaque' : 'Normal'
              })
            ],
            ['p', { children: product.description }],
            ['span', { 
              className: 'text-2xl font-bold',
              children: `R$ ${product.price}`
            }]
          ]
        }),
        CardActions({
          children: [
            'button', {
              className: 'btn btn-primary',
              children: 'Adicionar ao Carrinho'
            }
          ]
        })
      ]
    })
  );
}
```

### Timeline de Atividades do Usuário
```typescript
import { Timeline, TimelineItems, TimelineItem, Avatar, Badge } from '@jay-js/ui';

function ActivityTimeline({ activities }) {
  return Timeline({
    children: TimelineItems({
      children: activities.map((activity, index) => 
        TimelineItem({
          children: [
            'div', { className: 'timeline-start' },
            [
              Avatar({
                className: 'w-8 h-8',
                children: ['img', { 
                  src: activity.user.avatar,
                  alt: activity.user.name 
                }]
              })
            ],
            'div', { className: 'timeline-middle' },
            ['div', { className: 'w-2 h-2 bg-primary rounded-full' }],
            'div', { className: 'timeline-end timeline-box' },
            [
              'div', { className: 'flex justify-between items-center mb-2' },
              [
                'strong', { children: activity.action },
                Badge({
                  size: 'badge-xs',
                  color: 'badge-ghost',
                  children: activity.timestamp
                })
              ],
              'p', { children: activity.description }
            ]
          ]
        })
      )
    })
  });
}
```

### Dashboard com Indicadores
```typescript
import { Indicator, IndicatorItem, RadialProgress, Badge } from '@jay-js/ui';

function DashboardStats({ stats }) {
  return 'div', {
    className: 'grid grid-cols-1 md:grid-cols-3 gap-6',
    children: [
      // Progresso de vendas
      'div', {
        className: 'card bg-base-100 shadow-lg',
        children: [
          'div', { className: 'card-body items-center' },
          [
            RadialProgress({
              className: 'w-32 h-32 text-primary',
              style: { '--value': stats.sales.percentage },
              children: `${stats.sales.percentage}%`
            }),
            'h3', { 
              className: 'card-title',
              children: 'Vendas do Mês' 
            },
            Badge({
              color: 'badge-success',
              children: `+${stats.sales.growth}%`
            })
          ]
        ]
      },

      // Indicadores de notificações
      Indicator({
        className: 'card bg-base-100 shadow-lg',
        children: [
          IndicatorItem({
            className: 'indicator-item indicator-top indicator-end',
            children: Badge({
              color: 'badge-error',
              size: 'badge-sm',
              children: stats.notifications.urgent
            })
          }),
          'div', {
            className: 'card-body',
            children: [
              'h3', { children: 'Notificações' },
              'p', { children: `${stats.notifications.total} não lidas` }
            ]
          }
        ]
      })
    ]
  };
}
```

## Padrões Avançados

### Badge Dinâmico com Estados
```typescript
import { Badge } from '@jay-js/ui';

class StatusBadge {
  static create({ status, count, animated = false }) {
    const config = {
      online: { color: 'badge-success', text: 'Online' },
      busy: { color: 'badge-warning', text: 'Ocupado' },
      away: { color: 'badge-ghost', text: 'Ausente' },
      offline: { color: 'badge-error', text: 'Offline' }
    };

    const statusConfig = config[status] || config.offline;
    
    return Badge({
      color: statusConfig.color,
      className: animated ? 'animate-pulse' : '',
      children: count ? 
        `${statusConfig.text} (${count})` : 
        statusConfig.text
    });
  }
}

// Uso
const onlineBadge = StatusBadge.create({ 
  status: 'online', 
  count: 5,
  animated: true 
});
```

### Sistema de Cards Responsivos
```typescript
import { Card, CardTitle, CardBody, Avatar, Badge } from '@jay-js/ui';

function ResponsiveCardLayout({ items, layout = 'grid' }) {
  const containerClasses = {
    grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
    masonry: 'columns-1 md:columns-2 lg:columns-3 gap-4',
    list: 'flex flex-col gap-4'
  };

  return 'div', {
    className: containerClasses[layout],
    children: items.map(item => 
      Card({
        className: `card shadow-lg break-inside-avoid mb-4 ${
          layout === 'masonry' ? 'w-full' : ''
        }`,
        children: [
          CardBody({
            children: [
              'div', { className: 'flex items-center gap-3 mb-3' },
              [
                Avatar({
                  className: 'w-12 h-12',
                  state: item.user.online ? 'avatar-online' : 'avatar-offline',
                  children: ['img', { 
                    src: item.user.avatar,
                    alt: item.user.name 
                  }]
                }),
                'div', { className: 'flex-grow' },
                [
                  CardTitle({
                    className: 'text-sm font-semibold',
                    children: item.user.name
                  }),
                  Badge({
                    size: 'badge-xs',
                    color: 'badge-ghost',
                    children: item.timestamp
                  })
                ]
              ],
              'p', { children: item.content },
              item.tags && 'div', {
                className: 'flex flex-wrap gap-1 mt-2',
                children: item.tags.map(tag =>
                  Badge({
                    size: 'badge-xs',
                    variant: 'badge-outline',
                    children: tag
                  })
                )
              }
            ]
          })
        ]
      })
    )
  };
}
```

## Melhores Práticas

### 1. Uso Semântico de Cores
```typescript
// Use cores que transmitam significado claro
const alerts = {
  success: Badge({ color: 'badge-success', children: 'Concluído' }),
  warning: Badge({ color: 'badge-warning', children: 'Atenção' }),
  error: Badge({ color: 'badge-error', children: 'Erro' }),
  info: Badge({ color: 'badge-info', children: 'Informação' })
};
```

### 2. Composição de Cards
```typescript
// Mantenha a hierarquia clara nos cards
const wellStructuredCard = Card({
  children: [
    // Mídia primeiro (se houver)
    CardFigure({ /* ... */ }),
    
    // Conteúdo principal
    CardBody({
      children: [
        CardTitle({ /* ... */ }),
        CardDescription({ /* ... */ })
      ]
    }),
    
    // Ações por último
    CardActions({ /* ... */ })
  ]
});
```

### 3. Acessibilidade em Avatars
```typescript
// Sempre inclua texto alternativo apropriado
const accessibleAvatar = Avatar({
  children: ['img', {
    src: user.photo,
    alt: `Foto de perfil de ${user.name}`,
    loading: 'lazy'
  }]
});
```

### 4. Timeline Organizada
```typescript
// Mantenha consistência na estrutura temporal
const organizedTimeline = Timeline({
  children: TimelineItems({
    children: events
      .sort((a, b) => new Date(b.date) - new Date(a.date)) // Mais recente primeiro
      .map(event => TimelineItem({
        children: [
          'div', { 
            className: 'timeline-start text-sm text-gray-500',
            children: formatDate(event.date)
          },
          'div', { className: 'timeline-middle' },
          ['div', { className: 'w-2 h-2 bg-primary rounded-full' }],
          'div', { 
            className: 'timeline-end timeline-box',
            children: event.description
          }
        ]
      }))
  })
});
```

## Exemplo Completo: Dashboard de Usuário

```typescript
import { 
  Card, CardTitle, CardBody, CardDescription, CardActions,
  Avatar, Badge, Timeline, TimelineItems, TimelineItem,
  RadialProgress, Indicator, IndicatorItem
} from '@jay-js/ui';

function UserDashboard({ user, activities, stats }) {
  return 'div', {
    className: 'container mx-auto p-6 space-y-6',
    children: [
      // Cabeçalho do perfil
      Card({
        className: 'shadow-lg bg-gradient-to-r from-primary to-secondary text-primary-content',
        children: CardBody({
          className: 'flex-row items-center gap-4',
          children: [
            Avatar({
              state: user.online ? 'avatar-online' : 'avatar-offline',
              className: 'w-20 h-20',
              children: ['img', { 
                src: user.avatar,
                alt: `Foto de ${user.name}`
              }]
            }),
            'div', { className: 'flex-grow' },
            [
              CardTitle({
                className: 'text-2xl font-bold',
                children: user.name
              }),
              CardDescription({
                className: 'opacity-80',
                children: user.role
              }),
              'div', { className: 'flex gap-2 mt-2' },
              [
                Badge({
                  color: 'badge-ghost',
                  className: 'bg-white bg-opacity-20',
                  children: `${user.level} pontos`
                }),
                Badge({
                  color: 'badge-ghost', 
                  className: 'bg-white bg-opacity-20',
                  children: `${user.streak} dias seguidos`
                })
              ]
            ]
          ]
        })
      }),

      // Grid de estatísticas
      'div', {
        className: 'grid grid-cols-1 md:grid-cols-3 gap-6',
        children: [
          // Progresso geral
          Card({
            className: 'shadow-lg',
            children: CardBody({
              className: 'items-center',
              children: [
                RadialProgress({
                  className: 'w-24 h-24 text-primary mb-4',
                  style: { '--value': stats.completion },
                  children: `${stats.completion}%`
                }),
                CardTitle({
                  className: 'text-center',
                  children: 'Progresso Geral'
                }),
                CardDescription({
                  className: 'text-center',
                  children: `${stats.completed}/${stats.total} tarefas`
                })
              ]
            })
          }),

          // Notificações
          Indicator({
            children: [
              stats.notifications > 0 && IndicatorItem({
                className: 'indicator-item indicator-top indicator-end',
                children: Badge({
                  color: 'badge-error',
                  size: 'badge-sm',
                  children: stats.notifications
                })
              }),
              Card({
                className: 'shadow-lg',
                children: CardBody({
                  children: [
                    CardTitle({ children: 'Notificações' }),
                    CardDescription({
                      children: stats.notifications > 0 ? 
                        `${stats.notifications} mensagens não lidas` :
                        'Tudo em dia!'
                    }),
                    CardActions({
                      children: ['button', {
                        className: 'btn btn-primary btn-sm',
                        children: 'Ver todas'
                      }]
                    })
                  ]
                })
              })
            ]
          }),

          // Conquistas
          Card({
            className: 'shadow-lg',
            children: CardBody({
              children: [
                CardTitle({ children: 'Conquistas' }),
                'div', {
                  className: 'flex flex-wrap gap-2 mt-2',
                  children: user.achievements.map(achievement => 
                    Badge({
                      color: 'badge-accent',
                      variant: 'badge-outline',
                      className: 'text-xs',
                      children: achievement
                    })
                  )
                }
              ]
            })
          })
        ]
      },

      // Timeline de atividades
      Card({
        className: 'shadow-lg',
        children: [
          CardBody({
            children: [
              CardTitle({ children: 'Atividades Recentes' }),
              Timeline({
                children: TimelineItems({
                  children: activities.slice(0, 5).map((activity, index) => 
                    TimelineItem({
                      children: [
                        'div', { 
                          className: 'timeline-start text-sm text-gray-500',
                          children: activity.timestamp
                        },
                        'div', { className: 'timeline-middle' },
                        ['div', { 
                          className: `w-3 h-3 rounded-full ${
                            activity.type === 'success' ? 'bg-success' :
                            activity.type === 'warning' ? 'bg-warning' : 'bg-primary'
                          }`
                        }],
                        'div', {
                          className: 'timeline-end timeline-box',
                          children: [
                            'div', { className: 'flex justify-between items-start' },
                            [
                              'strong', { children: activity.title },
                              Badge({
                                size: 'badge-xs',
                                color: activity.urgent ? 'badge-warning' : 'badge-ghost',
                                children: activity.category
                              })
                            ],
                            'p', { 
                              className: 'text-sm mt-1',
                              children: activity.description 
                            }
                          ]
                        }
                      ]
                    })
                  )
                })
              }),
              activities.length > 5 && CardActions({
                children: ['button', {
                  className: 'btn btn-ghost btn-sm',
                  children: 'Ver todas as atividades'
                }]
              })
            ]
          })
        ]
      })
    ]
  };
}
```

Este exemplo completo demonstra como combinar efetivamente os componentes de exibição de dados para criar uma interface rica e informativa, seguindo as melhores práticas de design e usabilidade.