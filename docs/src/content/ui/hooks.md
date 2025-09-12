---
category: UI
categoryId: 1
articleId: 9
slug: hooks
title: Hooks
description: Hooks personalizados para funcionalidades comuns, incluindo useModal, useDrawer, useToast, useRef e useListener.
---

# Hooks

Os hooks do @jay-js/ui fornecem funcionalidades reutilizáveis e abstrações úteis para operações comuns em aplicações web. Eles encapsulam lógica complexa em interfaces simples, facilitando o gerenciamento de estado, manipulação do DOM e controle de componentes.

## Referência da API

### useModal

Hook para controlar a abertura, fechamento e estado de modais.

#### Assinatura da Função
```typescript
function useModal(options: TUseModal): TModalControls
```

#### Parâmetros
| Propriedade | Tipo | Obrigatório | Descrição |
|-------------|------|-------------|-----------|
| `id` | `string` | Não | ID do elemento modal no DOM |
| `onClose` | `() => void` | Não | Callback executado quando o modal é fechado |
| `onOpen` | `() => void` | Não | Callback executado quando o modal é aberto |

#### Valor de Retorno
```typescript
interface TModalControls {
  open: () => void;    // Abre o modal
  close: () => void;   // Fecha o modal
  toggle: () => void;  // Alterna entre aberto/fechado
}
```

### useDrawer

Hook para controlar gavetas/painéis deslizantes.

#### Assinatura da Função
```typescript
function useDrawer(options: TUseDrawer): TDrawerControls
```

#### Parâmetros
| Propriedade | Tipo | Obrigatório | Descrição |
|-------------|------|-------------|-----------|
| `id` | `string` | Não | ID do elemento drawer no DOM |
| `onClose` | `() => void` | Não | Callback executado quando o drawer é fechado |
| `onOpen` | `() => void` | Não | Callback executado quando o drawer é aberto |

#### Valor de Retorno
```typescript
interface TDrawerControls {
  open: () => void;    // Abre o drawer
  close: () => void;   // Fecha o drawer
  toggle: () => void;  // Alterna entre aberto/fechado
}
```

### useToast

Hook para exibir notificações toast temporárias.

#### Assinatura da Função
```typescript
function useToast(options: TUseToast): TToastControls
```

#### Parâmetros
| Propriedade | Tipo | Obrigatório | Descrição |
|-------------|------|-------------|-----------|
| `position` | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right' \| 'top-center' \| 'bottom-center'` | Não | Posição dos toasts na tela |
| `duration` | `number` | Não | Duração padrão em milissegundos |
| `maxToasts` | `number` | Não | Número máximo de toasts simultâneos |

#### Valor de Retorno
```typescript
interface TToastControls {
  success: (message: string, options?: ToastOptions) => string;
  error: (message: string, options?: ToastOptions) => string;
  warning: (message: string, options?: ToastOptions) => string;
  info: (message: string, options?: ToastOptions) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}
```

### useRef

Hook para obter referências de elementos DOM com recursos adicionais.

#### Assinatura da Função
```typescript
function useRef<T extends HTMLElement = HTMLElement>(
  selector?: string
): TRefControls<T>
```

#### Parâmetros
| Propriedade | Tipo | Obrigatório | Descrição |
|-------------|------|-------------|-----------|
| `selector` | `string` | Não | Seletor CSS para o elemento |

#### Valor de Retorno
```typescript
interface TRefControls<T> {
  current: T | null;           // Referência atual do elemento
  setRef: (element: T) => void; // Define a referência
  focus: () => void;           // Foca no elemento
  blur: () => void;            // Remove o foco
  scrollIntoView: (options?: ScrollIntoViewOptions) => void;
}
```

### useListener

Hook para gerenciar event listeners de forma eficiente.

#### Assinatura da Função
```typescript
function useListener(
  target: EventTarget | string,
  event: string,
  handler: EventListener,
  options?: AddEventListenerOptions
): TListenerControls
```

#### Parâmetros
| Propriedade | Tipo | Obrigatório | Descrição |
|-------------|------|-------------|-----------|
| `target` | `EventTarget \| string` | Sim | Elemento ou seletor para anexar o listener |
| `event` | `string` | Sim | Nome do evento |
| `handler` | `EventListener` | Sim | Função callback do evento |
| `options` | `AddEventListenerOptions` | Não | Opções do addEventListener |

#### Valor de Retorno
```typescript
interface TListenerControls {
  attach: () => void;    // Anexa o listener
  detach: () => void;    // Remove o listener
  isAttached: boolean;   // Status do attachment
}
```

## Visão Geral

### useModal - Controle de Modais
O hook useModal simplifica o gerenciamento de modais, fornecendo métodos convenientes para abrir, fechar e alternar modais, além de callbacks para eventos de mudança de estado.

**Características principais:**
- Controle programático de modais
- Callbacks customizáveis para eventos
- Verificação automática de existência do elemento
- Interface simples e consistente

### useDrawer - Controle de Gavetas
O useDrawer oferece controle similar ao useModal, mas específico para elementos drawer/sidebar, com funcionalidades adaptadas para painéis deslizantes.

**Características principais:**
- Controle de painéis deslizantes
- Suporte a diferentes posições
- Gerenciamento de estado automático
- Callbacks para eventos de navegação

### useToast - Sistema de Notificações
O useToast fornece um sistema completo de notificações temporárias, com diferentes tipos, posicionamento flexível e controle de duração.

**Características principais:**
- Múltiplos tipos de notificação (success, error, warning, info)
- Posicionamento configurável
- Controle de duração automática
- Gerenciamento de múltiplos toasts

### useRef - Referências Avançadas
O useRef estende o conceito básico de referências DOM com métodos utilitários comuns e verificações de segurança.

**Características principais:**
- Métodos utilitários integrados
- Verificações de existência automáticas
- Interface TypeScript tipada
- Funcionalidades de acessibilidade

### useListener - Gerenciamento de Eventos
O useListener facilita o gerenciamento de event listeners, fornecendo controle sobre attachment/detachment e prevenção de vazamentos de memória.

**Características principais:**
- Attachment/detachment seguro
- Suporte a múltiplos tipos de target
- Prevenção de vazamentos de memória
- Opções avançadas de evento

## Uso Básico

### Controle de Modal
```typescript
import { useModal } from '@jay-js/ui';

// Hook básico para modal
const modal = useModal({
  id: 'my-modal',
  onOpen: () => console.log('Modal aberto'),
  onClose: () => console.log('Modal fechado')
});

// Botão para abrir modal
const openButton = 'button', {
  className: 'btn btn-primary',
  onClick: modal.open,
  children: 'Abrir Modal'
};

// Elemento modal
const modalElement = 'dialog', {
  id: 'my-modal',
  className: 'modal',
  children: [
    'div', { className: 'modal-box' },
    [
      'h3', { children: 'Título do Modal' },
      'p', { children: 'Conteúdo do modal...' },
      'div', { className: 'modal-action' },
      [
        'button', {
          className: 'btn',
          onClick: modal.close,
          children: 'Fechar'
        },
        'button', {
          className: 'btn btn-primary',
          onClick: modal.close,
          children: 'Confirmar'
        }
      ]
    ]
  ]
};
```

### Sistema de Notificações
```typescript
import { useToast } from '@jay-js/ui';

// Configuração do sistema de toast
const toast = useToast({
  position: 'top-right',
  duration: 3000,
  maxToasts: 5
});

// Funções para diferentes tipos de notificação
const showSuccess = () => {
  toast.success('Operação realizada com sucesso!');
};

const showError = () => {
  toast.error('Erro ao processar solicitação', {
    duration: 5000, // Duração customizada
    persistent: true // Não remove automaticamente
  });
};

const showWarning = () => {
  toast.warning('Atenção: Verifique os dados inseridos');
};

const showInfo = () => {
  const toastId = toast.info('Processando...');
  
  // Remove após alguma operação
  setTimeout(() => {
    toast.dismiss(toastId);
    toast.success('Processamento concluído!');
  }, 2000);
};

// Botões para testar
const toastControls = 'div', {
  className: 'flex gap-2',
  children: [
    'button', {
      className: 'btn btn-success',
      onClick: showSuccess,
      children: 'Sucesso'
    },
    'button', {
      className: 'btn btn-error',
      onClick: showError,
      children: 'Erro'
    },
    'button', {
      className: 'btn btn-warning',
      onClick: showWarning,
      children: 'Aviso'
    },
    'button', {
      className: 'btn btn-info',
      onClick: showInfo,
      children: 'Info'
    }
  ]
};
```

### Referências e Foco
```typescript
import { useRef } from '@jay-js/ui';

// Referência para campo de entrada
const inputRef = useRef('input[name="username"]');

// Funções para controle de foco
const focusInput = () => inputRef.focus();
const blurInput = () => inputRef.blur();

const scrollToInput = () => {
  inputRef.scrollIntoView({ 
    behavior: 'smooth', 
    block: 'center' 
  });
};

// Formulário com controles
const formWithControls = 'form', {
  children: [
    'input', {
      name: 'username',
      className: 'input input-bordered w-full mb-4',
      placeholder: 'Nome de usuário',
      ref: inputRef.setRef // Define a referência
    },
    
    'div', { className: 'flex gap-2' },
    [
      'button', {
        type: 'button',
        className: 'btn btn-outline',
        onClick: focusInput,
        children: 'Focar Campo'
      },
      'button', {
        type: 'button',
        className: 'btn btn-outline',
        onClick: scrollToInput,
        children: 'Rolar para Campo'
      }
    ]
  ]
};
```

### Gerenciamento de Eventos
```typescript
import { useListener } from '@jay-js/ui';

// Listener para teclas globais
const keyListener = useListener(
  document,
  'keydown',
  (event) => {
    if (event.ctrlKey && event.key === 'k') {
      event.preventDefault();
      console.log('Atalho Ctrl+K acionado');
    }
  },
  { passive: false }
);

// Listener para cliques fora de um elemento
const outsideClickListener = useListener(
  document,
  'click',
  (event) => {
    const modal = document.getElementById('my-modal');
    if (modal && !modal.contains(event.target)) {
      console.log('Clique fora do modal');
    }
  }
);

// Controles para ativar/desativar listeners
const listenerControls = 'div', {
  className: 'flex gap-2',
  children: [
    'button', {
      className: 'btn btn-primary',
      onClick: keyListener.attach,
      children: 'Ativar Atalhos'
    },
    'button', {
      className: 'btn btn-secondary',
      onClick: keyListener.detach,
      children: 'Desativar Atalhos'
    },
    'span', {
      className: 'badge',
      children: keyListener.isAttached ? 'Ativo' : 'Inativo'
    }
  ]
};
```

### Controle de Drawer
```typescript
import { useDrawer } from '@jay-js/ui';

// Hook para drawer de navegação
const navigationDrawer = useDrawer({
  id: 'nav-drawer',
  onOpen: () => console.log('Menu aberto'),
  onClose: () => console.log('Menu fechado')
});

// Header com botão de menu
const headerWithMenu = 'header', {
  className: 'navbar bg-base-100 shadow',
  children: [
    'div', { className: 'navbar-start' },
    ['button', {
      className: 'btn btn-square btn-ghost',
      onClick: navigationDrawer.toggle,
      children: '☰'
    }],
    
    'div', { className: 'navbar-center' },
    ['h1', { 
      className: 'text-xl font-bold',
      children: 'Minha App' 
    }]
  ]
};

// Drawer de navegação
const drawerNavigation = 'div', {
  className: 'drawer',
  children: [
    'input', {
      id: 'nav-drawer',
      type: 'checkbox',
      className: 'drawer-toggle'
    },
    
    'div', { className: 'drawer-content' },
    [/* Conteúdo principal */],
    
    'div', { className: 'drawer-side' },
    [
      'label', {
        htmlFor: 'nav-drawer',
        className: 'drawer-overlay',
        onClick: navigationDrawer.close
      },
      'aside', {
        className: 'min-h-full w-80 bg-base-200 text-base-content',
        children: [
          'nav', { className: 'p-4' },
          ['ul', { className: 'menu' },
          [
            'li', { children: ['a', { children: 'Dashboard' }] },
            'li', { children: ['a', { children: 'Perfil' }] },
            'li', { children: ['a', { children: 'Configurações' }] }
          ]]
        ]
      }
    ]
  ]
};
```

## Casos de Uso Comuns

### Sistema de Confirmação com Modal
```typescript
import { useModal, useToast } from '@jay-js/ui';

function ConfirmationSystem({ onConfirm }) {
  const modal = useModal({ id: 'confirm-modal' });
  const toast = useToast();
  
  const handleConfirm = async () => {
    try {
      modal.close();
      toast.info('Processando...');
      
      await onConfirm();
      
      toast.dismissAll();
      toast.success('Ação confirmada com sucesso!');
    } catch (error) {
      toast.dismissAll();
      toast.error('Erro ao executar ação');
    }
  };

  const showConfirmation = (title, message) => {
    // Atualiza conteúdo do modal
    const modalBox = document.querySelector('#confirm-modal .modal-box');
    if (modalBox) {
      modalBox.innerHTML = `
        <h3 class="font-bold text-lg">${title}</h3>
        <p class="py-4">${message}</p>
        <div class="modal-action">
          <button class="btn" onclick="confirmModal.close()">Cancelar</button>
          <button class="btn btn-error" onclick="confirmAction()">Confirmar</button>
        </div>
      `;
    }
    
    modal.open();
  };

  // Disponibiliza funções globalmente para uso inline
  window.confirmModal = modal;
  window.confirmAction = handleConfirm;

  return 'dialog', {
    id: 'confirm-modal',
    className: 'modal',
    children: ['div', { className: 'modal-box' }]
  };
}

// Uso
const confirmSystem = ConfirmationSystem({
  onConfirm: async () => {
    // Simula operação assíncrona
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Ação confirmada!');
  }
});
```

### Drawer Responsivo com Persistência
```typescript
import { useDrawer, useListener } from '@jay-js/ui';

function ResponsiveNavigation() {
  const drawer = useDrawer({
    id: 'responsive-nav',
    onOpen: () => localStorage.setItem('nav-open', 'true'),
    onClose: () => localStorage.setItem('nav-open', 'false')
  });

  // Restaura estado do localStorage
  const restoreState = () => {
    const wasOpen = localStorage.getItem('nav-open') === 'true';
    const isLargeScreen = window.innerWidth >= 1024;
    
    if (wasOpen && isLargeScreen) {
      drawer.open();
    } else if (!isLargeScreen) {
      drawer.close();
    }
  };

  // Listener para mudanças de tela
  const resizeListener = useListener(
    window,
    'resize',
    () => {
      const isLargeScreen = window.innerWidth >= 1024;
      if (!isLargeScreen) {
        drawer.close();
      }
    }
  );

  // Inicialização
  const initialize = () => {
    restoreState();
    resizeListener.attach();
  };

  // Chama inicialização quando DOM carregar
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }

  return { drawer, restoreState };
}
```

### Sistema de Notificações Avançado
```typescript
import { useToast } from '@jay-js/ui';

class NotificationManager {
  constructor() {
    this.toast = useToast({
      position: 'top-right',
      duration: 4000,
      maxToasts: 3
    });
    
    this.queue = [];
    this.processing = false;
  }

  // Processa fila de notificações
  async processQueue() {
    if (this.processing || this.queue.length === 0) return;
    
    this.processing = true;
    
    while (this.queue.length > 0) {
      const notification = this.queue.shift();
      await this.showNotification(notification);
      await new Promise(resolve => setTimeout(resolve, 500)); // Delay entre notificações
    }
    
    this.processing = false;
  }

  async showNotification({ type, message, options = {} }) {
    const toastId = this.toast[type](message, {
      ...options,
      onShow: () => console.log(`Toast ${type} exibido`),
      onHide: () => console.log(`Toast ${type} removido`)
    });
    
    return toastId;
  }

  // Métodos públicos para diferentes tipos
  success(message, options) {
    this.queue.push({ type: 'success', message, options });
    this.processQueue();
  }

  error(message, options) {
    // Erros têm prioridade
    this.queue.unshift({ type: 'error', message, options });
    this.processQueue();
  }

  warning(message, options) {
    this.queue.push({ type: 'warning', message, options });
    this.processQueue();
  }

  info(message, options) {
    this.queue.push({ type: 'info', message, options });
    this.processQueue();
  }

  // Notificações de progresso
  async showProgress(message, asyncOperation) {
    const progressId = this.toast.info(`${message} 0%`, { persistent: true });
    
    try {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        this.toast.update(progressId, `${message} ${progress}%`);
        
        if (progress >= 100) {
          clearInterval(interval);
        }
      }, 200);
      
      const result = await asyncOperation();
      
      this.toast.dismiss(progressId);
      this.toast.success('Operação concluída!');
      
      return result;
    } catch (error) {
      this.toast.dismiss(progressId);
      this.toast.error('Erro na operação');
      throw error;
    }
  }
}

// Instância global
const notifications = new NotificationManager();

// Exemplo de uso
const handleAsyncAction = async () => {
  await notifications.showProgress(
    'Processando dados...',
    () => new Promise(resolve => setTimeout(resolve, 2000))
  );
};
```

## Padrões Avançados

### Hook Customizado Combinado
```typescript
import { useModal, useToast, useRef } from '@jay-js/ui';

function useFormModal({ formId, onSubmit, validationRules = {} }) {
  const modal = useModal({
    id: `${formId}-modal`,
    onClose: () => resetForm()
  });
  
  const toast = useToast();
  const formRef = useRef(`#${formId}`);
  
  const resetForm = () => {
    if (formRef.current) {
      formRef.current.reset();
      clearValidationErrors();
    }
  };

  const validateForm = () => {
    const form = formRef.current;
    if (!form) return false;

    const formData = new FormData(form);
    const errors = {};
    
    Object.entries(validationRules).forEach(([field, rules]) => {
      const value = formData.get(field);
      
      rules.forEach(rule => {
        if (!rule.test(value)) {
          errors[field] = rule.message;
        }
      });
    });

    if (Object.keys(errors).length > 0) {
      showValidationErrors(errors);
      return false;
    }

    return true;
  };

  const showValidationErrors = (errors) => {
    Object.entries(errors).forEach(([field, message]) => {
      const fieldElement = document.querySelector(`[name="${field}"]`);
      if (fieldElement) {
        fieldElement.classList.add('input-error');
        
        // Remove erro existente
        const existingError = fieldElement.parentNode.querySelector('.error-message');
        if (existingError) existingError.remove();
        
        // Adiciona nova mensagem
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message text-error text-sm mt-1';
        errorDiv.textContent = message;
        fieldElement.parentNode.appendChild(errorDiv);
      }
    });
  };

  const clearValidationErrors = () => {
    const form = formRef.current;
    if (!form) return;
    
    form.querySelectorAll('.input-error').forEach(input => {
      input.classList.remove('input-error');
    });
    
    form.querySelectorAll('.error-message').forEach(error => {
      error.remove();
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      const formData = new FormData(formRef.current);
      const data = Object.fromEntries(formData);
      
      toast.info('Enviando formulário...');
      
      await onSubmit(data);
      
      toast.dismissAll();
      toast.success('Formulário enviado com sucesso!');
      modal.close();
      resetForm();
      
    } catch (error) {
      toast.dismissAll();
      toast.error(error.message || 'Erro ao enviar formulário');
    }
  };

  return {
    modal,
    formRef,
    handleSubmit,
    resetForm,
    validateForm
  };
}

// Uso do hook combinado
const userFormModal = useFormModal({
  formId: 'user-form',
  validationRules: {
    name: [
      { test: v => v && v.length > 0, message: 'Nome é obrigatório' },
      { test: v => v && v.length >= 2, message: 'Nome deve ter pelo menos 2 caracteres' }
    ],
    email: [
      { test: v => v && v.length > 0, message: 'Email é obrigatório' },
      { test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), message: 'Email inválido' }
    ]
  },
  onSubmit: async (data) => {
    // Simula API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Dados enviados:', data);
  }
});
```

### Sistema de Event Listeners Centralizados
```typescript
import { useListener } from '@jay-js/ui';

class EventManager {
  constructor() {
    this.listeners = new Map();
    this.globalListeners = [];
  }

  addGlobalListener(event, handler, options = {}) {
    const listener = useListener(document, event, handler, options);
    listener.attach();
    
    this.globalListeners.push({
      event,
      listener,
      id: `global-${Date.now()}-${Math.random()}`
    });

    return this.globalListeners[this.globalListeners.length - 1].id;
  }

  addElementListener(selector, event, handler, options = {}) {
    const element = document.querySelector(selector);
    if (!element) return null;

    const listener = useListener(element, event, handler, options);
    listener.attach();

    const id = `element-${Date.now()}-${Math.random()}`;
    this.listeners.set(id, { selector, event, listener });

    return id;
  }

  removeListener(id) {
    // Remove listener global
    const globalIndex = this.globalListeners.findIndex(l => l.id === id);
    if (globalIndex !== -1) {
      this.globalListeners[globalIndex].listener.detach();
      this.globalListeners.splice(globalIndex, 1);
      return true;
    }

    // Remove listener de elemento
    const elementListener = this.listeners.get(id);
    if (elementListener) {
      elementListener.listener.detach();
      this.listeners.delete(id);
      return true;
    }

    return false;
  }

  removeAllListeners() {
    // Remove listeners globais
    this.globalListeners.forEach(({ listener }) => listener.detach());
    this.globalListeners = [];

    // Remove listeners de elementos
    this.listeners.forEach(({ listener }) => listener.detach());
    this.listeners.clear();
  }

  // Atalhos para eventos comuns
  onKeyboardShortcut(keys, handler) {
    return this.addGlobalListener('keydown', (e) => {
      const pressedKeys = [];
      if (e.ctrlKey) pressedKeys.push('ctrl');
      if (e.shiftKey) pressedKeys.push('shift');
      if (e.altKey) pressedKeys.push('alt');
      if (e.metaKey) pressedKeys.push('meta');
      pressedKeys.push(e.key.toLowerCase());

      const shortcut = keys.toLowerCase().split('+').map(k => k.trim());
      
      if (shortcut.every(key => pressedKeys.includes(key))) {
        e.preventDefault();
        handler(e);
      }
    });
  }

  onClickOutside(selector, handler) {
    return this.addGlobalListener('click', (e) => {
      const element = document.querySelector(selector);
      if (element && !element.contains(e.target)) {
        handler(e);
      }
    });
  }

  onEscapeKey(handler) {
    return this.addGlobalListener('keydown', (e) => {
      if (e.key === 'Escape') {
        handler(e);
      }
    });
  }
}

// Instância global
const eventManager = new EventManager();

// Exemplo de uso
const setupApplicationEvents = () => {
  // Atalho para busca
  eventManager.onKeyboardShortcut('ctrl+k', () => {
    const searchInput = document.querySelector('#search-input');
    if (searchInput) searchInput.focus();
  });

  // Atalho para salvar
  eventManager.onKeyboardShortcut('ctrl+s', () => {
    console.log('Salvando...');
  });

  // Fechar modal com ESC
  eventManager.onEscapeKey(() => {
    const openModal = document.querySelector('.modal:target, .modal[open]');
    if (openModal) {
      openModal.close?.();
    }
  });

  // Clique fora de dropdown fecha
  eventManager.onClickOutside('.dropdown.dropdown-open', () => {
    document.querySelectorAll('.dropdown.dropdown-open').forEach(dropdown => {
      dropdown.classList.remove('dropdown-open');
    });
  });
};
```

## Melhores Práticas

### 1. Cleanup de Recursos
```typescript
// Sempre faça cleanup dos listeners quando não precisar mais
const cleanup = () => {
  keyListener.detach();
  resizeListener.detach();
  // Outros cleanups necessários
};

// Execute cleanup antes de sair da página
window.addEventListener('beforeunload', cleanup);
```

### 2. Verificação de Elementos
```typescript
// Sempre verifique se elementos existem antes de usar
const modal = useModal({ 
  id: 'my-modal',
  onOpen: () => {
    const element = document.getElementById('my-modal');
    if (element instanceof HTMLDialogElement) {
      // Lógica segura aqui
    }
  }
});
```

### 3. Debounce em Eventos Frequentes
```typescript
// Use debounce para eventos que disparam frequentemente
const debouncedResize = useListener(
  window,
  'resize',
  debounce(() => {
    // Lógica de redimensionamento
  }, 250)
);
```

### 4. Configuração de Toast Consistente
```typescript
// Mantenha configurações consistentes
const toast = useToast({
  position: 'top-right', // Sempre na mesma posição
  duration: 4000,        // Duração consistente
  maxToasts: 3           // Limite razoável
});
```

## Exemplo Completo: Dashboard Interativo

```typescript
import { 
  useModal, useDrawer, useToast, useRef, useListener 
} from '@jay-js/ui';

function InteractiveDashboard() {
  // Hooks principais
  const settingsModal = useModal({ 
    id: 'settings-modal',
    onOpen: () => toast.info('Configurações abertas'),
    onClose: () => toast.info('Configurações fechadas')
  });
  
  const sidebarDrawer = useDrawer({ 
    id: 'sidebar-drawer',
    onOpen: () => localStorage.setItem('sidebar-open', 'true'),
    onClose: () => localStorage.setItem('sidebar-open', 'false')
  });
  
  const toast = useToast({ 
    position: 'top-right',
    duration: 3000 
  });
  
  const searchRef = useRef('#search-input');
  
  // Event listeners
  const keyboardListener = useListener(
    document,
    'keydown',
    (e) => {
      // Atalho para busca
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        searchRef.focus();
      }
      
      // Atalho para configurações
      if (e.ctrlKey && e.key === ',') {
        e.preventDefault();
        settingsModal.open();
      }
      
      // Atalho para sidebar
      if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        sidebarDrawer.toggle();
      }
    }
  );

  // Inicialização
  const initialize = () => {
    keyboardListener.attach();
    
    // Restaura estado da sidebar
    const sidebarWasOpen = localStorage.getItem('sidebar-open') === 'true';
    if (sidebarWasOpen) {
      sidebarDrawer.open();
    }
    
    toast.info('Dashboard carregado!');
  };

  // Chama inicialização
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }

  // Função para salvar configurações
  const saveSettings = async (formData) => {
    try {
      toast.info('Salvando configurações...');
      
      // Simula API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.dismissAll();
      toast.success('Configurações salvas!');
      settingsModal.close();
      
    } catch (error) {
      toast.dismissAll();
      toast.error('Erro ao salvar configurações');
    }
  };

  return 'div', {
    className: 'min-h-screen bg-base-100',
    children: [
      // Header
      'header', {
        className: 'navbar bg-primary text-primary-content shadow-lg',
        children: [
          'div', { className: 'navbar-start' },
          ['button', {
            className: 'btn btn-square btn-ghost',
            onClick: sidebarDrawer.toggle,
            title: 'Menu (Ctrl+B)',
            children: '☰'
          }],
          
          'div', { className: 'navbar-center flex-1' },
          ['div', { className: 'form-control w-full max-w-md' },
          ['input', {
            id: 'search-input',
            type: 'text',
            placeholder: 'Pesquisar... (Ctrl+K)',
            className: 'input input-bordered w-full',
            ref: searchRef.setRef,
            onInput: (e) => {
              const query = e.target.value;
              if (query.length > 2) {
                toast.info(`Pesquisando por: ${query}`);
              }
            }
          }]],
          
          'div', { className: 'navbar-end' },
          ['button', {
            className: 'btn btn-ghost',
            onClick: settingsModal.open,
            title: 'Configurações (Ctrl+,)',
            children: '⚙️'
          }]
        ]
      },

      // Layout principal com drawer
      'div', { className: 'drawer lg:drawer-open' },
      [
        'input', {
          id: 'sidebar-drawer',
          type: 'checkbox',
          className: 'drawer-toggle'
        },

        // Conteúdo principal
        'div', { className: 'drawer-content' },
        ['main', { className: 'p-6' },
        [
          'div', { className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' },
          [
            // Cards do dashboard
            'div', { className: 'card bg-base-100 shadow-xl' },
            ['div', { className: 'card-body' },
            [
              'h2', { 
                className: 'card-title',
                children: 'Estatísticas' 
              },
              'p', { children: 'Dados em tempo real...' },
              'div', { className: 'card-actions justify-end' },
              ['button', {
                className: 'btn btn-primary',
                onClick: () => toast.info('Atualizando dados...'),
                children: 'Atualizar'
              }]
            ]],

            'div', { className: 'card bg-base-100 shadow-xl' },
            ['div', { className: 'card-body' },
            [
              'h2', { 
                className: 'card-title',
                children: 'Ações Rápidas' 
              },
              'div', { className: 'flex flex-col gap-2 mt-4' },
              [
                'button', {
                  className: 'btn btn-outline',
                  onClick: () => toast.success('Ação executada!'),
                  children: 'Nova Tarefa'
                },
                'button', {
                  className: 'btn btn-outline',
                  onClick: () => toast.warning('Função em desenvolvimento'),
                  children: 'Relatório'
                }
              ]
            ]]
          ]
        ]],

        // Sidebar
        'div', { className: 'drawer-side' },
        [
          'label', {
            htmlFor: 'sidebar-drawer',
            className: 'drawer-overlay'
          },
          'aside', {
            className: 'min-h-full w-64 bg-base-200 text-base-content',
            children: [
              'div', { className: 'p-4' },
              [
                'h3', { 
                  className: 'font-bold text-lg mb-4',
                  children: 'Navegação' 
                },
                'ul', { className: 'menu space-y-1' },
                [
                  'li', { children: ['a', { children: '📊 Dashboard' }] },
                  'li', { children: ['a', { children: '📈 Relatórios' }] },
                  'li', { children: ['a', { children: '👥 Usuários' }] },
                  'li', { children: ['a', { children: '⚙️ Configurações' }] }
                ]
              ]
            ]
          }
        ]
      ],

      // Modal de configurações
      'dialog', {
        id: 'settings-modal',
        className: 'modal',
        children: [
          'div', { className: 'modal-box w-11/12 max-w-2xl' },
          [
            'h3', { 
              className: 'font-bold text-lg mb-4',
              children: 'Configurações' 
            },
            
            'form', {
              onSubmit: async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                await saveSettings(Object.fromEntries(formData));
              },
              children: [
                'div', { className: 'form-control mb-4' },
                [
                  'label', { className: 'label' },
                  ['span', { 
                    className: 'label-text',
                    children: 'Nome da Aplicação' 
                  }],
                  'input', {
                    name: 'appName',
                    type: 'text',
                    className: 'input input-bordered',
                    defaultValue: 'Minha Aplicação'
                  }
                ],

                'div', { className: 'form-control mb-4' },
                [
                  'label', { className: 'label cursor-pointer' },
                  [
                    'span', { 
                      className: 'label-text',
                      children: 'Notificações' 
                    },
                    'input', {
                      name: 'notifications',
                      type: 'checkbox',
                      className: 'toggle toggle-primary',
                      defaultChecked: true
                    }
                  ]
                ],

                'div', { className: 'modal-action' },
                [
                  'button', {
                    type: 'button',
                    className: 'btn',
                    onClick: settingsModal.close,
                    children: 'Cancelar'
                  },
                  'button', {
                    type: 'submit',
                    className: 'btn btn-primary',
                    children: 'Salvar'
                  }
                ]
              ]
            }
          ]
        ]
      }
    ]
  };
}
```

Este exemplo completo demonstra como combinar todos os hooks para criar uma interface rica e interativa, com controles de modal, drawer, sistema de notificações, referências de elementos e gerenciamento de eventos de teclado.