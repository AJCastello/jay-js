---
category: Utilitários
categoryId: 7
articleId: 5
slug: utils-examples
title: Exemplos Práticos
description: Exemplos práticos e casos de uso para as funções utilitárias da biblioteca @jay-js/system.
---

# Exemplos Práticos

## Referência da API

```typescript
// Importações principais
import { 
  selector, selectors, render, uniKey 
} from '@jay-js/system';
```

## Visão Geral

Esta página apresenta exemplos práticos do uso combinado das funções utilitárias disponíveis no pacote `@jay-js/system`. Os exemplos demonstram como essas funções podem ser usadas em conjunto para criar interfaces interativas e funcionalidades comuns em aplicações web.

## Exemplo 1: Gerenciador de Tarefas

Um exemplo completo de um gerenciador de tarefas que utiliza todas as funções utilitárias:

```typescript
import { selector, selectors, render, uniKey } from '@jay-js/system';

// Modelo de dados
const tasks = [
  { id: uniKey(), text: 'Estudar JavaScript', completed: true },
  { id: uniKey(), text: 'Criar uma aplicação web', completed: false },
  { id: uniKey(), text: 'Fazer exercícios', completed: false }
];

// Renderizar tarefas
function renderTasks() {
  // Criar elementos de tarefa
  const taskElements = tasks.map(task => {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.dataset.id = task.id;
    
    if (task.completed) {
      li.classList.add('completed');
    }
    
    li.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''}>
      <span>${task.text}</span>
      <button class="delete-btn">Excluir</button>
    `;
    
    return li;
  });
  
  // Renderizar no DOM
  render('#task-list', taskElements);
  
  // Configurar eventos
  setupTaskEvents();
  updateTaskCounter();
}

// Configurar manipuladores de eventos
function setupTaskEvents() {
  const taskList = selector('#task-list');
  
  if (taskList) {
    // Evento de marcação de conclusão
    taskList.addEventListener('change', e => {
      const target = e.target;
      if (target.type === 'checkbox') {
        const taskItem = target.closest('.task-item');
        const taskId = taskItem.dataset.id;
        
        // Atualizar modelo de dados
        const task = tasks.find(t => t.id === taskId);
        if (task) {
          task.completed = target.checked;
          
          // Atualizar visualização
          if (target.checked) {
            taskItem.classList.add('completed');
          } else {
            taskItem.classList.remove('completed');
          }
          
          updateTaskCounter();
        }
      }
    });
    
    // Evento de exclusão
    taskList.addEventListener('click', e => {
      const target = e.target;
      if (target.classList.contains('delete-btn')) {
        const taskItem = target.closest('.task-item');
        const taskId = taskItem.dataset.id;
        
        // Remover do modelo de dados
        const taskIndex = tasks.findIndex(t => t.id === taskId);
        if (taskIndex !== -1) {
          tasks.splice(taskIndex, 1);
          
          // Remover do DOM
          taskItem.remove();
          updateTaskCounter();
        }
      }
    });
  }
}

// Atualizar contador de tarefas
function updateTaskCounter() {
  const counter = selector('#task-counter');
  
  if (counter) {
    const completed = tasks.filter(t => t.completed).length;
    const total = tasks.length;
    counter.textContent = `${completed} de ${total} tarefas completas`;
  }
}

// Adicionar nova tarefa
function addTask(text) {
  const newTask = {
    id: uniKey(),
    text,
    completed: false
  };
  
  tasks.push(newTask);
  renderTasks();
}

// Configurar formulário para adicionar tarefas
function setupAddTaskForm() {
  const form = selector('#add-task-form');
  
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      
      const input = selector<HTMLInputElement>('#new-task-input');
      
      if (input && input.value.trim()) {
        addTask(input.value.trim());
        input.value = '';
        input.focus();
      }
    });
  }
}

// Inicializar a aplicação
document.addEventListener('DOMContentLoaded', () => {
  renderTasks();
  setupAddTaskForm();
});
```

## Exemplo 2: Galeria de Imagens

Uma galeria de imagens com opção de visualização em lightbox:

```typescript
import { selector, selectors, render, uniKey } from '@jay-js/system';

// Dados da galeria
const images = [
  { id: uniKey(), src: 'https://exemplo.com/imagem1.jpg', title: 'Natureza' },
  { id: uniKey(), src: 'https://exemplo.com/imagem2.jpg', title: 'Cidade' },
  { id: uniKey(), src: 'https://exemplo.com/imagem3.jpg', title: 'Pessoas' },
  { id: uniKey(), src: 'https://exemplo.com/imagem4.jpg', title: 'Tecnologia' }
];

// Renderizar galeria
function renderGallery() {
  const galleryItems = images.map(image => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.dataset.id = image.id;
    
    item.innerHTML = `
      <img src="${image.src}" alt="${image.title}">
      <div class="caption">${image.title}</div>
    `;
    
    return item;
  });
  
  render('#gallery', galleryItems);
  setupGalleryEvents();
}

// Configurar eventos da galeria
function setupGalleryEvents() {
  const gallery = selector('#gallery');
  
  if (gallery) {
    gallery.addEventListener('click', e => {
      const galleryItem = (e.target as HTMLElement).closest('.gallery-item');
      
      if (galleryItem) {
        const imageId = galleryItem.dataset.id;
        const image = images.find(img => img.id === imageId);
        
        if (image) {
          openLightbox(image);
        }
      }
    });
  }
}

// Abrir lightbox
function openLightbox(image) {
  // Criar elementos do lightbox
  const lightbox = document.createElement('div');
  lightbox.id = `lightbox-${uniKey(6)}`;
  lightbox.className = 'lightbox';
  
  lightbox.innerHTML = `
    <div class="lightbox-content">
      <button class="close-btn">&times;</button>
      <img src="${image.src}" alt="${image.title}">
      <h3>${image.title}</h3>
    </div>
  `;
  
  // Renderizar no body
  document.body.appendChild(lightbox);
  
  // Adicionar classe para animar fade-in
  setTimeout(() => {
    lightbox.classList.add('active');
  }, 10);
  
  // Configurar evento para fechar
  setupLightboxEvents(lightbox);
}

// Configurar eventos do lightbox
function setupLightboxEvents(lightbox) {
  const closeBtn = selector('.close-btn', lightbox);
  
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      closeLightbox(lightbox);
    });
  }
  
  // Fechar ao clicar fora da imagem
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) {
      closeLightbox(lightbox);
    }
  });
  
  // Fechar com tecla ESC
  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') {
      closeLightbox(lightbox);
      document.removeEventListener('keydown', escHandler);
    }
  });
}

// Fechar lightbox
function closeLightbox(lightbox) {
  lightbox.classList.remove('active');
  
  // Remover após animação
  setTimeout(() => {
    lightbox.remove();
  }, 300);
}

// Inicializar
document.addEventListener('DOMContentLoaded', renderGallery);
```

## Exemplo 3: Formulário Dinâmico

Um formulário dinâmico com validação e campos gerados automaticamente:

```typescript
import { selector, selectors, render, uniKey } from '@jay-js/system';

// Definição dos campos do formulário
const formFields = [
  { 
    id: uniKey(), 
    type: 'text', 
    name: 'nome', 
    label: 'Nome Completo',
    required: true,
    validation: value => value.length >= 3 ? '' : 'O nome deve ter pelo menos 3 caracteres'
  },
  { 
    id: uniKey(), 
    type: 'email', 
    name: 'email', 
    label: 'E-mail',
    required: true,
    validation: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'E-mail inválido'
  },
  { 
    id: uniKey(), 
    type: 'tel', 
    name: 'telefone', 
    label: 'Telefone',
    required: false,
    validation: value => value === '' || /^\d{10,11}$/.test(value) ? '' : 'Telefone deve ter 10 ou 11 dígitos'
  },
  { 
    id: uniKey(), 
    type: 'select', 
    name: 'assunto', 
    label: 'Assunto',
    required: true,
    options: [
      { value: '', label: 'Selecione um assunto' },
      { value: 'suporte', label: 'Suporte Técnico' },
      { value: 'vendas', label: 'Vendas' },
      { value: 'feedback', label: 'Feedback' }
    ],
    validation: value => value ? '' : 'Por favor, selecione um assunto'
  },
  { 
    id: uniKey(), 
    type: 'textarea', 
    name: 'mensagem', 
    label: 'Mensagem',
    required: true,
    rows: 5,
    validation: value => value.length >= 10 ? '' : 'A mensagem deve ter pelo menos 10 caracteres'
  }
];

// Renderizar formulário
function renderForm() {
  const formElements = formFields.map(field => {
    const formGroup = document.createElement('div');
    formGroup.className = 'form-group';
    
    // Criar label
    const label = document.createElement('label');
    label.setAttribute('for', field.id);
    label.textContent = field.label;
    
    if (field.required) {
      const required = document.createElement('span');
      required.className = 'required';
      required.textContent = '*';
      label.appendChild(required);
    }
    
    // Criar campo
    let input;
    
    if (field.type === 'textarea') {
      input = document.createElement('textarea');
      input.rows = field.rows || 3;
    } else if (field.type === 'select') {
      input = document.createElement('select');
      
      field.options.forEach(option => {
        const optionEl = document.createElement('option');
        optionEl.value = option.value;
        optionEl.textContent = option.label;
        input.appendChild(optionEl);
      });
    } else {
      input = document.createElement('input');
      input.type = field.type;
    }
    
    input.id = field.id;
    input.name = field.name;
    input.required = field.required;
    input.className = 'form-control';
    
    // Adicionar container para mensagem de erro
    const errorMsg = document.createElement('div');
    errorMsg.className = 'error-message';
    errorMsg.id = `error-${field.id}`;
    
    // Adicionar todos os elementos ao grupo
    formGroup.append(label, input, errorMsg);
    
    return formGroup;
  });
  
  // Adicionar botão de envio
  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.className = 'submit-button';
  submitBtn.textContent = 'Enviar';
  
  const formContainer = document.createElement('div');
  formContainer.append(...formElements, submitBtn);
  
  render('#contact-form', formContainer);
  
  setupFormValidation();
}

// Configurar validação de formulário
function setupFormValidation() {
  const form = selector('#contact-form');
  
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      
      let isValid = true;
      
      // Validar cada campo
      formFields.forEach(field => {
        const input = selector(`#${field.id}`);
        const errorEl = selector(`#error-${field.id}`);
        
        if (input && errorEl) {
          const value = (input as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement).value;
          const error = field.validation(value);
          
          if (error) {
            errorEl.textContent = error;
            input.classList.add('invalid');
            isValid = false;
          } else {
            errorEl.textContent = '';
            input.classList.remove('invalid');
          }
        }
      });
      
      // Se todos os campos forem válidos, enviar formulário
      if (isValid) {
        submitForm();
      }
    });
    
    // Validação em tempo real
    formFields.forEach(field => {
      const input = selector(`#${field.id}`);
      
      if (input) {
        input.addEventListener('blur', () => {
          const errorEl = selector(`#error-${field.id}`);
          const value = (input as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement).value;
          const error = field.validation(value);
          
          if (error && errorEl) {
            errorEl.textContent = error;
            input.classList.add('invalid');
          } else if (errorEl) {
            errorEl.textContent = '';
            input.classList.remove('invalid');
          }
        });
      }
    });
  }
}

// Simulação de envio do formulário
function submitForm() {
  const form = selector('#contact-form') as HTMLFormElement;
  
  if (form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Mostrar mensagem de carregamento
    render('#form-status', '<div class="loading">Enviando...</div>');
    
    // Simular uma requisição
    setTimeout(() => {
      console.log('Dados enviados:', data);
      
      // Mostrar mensagem de sucesso
      render('#form-status', '<div class="success">Formulário enviado com sucesso!</div>');
      
      // Limpar formulário
      form.reset();
      
      // Remover mensagem após alguns segundos
      setTimeout(() => {
        render('#form-status', '');
      }, 5000);
    }, 1500);
  }
}

// Inicializar
document.addEventListener('DOMContentLoaded', renderForm);
```

## Exemplo 4: Sistema de Abas (Tabs)

Sistema de abas dinâmico para organizar conteúdo:

```typescript
import { selector, selectors, render, uniKey } from '@jay-js/system';

// Dados das abas
const tabs = [
  {
    id: uniKey(),
    title: 'Visão Geral',
    content: '<h2>Visão Geral</h2><p>Esta é a página de visão geral do produto.</p>'
  },
  {
    id: uniKey(),
    title: 'Características',
    content: '<h2>Características</h2><ul><li>Característica 1</li><li>Característica 2</li><li>Característica 3</li></ul>'
  },
  {
    id: uniKey(),
    title: 'Especificações',
    content: '<h2>Especificações</h2><table>...</table>'
  },
  {
    id: uniKey(),
    title: 'Avaliações',
    content: '<h2>Avaliações dos Clientes</h2><div class="reviews">...</div>'
  }
];

// Renderizar sistema de abas
function renderTabs() {
  // Criar navegação das abas
  const tabButtons = tabs.map((tab, index) => {
    const button = document.createElement('button');
    button.className = `tab-button ${index === 0 ? 'active' : ''}`;
    button.dataset.id = tab.id;
    button.textContent = tab.title;
    return button;
  });
  
  const tabNav = document.createElement('div');
  tabNav.className = 'tab-nav';
  tabNav.append(...tabButtons);
  
  // Criar contêiner de conteúdo
  const tabContent = document.createElement('div');
  tabContent.className = 'tab-content';
  tabContent.innerHTML = tabs[0].content;
  tabContent.dataset.activeTab = tabs[0].id;
  
  // Renderizar estrutura das abas
  const tabsContainer = document.createElement('div');
  tabsContainer.className = 'tabs-container';
  tabsContainer.append(tabNav, tabContent);
  
  render('#tabs', tabsContainer);
  
  // Configurar eventos para troca de abas
  setupTabEvents();
}

// Configurar eventos das abas
function setupTabEvents() {
  const tabNav = selector('.tab-nav');
  
  if (tabNav) {
    tabNav.addEventListener('click', e => {
      const target = e.target as HTMLElement;
      
      if (target.classList.contains('tab-button')) {
        const tabId = target.dataset.id;
        
        // Encontrar a aba correspondente
        const tab = tabs.find(t => t.id === tabId);
        
        if (tab) {
          // Atualizar botões ativos
          selectors('.tab-button').forEach(btn => {
            btn.classList.remove('active');
          });
          target.classList.add('active');
          
          // Atualizar conteúdo
          const tabContent = selector('.tab-content');
          if (tabContent) {
            // Adicionar classe para animação de saída
            tabContent.classList.add('fade-out');
            
            // Atualizar conteúdo após a animação de saída
            setTimeout(() => {
              tabContent.innerHTML = tab.content;
              tabContent.dataset.activeTab = tab.id;
              
              // Remover classe de saída e adicionar entrada
              tabContent.classList.remove('fade-out');
              tabContent.classList.add('fade-in');
              
              // Remover classe de entrada após a animação
              setTimeout(() => {
                tabContent.classList.remove('fade-in');
              }, 300);
            }, 200);
          }
        }
      }
    });
  }
}

// Inicializar
document.addEventListener('DOMContentLoaded', renderTabs);
```

Estes exemplos demonstram como os utilitários disponíveis no `@jay-js/system` podem ser combinados para criar funcionalidades comuns em aplicações web modernas. Cada exemplo pode ser adaptado e estendido de acordo com as necessidades específicas do seu projeto.