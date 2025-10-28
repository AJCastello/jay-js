---
category: Examples
categoryId: 4
articleId: 9
slug: examples-testing
title: Padrões de Teste
description: Estratégias e exemplos de como testar componentes construídos com @jay-js/elements.
---

# Padrões de Teste

## 1. Funções Utilitárias para Teste

```typescript
// utils/test-helpers.ts
export function criarElementoTeste(componente) {
  const container = document.createElement('div');
  container.appendChild(componente);
  document.body.appendChild(container);
  
  return {
    container,
    elemento: componente,
    cleanup: () => {
      if (container.parentNode) {
        container.remove();
      }
    }
  };
}

export function simularEvento(elemento, tipo, dados = {}) {
  const evento = new Event(tipo, { bubbles: true });
  Object.assign(evento, dados);
  elemento.dispatchEvent(evento);
}

export function aguardarProximoTick() {
  return new Promise(resolve => requestAnimationFrame(resolve));
}

export function aguardarPromise(promise) {
  return promise.then(aguardarProximoTick);
}
```

## 2. Exemplo de Teste de Componente

```typescript
import { Button, TextInput, Form } from '@jay-js/elements';
import { criarElementoTeste, simularEvento, aguardarProximoTick } from './utils/test-helpers';

// Teste de formulário
async function testarFormulario() {
  console.log('🧪 Iniciando testes de formulário...');

  let dadosEnviados = null;
  
  const formulario = Form({
    children: [
      TextInput({
        id: 'campo-nome',
        placeholder: 'Nome',
        required: true
      }),
      Button({
        id: 'botao-enviar',
        type: 'submit',
        children: 'Enviar'
      })
    ],
    onsubmit: (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      dadosEnviados = Object.fromEntries(formData.entries());
    }
  });

  const { elemento, cleanup } = criarElementoTeste(formulario);

  try {
    // Teste 1: Verificar se elementos foram criados
    const campoNome = elemento.querySelector('#campo-nome');
    const botaoEnviar = elemento.querySelector('#botao-enviar');
    
    console.assert(campoNome !== null, '❌ Campo nome deveria existir');
    console.assert(botaoEnviar !== null, '❌ Botão enviar deveria existir');
    console.log('✅ Elementos criados corretamente');

    // Teste 2: Preencher campo e enviar formulário
    campoNome.value = 'João Silva';
    campoNome.name = 'nome'; // Necessário para FormData
    
    simularEvento(formulario, 'submit');
    await aguardarProximoTick();
    
    console.assert(dadosEnviados !== null, '❌ Dados deveriam ter sido enviados');
    console.assert(dadosEnviados.nome === 'João Silva', '❌ Nome deveria ser "João Silva"');
    console.log('✅ Formulário enviado corretamente');

    // Teste 3: Verificar validação HTML5
    campoNome.value = '';
    const validacao = campoNome.checkValidity();
    console.assert(!validacao, '❌ Campo vazio deveria ser inválido');
    console.log('✅ Validação HTML5 funcionando');

  } finally {
    cleanup();
  }

  console.log('✅ Todos os testes do formulário passaram!\n');
}

// Teste de componente com ciclo de vida
async function testarCicloDeVida() {
  console.log('🧪 Iniciando testes de ciclo de vida...');

  let montouChamado = false;
  let desmontouChamado = false;

  const componente = Box({
    children: 'Componente de teste',
    onmount: () => {
      montouChamado = true;
    },
    onunmount: () => {
      desmontouChamado = true;
    }
  });

  const { cleanup } = criarElementoTeste(componente);

  // Aguardar montagem
  await aguardarProximoTick();
  
  console.assert(montouChamado, '❌ onmount deveria ter sido chamado');
  console.log('✅ onmount chamado corretamente');

  // Limpar (desmontagem)
  cleanup();
  await aguardarProximoTick();

  console.assert(desmontouChamado, '❌ onunmount deveria ter sido chamado');
  console.log('✅ onunmount chamado corretamente');

  console.log('✅ Todos os testes de ciclo de vida passaram!\n');
}

// Teste de conteúdo assíncrono
async function testarConteudoAssincrono() {
  console.log('🧪 Iniciando testes de conteúdo assíncrono...');

  const promiseConteudo = new Promise(resolve => {
    setTimeout(() => {
      resolve(Typography({
        children: 'Conteúdo carregado!',
        id: 'conteudo-async'
      }));
    }, 100);
  });

  const container = Box({
    children: [
      Typography({ children: 'Carregando...', id: 'loading' }),
      promiseConteudo
    ]
  });

  const { elemento, cleanup } = criarElementoTeste(container);

  try {
    // Inicialmente deve mostrar loading
    let loading = elemento.querySelector('#loading');
    console.assert(loading !== null, '❌ Loading deveria estar presente');
    
    let conteudoAsync = elemento.querySelector('#conteudo-async');
    console.assert(conteudoAsync === null, '❌ Conteúdo async não deveria estar presente ainda');
    console.log('✅ Estado inicial correto');

    // Aguardar resolução da promise
    await aguardarPromise(promiseConteudo);

    // Verificar se conteúdo foi adicionado
    conteudoAsync = elemento.querySelector('#conteudo-async');
    console.assert(conteudoAsync !== null, '❌ Conteúdo async deveria estar presente');
    console.assert(conteudoAsync.textContent === 'Conteúdo carregado!', '❌ Texto incorreto');
    console.log('✅ Conteúdo assíncrono carregado corretamente');

  } finally {
    cleanup();
  }

  console.log('✅ Todos os testes de conteúdo assíncrono passaram!\n');
}

// Executar todos os testes
async function executarTodos() {
  console.log('🚀 Iniciando suite de testes do @jay-js/elements\n');
  
  try {
    await testarFormulario();
    await testarCicloDeVida();
    await testarConteudoAssincrono();
    
    console.log('🎉 Todos os testes passaram com sucesso!');
  } catch (error) {
    console.error('❌ Erro nos testes:', error);
  }
}

// Executar testes quando a página carregar
document.addEventListener('DOMContentLoaded', executarTodos);
```

---