---
category: Examples
categoryId: 4
articleId: 5
slug: examples-interactive
title: Componentes Interativos
description: Exemplos de componentes interativos como modal dinâmico e sistema de abas (tabs) implementados com @jay-js/elements.
---

## 🎯 Componentes Interativos

### 1. Modal Dinâmico

```typescript
import { Box, Button, Typography, TextInput } from '@jay-js/elements';

function criarSistemaModal() {
  let modalAtivo = null;

  function criarOverlay() {
    return Box({
      className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50',
      onclick: (e) => {
        if (e.target === e.currentTarget) {
          fecharModal();
        }
      }
    });
  }

  function criarModal(titulo, conteudo, acoes = []) {
    const modal = Box({
      children: [
        // Cabeçalho
        Box({
          children: [
            Typography({
              tag: 'h3',
              children: titulo,
              className: 'text-xl font-semibold'
            }),
            Button({
              children: '×',
              className: 'text-2xl font-bold text-gray-500 hover:text-gray-700 w-8 h-8 flex items-center justify-center',
              onclick: fecharModal
            })
          ],
          className: 'flex justify-between items-center p-6 border-b border-gray-200'
        }),
        // Conteúdo
        Box({
          children: conteudo,
          className: 'p-6 flex-1'
        }),
        // Rodapé com ações
        Box({
          children: acoes,
          className: 'p-6 border-t border-gray-200 flex justify-end space-x-3'
        })
      ],
      className: 'bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-screen overflow-hidden flex flex-col',
      onclick: (e) => e.stopPropagation()
    });

    return modal;
  }

  function abrirModal(titulo, conteudo, acoes) {
    if (modalAtivo) {
      fecharModal();
    }

    const overlay = criarOverlay();
    const modal = criarModal(titulo, conteudo, acoes);
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    modalAtivo = overlay;

    // Animação de entrada
    overlay.style.opacity = '0';
    modal.style.transform = 'scale(0.9)';
    
    requestAnimationFrame(() => {
      overlay.style.transition = 'opacity 0.2s ease';
      modal.style.transition = 'transform 0.2s ease';
      overlay.style.opacity = '1';
      modal.style.transform = 'scale(1)';
    });
  }

  function fecharModal() {
    if (!modalAtivo) return;

    const overlay = modalAtivo;
    const modal = overlay.firstChild;

    overlay.style.opacity = '0';
    modal.style.transform = 'scale(0.9)';

    setTimeout(() => {
      if (overlay.parentNode) {
        overlay.remove();
      }
      modalAtivo = null;
    }, 200);
  }

  // Exemplos de modais
  const botaoInfo = Button({
    children: 'Modal de Informação',
    className: 'px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mr-4 mb-4',
    onclick: () => {
      abrirModal(
        'Informação',
        [
          Typography({
            children: 'Este é um modal simples com informações.',
            className: 'mb-4'
          }),
          Typography({
            children: 'Você pode clicar fora do modal ou no X para fechá-lo.',
            className: 'text-gray-600'
          })
        ],
        [
          Button({
            children: 'Entendi',
            className: 'px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700',
            onclick: fecharModal
          })
        ]
      );
    }
  });

  const botaoConfirmacao = Button({
    children: 'Modal de Confirmação',
    className: 'px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 mr-4 mb-4',
    onclick: () => {
      abrirModal(
        'Confirmar Ação',
        [
          Typography({
            children: 'Tem certeza de que deseja executar esta ação?',
            className: 'mb-4'
          }),
          Typography({
            children: 'Esta ação não pode ser desfeita.',
            className: 'text-red-600 font-semibold'
          })
        ],
        [
          Button({
            children: 'Cancelar',
            className: 'px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 mr-2',
            onclick: fecharModal
          }),
          Button({
            children: 'Confirmar',
            className: 'px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700',
            onclick: () => {
              alert('Ação confirmada!');
              fecharModal();
            }
          })
        ]
      );
    }
  });

  const botaoFormulario = Button({
    children: 'Modal com Formulário',
    className: 'px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4',
    onclick: () => {
      const campoNome = TextInput({
        placeholder: 'Seu nome',
        className: 'w-full px-3 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-500'
      });

      const campoEmail = TextInput({
        type: 'email',
        placeholder: 'Seu e-mail',
        className: 'w-full px-3 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-500'
      });

      abrirModal(
        'Cadastro Rápido',
        [
          Typography({
            children: 'Preencha os campos abaixo:',
            className: 'mb-4'
          }),
          campoNome,
          campoEmail
        ],
        [
          Button({
            children: 'Cancelar',
            className: 'px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 mr-2',
            onclick: fecharModal
          }),
          Button({
            children: 'Salvar',
            className: 'px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700',
            onclick: () => {
              const nome = campoNome.value;
              const email = campoEmail.value;
              
              if (nome && email) {
                alert(`Usuário ${nome} cadastrado com sucesso!`);
                fecharModal();
              } else {
                alert('Por favor, preencha todos os campos.');
              }
            }
          })
        ]
      );
    }
  });

  return Box({
    children: [
      Typography({
        tag: 'h2',
        children: 'Sistema de Modais',
        className: 'text-2xl font-bold mb-6'
      }),
      Box({
        children: [botaoInfo, botaoConfirmacao, botaoFormulario],
        className: 'flex flex-wrap'
      })
    ],
    className: 'max-w-2xl mx-auto p-6'
  });
}

document.body.appendChild(criarSistemaModal());
```

### 2. Sistema de Abas (Tabs)

```typescript
import { Box, Button, Typography } from '@jay-js/elements';

function criarSistemaAbas() {
  let abaAtiva = 0;

  const abas = [
    {
      titulo: 'Perfil',
      conteudo: () => Box({
        children: [
          Typography({
            tag: 'h3',
            children: 'Informações do Perfil',
            className: 'text-xl font-semibold mb-4'
          }),
          Typography({
            children: 'Nome: João Silva',
            className: 'mb-2'
          }),
          Typography({
            children: 'E-mail: joao@exemplo.com',
            className: 'mb-2'
          }),
          Typography({
            children: 'Cargo: Desenvolvedor Frontend',
            className: 'mb-2'
          }),
          Button({
            children: 'Editar Perfil',
            className: 'mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
          })
        ],
        className: 'p-6'
      })
    },
    {
      titulo: 'Configurações',
      conteudo: () => Box({
        children: [
          Typography({
            tag: 'h3',
            children: 'Configurações da Conta',
            className: 'text-xl font-semibold mb-4'
          }),
          Box({
            children: [
              Typography({
                children: 'Notificações por E-mail',
                className: 'font-medium'
              }),
              Button({
                children: 'Ativado',
                className: 'ml-auto px-3 py-1 bg-green-500 text-white text-sm rounded'
              })
            ],
            className: 'flex justify-between items-center p-3 border border-gray-200 rounded mb-3'
          }),
          Box({
            children: [
              Typography({
                children: 'Modo Escuro',
                className: 'font-medium'
              }),
              Button({
                children: 'Desativado',
                className: 'ml-auto px-3 py-1 bg-gray-500 text-white text-sm rounded'
              })
            ],
            className: 'flex justify-between items-center p-3 border border-gray-200 rounded mb-3'
          }),
          Button({
            children: 'Salvar Configurações',
            className: 'mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'
          })
        ],
        className: 'p-6'
      })
    },
    {
      titulo: 'Histórico',
      conteudo: () => Box({
        children: [
          Typography({
            tag: 'h3',
            children: 'Histórico de Atividades',
            className: 'text-xl font-semibold mb-4'
          }),
          ...Array.from({ length: 5 }, (_, i) => 
            Box({
              children: [
                Typography({
                  children: `Atividade ${i + 1}`,
                  className: 'font-medium'
                }),
                Typography({
                  children: `Há ${i + 1} hora${i > 0 ? 's' : ''}`,
                  className: 'text-sm text-gray-500'
                })
              ],
              className: 'p-3 border border-gray-200 rounded mb-2'
            })
          ),
          Button({
            children: 'Ver Mais',
            className: 'mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
          })
        ],
        className: 'p-6'
      })
    }
  ];

  const navAbas = Box({
    children: abas.map((aba, index) => 
      Button({
        children: aba.titulo,
        className: `px-6 py-3 border-b-2 transition-colors ${
          index === abaAtiva 
            ? 'border-blue-600 text-blue-600 bg-blue-50' 
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`,
        onclick: () => {
          abaAtiva = index;
          atualizarAbas();
        }
      })
    ),
    className: 'flex border-b border-gray-200'
  });

  const conteudoAbas = Box({
    className: 'bg-white'
  });

  function atualizarAbas() {
    // Atualizar navegação
    navAbas.innerHTML = '';
    abas.forEach((aba, index) => {
      const botaoAba = Button({
        children: aba.titulo,
        className: `px-6 py-3 border-b-2 transition-colors ${
          index === abaAtiva 
            ? 'border-blue-600 text-blue-600 bg-blue-50' 
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`,
        onclick: () => {
          abaAtiva = index;
          atualizarAbas();
        }
      });
      navAbas.appendChild(botaoAba);
    });

    // Atualizar conteúdo
    conteudoAbas.innerHTML = '';
    conteudoAbas.appendChild(abas[abaAtiva].conteudo());
  }

  // Inicializar
  atualizarAbas();

  return Box({
    children: [
      Typography({
        tag: 'h2',
        children: 'Sistema de Abas',
        className: 'text-2xl font-bold mb-6'
      }),
      Box({
        children: [navAbas, conteudoAbas],
        className: 'bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg'
      })
    ],
    className: 'max-w-4xl mx-auto p-6'
  });
}

document.body.appendChild(criarSistemaAbas());
```