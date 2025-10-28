---
category: UI
categoryId: 1
articleId: 8
slug: specialized-components
title: Componentes Especializados
description: Componentes para casos de uso específicos, incluindo chat, diff, kbd, resizable splitter e outras funcionalidades especializadas.
---

# Componentes Especializados

Os componentes especializados atendem a necessidades específicas e casos de uso avançados. Esta categoria inclui componentes únicos que oferecem funcionalidades complexas para situações particulares, como sistemas de chat, comparação de código, representação de teclas e divisores redimensionáveis.

## Referência da API

### Chat

Sistema de mensagens completo com componentes para conversa e mensagens individuais.

#### Componentes Relacionados
- **Chat**: Container principal do sistema de chat
- **ChatComponent**: Componente individual de mensagem

#### Assinatura da Função
```typescript
function Chat<T extends TBaseTagMap = "div">(
  options: TChat<T>
): HTMLElementTagNameMap[T]

function ChatComponent<T extends TBaseTagMap = "div">(
  options: TChatComponent<T>
): HTMLElementTagNameMap[T]
```

### Diff

Componentes para comparação e visualização de diferenças em código ou texto.

#### Componentes Relacionados
- **Diff**: Container principal para comparação
- **DiffItem**: Item individual de diferença
- **DiffResizer**: Controle de redimensionamento para visualizações lado a lado

#### Assinatura da Função
```typescript
function Diff<T extends TBaseTagMap = "div">(
  options: TDiff<T>
): HTMLElementTagNameMap[T]

function DiffItem<T extends TBaseTagMap = "div">(
  options: TDiffItem<T>
): HTMLElementTagNameMap[T]

function DiffResizer<T extends TBaseTagMap = "div">(
  options: TDiffResizer<T>
): HTMLElementTagNameMap[T]
```

### KBD

Representação visual de teclas do teclado para documentação e interfaces.

#### Assinatura da Função
```typescript
function KBD<T extends TBaseTagMap = "kbd">(
  options: TKBD<T>
): HTMLElementTagNameMap[T]
```

### Resizable Splitter

Divisor redimensionável para criar layouts ajustáveis pelo usuário.

#### Assinatura da Função
```typescript
function ResizableSplitter<T extends TBaseTagMap = "div">(
  options: TResizableSplitter<T>
): HTMLElementTagNameMap[T]
```

## Visão Geral

### Chat - Sistema de Mensagens
O sistema Chat oferece uma solução completa para implementar interfaces de conversação, incluindo mensagens individuais e o container principal da conversa.

**Características principais:**
- Componentes modulares para diferentes tipos de mensagem
- Suporte a timestamps e identificação de usuários
- Layout flexível para diferentes designs de chat
- Integração com sistemas de tempo real

### Diff - Comparação Visual
Os componentes Diff permitem criar visualizações de comparação de código, texto ou qualquer conteúdo que precise mostrar diferenças entre versões.

**Características principais:**
- Visualização lado a lado ou unified
- Destaque de adições, remoções e modificações
- Controles de redimensionamento integrados
- Suporte a syntax highlighting

### KBD - Representação de Teclas
O componente KBD fornece uma representação visual consistente para teclas do teclado, atalhos e comandos.

**Características principais:**
- Design padronizado para teclas
- Suporte a combinações de teclas
- Integração com documentação
- Estilos consistentes multiplataforma

### Resizable Splitter - Divisores Ajustáveis
O ResizableSplitter permite criar interfaces com painéis redimensionáveis pelo usuário, ideal para editores, dashboards e layouts complexos.

**Características principais:**
- Redimensionamento horizontal e vertical
- Limites mínimo e máximo configuráveis
- Persistência de estado opcional
- Feedback visual durante redimensionamento

## Uso Básico

### Chat Simples
```typescript
import { Chat, ChatComponent } from '@jay-js/ui';

// Container de chat
const chatContainer = Chat({
  className: 'h-96 overflow-y-auto p-4 bg-base-100',
  children: [
    // Mensagem do outro usuário
    ChatComponent({
      className: 'chat chat-start',
      children: [
        'div', { className: 'chat-image avatar' },
        ['div', {
          className: 'w-10 rounded-full',
          children: ['img', { 
            src: '/user1.jpg',
            alt: 'Usuário 1' 
          }]
        }],
        'div', { 
          className: 'chat-header',
          children: [
            'span', { children: 'João' },
            'time', { 
              className: 'text-xs opacity-50 ml-2',
              children: '12:45' 
            }
          ]
        },
        'div', { 
          className: 'chat-bubble',
          children: 'Olá! Como você está?' 
        }
      ]
    }),

    // Mensagem do usuário atual
    ChatComponent({
      className: 'chat chat-end',
      children: [
        'div', { className: 'chat-image avatar' },
        ['div', {
          className: 'w-10 rounded-full',
          children: ['img', { 
            src: '/user2.jpg',
            alt: 'Você' 
          }]
        }],
        'div', { 
          className: 'chat-header',
          children: [
            'span', { children: 'Você' },
            'time', { 
              className: 'text-xs opacity-50 ml-2',
              children: '12:46' 
            }
          ]
        },
        'div', { 
          className: 'chat-bubble chat-bubble-primary',
          children: 'Oi João! Tudo bem, obrigado!' 
        }
      ]
    })
  ]
});
```

### Diff de Código
```typescript
import { Diff, DiffItem, DiffResizer } from '@jay-js/ui';

// Comparação lado a lado
const codeDiff = Diff({
  className: 'h-96 border rounded-lg overflow-hidden',
  children: [
    'div', { className: 'flex h-full' },
    [
      // Lado esquerdo (original)
      'div', { className: 'flex-1 bg-red-50' },
      [
        'div', { className: 'bg-red-100 px-4 py-2 text-sm font-medium' },
        ['span', { children: 'Original (arquivo.js)' }],
        
        'div', { className: 'p-4 font-mono text-sm' },
        [
          DiffItem({
            className: 'block py-1',
            children: [
              'span', { className: 'text-red-600 mr-2' },
              ['-'],
              'span', { children: 'function oldFunction() {' }
            ]
          }),
          DiffItem({
            className: 'block py-1',
            children: [
              'span', { className: 'text-red-600 mr-2' },
              ['-'],
              'span', { children: '  return "old logic";' }
            ]
          }),
          DiffItem({
            className: 'block py-1',
            children: [
              'span', { className: 'text-red-600 mr-2' },
              ['-'],
              'span', { children: '}' }
            ]
          })
        ]
      ],

      // Divisor redimensionável
      DiffResizer({
        className: 'w-1 bg-gray-300 hover:bg-gray-400 cursor-col-resize'
      }),

      // Lado direito (modificado)
      'div', { className: 'flex-1 bg-green-50' },
      [
        'div', { className: 'bg-green-100 px-4 py-2 text-sm font-medium' },
        ['span', { children: 'Modificado (arquivo.js)' }],
        
        'div', { className: 'p-4 font-mono text-sm' },
        [
          DiffItem({
            className: 'block py-1',
            children: [
              'span', { className: 'text-green-600 mr-2' },
              ['+'],
              'span', { children: 'function newFunction() {' }
            ]
          }),
          DiffItem({
            className: 'block py-1',
            children: [
              'span', { className: 'text-green-600 mr-2' },
              ['+'],
              'span', { children: '  return "improved logic";' }
            ]
          }),
          DiffItem({
            className: 'block py-1',
            children: [
              'span', { className: 'text-green-600 mr-2' },
              ['+'],
              'span', { children: '}' }
            ]
          })
        ]
      ]
    ]
  ]
});
```

### Atalhos de Teclado
```typescript
import { KBD } from '@jay-js/ui';

// Atalho simples
const saveShortcut = 'div', {
  className: 'flex items-center gap-2',
  children: [
    'span', { children: 'Para salvar, pressione' },
    KBD({ children: 'Ctrl' }),
    'span', { children: '+' },
    KBD({ children: 'S' })
  ]
};

// Múltiplos atalhos
const shortcuts = 'div', {
  className: 'space-y-2',
  children: [
    'div', { className: 'flex justify-between items-center' },
    [
      'span', { children: 'Copiar' },
      'div', { className: 'flex items-center gap-1' },
      [
        KBD({ children: 'Ctrl' }),
        'span', { children: '+' },
        KBD({ children: 'C' })
      ]
    ],
    
    'div', { className: 'flex justify-between items-center' },
    [
      'span', { children: 'Colar' },
      'div', { className: 'flex items-center gap-1' },
      [
        KBD({ children: 'Ctrl' }),
        'span', { children: '+' },
        KBD({ children: 'V' })
      ]
    ],
    
    'div', { className: 'flex justify-between items-center' },
    [
      'span', { children: 'Desfazer' },
      'div', { className: 'flex items-center gap-1' },
      [
        KBD({ children: 'Ctrl' }),
        'span', { children: '+' },
        KBD({ children: 'Z' })
      ]
    ]
  ]
};
```

### Layout com Splitter
```typescript
import { ResizableSplitter } from '@jay-js/ui';

// Layout com painel lateral
const resizableLayout = 'div', {
  className: 'h-screen flex',
  children: [
    // Sidebar
    'div', {
      id: 'sidebar',
      className: 'w-64 bg-base-200 p-4',
      style: { minWidth: '200px', maxWidth: '400px' },
      children: [
        'h3', { 
          className: 'font-bold mb-4',
          children: 'Navegação' 
        },
        'ul', {
          className: 'menu',
          children: [
            'li', { children: ['a', { children: 'Dashboard' }] },
            'li', { children: ['a', { children: 'Relatórios' }] },
            'li', { children: ['a', { children: 'Configurações' }] }
          ]
        }
      ]
    },

    // Splitter
    ResizableSplitter({
      className: 'w-1 bg-base-300 hover:bg-primary cursor-col-resize',
      onResize: (newWidth) => {
        const sidebar = document.getElementById('sidebar');
        const content = document.getElementById('main-content');
        
        if (sidebar && content) {
          sidebar.style.width = `${newWidth}px`;
          content.style.width = `calc(100% - ${newWidth}px)`;
        }
      }
    }),

    // Conteúdo principal
    'div', {
      id: 'main-content',
      className: 'flex-1 p-6',
      children: [
        'h1', { 
          className: 'text-2xl font-bold mb-4',
          children: 'Conteúdo Principal' 
        },
        'p', { 
          children: 'Arraste o divisor para redimensionar o painel lateral.' 
        }
      ]
    }
  ]
};
```

## Casos de Uso Comuns

### Sistema de Chat em Tempo Real
```typescript
import { Chat, ChatComponent } from '@jay-js/ui';

function RealTimeChat({ messages, currentUser, onSendMessage }) {
  const renderMessage = (message) => {
    const isCurrentUser = message.userId === currentUser.id;
    
    return ChatComponent({
      key: message.id,
      className: `chat ${isCurrentUser ? 'chat-end' : 'chat-start'}`,
      children: [
        'div', { className: 'chat-image avatar' },
        ['div', {
          className: 'w-10 rounded-full',
          children: ['img', { 
            src: message.user.avatar || '/default-avatar.jpg',
            alt: message.user.name 
          }]
        }],
        
        'div', { className: 'chat-header' },
        [
          'span', { children: message.user.name },
          'time', { 
            className: 'text-xs opacity-50 ml-2',
            children: formatTime(message.timestamp)
          }
        ],
        
        'div', { 
          className: `chat-bubble ${
            isCurrentUser ? 'chat-bubble-primary' : ''
          } ${message.type === 'system' ? 'chat-bubble-info' : ''}`,
          children: message.content
        },
        
        message.status && 'div', {
          className: 'chat-footer opacity-50 text-xs mt-1',
          children: message.status === 'sent' ? '✓' : 
                   message.status === 'delivered' ? '✓✓' : 
                   message.status === 'read' ? '✓✓' : ''
        }
      ]
    });
  };

  return 'div', {
    className: 'flex flex-col h-96 border rounded-lg',
    children: [
      // Header do chat
      'div', { className: 'bg-primary text-primary-content p-3' },
      ['h3', { 
        className: 'font-semibold',
        children: 'Chat da Equipe' 
      }],

      // Container de mensagens
      Chat({
        id: 'chat-messages',
        className: 'flex-1 p-4 overflow-y-auto space-y-2',
        children: messages.map(renderMessage)
      }),

      // Input de nova mensagem
      'div', { className: 'p-3 border-t' },
      ['div', { className: 'flex gap-2' },
      [
        'input', {
          type: 'text',
          placeholder: 'Digite sua mensagem...',
          className: 'input input-bordered flex-1',
          onKeyPress: (e) => {
            if (e.key === 'Enter' && e.target.value.trim()) {
              onSendMessage(e.target.value);
              e.target.value = '';
            }
          }
        },
        'button', {
          className: 'btn btn-primary',
          onClick: () => {
            const input = document.querySelector('#chat-messages').previousElementSibling.querySelector('input');
            if (input.value.trim()) {
              onSendMessage(input.value);
              input.value = '';
            }
          },
          children: '📤'
        }
      ]]
    ]
  };
}

function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
}
```

### Editor de Código com Diff
```typescript
import { Diff, DiffItem, DiffResizer } from '@jay-js/ui';

function CodeEditor({ originalCode, modifiedCode, language = 'javascript' }) {
  const generateDiff = (original, modified) => {
    const originalLines = original.split('\n');
    const modifiedLines = modified.split('\n');
    
    // Algoritmo simples de diff (seria melhor usar uma lib como diff)
    const maxLength = Math.max(originalLines.length, modifiedLines.length);
    const diffData = [];
    
    for (let i = 0; i < maxLength; i++) {
      const originalLine = originalLines[i] || '';
      const modifiedLine = modifiedLines[i] || '';
      
      if (originalLine === modifiedLine) {
        diffData.push({ type: 'unchanged', original: originalLine, modified: modifiedLine, line: i + 1 });
      } else if (!originalLine) {
        diffData.push({ type: 'added', modified: modifiedLine, line: i + 1 });
      } else if (!modifiedLine) {
        diffData.push({ type: 'removed', original: originalLine, line: i + 1 });
      } else {
        diffData.push({ type: 'changed', original: originalLine, modified: modifiedLine, line: i + 1 });
      }
    }
    
    return diffData;
  };

  const diffData = generateDiff(originalCode, modifiedCode);

  const renderDiffLine = (line, side) => {
    const content = side === 'original' ? line.original : line.modified;
    const lineNumber = line.line;
    
    if (!content && line.type !== 'unchanged') return null;

    const bgClass = 
      line.type === 'added' ? 'bg-green-100' :
      line.type === 'removed' ? 'bg-red-100' :
      line.type === 'changed' ? (side === 'original' ? 'bg-red-100' : 'bg-green-100') :
      '';

    const textClass = 
      line.type === 'added' ? 'text-green-800' :
      line.type === 'removed' ? 'text-red-800' :
      line.type === 'changed' ? (side === 'original' ? 'text-red-800' : 'text-green-800') :
      '';

    const prefix = 
      line.type === 'added' && side === 'modified' ? '+' :
      line.type === 'removed' && side === 'original' ? '-' :
      line.type === 'changed' ? (side === 'original' ? '-' : '+') :
      ' ';

    return DiffItem({
      className: `flex ${bgClass} ${textClass}`,
      children: [
        'span', { 
          className: 'w-12 text-right pr-4 text-gray-500 select-none border-r',
          children: lineNumber 
        },
        'span', { 
          className: 'w-4 text-center select-none',
          children: prefix 
        },
        'pre', { 
          className: 'flex-1 font-mono text-sm px-2',
          children: content || ' '
        }
      ]
    });
  };

  return Diff({
    className: 'border rounded-lg overflow-hidden h-96',
    children: [
      // Cabeçalho
      'div', { className: 'bg-base-200 px-4 py-2 border-b' },
      ['div', { className: 'flex justify-between items-center' },
      [
        'h3', { 
          className: 'font-medium',
          children: `Comparação de Código (${language})` 
        },
        'div', { className: 'flex gap-2 text-sm' },
        [
          'span', { 
            className: 'bg-red-100 text-red-800 px-2 py-1 rounded',
            children: `${diffData.filter(l => l.type === 'removed' || l.type === 'changed').length} removidas`
          },
          'span', { 
            className: 'bg-green-100 text-green-800 px-2 py-1 rounded',
            children: `${diffData.filter(l => l.type === 'added' || l.type === 'changed').length} adicionadas`
          }
        ]
      ]],

      // Conteúdo do diff
      'div', { className: 'flex h-full' },
      [
        // Lado original
        'div', { className: 'flex-1 overflow-auto' },
        [
          'div', { className: 'bg-red-50 px-4 py-2 text-sm font-medium sticky top-0' },
          ['span', { children: 'Original' }],
          'div', { className: 'divide-y' },
          diffData.map(line => renderDiffLine(line, 'original')).filter(Boolean)
        ],

        // Divisor
        DiffResizer({
          className: 'w-px bg-gray-300'
        }),

        // Lado modificado
        'div', { className: 'flex-1 overflow-auto' },
        [
          'div', { className: 'bg-green-50 px-4 py-2 text-sm font-medium sticky top-0' },
          ['span', { children: 'Modificado' }],
          'div', { className: 'divide-y' },
          diffData.map(line => renderDiffLine(line, 'modified')).filter(Boolean)
        ]
      ]
    ]
  });
}
```

### Documentação de Atalhos
```typescript
import { KBD } from '@jay-js/ui';

function ShortcutDocumentation({ shortcuts }) {
  const renderShortcut = (shortcut) => {
    const keys = shortcut.keys.split('+').map(key => key.trim());
    
    return 'div', {
      key: shortcut.id,
      className: 'flex justify-between items-center p-3 border-b last:border-b-0 hover:bg-base-50',
      children: [
        'div', {
          children: [
            'div', { 
              className: 'font-medium',
              children: shortcut.action 
            },
            shortcut.description && 'div', { 
              className: 'text-sm text-gray-600',
              children: shortcut.description 
            }
          ]
        },
        'div', { 
          className: 'flex items-center gap-1',
          children: keys.flatMap((key, index) => [
            KBD({ 
              className: 'kbd kbd-sm',
              children: key 
            }),
            ...(index < keys.length - 1 ? [
              'span', { 
                className: 'text-gray-400 mx-1',
                children: '+' 
              }
            ] : [])
          ])
        }
      ]
    };
  };

  const groupedShortcuts = shortcuts.reduce((acc, shortcut) => {
    const category = shortcut.category || 'Geral';
    if (!acc[category]) acc[category] = [];
    acc[category].push(shortcut);
    return acc;
  }, {});

  return 'div', {
    className: 'max-w-2xl mx-auto',
    children: Object.entries(groupedShortcuts).map(([category, categoryShortcuts]) => 
      'div', {
        key: category,
        className: 'mb-6',
        children: [
          'h3', { 
            className: 'text-lg font-semibold mb-3 text-primary',
            children: category 
          },
          'div', { 
            className: 'bg-base-100 rounded-lg border divide-y',
            children: categoryShortcuts.map(renderShortcut)
          }
        ]
      }
    )
  };
}

// Exemplo de uso
const appShortcuts = ShortcutDocumentation({
  shortcuts: [
    {
      id: 1,
      category: 'Navegação',
      action: 'Ir para Dashboard',
      description: 'Navega para a página principal',
      keys: 'Ctrl + H'
    },
    {
      id: 2,
      category: 'Navegação',
      action: 'Buscar',
      description: 'Abre a barra de pesquisa',
      keys: 'Ctrl + K'
    },
    {
      id: 3,
      category: 'Edição',
      action: 'Salvar',
      description: 'Salva o documento atual',
      keys: 'Ctrl + S'
    },
    {
      id: 4,
      category: 'Edição',
      action: 'Desfazer',
      description: 'Desfaz a última ação',
      keys: 'Ctrl + Z'
    },
    {
      id: 5,
      category: 'Edição',
      action: 'Refazer',
      description: 'Refaz a última ação desfeita',
      keys: 'Ctrl + Shift + Z'
    }
  ]
});
```

## Padrões Avançados

### Chat com Funcionalidades Avançadas
```typescript
import { Chat, ChatComponent } from '@jay-js/ui';

class AdvancedChat {
  static create({ 
    messages = [], 
    currentUser, 
    onSendMessage,
    onReaction,
    onReply,
    enableReactions = true,
    enableReplies = true 
  }) {
    const renderMessage = (message, isReply = false) => {
      const isCurrentUser = message.userId === currentUser.id;
      
      return ChatComponent({
        className: `chat ${isCurrentUser ? 'chat-end' : 'chat-start'} ${isReply ? 'ml-8' : ''}`,
        children: [
          !isReply && 'div', { className: 'chat-image avatar' },
          !isReply && ['div', {
            className: 'w-10 rounded-full',
            children: ['img', { 
              src: message.user.avatar,
              alt: message.user.name 
            }]
          }],
          
          'div', { className: 'chat-header' },
          [
            'span', { children: message.user.name },
            'time', { 
              className: 'text-xs opacity-50 ml-2',
              children: new Date(message.timestamp).toLocaleTimeString()
            }
          ],

          // Mensagem de resposta (se for reply)
          message.replyTo && 'div', {
            className: 'chat-bubble-secondary text-xs mb-1 p-2 rounded opacity-70',
            children: [
              'div', { 
                className: 'font-semibold',
                children: message.replyTo.user.name 
              },
              'div', { 
                children: message.replyTo.content.slice(0, 100) + 
                         (message.replyTo.content.length > 100 ? '...' : '')
              }
            ]
          },
          
          'div', { 
            className: `chat-bubble ${isCurrentUser ? 'chat-bubble-primary' : ''}`,
            children: [
              // Conteúdo da mensagem
              message.type === 'text' ? message.content :
              message.type === 'image' ? ['img', { 
                src: message.content,
                className: 'max-w-xs rounded',
                alt: 'Imagem enviada'
              }] :
              message.type === 'file' ? 'div', {
                className: 'flex items-center gap-2 p-2 bg-base-200 rounded',
                children: [
                  '📎',
                  'span', { children: message.fileName },
                  'button', { 
                    className: 'btn btn-xs btn-ghost',
                    children: 'Download' 
                  }
                ]
              } : message.content,

              // Reações
              message.reactions && message.reactions.length > 0 && 'div', {
                className: 'flex gap-1 mt-2',
                children: message.reactions.map(reaction => 
                  'button', {
                    key: reaction.emoji,
                    className: `btn btn-xs ${
                      reaction.users.includes(currentUser.id) ? 'btn-primary' : 'btn-ghost'
                    }`,
                    onClick: () => onReaction?.(message.id, reaction.emoji),
                    children: `${reaction.emoji} ${reaction.count}`
                  }
                )
              }
            ]
          },

          // Controles de ação
          'div', { className: 'chat-footer flex gap-1 mt-1' },
          [
            enableReactions && 'button', {
              className: 'btn btn-xs btn-ghost',
              onClick: () => showReactionPicker(message.id),
              children: '👍'
            },
            enableReplies && 'button', {
              className: 'btn btn-xs btn-ghost',
              onClick: () => onReply?.(message),
              children: '💬'
            },
            message.status && 'span', {
              className: 'text-xs opacity-50',
              children: message.status === 'sent' ? '✓' : 
                       message.status === 'delivered' ? '✓✓' : 
                       message.status === 'read' ? '✓✓' : ''
            }
          ],

          // Respostas aninhadas
          message.replies && message.replies.length > 0 && 'div', {
            className: 'mt-2 space-y-1',
            children: message.replies.map(reply => renderMessage(reply, true))
          }
        ]
      });
    };

    return Chat({
      className: 'space-y-2',
      children: messages.map(message => renderMessage(message))
    });
  }
}

function showReactionPicker(messageId) {
  // Implementação do seletor de reações
  const reactions = ['👍', '❤️', '😂', '😮', '😢', '😡'];
  // Mostrar picker de reações...
}
```

### Splitter Multi-Painéis
```typescript
import { ResizableSplitter } from '@jay-js/ui';

class MultiPaneSplitter {
  static create({ panes, orientation = 'horizontal', minSizes = [] }) {
    const totalPanes = panes.length;
    const splitters = totalPanes - 1;
    
    let sizes = panes.map(pane => pane.defaultSize || 100 / totalPanes);
    
    const createSplitter = (index) => {
      return ResizableSplitter({
        className: `splitter ${orientation === 'horizontal' ? 'w-1 cursor-col-resize' : 'h-1 cursor-row-resize'} bg-base-300 hover:bg-primary`,
        onResize: (delta) => {
          const minSize = minSizes[index] || 10;
          const maxSize = 100 - minSize;
          
          // Ajusta os tamanhos dos painéis adjacentes
          const leftSize = Math.max(minSize, Math.min(maxSize, sizes[index] + delta));
          const rightSize = Math.max(minSize, Math.min(maxSize, sizes[index + 1] - delta));
          
          sizes[index] = leftSize;
          sizes[index + 1] = rightSize;
          
          // Atualiza os elementos visuais
          updatePaneSizes();
        }
      });
    };

    const updatePaneSizes = () => {
      sizes.forEach((size, index) => {
        const paneElement = document.getElementById(`pane-${index}`);
        if (paneElement) {
          if (orientation === 'horizontal') {
            paneElement.style.width = `${size}%`;
          } else {
            paneElement.style.height = `${size}%`;
          }
        }
      });
    };

    const elements = [];
    
    panes.forEach((pane, index) => {
      // Adiciona o painel
      elements.push('div', {
        id: `pane-${index}`,
        className: `pane ${pane.className || ''} ${orientation === 'horizontal' ? 'h-full' : 'w-full'}`,
        style: orientation === 'horizontal' ? 
          { width: `${sizes[index]}%` } : 
          { height: `${sizes[index]}%` },
        children: pane.content
      });
      
      // Adiciona splitter (exceto após o último painel)
      if (index < totalPanes - 1) {
        elements.push(createSplitter(index));
      }
    });

    return 'div', {
      className: `multi-pane-splitter ${orientation === 'horizontal' ? 'flex h-full' : 'flex flex-col w-full'}`,
      children: elements
    };
  }
}

// Uso
const codeEditor = MultiPaneSplitter.create({
  orientation: 'horizontal',
  minSizes: [200, 300, 200],
  panes: [
    {
      defaultSize: 20,
      className: 'bg-base-200 p-4',
      content: [
        'h3', { 
          className: 'font-bold mb-4',
          children: 'Explorer' 
        },
        'div', { 
          className: 'text-sm',
          children: 'Arquivos do projeto...' 
        }
      ]
    },
    {
      defaultSize: 60,
      className: 'bg-base-100 p-4',
      content: [
        'h3', { 
          className: 'font-bold mb-4',
          children: 'Editor' 
        },
        'textarea', { 
          className: 'textarea textarea-bordered w-full h-64',
          placeholder: 'Código aqui...'
        }
      ]
    },
    {
      defaultSize: 20,
      className: 'bg-base-200 p-4',
      content: [
        'h3', { 
          className: 'font-bold mb-4',
          children: 'Console' 
        },
        'div', { 
          className: 'text-sm font-mono',
          children: 'Output do console...' 
        }
      ]
    }
  ]
});
```

## Melhores Práticas

### 1. Performance em Chats
```typescript
// Use virtualização para muitas mensagens
class VirtualizedChat {
  static create({ messages, visibleCount = 50 }) {
    // Implementar virtualização para performance
    const visibleMessages = messages.slice(-visibleCount);
    
    return Chat({
      className: 'h-96 overflow-y-auto',
      children: visibleMessages.map(message => /* render message */)
    });
  }
}
```

### 2. Acessibilidade em Diffs
```typescript
// Adicione labels ARIA apropriados
const accessibleDiff = Diff({
  'aria-label': 'Comparação de código',
  role: 'region',
  children: [/* conteúdo do diff */]
});
```

### 3. Persistência de Estado em Splitters
```typescript
// Salve e restaure tamanhos dos painéis
const persistentSplitter = ResizableSplitter({
  onResize: (newSize) => {
    localStorage.setItem('splitter-size', newSize.toString());
  },
  defaultSize: parseInt(localStorage.getItem('splitter-size') || '300')
});
```

### 4. Semântica em KBD
```typescript
// Use elementos semânticamente corretos
const semanticShortcut = 'p', {
  children: [
    'Para salvar, pressione ',
    KBD({ children: 'Ctrl' }),
    ' + ',
    KBD({ children: 'S' })
  ]
};
```

## Exemplo Completo: IDE Simplificado

```typescript
import { 
  Chat, ChatComponent, Diff, DiffItem, DiffResizer,
  KBD, ResizableSplitter 
} from '@jay-js/ui';

function SimpleIDE({ 
  files = [], 
  currentFile = null, 
  onFileSelect,
  onCodeChange,
  chatMessages = [],
  onSendChatMessage 
}) {
  const renderFileTree = () => 'div', {
    className: 'p-4',
    children: [
      'h3', { 
        className: 'font-bold mb-3 flex items-center gap-2',
        children: ['📁', 'Arquivos']
      },
      'ul', {
        className: 'space-y-1',
        children: files.map(file => 
          'li', {
            key: file.id,
            children: ['button', {
              className: `w-full text-left px-2 py-1 rounded text-sm ${
                currentFile?.id === file.id ? 'bg-primary text-primary-content' : 'hover:bg-base-200'
              }`,
              onClick: () => onFileSelect(file),
              children: ['🌷', file.name]
            }]
          }
        )
      }
    ]
  };

  const renderEditor = () => 'div', {
    className: 'flex flex-col h-full',
    children: [
      // Toolbar
      'div', { className: 'bg-base-200 p-2 border-b flex justify-between items-center' },
      [
        'div', { className: 'flex items-center gap-4' },
        [
          currentFile && 'span', { 
            className: 'font-medium',
            children: currentFile.name 
          },
          currentFile?.modified && 'span', { 
            className: 'text-warning text-sm',
            children: '● Modificado' 
          }
        ],
        'div', { className: 'flex items-center gap-2 text-xs' },
        [
          'span', { children: 'Salvar:' },
          KBD({ className: 'kbd-xs', children: 'Ctrl' }),
          '+',
          KBD({ className: 'kbd-xs', children: 'S' })
        ]
      ],

      // Editor de código
      'div', { className: 'flex-1 p-4' },
      [
        currentFile ? 'textarea', {
          className: 'textarea textarea-bordered w-full h-full font-mono text-sm',
          value: currentFile.content || '',
          placeholder: 'Comece a digitar...',
          onInput: (e) => onCodeChange(currentFile.id, e.target.value),
          onKeyDown: (e) => {
            if (e.ctrlKey && e.key === 's') {
              e.preventDefault();
              // Salvar arquivo
              console.log('Salvando arquivo...');
            }
          }
        } : 'div', {
          className: 'flex items-center justify-center h-full text-gray-500',
          children: 'Selecione um arquivo para editar'
        }
      ]
    ]
  };

  const renderChat = () => 'div', {
    className: 'flex flex-col h-full',
    children: [
      'div', { className: 'bg-base-200 p-3 border-b' },
      ['h3', { 
        className: 'font-bold flex items-center gap-2',
        children: ['💬', 'Chat da Equipe'] 
      }],

      Chat({
        className: 'flex-1 p-3 overflow-y-auto space-y-2',
        children: chatMessages.map(message => 
          ChatComponent({
            key: message.id,
            className: `chat ${message.userId === 'current' ? 'chat-end' : 'chat-start'}`,
            children: [
              'div', { className: 'chat-header text-xs' },
              [
                'span', { children: message.user },
                'time', { 
                  className: 'ml-2 opacity-50',
                  children: new Date(message.timestamp).toLocaleTimeString()
                }
              ],
              'div', { 
                className: `chat-bubble ${
                  message.userId === 'current' ? 'chat-bubble-primary' : ''
                } text-sm`,
                children: message.content
              }
            ]
          })
        )
      }),

      'div', { className: 'p-3 border-t' },
      ['div', { className: 'flex gap-2' },
      [
        'input', {
          type: 'text',
          placeholder: 'Digite uma mensagem...',
          className: 'input input-bordered input-sm flex-1',
          onKeyPress: (e) => {
            if (e.key === 'Enter' && e.target.value.trim()) {
              onSendChatMessage(e.target.value);
              e.target.value = '';
            }
          }
        },
        'button', {
          className: 'btn btn-primary btn-sm',
          children: '📤'
        }
      ]]
    ]
  };

  return 'div', {
    className: 'h-screen flex flex-col bg-base-100',
    children: [
      // Header
      'header', {
        className: 'bg-primary text-primary-content p-4',
        children: [
          'h1', { 
            className: 'text-xl font-bold',
            children: '🚀 Simple IDE' 
          }
        ]
      },

      // Layout principal
      'div', {
        className: 'flex-1 flex',
        children: [
          // Sidebar - Lista de arquivos
          'div', {
            id: 'file-sidebar',
            className: 'w-64 bg-base-200 border-r',
            style: { minWidth: '200px', maxWidth: '400px' },
            children: renderFileTree()
          },

          // Splitter
          ResizableSplitter({
            className: 'w-1 bg-base-300 hover:bg-primary cursor-col-resize',
            onResize: (newWidth) => {
              const sidebar = document.getElementById('file-sidebar');
              if (sidebar) {
                sidebar.style.width = `${newWidth}px`;
              }
            }
          }),

          // Área principal - Editor
          'div', {
            id: 'editor-area',
            className: 'flex-1 min-w-0',
            children: renderEditor()
          },

          // Splitter
          ResizableSplitter({
            className: 'w-1 bg-base-300 hover:bg-primary cursor-col-resize'
          }),

          // Painel lateral - Chat
          'div', {
            id: 'chat-panel',
            className: 'w-80 bg-base-100 border-l',
            style: { minWidth: '250px', maxWidth: '500px' },
            children: renderChat()
          }
        ]
      },

      // Status bar
      'footer', {
        className: 'bg-base-300 px-4 py-2 text-sm flex justify-between items-center',
        children: [
          'div', { className: 'flex items-center gap-4' },
          [
            currentFile && 'span', { 
              children: `Linhas: ${(currentFile.content || '').split('\n').length}` 
            },
            'span', { children: 'UTF-8' },
            'span', { children: 'JavaScript' }
          ],
          'div', { className: 'flex items-center gap-2' },
          [
            'span', { children: 'Conectado' },
            'div', { className: 'w-2 h-2 bg-success rounded-full' }
          ]
        ]
      }
    ]
  };
}
```

Este exemplo completo demonstra como combinar os componentes especializados para criar uma interface complexa e funcional, integrando chat, editor de código, navegação de arquivos e layout redimensionável.