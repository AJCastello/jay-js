---
category: Examples
categoryId: 4
articleId: 1
slug: examples-basic
title: Exemplos Básicos
description: Exemplos simples do @jay-js/elements incluindo criação de elementos, formulários simples com validação e manipulação avançada de eventos.
---

# Exemplos Práticos do @jay-js/elements

Esta documentação fornece exemplos completos e práticos do **@jay-js/elements**, organizados por complexidade e cenários de uso real. Todos os exemplos são funcionais e podem ser copiados e adaptados para seus próprios projetos.

## 🚀 Exemplos Básicos

### 1. Criação Simples de Elementos

```typescript
import { Button, TextInput, Typography, Box } from '@jay-js/elements';

// Botão básico
const botaoSimples = Button({
  children: 'Clique aqui',
  className: 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600',
  onclick: () => alert('Botão clicado!')
});

// Input de texto
const campoTexto = TextInput({
  placeholder: 'Digite seu nome',
  className: 'w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500',
  oninput: (e) => console.log('Valor atual:', e.target.value)
});

// Texto/título
const titulo = Typography({
  tag: 'h1',
  children: 'Bem-vindo ao Jay JS',
  className: 'text-3xl font-bold text-gray-800 mb-4'
});

// Container
const container = Box({
  children: [titulo, campoTexto, botaoSimples],
  className: 'max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg'
});

document.body.appendChild(container);
```

### 2. Formulário Simples com Validação

```typescript
import { Form, TextInput, Button, Typography } from '@jay-js/elements';

function criarFormularioSimples() {
  let dadosFormulario = {
    nome: '',
    email: ''
  };

  const titulo = Typography({
    tag: 'h2',
    children: 'Cadastro Básico',
    className: 'text-2xl font-semibold mb-4'
  });

  const campoNome = TextInput({
    placeholder: 'Nome completo',
    required: true,
    className: 'w-full px-3 py-2 border border-gray-300 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500',
    oninput: (e) => {
      dadosFormulario.nome = e.target.value;
      validarCampo(e.target, e.target.value.length >= 2);
    }
  });

  const campoEmail = TextInput({
    type: 'email',
    placeholder: 'seu@email.com',
    required: true,
    className: 'w-full px-3 py-2 border border-gray-300 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500',
    oninput: (e) => {
      dadosFormulario.email = e.target.value;
      const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value);
      validarCampo(e.target, emailValido);
    }
  });

  const botaoEnviar = Button({
    type: 'submit',
    children: 'Cadastrar',
    className: 'w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400',
    disabled: true
  });

  const formulario = Form({
    children: [titulo, campoNome, campoEmail, botaoEnviar],
    className: 'max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg',
    onsubmit: (e) => {
      e.preventDefault();
      console.log('Dados enviados:', dadosFormulario);
      alert(`Usuário ${dadosFormulario.nome} cadastrado com sucesso!`);
    }
  });

  function validarCampo(campo, valido) {
    if (valido) {
      campo.classList.remove('border-red-500');
      campo.classList.add('border-green-500');
    } else {
      campo.classList.remove('border-green-500');
      campo.classList.add('border-red-500');
    }
    
    // Habilitar botão apenas se todos os campos forem válidos
    const todosValidos = dadosFormulario.nome.length >= 2 && 
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dadosFormulario.email);
    botaoEnviar.disabled = !todosValidos;
  }

  return formulario;
}

document.body.appendChild(criarFormularioSimples());
```

### 3. Manipulação de Eventos Avançada

```typescript
import { Button, Box, Typography } from '@jay-js/elements';

function criarContadorInterativo() {
  let contador = 0;

  const display = Typography({
    tag: 'div',
    children: contador.toString(),
    className: 'text-6xl font-bold text-center mb-6 text-blue-600'
  });

  const botaoIncrementar = Button({
    children: '+',
    className: 'px-6 py-3 bg-green-500 text-white text-2xl rounded hover:bg-green-600 mr-2',
    onclick: () => {
      contador++;
      atualizarDisplay();
    }
  });

  const botaoDecrementar = Button({
    children: '-',
    className: 'px-6 py-3 bg-red-500 text-white text-2xl rounded hover:bg-red-600 mr-2',
    onclick: () => {
      contador--;
      atualizarDisplay();
    }
  });

  const botaoReset = Button({
    children: 'Reset',
    className: 'px-6 py-3 bg-gray-500 text-white rounded hover:bg-gray-600',
    onclick: () => {
      contador = 0;
      atualizarDisplay();
    }
  });

  function atualizarDisplay() {
    display.textContent = contador.toString();
    
    // Mudança de cor baseada no valor
    if (contador > 0) {
      display.className = 'text-6xl font-bold text-center mb-6 text-green-600';
    } else if (contador < 0) {
      display.className = 'text-6xl font-bold text-center mb-6 text-red-600';
    } else {
      display.className = 'text-6xl font-bold text-center mb-6 text-blue-600';
    }
  }

  const container = Box({
    children: [
      Typography({
        tag: 'h2',
        children: 'Contador Interativo',
        className: 'text-2xl font-semibold text-center mb-4'
      }),
      display,
      Box({
        children: [botaoDecrementar, botaoIncrementar, botaoReset],
        className: 'flex justify-center'
      })
    ],
    className: 'max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg'
  });

  return container;
}

document.body.appendChild(criarContadorInterativo());
```