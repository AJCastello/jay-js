---
category: Examples
categoryId: 4
articleId: 7
slug: examples-system-integration
title: Integração com @jay-js/system
description: Exemplos de como integrar @jay-js/elements com @jay-js/system para gerenciamento de estado global e reatividade.
---

# Integração com @jay-js/system

## 1. Gerenciamento de Estado Global

```typescript
import { Box, Typography, Button, TextInput } from '@jay-js/elements';
// Assumindo que você tem o @jay-js/system instalado
// import { createSignal, createEffect } from '@jay-js/system';

function criarAppComEstadoGlobal() {
  // Simulação do estado global (substitua pela implementação real do @jay-js/system)
  let estadoGlobal = {
    usuario: null,
    contador: 0,
    tema: 'claro'
  };

  const observadores = [];

  function criarSinal(valorInicial) {
    let valor = valorInicial;
    const subs = [];
    
    const getter = () => valor;
    const setter = (novoValor) => {
      valor = novoValor;
      subs.forEach(sub => sub(valor));
    };
    
    getter.subscribe = (callback) => {
      subs.push(callback);
      return () => {
        const index = subs.indexOf(callback);
        if (index > -1) subs.splice(index, 1);
      };
    };
    
    return [getter, setter];
  }

  // Sinais simulados
  const [getUsuario, setUsuario] = criarSinal(null);
  const [getContador, setContador] = criarSinal(0);
  const [getTema, setTema] = criarSinal('claro');

  // Componente de Login
  function criarComponenteLogin() {
    const campoNome = TextInput({
      placeholder: 'Nome de usuário',
      className: 'w-full px-3 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
    });

    const botaoLogin = Button({
      children: 'Entrar',
      className: 'w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700',
      onclick: () => {
        const nome = campoNome.value.trim();
        if (nome) {
          setUsuario({ nome, logadoEm: new Date() });
          campoNome.value = '';
        }
      }
    });

    const container = Box({
      children: [
        Typography({
          tag: 'h3',
          children: 'Login',
          className: 'text-xl font-semibold mb-4'
        }),
        campoNome,
        botaoLogin
      ],
      className: 'bg-white p-6 rounded-lg shadow-lg'
    });

    // Reativo: ocultar quando usuário estiver logado
    getUsuario.subscribe((usuario) => {
      container.style.display = usuario ? 'none' : 'block';
    });

    return container;
  }

  // Componente de Perfil
  function criarComponentePerfil() {
    const nomeDisplay = Typography({
      children: '',
      className: 'text-lg font-semibold mb-2'
    });

    const tempoLogado = Typography({
      children: '',
      className: 'text-gray-600 mb-4'
    });

    const botaoLogout = Button({
      children: 'Sair',
      className: 'px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700',
      onclick: () => setUsuario(null)
    });

    const container = Box({
      children: [
        Typography({
          tag: 'h3',
          children: 'Perfil do Usuário',
          className: 'text-xl font-semibold mb-4'
        }),
        nomeDisplay,
        tempoLogado,
        botaoLogout
      ],
      className: 'bg-white p-6 rounded-lg shadow-lg'
    });

    // Reativo: mostrar quando usuário estiver logado
    getUsuario.subscribe((usuario) => {
      if (usuario) {
        container.style.display = 'block';
        nomeDisplay.textContent = `Olá, ${usuario.nome}!`;
        
        const tempoDecorrido = Math.floor((Date.now() - usuario.logadoEm.getTime()) / 1000);
        tempoLogado.textContent = `Logado há ${tempoDecorrido} segundos`;
        
        // Atualizar tempo a cada segundo
        const intervalo = setInterval(() => {
          if (!getUsuario()) {
            clearInterval(intervalo);
            return;
          }
          
          const novoTempo = Math.floor((Date.now() - usuario.logadoEm.getTime()) / 1000);
          tempoLogado.textContent = `Logado há ${novoTempo} segundos`;
        }, 1000);
      } else {
        container.style.display = 'none';
      }
    });

    return container;
  }

  // Componente Contador
  function criarComponenteContador() {
    const display = Typography({
      tag: 'div',
      children: '0',
      className: 'text-4xl font-bold text-center mb-4'
    });

    const botaoIncrementar = Button({
      children: '+1',
      className: 'px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mr-2',
      onclick: () => setContador(getContador() + 1)
    });

    const botaoDecrementar = Button({
      children: '-1',
      className: 'px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 mr-2',
      onclick: () => setContador(getContador() - 1)
    });

    const botaoReset = Button({
      children: 'Reset',
      className: 'px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700',
      onclick: () => setContador(0)
    });

    // Reativo: atualizar display quando contador mudar
    getContador.subscribe((valor) => {
      display.textContent = valor.toString();
      
      // Mudança de cor baseada no valor
      if (valor > 0) {
        display.className = 'text-4xl font-bold text-center mb-4 text-green-600';
      } else if (valor < 0) {
        display.className = 'text-4xl font-bold text-center mb-4 text-red-600';
      } else {
        display.className = 'text-4xl font-bold text-center mb-4 text-blue-600';
      }
    });

    return Box({
      children: [
        Typography({
          tag: 'h3',
          children: 'Contador Global',
          className: 'text-xl font-semibold mb-4'
        }),
        display,
        Box({
          children: [botaoDecrementar, botaoIncrementar, botaoReset],
          className: 'flex justify-center'
        })
      ],
      className: 'bg-white p-6 rounded-lg shadow-lg'
    });
  }

  // Componente de Tema
  function criarComponenteTema() {
    const botaoTema = Button({
      children: 'Alternar Tema',
      className: 'px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700',
      onclick: () => {
        setTema(getTema() === 'claro' ? 'escuro' : 'claro');
      }
    });

    const statusTema = Typography({
      children: '',
      className: 'mb-4'
    });

    // Reativo: atualizar interface quando tema mudar
    getTema.subscribe((tema) => {
      statusTema.textContent = `Tema atual: ${tema}`;
      
      // Aplicar tema ao documento
      if (tema === 'escuro') {
        document.body.className = 'bg-gray-900 text-white';
      } else {
        document.body.className = 'bg-gray-100 text-black';
      }
    });

    return Box({
      children: [
        Typography({
          tag: 'h3',
          children: 'Controle de Tema',
          className: 'text-xl font-semibold mb-4'
        }),
        statusTema,
        botaoTema
      ],
      className: 'bg-white p-6 rounded-lg shadow-lg'
    });
  }

  // Aplicação principal
  return Box({
    children: [
      Typography({
        tag: 'h1',
        children: 'App com Estado Global',
        className: 'text-3xl font-bold text-center mb-8'
      }),
      Box({
        children: [
          criarComponenteLogin(),
          criarComponentePerfil()
        ],
        className: 'grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'
      }),
      Box({
        children: [
          criarComponenteContador(),
          criarComponenteTema()
        ],
        className: 'grid grid-cols-1 md:grid-cols-2 gap-6'
      })
    ],
    className: 'max-w-4xl mx-auto p-6'
  });
}

document.body.appendChild(criarAppComEstadoGlobal());
```