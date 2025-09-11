---
category: Examples
categoryId: 4
articleId: 3
slug: examples-lifecycle
title: Gerenciamento de Ciclo de Vida
description: Exemplos de inicialização, limpeza de componentes e integração com APIs e WebSockets utilizando os hooks de ciclo de vida do @jay-js/elements.
---



## 🔄 Gerenciamento de Ciclo de Vida

### 1. Inicialização e Limpeza de Componentes

```typescript
import { Box, Typography, Button } from '@jay-js/elements';

function criarComponenteComCicloDeVida() {
  let intervalo;
  let contador = 0;

  const display = Typography({
    tag: 'div',
    children: '0',
    className: 'text-4xl font-bold text-center mb-4'
  });

  const componentePrincipal = Box({
    children: [
      Typography({
        tag: 'h3',
        children: 'Componente com Ciclo de Vida',
        className: 'text-xl font-semibold mb-4'
      }),
      display,
      Typography({
        tag: 'p',
        children: 'Este contador inicia automaticamente ao montar o componente',
        className: 'text-gray-600 text-center'
      })
    ],
    className: 'p-6 bg-blue-50 border border-blue-200 rounded-lg',
    onmount: (elemento) => {
      console.log('Componente montado:', elemento);
      
      // Iniciar contador automático
      intervalo = setInterval(() => {
        contador++;
        display.textContent = contador.toString();
      }, 1000);
    },
    onunmount: (elemento) => {
      console.log('Componente desmontado:', elemento);
      
      // Limpar intervalo para evitar memory leaks
      if (intervalo) {
        clearInterval(intervalo);
        console.log('Intervalo limpo');
      }
    }
  });

  const botaoRemover = Button({
    children: 'Remover Componente',
    className: 'mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600',
    onclick: () => {
      componentePrincipal.remove();
    }
  });

  return Box({
    children: [componentePrincipal, botaoRemover],
    className: 'max-w-md mx-auto'
  });
}

document.body.appendChild(criarComponenteComCicloDeVida());
```

### 2. Integração com APIs e WebSockets

```typescript
import { Box, Typography, Button, TextInput } from '@jay-js/elements';

function criarChatComWebSocket() {
  let websocket;
  let conectado = false;

  const statusDisplay = Typography({
    tag: 'div',
    children: 'Desconectado',
    className: 'text-red-500 font-semibold mb-4'
  });

  const mensagensContainer = Box({
    className: 'h-64 overflow-y-auto border border-gray-300 rounded p-4 mb-4 bg-gray-50'
  });

  const campoMensagem = TextInput({
    placeholder: 'Digite sua mensagem...',
    className: 'flex-1 px-3 py-2 border border-gray-300 rounded mr-2',
    disabled: true,
    onkeypress: (e) => {
      if (e.key === 'Enter' && conectado) {
        enviarMensagem();
      }
    }
  });

  const botaoEnviar = Button({
    children: 'Enviar',
    className: 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400',
    disabled: true,
    onclick: enviarMensagem
  });

  const chatContainer = Box({
    children: [
      Typography({
        tag: 'h3',
        children: 'Chat WebSocket',
        className: 'text-xl font-semibold mb-4'
      }),
      statusDisplay,
      mensagensContainer,
      Box({
        children: [campoMensagem, botaoEnviar],
        className: 'flex'
      })
    ],
    className: 'max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg',
    onmount: (elemento) => {
      console.log('Chat montado, conectando WebSocket...');
      conectarWebSocket();
    },
    onunmount: (elemento) => {
      console.log('Chat desmontado, fechando conexões...');
      if (websocket) {
        websocket.close();
      }
    }
  });

  function conectarWebSocket() {
    try {
      // Exemplo com WebSocket de teste (você pode usar um servidor real)
      websocket = new WebSocket('wss://echo.websocket.org');
      
      websocket.onopen = () => {
        conectado = true;
        statusDisplay.textContent = 'Conectado';
        statusDisplay.className = 'text-green-500 font-semibold mb-4';
        campoMensagem.disabled = false;
        botaoEnviar.disabled = false;
        adicionarMensagem('Sistema', 'Conectado ao chat!', 'system');
      };

      websocket.onmessage = (event) => {
        adicionarMensagem('Echo', event.data, 'received');
      };

      websocket.onclose = () => {
        conectado = false;
        statusDisplay.textContent = 'Desconectado';
        statusDisplay.className = 'text-red-500 font-semibold mb-4';
        campoMensagem.disabled = true;
        botaoEnviar.disabled = true;
        adicionarMensagem('Sistema', 'Conexão perdida', 'system');
      };

      websocket.onerror = (error) => {
        console.error('Erro WebSocket:', error);
        adicionarMensagem('Sistema', 'Erro na conexão', 'error');
      };

    } catch (error) {
      console.error('Falha ao conectar:', error);
      statusDisplay.textContent = 'Erro de conexão';
      statusDisplay.className = 'text-red-500 font-semibold mb-4';
    }
  }

  function enviarMensagem() {
    const mensagem = campoMensagem.value.trim();
    if (mensagem && conectado) {
      websocket.send(mensagem);
      adicionarMensagem('Você', mensagem, 'sent');
      campoMensagem.value = '';
    }
  }

  function adicionarMensagem(remetente, texto, tipo) {
    const cores = {
      sent: 'bg-blue-100 text-blue-800',
      received: 'bg-gray-100 text-gray-800',
      system: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800'
    };

    const mensagemElemento = Box({
      children: [
        Typography({
          tag: 'strong',
          children: remetente + ': ',
          className: 'font-semibold'
        }),
        Typography({
          tag: 'span',
          children: texto
        })
      ],
      className: `p-2 rounded mb-2 ${cores[tipo] || cores.received}`
    });

    mensagensContainer.appendChild(mensagemElemento);
    mensagensContainer.scrollTop = mensagensContainer.scrollHeight;
  }

  return chatContainer;
}

document.body.appendChild(criarChatComWebSocket());
```