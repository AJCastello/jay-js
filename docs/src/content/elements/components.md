# Referência de Componentes - @jay-js/elements

Este guia fornece documentação abrangente para todos os 21 componentes disponíveis no pacote `@jay-js/elements`. Cada componente oferece funcionalidades específicas com suporte completo ao TypeScript, gerenciamento de ciclo de vida e integração com Tailwind CSS.

## Índice

- [Elementos Base](#elementos-base)
  - [Base](#base)
  - [useRef](#useref)
  - [uniKey](#unikey)
- [Elementos de Formulário](#elementos-de-formulário)
  - [Form](#form)
  - [Button](#button)
  - [Input](#input)
  - [TextInput](#textinput)
  - [TextArea](#textarea)
  - [Checkbox](#checkbox)
  - [Radio](#radio)
  - [Range](#range)
  - [Select](#select)
  - [SelectItem](#selectitem)
  - [FileInput](#fileinput)
- [Elementos de Interface](#elementos-de-interface)
  - [Box](#box)
  - [Section](#section)
  - [Link](#link)
  - [Img](#img)
  - [Fragment](#fragment)
  - [Outlet](#outlet)
- [Tipografia](#tipografia)
  - [Typography](#typography)
- [Elementos de Lista](#elementos-de-lista)
  - [List](#list)
  - [ListItem](#listitem)
- [Elementos de Controle](#elementos-de-controle)
  - [Progress](#progress)

---

## Elementos Base

### Base

**Propósito**: A função fundamental que serve como base para todos os outros componentes. Fornece funcionalidades essenciais como gerenciamento de ciclo de vida, manipulação de referências e suporte a filhos baseados em Promises.

**Assinatura TypeScript**:
```typescript
function Base<T extends TBaseTagMap = "div">(
  props?: TBase<T>
): HTMLElementTagNameMap[T]

type TBase<T extends TBaseTagMap> = {
  tag?: T;
  className?: string;
  listeners?: Listener;
  ref?: TRefObject<HTMLElement>;
  dataset?: Partial<DOMStringMap>;
  style?: TStyle;
  children?: TChildren;
  onmount?: (element: HTMLElement) => void;
  onunmount?: (element: HTMLElement) => void;
} & Omit<Partial<TBaseTagNameMap[T]>, "children" | "style" | "size">;
```

**Propriedades Principais**:
- `tag`: Especifica o tipo de elemento HTML a ser criado (padrão: "div")
- `className`: Classes CSS para aplicar ao elemento
- `children`: Conteúdo filho (suporta Promises para carregamento lazy)
- `onmount`: Callback executado quando o elemento é montado no DOM
- `onunmount`: Callback executado quando o elemento é removido do DOM
- `ref`: Referência para acesso direto ao elemento DOM
- `listeners`: Object com event listeners para o elemento
- `style`: Estilos CSS inline aplicados ao elemento
- `dataset`: Atributos data-* para o elemento

**Exemplo de Uso**:
```typescript
import { Base, useRef } from '@jay-js/elements';

// Elemento simples
const simpleDiv = Base({
  tag: 'div',
  className: 'container mx-auto',
  children: 'Conteúdo do elemento'
});

// Elemento com ciclo de vida
const elementRef = useRef<HTMLElement>();
const lifecycleElement = Base({
  tag: 'section',
  ref: elementRef,
  className: 'fade-in',
  onmount: (element) => {
    console.log('Elemento montado:', element);
    element.classList.add('mounted');
  },
  onunmount: (element) => {
    console.log('Elemento desmontado:', element);
    element.classList.remove('mounted');
  },
  children: 'Elemento com ciclo de vida'
});

// Elemento com filhos Promise (carregamento lazy)
const lazyElement = Base({
  tag: 'div',
  children: fetch('/api/content')
    .then(res => res.text())
    .then(content => content)
});
```

**Recursos Especiais**:
- **Gerenciamento de Ciclo de Vida**: Registra automaticamente elementos customizados quando callbacks de ciclo de vida são fornecidos
- **Suporte a Promises**: Filhos podem ser Promises para carregamento assíncrono
- **Sistema de Referência**: Permite acesso direto ao elemento DOM
- **Event Listeners**: Suporte tanto a handlers diretos quanto ao objeto `listeners`

---

### useRef

**Propósito**: Cria um objeto de referência mutável que persiste e permite acesso direto a elementos DOM.

**Assinatura TypeScript**:
```typescript
function useRef<T>(): TRefObject<T>

type TRefObject<T> = {
  current: T | null;
}
```

**Exemplo de Uso**:
```typescript
import { Base, useRef } from '@jay-js/elements';

const buttonRef = useRef<HTMLButtonElement>();

const myButton = Base({
  tag: 'button',
  ref: buttonRef,
  children: 'Clique em mim',
  onclick: () => {
    if (buttonRef.current) {
      buttonRef.current.style.backgroundColor = 'blue';
      buttonRef.current.textContent = 'Clicado!';
    }
  }
});

// Acesso posterior ao elemento
setTimeout(() => {
  if (buttonRef.current) {
    buttonRef.current.focus();
  }
}, 1000);
```

---

### uniKey

**Propósito**: Gera chaves únicas para elementos, usado internamente pelo sistema para IDs automáticos.

**Uso**: Utilizado automaticamente pelo sistema quando um ID não é fornecido explicitamente.

---

## Elementos de Formulário

### Form

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

### Button

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

### Input

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

### TextInput

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

### TextArea

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

### Checkbox

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

### Radio

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

### Range

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

### Select

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

### SelectItem

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

### FileInput

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

## Elementos de Interface

### Box

**Propósito**: Container genérico (div) para layout e agrupamento de conteúdo.

**Assinatura TypeScript**:
```typescript
function Box<T extends TBaseTagMap = "div">(
  props?: TBox<T>
): HTMLElementTagNameMap[T]
```

**Exemplo de Uso**:
```typescript
import { Box } from '@jay-js/elements';

// Container simples
const contentBox = Box({
  className: 'p-4 bg-base-100 rounded-lg shadow-md',
  children: 'Conteúdo do container'
});

// Box flexível
const flexBox = Box({
  className: 'flex items-center justify-between p-4',
  children: [
    Box({ children: 'Item esquerda' }),
    Box({ children: 'Item direita' })
  ]
});

// Box com layout de grid
const gridBox = Box({
  className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6',
  children: Array.from({ length: 6 }, (_, i) => 
    Box({
      className: 'card bg-base-100 shadow-xl',
      children: `Card ${i + 1}`
    })
  )
});

// Box responsivo com breakpoints
const responsiveBox = Box({
  className: 'w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto',
  children: 'Container responsivo'
});

// Box com animação
const animatedBox = Box({
  className: 'transition-all duration-300 hover:scale-105 cursor-pointer',
  onclick: (event) => {
    const target = event.currentTarget as HTMLElement;
    target.classList.toggle('bg-primary');
    target.classList.toggle('text-primary-content');
  },
  children: 'Clique para animar'
});
```

---

### Section

**Propósito**: Elemento de seção semântica para estruturação de conteúdo.

**Assinatura TypeScript**:
```typescript
function Section<T extends TBaseTagMap = "section">(
  props?: TSection<T>
): HTMLElementTagNameMap[T]
```

**Exemplo de Uso**:
```typescript
import { Section, Typography } from '@jay-js/elements';

// Seção de conteúdo básica
const aboutSection = Section({
  className: 'py-12 px-4',
  children: [
    Typography({
      tag: 'h2',
      className: 'text-3xl font-bold mb-6',
      children: 'Sobre Nós'
    }),
    Typography({
      tag: 'p',
      className: 'text-lg text-base-content/80',
      children: 'Nossa história e missão...'
    })
  ]
});

// Seção hero
const heroSection = Section({
  className: 'hero min-h-screen bg-base-200',
  children: [
    Box({
      className: 'hero-content text-center',
      children: [
        Typography({
          tag: 'h1',
          className: 'text-5xl font-bold',
          children: 'Bem-vindos!'
        }),
        Typography({
          tag: 'p',
          className: 'py-6',
          children: 'Descubra nossa plataforma incrível.'
        })
      ]
    })
  ]
});

// Seção com ID para âncoras
const servicesSection = Section({
  id: 'servicos',
  className: 'section-services py-16',
  dataset: { section: 'services' },
  onmount: (element) => {
    // Observar quando a seção entra em viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          element.classList.add('animate-fade-in');
        }
      });
    });
    observer.observe(element);
  },
  children: 'Conteúdo dos serviços...'
});
```

---

### Link

**Propósito**: Elemento de âncora para navegação e links externos.

**Assinatura TypeScript**:
```typescript
function Link<T extends TBaseTagMap = "a">(
  props?: TLink<T>
): HTMLElementTagNameMap[T]
```

**Exemplo de Uso**:
```typescript
import { Link } from '@jay-js/elements';

// Link básico
const homeLink = Link({
  href: '/',
  className: 'link link-primary',
  children: 'Página Inicial'
});

// Link externo
const externalLink = Link({
  href: 'https://exemplo.com',
  target: '_blank',
  rel: 'noopener noreferrer',
  className: 'link link-secondary',
  children: 'Site Externo'
});

// Link com tratamento de navegação
const navigationLink = Link({
  href: '/sobre',
  className: 'btn btn-ghost',
  onclick: (event) => {
    event.preventDefault();
    console.log('Navegando para:', event.currentTarget.href);
    // Implementar navegação SPA
    history.pushState({}, '', '/sobre');
  },
  children: 'Sobre'
});

// Link de download
const downloadLink = Link({
  href: '/files/documento.pdf',
  download: 'meu-documento.pdf',
  className: 'btn btn-outline',
  children: 'Download PDF'
});

// Link com tooltip
const tooltipLink = Link({
  href: '/ajuda',
  className: 'link tooltip tooltip-bottom',
  dataset: { tip: 'Clique para obter ajuda' },
  children: 'Precisa de ajuda?'
});
```

---

### Img

**Propósito**: Elemento de imagem com suporte a lazy loading e tratamento de erros.

**Assinatura TypeScript**:
```typescript
function Img<T extends TBaseTagMap = "img">(
  props?: TImg<T>
): HTMLElementTagNameMap[T]
```

**Exemplo de Uso**:
```typescript
import { Img } from '@jay-js/elements';

// Imagem básica
const logoImg = Img({
  src: '/logo.png',
  alt: 'Logo da empresa',
  className: 'w-32 h-auto'
});

// Imagem responsiva
const heroImg = Img({
  src: '/hero-image.jpg',
  alt: 'Imagem principal',
  className: 'w-full h-96 object-cover rounded-lg',
  loading: 'lazy',
  onload: (event) => {
    console.log('Imagem carregada:', event.currentTarget.src);
  },
  onerror: (event) => {
    const img = event.currentTarget as HTMLImageElement;
    img.src = '/fallback-image.png';
    img.alt = 'Imagem não disponível';
  }
});

// Imagem com múltiplas fontes
const adaptiveImg = Img({
  src: '/image-large.jpg',
  srcset: '/image-small.jpg 480w, /image-medium.jpg 768w, /image-large.jpg 1200w',
  sizes: '(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw',
  alt: 'Imagem adaptativa',
  className: 'responsive-image'
});

// Avatar com placeholder
const avatarImg = Img({
  src: '/user-avatar.jpg',
  alt: 'Avatar do usuário',
  className: 'avatar w-16 h-16 rounded-full',
  onmount: (element) => {
    // Mostrar placeholder enquanto carrega
    const img = element as HTMLImageElement;
    img.style.backgroundColor = '#f3f4f6';
    img.style.backgroundImage = 'url("data:image/svg+xml,...")'; // placeholder SVG
  },
  onload: (event) => {
    const img = event.currentTarget as HTMLImageElement;
    img.style.backgroundColor = 'transparent';
    img.style.backgroundImage = 'none';
  }
});

// Galeria de imagens com lazy loading
const galleryImages = [
  'photo1.jpg', 'photo2.jpg', 'photo3.jpg'
].map(filename => 
  Img({
    src: `/gallery/${filename}`,
    alt: `Foto da galeria: ${filename}`,
    className: 'gallery-item w-full h-64 object-cover cursor-pointer',
    loading: 'lazy',
    onclick: (event) => {
      const img = event.currentTarget as HTMLImageElement;
      // Abrir modal ou lightbox
      console.log('Abrir imagem em tamanho completo:', img.src);
    }
  })
);
```

---

### Fragment

**Propósito**: Wrapper para document fragment, útil para agrupar elementos sem criar um container HTML.

**Assinatura TypeScript**:
```typescript
function Fragment(props?: TFragment): DocumentFragment
```

**Exemplo de Uso**:
```typescript
import { Fragment, Typography, Button } from '@jay-js/elements';

// Fragment básico
const buttonGroup = Fragment({
  children: [
    Button({
      children: 'Cancelar',
      className: 'btn btn-ghost'
    }),
    Button({
      children: 'Confirmar',
      className: 'btn btn-primary'
    })
  ]
});

// Fragment condicional
const conditionalContent = Fragment({
  children: userLoggedIn ? [
    Typography({
      children: `Bem-vindo, ${userName}!`
    }),
    Button({
      children: 'Logout',
      onclick: handleLogout
    })
  ] : [
    Button({
      children: 'Login',
      className: 'btn btn-primary'
    }),
    Button({
      children: 'Registrar',
      className: 'btn btn-outline'
    })
  ]
});

// Fragment com conteúdo async
const asyncFragment = Fragment({
  children: fetch('/api/notifications')
    .then(res => res.json())
    .then(notifications => 
      notifications.map(notif => 
        Typography({
          className: 'notification-item p-2 border-b',
          children: notif.message
        })
      )
    )
});
```

---

### Outlet

**Propósito**: Container especial para roteamento, usado como ponto de inserção de conteúdo dinâmico.

**Assinatura TypeScript**:
```typescript
function Outlet(): HTMLDivElement
```

**Propriedades Especiais**:
- `display: contents` - Não afeta o layout
- `data-router="outlet"` - Identificador para o sistema de roteamento

**Exemplo de Uso**:
```typescript
import { Outlet, Box, Link } from '@jay-js/elements';

// Layout principal com outlet
const mainLayout = Box({
  className: 'min-h-screen flex flex-col',
  children: [
    // Header
    Box({
      tag: 'header',
      className: 'navbar bg-base-100 shadow-lg',
      children: [
        Link({ href: '/', children: 'Home' }),
        Link({ href: '/about', children: 'Sobre' }),
        Link({ href: '/contact', children: 'Contato' })
      ]
    }),
    
    // Main content - aqui o conteúdo das rotas será inserido
    Box({
      tag: 'main',
      className: 'flex-1 container mx-auto p-4',
      children: Outlet() // Conteúdo dinâmico das rotas
    }),
    
    // Footer
    Box({
      tag: 'footer',
      className: 'footer bg-base-200 p-4',
      children: 'Footer content'
    })
  ]
});

// O sistema de roteamento irá inserir conteúdo no Outlet
// Exemplo conceitual de uso com router:
/*
router.route('/', () => HomePage());
router.route('/about', () => AboutPage());
router.route('/contact', () => ContactPage());
*/
```

---

## Tipografia

### Typography

**Propósito**: Componente flexível para todos os elementos de texto (p, h1-h6, span, label, etc.).

**Assinatura TypeScript**:
```typescript
function Typography<T extends TBaseTagMap = "p">(
  props?: TTypography<T>
): HTMLElementTagNameMap[T]
```

**Exemplo de Uso**:
```typescript
import { Typography } from '@jay-js/elements';

// Parágrafo básico
const paragraph = Typography({
  children: 'Este é um parágrafo de exemplo.'
});

// Títulos de diferentes níveis
const mainTitle = Typography({
  tag: 'h1',
  className: 'text-4xl font-bold mb-4',
  children: 'Título Principal'
});

const subTitle = Typography({
  tag: 'h2',
  className: 'text-2xl font-semibold mb-3 text-primary',
  children: 'Subtítulo'
});

const sectionTitle = Typography({
  tag: 'h3',
  className: 'text-xl font-medium mb-2',
  children: 'Título da Seção'
});

// Span inline
const highlight = Typography({
  tag: 'span',
  className: 'bg-yellow-200 px-1 rounded',
  children: 'texto destacado'
});

// Label para formulários
const inputLabel = Typography({
  tag: 'label',
  htmlFor: 'email-input',
  className: 'label-text font-medium',
  children: 'Endereço de Email'
});

// Texto com formatação rica
const richText = Typography({
  tag: 'p',
  className: 'text-base leading-relaxed',
  children: [
    'Este parágrafo contém ',
    Typography({
      tag: 'strong',
      children: 'texto em negrito'
    }),
    ', ',
    Typography({
      tag: 'em',
      children: 'texto em itálico'
    }),
    ' e ',
    Typography({
      tag: 'span',
      className: 'text-primary underline',
      children: 'texto colorido'
    }),
    '.'
  ]
});

// Citação
const quote = Typography({
  tag: 'blockquote',
  className: 'border-l-4 border-primary pl-4 italic text-lg',
  children: 'Esta é uma citação importante que merece destaque.'
});

// Código inline
const inlineCode = Typography({
  tag: 'code',
  className: 'bg-gray-100 px-2 py-1 rounded text-sm font-mono',
  children: 'const example = "código";'
});

// Texto responsivo
const responsiveText = Typography({
  tag: 'h1',
  className: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold',
  children: 'Título Responsivo'
});

// Texto com truncamento
const truncatedText = Typography({
  tag: 'p',
  className: 'truncate max-w-xs',
  title: 'Este é um texto muito longo que será truncado com reticências',
  children: 'Este é um texto muito longo que será truncado com reticências'
});

// Link estilizado como texto
const textLink = Typography({
  tag: 'a',
  href: '/saiba-mais',
  className: 'text-primary hover:underline cursor-pointer',
  children: 'Saiba mais sobre este tópico'
});
```

---

## Elementos de Lista

### List

**Propósito**: Container para listas ordenadas (ol) ou não ordenadas (ul).

**Assinatura TypeScript**:
```typescript
function List<T extends TBaseTagMap = "ul">(
  props?: TList<T>
): HTMLElementTagNameMap[T]
```

**Exemplo de Uso**:
```typescript
import { List, ListItem } from '@jay-js/elements';

// Lista não ordenada
const featuresList = List({
  className: 'list-disc list-inside space-y-2',
  children: [
    ListItem({ children: 'Interface intuitiva e moderna' }),
    ListItem({ children: 'Performance otimizada' }),
    ListItem({ children: 'Suporte completo ao TypeScript' }),
    ListItem({ children: 'Documentação abrangente' })
  ]
});

// Lista ordenada
const stepsList = List({
  tag: 'ol',
  className: 'list-decimal list-inside space-y-3',
  children: [
    ListItem({ children: 'Faça o download do pacote' }),
    ListItem({ children: 'Execute o comando de instalação' }),
    ListItem({ children: 'Configure as variáveis de ambiente' }),
    ListItem({ children: 'Inicie a aplicação' })
  ]
});

// Lista de navegação
const navList = List({
  className: 'menu menu-horizontal bg-base-100 rounded-box',
  children: [
    ListItem({
      children: Link({
        href: '/',
        className: 'menu-item',
        children: 'Home'
      })
    }),
    ListItem({
      children: Link({
        href: '/products',
        className: 'menu-item',
        children: 'Produtos'
      })
    }),
    ListItem({
      children: Link({
        href: '/contact',
        className: 'menu-item',
        children: 'Contato'
      })
    })
  ]
});

// Lista com conteúdo complexo
const cardsList = List({
  className: 'space-y-4',
  children: [
    ListItem({
      className: 'card bg-base-100 shadow-xl',
      children: Box({
        className: 'card-body',
        children: [
          Typography({
            tag: 'h3',
            className: 'card-title',
            children: 'Produto 1'
          }),
          Typography({
            children: 'Descrição do produto...'
          }),
          Box({
            className: 'card-actions justify-end',
            children: Button({
              className: 'btn btn-primary',
              children: 'Comprar'
            })
          })
        ]
      })
    }),
    // Mais itens...
  ]
});

// Lista dinâmica
const dynamicList = List({
  className: 'space-y-2',
  onmount: (element) => {
    // Carregar dados dinamicamente
    fetch('/api/items')
      .then(res => res.json())
      .then(items => {
        element.replaceChildren(
          ...items.map(item => 
            ListItem({
              key: item.id,
              className: 'p-2 hover:bg-base-200 rounded',
              children: item.name
            })
          )
        );
      });
  }
});
```

---

### ListItem

**Propósito**: Item individual de lista (li).

**Assinatura TypeScript**:
```typescript
function ListItem<T extends TBaseTagMap = "li">(
  props?: TListItem<T>
): HTMLElementTagNameMap[T]
```

**Exemplo de Uso**:
```typescript
import { ListItem, Typography, Button } from '@jay-js/elements';

// Item simples
const simpleItem = ListItem({
  children: 'Item da lista'
});

// Item com conteúdo rico
const richItem = ListItem({
  className: 'flex items-center justify-between p-3 border-b',
  children: [
    Box({
      children: [
        Typography({
          tag: 'h4',
          className: 'font-medium',
          children: 'Título do Item'
        }),
        Typography({
          className: 'text-sm text-base-content/70',
          children: 'Descrição adicional'
        })
      ]
    }),
    Button({
      className: 'btn btn-sm btn-ghost',
      children: 'Ação'
    })
  ]
});

// Item interativo
const interactiveItem = ListItem({
  className: 'cursor-pointer hover:bg-base-200 p-3 rounded transition-colors',
  onclick: (event) => {
    const item = event.currentTarget as HTMLElement;
    item.classList.toggle('selected');
    console.log('Item selecionado:', item.textContent);
  },
  children: 'Item clicável'
});

// Item com checkbox
const checkboxItem = ListItem({
  className: 'flex items-center gap-3 p-2',
  children: [
    Checkbox({
      id: 'task-1',
      onchange: (event) => {
        const checkbox = event.target as HTMLInputElement;
        const label = checkbox.nextElementSibling as HTMLElement;
        if (label) {
          label.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
        }
      }
    }),
    Typography({
      tag: 'label',
      htmlFor: 'task-1',
      className: 'cursor-pointer flex-1',
      children: 'Tarefa a ser completada'
    })
  ]
});

// Item arrastrável
const draggableItem = ListItem({
  draggable: true,
  className: 'draggable-item p-3 border rounded cursor-move',
  ondragstart: (event) => {
    const item = event.currentTarget as HTMLElement;
    event.dataTransfer?.setData('text/plain', item.id);
    item.classList.add('opacity-50');
  },
  ondragend: (event) => {
    const item = event.currentTarget as HTMLElement;
    item.classList.remove('opacity-50');
  },
  children: 'Arraste este item'
});
```

---

## Elementos de Controle

### Progress

**Propósito**: Barra de progresso para indicar o andamento de operações.

**Assinatura TypeScript**:
```typescript
function Progress<T extends TBaseTagMap = "progress">(
  props?: TProgress<T>
): HTMLElementTagNameMap[T]
```

**Exemplo de Uso**:
```typescript
import { Progress, Button, Typography } from '@jay-js/elements';

// Barra de progresso básica
const basicProgress = Progress({
  value: 70,
  max: 100,
  className: 'progress progress-primary w-full'
});

// Progresso indeterminado (carregando)
const loadingProgress = Progress({
  className: 'progress progress-primary w-full'
  // Sem value = progresso indeterminado
});

// Progresso com texto
const textProgress = Progress({
  value: 45,
  max: 100,
  className: 'progress progress-secondary w-full',
  onmount: (element) => {
    // Criar texto de porcentagem
    const container = element.parentElement;
    if (container) {
      const label = Typography({
        className: 'text-center text-sm font-medium mt-2',
        children: '45% concluído'
      });
      container.appendChild(label);
    }
  }
});

// Progresso animado
let currentProgress = 0;
const animatedProgress = Progress({
  value: currentProgress,
  max: 100,
  className: 'progress progress-accent w-full',
  onmount: (element) => {
    const progressEl = element as HTMLProgressElement;
    const interval = setInterval(() => {
      currentProgress += 1;
      progressEl.value = currentProgress;
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        console.log('Progresso concluído!');
      }
    }, 100);
  }
});

// Múltiplas barras de progresso
const skillsProgress = [
  { skill: 'JavaScript', level: 90 },
  { skill: 'TypeScript', level: 85 },
  { skill: 'React', level: 80 },
  { skill: 'Node.js', level: 75 }
].map(({ skill, level }) => 
  Box({
    className: 'mb-4',
    children: [
      Box({
        className: 'flex justify-between mb-1',
        children: [
          Typography({
            tag: 'span',
            className: 'font-medium',
            children: skill
          }),
          Typography({
            tag: 'span',
            className: 'text-sm text-base-content/70',
            children: `${level}%`
          })
        ]
      }),
      Progress({
        value: level,
        max: 100,
        className: 'progress progress-primary w-full'
      })
    ]
  })
);

// Progresso de upload com controle
let uploadProgress = 0;
const uploadProgressBar = Progress({
  value: uploadProgress,
  max: 100,
  className: 'progress progress-info w-full'
});

const uploadButton = Button({
  children: 'Iniciar Upload',
  className: 'btn btn-primary',
  onclick: () => {
    uploadProgress = 0;
    (uploadProgressBar as HTMLProgressElement).value = 0;
    
    // Simular upload
    const interval = setInterval(() => {
      uploadProgress += Math.random() * 10;
      (uploadProgressBar as HTMLProgressElement).value = Math.min(uploadProgress, 100);
      
      if (uploadProgress >= 100) {
        clearInterval(interval);
        alert('Upload concluído!');
      }
    }, 200);
  }
});

// Progresso com estados diferentes
const stateProgress = Progress({
  value: 30,
  max: 100,
  className: 'progress progress-error w-full', // Vermelho para erro
  dataset: { state: 'error' },
  onmount: (element) => {
    // Alterar cor baseado no progresso
    const progressEl = element as HTMLProgressElement;
    const updateColor = () => {
      const value = progressEl.value;
      const max = progressEl.max;
      const percentage = (value / max) * 100;
      
      progressEl.className = `progress w-full ${
        percentage < 30 ? 'progress-error' :
        percentage < 70 ? 'progress-warning' :
        'progress-success'
      }`;
    };
    
    // Observar mudanças no valor
    const observer = new MutationObserver(updateColor);
    observer.observe(progressEl, { 
      attributes: true, 
      attributeFilter: ['value'] 
    });
  }
});
```

---

## Padrões de Integração

### Gerenciamento de Ciclo de Vida

Todos os componentes suportam callbacks `onmount` e `onunmount` para gerenciamento de recursos:

```typescript
import { Base, useRef } from '@jay-js/elements';

const managedElement = Base({
  tag: 'div',
  onmount: (element) => {
    console.log('Elemento montado no DOM');
    
    // Configurar event listeners externos
    const handleResize = () => console.log('Janela redimensionada');
    window.addEventListener('resize', handleResize);
    
    // Armazenar referência para cleanup
    element.dataset.resizeListener = 'true';
  },
  
  onunmount: (element) => {
    console.log('Elemento sendo removido do DOM');
    
    // Cleanup de recursos
    if (element.dataset.resizeListener) {
      const handleResize = () => console.log('Janela redimensionada');
      window.removeEventListener('resize', handleResize);
    }
  }
});
```

### Sistema de Referências

Use `useRef` para acesso direto a elementos:

```typescript
import { Button, useRef } from '@jay-js/elements';

const buttonRef = useRef<HTMLButtonElement>();

const controlledButton = Button({
  ref: buttonRef,
  children: 'Botão Controlado',
  onclick: () => {
    if (buttonRef.current) {
      buttonRef.current.disabled = true;
      setTimeout(() => {
        if (buttonRef.current) {
          buttonRef.current.disabled = false;
        }
      }, 2000);
    }
  }
});
```

### Filhos Baseados em Promises

Suporte nativo para carregamento assíncrono de conteúdo:

```typescript
import { Box } from '@jay-js/elements';

const asyncContent = Box({
  children: [
    'Carregando dados...',
    fetch('/api/data')
      .then(res => res.json())
      .then(data => Typography({
        children: `Dados carregados: ${data.message}`
      }))
      .catch(error => Typography({
        className: 'text-error',
        children: `Erro: ${error.message}`
      }))
  ]
});
```

### Event Listeners Avançados

Use o objeto `listeners` para múltiplos event handlers:

```typescript
import { Base } from '@jay-js/elements';

const interactiveElement = Base({
  className: 'interactive-zone',
  listeners: {
    mouseenter: () => console.log('Mouse entrou'),
    mouseleave: () => console.log('Mouse saiu'),
    focus: () => console.log('Elemento focado'),
    blur: () => console.log('Elemento perdeu foco'),
    keydown: (event) => {
      if (event.key === 'Enter') {
        console.log('Enter pressionado');
      }
    }
  },
  children: 'Zona interativa'
});
```

---

## Boas Práticas

### 1. Sempre Use TypeScript
```typescript
// ✅ Correto - com tipagem explícita
const button = Button({
  children: 'Clique aqui',
  onclick: (event: MouseEvent) => {
    const target = event.currentTarget as HTMLButtonElement;
    target.disabled = true;
  }
});

// ❌ Evitar - sem tipagem
const button = Button({
  children: 'Clique aqui',
  onclick: (event) => {
    event.currentTarget.disabled = true; // Pode gerar erro
  }
});
```

### 2. Gerencie Recursos Adequadamente
```typescript
// ✅ Correto - cleanup adequado
const managedComponent = Base({
  onmount: (element) => {
    const interval = setInterval(() => {
      console.log('Tick');
    }, 1000);
    element.dataset.intervalId = interval.toString();
  },
  
  onunmount: (element) => {
    const intervalId = element.dataset.intervalId;
    if (intervalId) {
      clearInterval(parseInt(intervalId));
    }
  }
});
```

### 3. Use Referências Quando Necessário
```typescript
// ✅ Correto - ref para controle direto
const inputRef = useRef<HTMLInputElement>();
const input = TextInput({
  ref: inputRef,
  placeholder: 'Digite algo...'
});

// Controle posterior
setTimeout(() => {
  if (inputRef.current) {
    inputRef.current.focus();
  }
}, 1000);
```

### 4. Aproveite as Classes do Tailwind
```typescript
// ✅ Correto - classes responsivas e utilitárias
const responsiveBox = Box({
  className: 'w-full max-w-md mx-auto p-4 sm:p-6 md:p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'
});
```

### 5. Combine Elementos para Criar Componentes
```typescript
// ✅ Correto - componente personalizado
function Card({ title, content, actions }) {
  return Box({
    className: 'card bg-base-100 shadow-xl',
    children: [
      Box({
        className: 'card-body',
        children: [
          Typography({
            tag: 'h2',
            className: 'card-title',
            children: title
          }),
          Typography({
            children: content
          }),
          Box({
            className: 'card-actions justify-end',
            children: actions
          })
        ]
      })
    ]
  });
}
```

---

Esta documentação fornece uma visão completa de todos os componentes disponíveis no pacote `@jay-js/elements`. Cada componente é projetado para ser type-safe, flexível e fácil de usar, mantendo a compatibilidade total com HTML nativo e CSS frameworks como Tailwind CSS.

Para mais informações sobre implementação e exemplos avançados, consulte a documentação oficial do Jay JS framework.