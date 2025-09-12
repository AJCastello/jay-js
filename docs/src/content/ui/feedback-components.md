---
category: UI
categoryId: 1
articleId: 2
slug: feedback-components
title: Componentes de Feedback
description: Componentes para comunicação e feedback com o usuário, incluindo alertas, modais, tooltips e notificações.
---

# Componentes de Feedback

Os componentes de feedback são essenciais para comunicação efetiva com o usuário, fornecendo informações sobre o estado da aplicação, ações executadas e orientações necessárias.

## Referência da API

### Alert

Componente para exibição de mensagens informativas, alertas e notificações.

#### Assinatura da Função
```typescript
function Alert<T extends TBaseTagMap = "div">(
  options: TAlert<T>
): HTMLElementTagNameMap[T]
```

#### Parâmetros
| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `severity` | `"alert-error" \| "alert-warning" \| "alert-info" \| "alert-success"` | `"alert-info"` | Define o tipo semântico do alerta |
| `direction` | `"alert-vertical" \| "alert-horizontal"` | `undefined` | Orientação do layout interno |
| `variation` | `"alert-outline" \| "alert-dash" \| "alert-soft"` | `undefined` | Variação visual do componente |

### Modal

Sistema de janelas modais para conteúdo sobreposto.

#### Componentes Relacionados
- **Modal**: Container principal da modal
- **ModalBackdrop**: Fundo escuro da modal
- **ModalBox**: Caixa de conteúdo da modal
- **ModalAction**: Área de ações da modal

### Toast

Sistema de notificações temporárias não-invasivas.

#### Componentes Relacionados
- **Toast**: Componente de notificação individual
- **ToastContainer**: Container para gerenciar múltiplos toasts

### Tooltip

Dicas contextuais que aparecem ao interagir com elementos.

### Loading

Indicadores visuais de carregamento e processamento.

## Visão Geral

### Alert
O componente Alert é usado para chamar a atenção do usuário para informações importantes. Suporta diferentes níveis de severidade e variações visuais.

**Características:**
- Múltiplos níveis de severidade (erro, aviso, informação, sucesso)
- Orientação flexível (vertical/horizontal)
- Variações visuais (outline, dash, soft)
- Suporte completo a acessibilidade

### Modal
O sistema Modal fornece uma maneira de apresentar conteúdo em uma camada sobreposta, ideal para formulários, confirmações e conteúdo detalhado.

**Características:**
- Sistema modular (backdrop, box, actions)
- Controle de estado através de hooks
- Fechamento por escape ou clique no backdrop
- Gerenciamento de foco automático

### Toast
O sistema Toast oferece notificações não-invasivas que aparecem temporariamente na tela, perfeitas para feedback de ações do usuário.

**Características:**
- Notificações temporárias
- Container gerenciado para múltiplas notificações
- Posicionamento configurável
- Auto-dismiss com tempo configurável

### Tooltip
Tooltips fornecem informações contextuais sem sobrecarregar a interface, aparecendo quando o usuário interage com um elemento.

**Características:**
- Ativação por hover ou foco
- Posicionamento inteligente
- Conteúdo rico suportado
- Acessível via teclado

### Loading
Indicadores de loading informam ao usuário que uma operação está em andamento, melhorando a percepção de performance.

**Características:**
- Múltiplas variações visuais
- Tamanhos configuráveis
- Integração com estados de carregamento
- Suporte a textos de carregamento

## Uso Básico

### Alert Simples
```typescript
import { Alert } from '@jay-js/ui';

// Alert informativo básico
const infoAlert = Alert({
  severity: 'alert-info',
  children: 'Esta é uma mensagem informativa.'
});

// Alert de erro
const errorAlert = Alert({
  severity: 'alert-error',
  children: 'Ocorreu um erro ao processar sua solicitação.'
});

// Alert de sucesso com variação
const successAlert = Alert({
  severity: 'alert-success',
  variation: 'alert-soft',
  children: 'Operação realizada com sucesso!'
});
```

### Sistema Modal
```typescript
import { Modal, ModalBackdrop, ModalBox, ModalAction, useModal } from '@jay-js/ui';

// Hook para controle do modal
const modalState = useModal();

// Estrutura básica do modal
const modal = Modal({
  children: [
    ModalBackdrop({
      onClick: () => modalState.close()
    }),
    ModalBox({
      children: [
        'h2',
        { children: 'Título do Modal' },
        'p',
        { children: 'Conteúdo do modal aqui.' },
        ModalAction({
          children: [
            Button({
              children: 'Cancelar',
              onClick: () => modalState.close()
            }),
            Button({
              children: 'Confirmar',
              className: 'btn-primary'
            })
          ]
        })
      ]
    })
  ]
});

// Abrir modal
modalState.open();
```

### Toast Notifications
```typescript
import { Toast, ToastContainer, useToast } from '@jay-js/ui';

// Sistema de toast
const toastSystem = useToast();

// Container de toasts
const toastContainer = ToastContainer();

// Exibir notificação
toastSystem.show({
  message: 'Dados salvos com sucesso!',
  type: 'success',
  duration: 3000
});

// Notificação de erro
toastSystem.error('Erro ao conectar com o servidor');

// Notificação personalizada
const customToast = Toast({
  severity: 'alert-warning',
  children: 'Esta ação não pode ser desfeita.'
});
```

### Tooltip Contextual
```typescript
import { Tooltip } from '@jay-js/ui';

// Tooltip básico
const button = Button({
  children: 'Salvar',
  'data-tip': 'Salva as alterações no documento'
});

const tooltip = Tooltip({
  for: button,
  content: 'Salva as alterações no documento atual'
});
```

### Indicadores de Loading
```typescript
import { Loading } from '@jay-js/ui';

// Loading spinner simples
const spinner = Loading({
  size: 'md'
});

// Loading com texto
const loadingWithText = Loading({
  size: 'lg',
  children: 'Carregando dados...'
});

// Loading inline
const inlineLoading = Loading({
  size: 'sm',
  className: 'inline-block mr-2'
});
```

## Casos de Uso Comuns

### Validação de Formulário
```typescript
import { Alert, useForm } from '@jay-js/ui';

function FormWithValidation() {
  const form = useForm({
    onSubmit: (data) => {
      // Validação
      if (!data.email) {
        showAlert({
          severity: 'alert-error',
          message: 'Email é obrigatório'
        });
        return;
      }
      
      showAlert({
        severity: 'alert-success',
        message: 'Formulário enviado com sucesso!'
      });
    }
  });
  
  return form;
}
```

### Confirmação de Ações
```typescript
import { Modal, ModalBox, ModalAction } from '@jay-js/ui';

function DeleteConfirmation(onConfirm: () => void) {
  const modal = useModal();
  
  return Modal({
    children: [
      ModalBackdrop({ onClick: modal.close }),
      ModalBox({
        children: [
          Alert({
            severity: 'alert-warning',
            children: 'Esta ação não pode ser desfeita!'
          }),
          ModalAction({
            children: [
              Button({
                children: 'Cancelar',
                onClick: modal.close
              }),
              Button({
                children: 'Excluir',
                className: 'btn-error',
                onClick: () => {
                  onConfirm();
                  modal.close();
                }
              })
            ]
          })
        ]
      })
    ]
  });
}
```

### Sistema de Notificações Globais
```typescript
import { ToastContainer, useToast } from '@jay-js/ui';

// Sistema global de notificações
class NotificationService {
  private toastSystem = useToast();
  
  success(message: string) {
    this.toastSystem.show({
      message,
      type: 'success',
      duration: 3000
    });
  }
  
  error(message: string) {
    this.toastSystem.show({
      message,
      type: 'error',
      duration: 5000
    });
  }
  
  warning(message: string) {
    this.toastSystem.show({
      message,
      type: 'warning',
      duration: 4000
    });
  }
  
  info(message: string) {
    this.toastSystem.show({
      message,
      type: 'info',
      duration: 3000
    });
  }
}

// Uso em qualquer lugar da aplicação
const notifications = new NotificationService();
notifications.success('Dados salvos com sucesso!');
```

## Padrões Avançados

### Alert Personalizado com Ícones
```typescript
import { Alert } from '@jay-js/ui';

function AlertWithIcon(message: string, severity: string) {
  const icons = {
    'alert-success': '✓',
    'alert-error': '✕',
    'alert-warning': '⚠',
    'alert-info': 'ℹ'
  };
  
  return Alert({
    severity,
    className: 'flex items-center gap-2',
    children: [
      'span',
      { 
        className: 'text-lg',
        children: icons[severity] 
      },
      'span',
      { children: message }
    ]
  });
}
```

### Modal Dinâmico
```typescript
import { Modal, ModalBox } from '@jay-js/ui';

interface ModalOptions {
  title: string;
  content: string | HTMLElement;
  actions?: HTMLElement[];
}

function createDynamicModal(options: ModalOptions) {
  const modal = useModal();
  
  return Modal({
    children: [
      ModalBackdrop({ onClick: modal.close }),
      ModalBox({
        children: [
          'h2',
          { 
            className: 'text-xl font-bold mb-4',
            children: options.title 
          },
          'div',
          { 
            className: 'mb-4',
            children: options.content 
          },
          ...(options.actions || [
            Button({
              children: 'Fechar',
              onClick: modal.close
            })
          ])
        ]
      })
    ]
  });
}
```

## Melhores Práticas

### 1. Hierarquia de Feedback
```typescript
// Use a hierarquia correta para diferentes tipos de feedback
// Toasts: Feedback não-crítico e temporário
// Alerts: Informações importantes que requerem atenção
// Modals: Ações críticas que requerem decisão do usuário
```

### 2. Timing Apropriado
```typescript
// Configure durações apropriadas para toasts
const durations = {
  success: 3000,    // Feedback positivo - pode ser rápido
  error: 5000,      // Erros - mais tempo para ler
  warning: 4000,    // Avisos - tempo moderado
  info: 3000        // Informações - tempo padrão
};
```

### 3. Acessibilidade
```typescript
// Sempre inclua propriedades de acessibilidade
const accessibleAlert = Alert({
  role: 'alert',
  'aria-live': 'polite',
  'aria-atomic': 'true',
  children: 'Mensagem importante para o usuário'
});
```

### 4. Estados de Loading
```typescript
// Use loading states apropriados
function AsyncButton(onClick: () => Promise<void>) {
  let isLoading = false;
  
  return Button({
    children: isLoading ? [
      Loading({ size: 'sm' }),
      ' Processando...'
    ] : 'Executar Ação',
    disabled: isLoading,
    onClick: async () => {
      isLoading = true;
      try {
        await onClick();
      } finally {
        isLoading = false;
      }
    }
  });
}
```

## Exemplo Completo

```typescript
import { Alert, Modal, Toast, useModal, useToast } from '@jay-js/ui';

// Sistema completo de feedback
class FeedbackSystem {
  private modal = useModal();
  private toast = useToast();
  
  // Alerta inline para validação
  showValidationAlert(message: string) {
    return Alert({
      severity: 'alert-error',
      variation: 'alert-soft',
      className: 'mb-4',
      children: message
    });
  }
  
  // Confirmação via modal
  async confirm(title: string, message: string): Promise<boolean> {
    return new Promise((resolve) => {
      const modal = Modal({
        children: [
          ModalBackdrop({}),
          ModalBox({
            children: [
              'h2', { children: title },
              'p', { children: message },
              ModalAction({
                children: [
                  Button({
                    children: 'Cancelar',
                    onClick: () => {
                      resolve(false);
                      this.modal.close();
                    }
                  }),
                  Button({
                    children: 'Confirmar',
                    className: 'btn-primary',
                    onClick: () => {
                      resolve(true);
                      this.modal.close();
                    }
                  })
                ]
              })
            ]
          })
        ]
      });
      
      this.modal.open(modal);
    });
  }
  
  // Notificação de sucesso
  notifySuccess(message: string) {
    this.toast.show({
      message,
      type: 'success',
      duration: 3000
    });
  }
  
  // Notificação de erro
  notifyError(message: string) {
    this.toast.show({
      message,
      type: 'error',
      duration: 5000
    });
  }
}

// Uso do sistema
const feedback = new FeedbackSystem();

// Validação inline
const validationAlert = feedback.showValidationAlert('Email é obrigatório');

// Confirmação de ação
const confirmed = await feedback.confirm(
  'Excluir item',
  'Tem certeza que deseja excluir este item?'
);

if (confirmed) {
  feedback.notifySuccess('Item excluído com sucesso!');
} else {
  feedback.notifyError('Ação cancelada');
}
```