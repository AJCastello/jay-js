---
category: Utilitários
categoryId: 7
articleId: 4
slug: utils-core-keys
title: Chaves Únicas
description: Aprenda a gerar identificadores únicos para elementos, componentes e instâncias usando a função uniKey.
---

# Chaves Únicas

## Referência da API

### Função

```typescript
function uniKey(
  length = 10,
  chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz0123456789"
): string;
```

### Parâmetros

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `length` | `number` | Comprimento desejado da string (padrão: 10) |
| `chars` | `string` | Conjunto de caracteres a usar para gerar o ID (padrão: alfanumérico) |

### Retorno

| Tipo | Descrição |
|------|-----------|
| `string` | Uma string alfanumérica única |

## Visão Geral

A função `uniKey()` gera identificadores únicos e aleatórios usando valores criptograficamente seguros. Essa função é particularmente útil para criar IDs para elementos DOM, instâncias de componentes, sessões, ou qualquer outro caso onde identificadores únicos são necessários.

## Geração Básica de IDs

Na sua forma mais simples, a função `uniKey()` pode ser usada sem parâmetros, gerando uma string alfanumérica de 10 caracteres:

```typescript
import { uniKey } from '@jay-js/system';

// Gerar ID único com comprimento padrão (10 caracteres)
const id = uniKey();
console.log(id); // Ex: "Ab3Xz7pQ9r"
```

## Personalizando o Comprimento

Você pode personalizar o comprimento do ID gerado usando o primeiro parâmetro:

```typescript
import { uniKey } from '@jay-js/system';

// ID curto (6 caracteres)
const shortId = uniKey(6);
console.log(shortId); // Ex: "x7Kp9t"

// ID longo (20 caracteres)
const longId = uniKey(20);
console.log(longId); // Ex: "7xPq2dR8zL5wA1sB3tG9v"
```

## Personalizando o Conjunto de Caracteres

Você também pode personalizar o conjunto de caracteres usado para gerar o ID usando o segundo parâmetro:

```typescript
import { uniKey } from '@jay-js/system';

// Apenas letras minúsculas
const lettersOnly = uniKey(8, 'abcdefghijklmnopqrstuvwxyz');
console.log(lettersOnly); // Ex: "kdpcmeqx"

// Apenas números
const numbersOnly = uniKey(6, '0123456789');
console.log(numbersOnly); // Ex: "815374"

// Caracteres personalizados
const customChars = uniKey(10, 'ABCDEFGHabcdefgh0123');
console.log(customChars); // Ex: "Bd3hAc0fGe"
```

## Considerações de Segurança

A função `uniKey()` utiliza o objeto `crypto` nativo para gerar valores aleatórios criptograficamente seguros, o que a torna adequada para uso em contextos onde a previsibilidade ou a capacidade de adivinhação de IDs seria um problema de segurança.

> **Nota**: A exclusividade absoluta não é matematicamente garantida. Use comprimentos maiores para reduzir a probabilidade de colisões em sistemas com muitos IDs.

## Casos de Uso Comuns

### IDs para Elementos DOM

```typescript
import { uniKey } from '@jay-js/system';

// Criar um elemento com ID único
function createUniqueElement(tagName, className) {
  const element = document.createElement(tagName);
  element.id = `el-${uniKey(8)}`;
  if (className) {
    element.className = className;
  }
  return element;
}

// Criar elementos com IDs únicos
const header = createUniqueElement('header', 'page-header');
const main = createUniqueElement('main', 'content');
const footer = createUniqueElement('footer', 'page-footer');

console.log(header.id); // Ex: "el-Ax7tB9pQ"
```

### IDs para Componentes Relacionados

```typescript
import { uniKey } from '@jay-js/system';

// Criar componentes com IDs relacionados
function createFormField(labelText, fieldType = 'text') {
  const fieldId = `field-${uniKey(6)}`;
  
  const label = document.createElement('label');
  label.setAttribute('for', fieldId);
  label.textContent = labelText;
  
  const input = document.createElement('input');
  input.id = fieldId;
  input.type = fieldType;
  
  const container = document.createElement('div');
  container.className = 'form-field';
  container.append(label, input);
  
  return container;
}

// Criar campos de formulário
const nameField = createFormField('Nome');
const emailField = createFormField('Email', 'email');
const passwordField = createFormField('Senha', 'password');

document.getElementById('form-container').append(nameField, emailField, passwordField);
```

### Geração de Tokens

```typescript
import { uniKey } from '@jay-js/system';

// Gerar token para uso temporário
function generateToken() {
  // Token longo para maior segurança
  return uniKey(32);
}

// Simular sistema de recuperação de senha
function requestPasswordReset(email) {
  const token = generateToken();
  const expiresAt = new Date(Date.now() + 3600000); // 1 hora
  
  // Em um sistema real, armazenaria o token no banco de dados
  console.log(`Token para ${email}: ${token}`);
  console.log(`Expira em: ${expiresAt.toISOString()}`);
  
  // Enviar e-mail com link contendo o token
  const resetLink = `https://exemplo.com/reset-password?token=${token}&email=${encodeURIComponent(email)}`;
  
  return resetLink;
}

const resetLink = requestPasswordReset('usuario@exemplo.com');
console.log(`Link enviado: ${resetLink}`);
```

### Identificadores de Sessão

```typescript
import { uniKey } from '@jay-js/system';

// Inicializar sessão de usuário
function initUserSession(userId) {
  const sessionId = uniKey(16);
  const session = {
    id: sessionId,
    userId,
    startedAt: new Date(),
    lastActivity: new Date()
  };
  
  // Em um sistema real, armazenaria a sessão
  console.log('Sessão iniciada:', session);
  
  // Armazenar no localStorage (exemplo simplificado)
  localStorage.setItem('sessionId', sessionId);
  
  return session;
}

// Exemplo de uso
const session = initUserSession('user-123');
```

## Exemplo Prático: Sistema de Comentários

```typescript
import { uniKey, render, selector } from '@jay-js/system';

// Modelo de dados
const comments = [];

// Criar novo comentário
function addComment(author, content) {
  const comment = {
    id: uniKey(),
    author,
    content,
    createdAt: new Date(),
    likes: 0
  };
  
  comments.push(comment);
  renderComments();
}

// Renderizar comentários
function renderComments() {
  const commentElements = comments.map(comment => {
    const element = document.createElement('div');
    element.className = 'comment';
    element.id = `comment-${comment.id}`;
    
    const header = document.createElement('div');
    header.className = 'comment-header';
    header.innerHTML = `
      <strong>${comment.author}</strong>
      <span>${comment.createdAt.toLocaleString()}</span>
    `;
    
    const body = document.createElement('div');
    body.className = 'comment-body';
    body.textContent = comment.content;
    
    const footer = document.createElement('div');
    footer.className = 'comment-footer';
    footer.innerHTML = `
      <button data-id="${comment.id}" class="like-button">
        👍 ${comment.likes}
      </button>
      <button data-id="${comment.id}" class="reply-button">
        Responder
      </button>
    `;
    
    element.append(header, body, footer);
    return element;
  });
  
  render('#comments-container', commentElements);
  
  // Adicionar manipuladores de eventos
  setupEventListeners();
}

function setupEventListeners() {
  const container = selector('#comments-container');
  
  if (container) {
    container.addEventListener('click', e => {
      const target = e.target;
      if (target.matches('.like-button')) {
        const commentId = target.dataset.id;
        const comment = comments.find(c => c.id === commentId);
        if (comment) {
          comment.likes++;
          renderComments();
        }
      }
    });
  }
}

// Inicializar formulário de comentários
function initCommentForm() {
  const form = selector('#comment-form');
  
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      
      const authorInput = selector('#author-input');
      const contentInput = selector('#content-input');
      
      if (authorInput && contentInput) {
        const author = authorInput.value.trim();
        const content = contentInput.value.trim();
        
        if (author && content) {
          addComment(author, content);
          contentInput.value = '';
        }
      }
    });
  }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  initCommentForm();
  
  // Adicionar alguns comentários de exemplo
  addComment('Carlos Silva', 'Ótimo artigo! Obrigado por compartilhar.');
  addComment('Ana Oliveira', 'Isso me ajudou muito com meu projeto.');
});
``` 