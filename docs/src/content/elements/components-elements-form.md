---
category: Components
categoryId: 2
articleId: 2
slug: components-elements-form
title: Elementos de Formulário
description: Documentação completa dos componentes de formulário como Form, Button, Input, TextInput, TextArea, Checkbox, Radio, Range, Select e FileInput.
---

# Elementos de Formulário

## Form

**Propósito**: Container para formulários com todas as funcionalidades nativas do elemento `<form>` HTML.

**Assinatura TypeScript**:
```typescript
function Form<T extends TBaseTagMap = "form">(
  props?: TForm<T>
): HTMLElementTagNameMap[T]
```

**Exemplo de Uso**:
```typescript
import { Form, TextInput, Button } from '@jay-js/elements';

const loginForm = Form({
  className: 'space-y-4 max-w-md mx-auto',
  method: 'POST',
  action: '/login',
  onsubmit: (event) => {
    event.preventDefault();
    console.log('Formulário enviado');
  },
  children: [
    TextInput({
      name: 'username',
      placeholder: 'Nome de usuário',
      required: true
    }),
    TextInput({
      name: 'password',
      type: 'password',
      placeholder: 'Senha',
      required: true
    }),
    Button({
      type: 'submit',
      children: 'Entrar',
      className: 'btn btn-primary'
    })
  ]
});
```

---

## Button

**Propósito**: Elemento de botão interativo com todas as funcionalidades nativas do `<button>` HTML.

**Assinatura TypeScript**:
```typescript
function Button<T extends TBaseTagMap = "button">(
  props?: TButton<T>
): HTMLElementTagNameMap[T]
```

**Exemplo de Uso**:
```typescript
import { Button, useRef } from '@jay-js/elements';

// Botão simples
const simpleButton = Button({
  children: 'Clique aqui',
  className: 'btn btn-primary',
  onclick: () => alert('Botão clicado!')
});

// Botão com estados
const buttonRef = useRef<HTMLButtonElement>();
const statefulButton = Button({
  ref: buttonRef,
  children: 'Processar',
  className: 'btn btn-secondary',
  onclick: async (event) => {
    const button = event.currentTarget as HTMLButtonElement;
    button.disabled = true;
    button.textContent = 'Processando...';
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      button.textContent = 'Concluído!';
    } finally {
      setTimeout(() => {
        button.disabled = false;
        button.textContent = 'Processar';
      }, 1000);
    }
  }
});

// Botão com múltiplos event listeners
const advancedButton = Button({
  children: 'Botão Avançado',
  className: 'btn btn-outline',
  listeners: {
    mouseenter: () => console.log('Mouse entrou'),
    mouseleave: () => console.log('Mouse saiu'),
    focus: () => console.log('Botão focado'),
    blur: () => console.log('Botão perdeu foco')
  }
});
```

---

## Input

**Propósito**: Wrapper genérico para elementos de entrada com todos os tipos de input HTML suportados.

**Assinatura TypeScript**:
```typescript
function Input<T extends TBaseTagMap = "input">(
  props?: TInput<T>
): HTMLElementTagNameMap[T]
```

**Exemplo de Uso**:
```typescript
import { Input } from '@jay-js/elements';

// Input de email
const emailInput = Input({
  type: 'email',
  placeholder: 'seuemail@exemplo.com',
  className: 'input input-bordered w-full',
  required: true,
  oninput: (event) => {
    const target = event.target as HTMLInputElement;
    console.log('Email digitado:', target.value);
  }
});

// Input de número com validação
const numberInput = Input({
  type: 'number',
  min: 0,
  max: 100,
  step: 5,
  placeholder: 'Digite um número',
  className: 'input input-bordered',
  onchange: (event) => {
    const target = event.target as HTMLInputElement;
    const value = parseInt(target.value);
    if (value > 100) {
      target.setCustomValidity('Valor deve ser menor que 100');
    } else {
      target.setCustomValidity('');
    }
  }
});
```

---

## TextInput

**Propósito**: Input de texto especializado com type="text" pré-configurado.

**Assinatura TypeScript**:
```typescript
function TextInput<T extends TBaseTagMap = "input">(
  props?: TTextInput<T>
): HTMLElementTagNameMap[T]
```

**Exemplo de Uso**:
```typescript
import { TextInput, useRef } from '@jay-js/elements';

// Input de texto simples
const nameInput = TextInput({
  placeholder: 'Digite seu nome',
  className: 'input input-bordered w-full max-w-xs',
  maxLength: 50
});

// Input com validação em tempo real
const usernameRef = useRef<HTMLInputElement>();
const usernameInput = TextInput({
  ref: usernameRef,
  placeholder: 'Nome de usuário',
  className: 'input input-bordered',
  pattern: '[a-zA-Z0-9_]{3,20}',
  title: 'Nome de usuário deve ter 3-20 caracteres alfanuméricos',
  oninput: (event) => {
    const target = event.target as HTMLInputElement;
    const isValid = /^[a-zA-Z0-9_]{3,20}$/.test(target.value);
    
    target.classList.toggle('input-error', !isValid && target.value.length > 0);
    target.classList.toggle('input-success', isValid);
  }
});

// Input com máscara personalizada
const phoneInput = TextInput({
  placeholder: '(00) 00000-0000',
  className: 'input input-bordered',
  oninput: (event) => {
    const target = event.target as HTMLInputElement;
    let value = target.value.replace(/\D/g, '');
    
    if (value.length >= 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    }
    if (value.length >= 10) {
      value = `${value.slice(0, 10)}-${value.slice(10, 14)}`;
    }
    
    target.value = value;
  }
});
```

---

## TextArea

**Propósito**: Área de texto multilinha para entrada de conteúdo extenso.

**Assinatura TypeScript**:
```typescript
function TextArea<T extends TBaseTagMap = "textarea">(
  props?: TTextArea<T>
): HTMLElementTagNameMap[T]
```

**Exemplo de Uso**:
```typescript
import { TextArea } from '@jay-js/elements';

// Textarea básico
const messageArea = TextArea({
  placeholder: 'Digite sua mensagem...',
  className: 'textarea textarea-bordered w-full',
  rows: 4,
  maxLength: 500
});

// Textarea com contador de caracteres
const commentArea = TextArea({
  placeholder: 'Deixe seu comentário (máx. 280 caracteres)',
  className: 'textarea textarea-bordered',
  maxLength: 280,
  oninput: (event) => {
    const target = event.target as HTMLTextAreaElement;
    const remaining = 280 - target.value.length;
    
    // Assumindo que há um elemento para mostrar o contador
    const counter = document.getElementById('char-counter');
    if (counter) {
      counter.textContent = `${remaining} caracteres restantes`;
      counter.className = remaining < 20 ? 'text-warning' : 'text-base-content';
    }
  }
});

// Textarea com redimensionamento automático
const autoResizeArea = TextArea({
  placeholder: 'Este campo cresce automaticamente...',
  className: 'textarea textarea-bordered resize-none',
  rows: 2,
  oninput: (event) => {
    const target = event.target as HTMLTextAreaElement;
    target.style.height = 'auto';
    target.style.height = target.scrollHeight + 'px';
  }
});
```

---

## Checkbox

**Propósito**: Caixa de seleção para opções booleanas.

**Assinatura TypeScript**:
```typescript
function Checkbox<T extends TBaseTagMap = "input">(
  props?: TCheckbox<T>
): HTMLElementTagNameMap[T]
```

**Exemplo de Uso**:
```typescript
import { Checkbox } from '@jay-js/elements';

// Checkbox simples
const termsCheckbox = Checkbox({
  id: 'terms',
  className: 'checkbox checkbox-primary',
  required: true,
  onchange: (event) => {
    const target = event.target as HTMLInputElement;
    console.log('Termos aceitos:', target.checked);
  }
});

// Grupo de checkboxes
const hobbies = ['Leitura', 'Música', 'Esportes', 'Culinária'];
const hobbyCheckboxes = hobbies.map(hobby => 
  Checkbox({
    id: `hobby-${hobby.toLowerCase()}`,
    value: hobby,
    name: 'hobbies',
    className: 'checkbox',
    onchange: (event) => {
      const target = event.target as HTMLInputElement;
      console.log(`${hobby}: ${target.checked}`);
    }
  })
);

// Checkbox com estado indeterminado
const parentCheckbox = Checkbox({
  id: 'select-all',
  className: 'checkbox checkbox-primary',
  onmount: (element) => {
    const checkbox = element as HTMLInputElement;
    checkbox.indeterminate = true;
  },
  onchange: (event) => {
    const target = event.target as HTMLInputElement;
    const childCheckboxes = document.querySelectorAll('input[name="items"]');
    childCheckboxes.forEach((child: HTMLInputElement) => {
      child.checked = target.checked;
    });
  }
});
```

---

## Radio

**Propósito**: Botão de opção para seleção exclusiva entre múltiplas opções.

**Assinatura TypeScript**:
```typescript
function Radio<T extends TBaseTagMap = "input">(
  props?: TRadio<T>
): HTMLElementTagNameMap[T]
```

**Exemplo de Uso**:
```typescript
import { Radio } from '@jay-js/elements';

// Grupo de radio buttons
const genderOptions = [
  { value: 'masculino', label: 'Masculino' },
  { value: 'feminino', label: 'Feminino' },
  { value: 'outro', label: 'Outro' },
  { value: 'prefiro-nao-dizer', label: 'Prefiro não dizer' }
];

const genderRadios = genderOptions.map((option, index) => 
  Radio({
    id: `gender-${option.value}`,
    name: 'gender',
    value: option.value,
    className: 'radio radio-primary',
    defaultChecked: index === 0, // Primeira opção selecionada por padrão
    onchange: (event) => {
      const target = event.target as HTMLInputElement;
      if (target.checked) {
        console.log('Gênero selecionado:', target.value);
      }
    }
  })
);

// Radio com validação personalizada
const planRadio = Radio({
  name: 'subscription-plan',
  value: 'premium',
  className: 'radio radio-secondary',
  required: true,
  onchange: (event) => {
    const target = event.target as HTMLInputElement;
    if (target.checked && target.value === 'premium') {
      // Mostrar informações adicionais do plano premium
      console.log('Plano premium selecionado - recursos extras disponíveis');
    }
  }
});
```

---

## Range

**Propósito**: Controle deslizante para seleção de valores numéricos em um intervalo.

**Assinatura TypeScript**:
```typescript
function Range<T extends TBaseTagMap = "input">(
  props?: TRange<T>
): HTMLElementTagNameMap[T]
```

**Exemplo de Uso**:
```typescript
import { Range } from '@jay-js/elements';

// Range simples
const volumeRange = Range({
  min: 0,
  max: 100,
  value: 50,
  step: 5,
  className: 'range range-primary',
  oninput: (event) => {
    const target = event.target as HTMLInputElement;
    console.log('Volume:', target.value + '%');
  }
});

// Range com indicadores visuais
const priceRange = Range({
  min: 0,
  max: 1000,
  value: 250,
  step: 50,
  className: 'range range-secondary',
  onmount: (element) => {
    // Criar indicadores de valores
    const container = element.parentElement;
    if (container) {
      const labels = document.createElement('div');
      labels.className = 'w-full flex justify-between text-xs px-2';
      labels.innerHTML = `
        <span>R$ 0</span>
        <span>R$ 250</span>
        <span>R$ 500</span>
        <span>R$ 750</span>
        <span>R$ 1.000</span>
      `;
      container.appendChild(labels);
    }
  },
  oninput: (event) => {
    const target = event.target as HTMLInputElement;
    const priceDisplay = document.getElementById('price-display');
    if (priceDisplay) {
      priceDisplay.textContent = `R$ ${target.value}`;
    }
  }
});

// Range duplo (simulando range de preço)
let minPrice = 100;
let maxPrice = 800;

const minPriceRange = Range({
  min: 0,
  max: 1000,
  value: minPrice,
  step: 10,
  className: 'range range-accent',
  oninput: (event) => {
    const target = event.target as HTMLInputElement;
    minPrice = parseInt(target.value);
    
    // Garantir que min não seja maior que max
    const maxRange = document.getElementById('max-price-range') as HTMLInputElement;
    if (maxRange && minPrice >= maxPrice) {
      maxPrice = minPrice + 10;
      maxRange.value = maxPrice.toString();
    }
    
    console.log(`Faixa de preço: R$ ${minPrice} - R$ ${maxPrice}`);
  }
});
```

---

## Select

**Propósito**: Lista suspensa para seleção de opções.

**Assinatura TypeScript**:
```typescript
function Select<T extends TBaseTagMap = "select">(
  props?: TSelect<T>
): HTMLElementTagNameMap[T]
```

**Exemplo de Uso**:
```typescript
import { Select, SelectItem } from '@jay-js/elements';

// Select básico
const countrySelect = Select({
  className: 'select select-bordered w-full max-w-xs',
  required: true,
  onchange: (event) => {
    const target = event.target as HTMLSelectElement;
    console.log('País selecionado:', target.value);
  },
  children: [
    SelectItem({ value: '', children: 'Selecione um país...' }),
    SelectItem({ value: 'br', children: 'Brasil' }),
    SelectItem({ value: 'us', children: 'Estados Unidos' }),
    SelectItem({ value: 'uk', children: 'Reino Unido' }),
    SelectItem({ value: 'fr', children: 'França' })
  ]
});

// Select com grupos de opções
const categorySelect = Select({
  className: 'select select-bordered',
  onchange: (event) => {
    const target = event.target as HTMLSelectElement;
    console.log('Categoria selecionada:', target.value);
  },
  children: [
    SelectItem({ value: '', children: 'Escolha uma categoria' }),
    // Grupo Tecnologia
    Base({
      tag: 'optgroup',
      label: 'Tecnologia',
      children: [
        SelectItem({ value: 'web-dev', children: 'Desenvolvimento Web' }),
        SelectItem({ value: 'mobile-dev', children: 'Desenvolvimento Mobile' }),
        SelectItem({ value: 'data-science', children: 'Ciência de Dados' })
      ]
    }),
    // Grupo Design
    Base({
      tag: 'optgroup',
      label: 'Design',
      children: [
        SelectItem({ value: 'ui-ux', children: 'UI/UX Design' }),
        SelectItem({ value: 'graphic-design', children: 'Design Gráfico' }),
        SelectItem({ value: 'motion', children: 'Motion Design' })
      ]
    })
  ]
});

// Select múltiplo
const skillsSelect = Select({
  multiple: true,
  size: 5,
  className: 'select select-bordered',
  onchange: (event) => {
    const target = event.target as HTMLSelectElement;
    const selected = Array.from(target.selectedOptions).map(option => option.value);
    console.log('Habilidades selecionadas:', selected);
  },
  children: [
    SelectItem({ value: 'js', children: 'JavaScript' }),
    SelectItem({ value: 'ts', children: 'TypeScript' }),
    SelectItem({ value: 'react', children: 'React' }),
    SelectItem({ value: 'vue', children: 'Vue.js' }),
    SelectItem({ value: 'node', children: 'Node.js' })
  ]
});
```

---

## SelectItem

**Propósito**: Item de opção para uso dentro de elementos Select.

**Assinatura TypeScript**:
```typescript
function SelectItem<T extends TBaseTagMap = "option">(
  props?: TSelectItem<T>
): HTMLElementTagNameMap[T]
```

**Exemplo de Uso**:
```typescript
import { SelectItem } from '@jay-js/elements';

// Opção simples
const basicOption = SelectItem({
  value: 'option1',
  children: 'Opção 1'
});

// Opção com atributos adicionais
const premiumOption = SelectItem({
  value: 'premium',
  selected: true,
  disabled: false,
  dataset: { price: '99.99' },
  children: 'Plano Premium - R$ 99,99/mês'
});

// Opção desabilitada
const comingSoonOption = SelectItem({
  value: 'coming-soon',
  disabled: true,
  children: 'Em breve... (indisponível)'
});
```

---

## FileInput

**Propósito**: Input para upload de arquivos com suporte a múltiplos arquivos e tipos específicos.

**Assinatura TypeScript**:
```typescript
function FileInput<T extends TBaseTagMap = "input">(
  props?: TFileInput<T>
): HTMLElementTagNameMap[T]
```

**Exemplo de Uso**:
```typescript
import { FileInput } from '@jay-js/elements';

// Input de arquivo simples
const avatarInput = FileInput({
  accept: 'image/*',
  className: 'file-input file-input-bordered w-full max-w-xs',
  onchange: (event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      console.log('Arquivo selecionado:', file.name, file.size);
      
      // Preview da imagem
      const reader = new FileReader();
      reader.onload = (e) => {
        const preview = document.getElementById('avatar-preview') as HTMLImageElement;
        if (preview && e.target?.result) {
          preview.src = e.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }
});

// Input múltiplo com validação
const documentsInput = FileInput({
  multiple: true,
  accept: '.pdf,.doc,.docx',
  className: 'file-input file-input-bordered',
  onchange: (event) => {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    
    if (files) {
      const maxSize = 5 * 1024 * 1024; // 5MB
      const validFiles = Array.from(files).filter(file => {
        if (file.size > maxSize) {
          alert(`Arquivo ${file.name} é muito grande (máx. 5MB)`);
          return false;
        }
        return true;
      });
      
      console.log(`${validFiles.length} arquivos válidos selecionados`);
      validFiles.forEach(file => {
        console.log(`- ${file.name} (${(file.size / 1024).toFixed(1)}KB)`);
      });
    }
  }
});

// Input com drag & drop
const dropzoneInput = FileInput({
  multiple: true,
  accept: 'image/*',
  className: 'file-input file-input-ghost',
  onmount: (element) => {
    const container = element.parentElement;
    if (container) {
      container.addEventListener('dragover', (e) => {
        e.preventDefault();
        container.classList.add('dragover');
      });
      
      container.addEventListener('dragleave', () => {
        container.classList.remove('dragover');
      });
      
      container.addEventListener('drop', (e) => {
        e.preventDefault();
        container.classList.remove('dragover');
        const files = e.dataTransfer?.files;
        if (files) {
          (element as HTMLInputElement).files = files;
          // Disparar evento change
          element.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
    }
  },
  onchange: (event) => {
    const target = event.target as HTMLInputElement;
    console.log('Arquivos via drag & drop:', target.files?.length);
  }
});
```

---