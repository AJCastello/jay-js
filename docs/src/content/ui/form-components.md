---
category: UI
categoryId: 1
articleId: 7
slug: form-components
title: Componentes de Formulário
description: Componentes para entrada de dados e interação com formulários, incluindo text input, validação e controles especializados.
---

# Componentes de Formulário

Os componentes de formulário são fundamentais para capturar e validar dados do usuário. Esta categoria oferece controles modernos, acessíveis e altamente customizáveis para criar formulários eficientes e intuitivos.

## Referência da API

### Text Input

Campo de entrada de texto com suporte a adornos e múltiplas variações visuais.

#### Assinatura da Função
```typescript
function TextInput<T extends TBaseTagMap = "input">(
  options: TTextInput<T>
): HTMLElementTagNameMap[T]
```

#### Parâmetros
| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `placeholder` | `string` | Texto de placeholder para o input |
| `fullWidth` | `boolean` | Se o input deve ocupar toda a largura disponível |
| `variant` | `"input-ghost"` | Variação visual do input |
| `containerClassName` | `string` | Classes CSS para o container do input |
| `color` | `"input-primary" \| "input-secondary" \| "input-accent" \| "input-success" \| "input-warning" \| "input-info" \| "input-error"` | Cor do input |
| `inputSize` | `"input-xl" \| "input-lg" \| "input-md" \| "input-sm" \| "input-xs"` | Tamanho do input |
| `startAdornment` | `HTMLElement \| string \| ((inputElement: HTMLInputElement) => HTMLElement \| string)` | Elemento no início do input |
| `endAdornment` | `HTMLElement \| string \| ((inputElement: HTMLInputElement) => HTMLElement \| string)` | Elemento no final do input |

#### Valor de Retorno
Retorna um elemento HTML do tipo especificado no parâmetro genérico `T`, com todas as funcionalidades de input configuradas.

## Visão Geral

### Text Input - Campo de Texto Avançado
O componente TextInput oferece um campo de entrada de texto robusto e flexível, com suporte a adornos (ícones, botões), múltiplas cores temáticas e diferentes tamanhos.

**Características principais:**
- **Adornos Flexíveis**: Suporte a elementos no início e fim do input
- **Múltiplas Variações**: Cores temáticas e tamanhos diferenciados
- **Container Customizável**: Controle total sobre o layout do container
- **Largura Adaptável**: Opção de ocupar toda a largura disponível
- **Acessibilidade Nativa**: Baseado em elementos HTML padrão

**Funcionalidades avançadas:**
- Adornos dinâmicos baseados no estado do input
- Integração com sistemas de validação
- Suporte a diferentes tipos de input (text, email, password, etc.)
- Responsividade automática
- Estados visuais para feedback do usuário

## Uso Básico

### Input Simples
```typescript
import { TextInput } from '@jay-js/ui';

// Input básico
const nameInput = TextInput({
  placeholder: 'Digite seu nome',
  name: 'name',
  type: 'text'
});

// Input com tamanho específico
const emailInput = TextInput({
  placeholder: 'seu@email.com',
  type: 'email',
  inputSize: 'input-lg',
  color: 'input-primary'
});

// Input ocupando toda a largura
const messageInput = TextInput({
  placeholder: 'Sua mensagem...',
  name: 'message',
  fullWidth: true,
  className: 'mb-4'
});
```

### Input com Adornos
```typescript
import { TextInput } from '@jay-js/ui';

// Input com ícone no início
const searchInput = TextInput({
  placeholder: 'Pesquisar...',
  type: 'search',
  startAdornment: '🔍',
  className: 'w-full max-w-xs'
});

// Input com botão no final
const passwordInput = TextInput({
  placeholder: 'Senha',
  type: 'password',
  id: 'password-field',
  endAdornment: (inputElement) => {
    return 'button', {
      type: 'button',
      className: 'btn btn-ghost btn-sm',
      onclick: () => {
        const type = inputElement.type === 'password' ? 'text' : 'password';
        inputElement.type = type;
      },
      children: '👁️'
    };
  }
});

// Input com múltiplos adornos
const currencyInput = TextInput({
  placeholder: '0,00',
  type: 'number',
  startAdornment: 'R$',
  endAdornment: '.00',
  color: 'input-success',
  inputSize: 'input-lg'
});
```

### Estados e Validação
```typescript
import { TextInput } from '@jay-js/ui';

// Input com estado de erro
const emailWithError = TextInput({
  placeholder: 'Email',
  type: 'email',
  color: 'input-error',
  className: 'mb-2',
  'aria-invalid': true,
  'aria-describedby': 'email-error'
});

// Input com estado de sucesso
const validInput = TextInput({
  placeholder: 'Nome de usuário',
  color: 'input-success',
  endAdornment: '✓',
  'aria-describedby': 'username-success'
});

// Input desabilitado
const disabledInput = TextInput({
  placeholder: 'Campo desabilitado',
  disabled: true,
  className: 'opacity-60'
});
```

## Casos de Uso Comuns

### Formulário de Contato
```typescript
import { TextInput } from '@jay-js/ui';

function ContactForm({ onSubmit }) {
  return 'form', {
    onSubmit: (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      onSubmit(Object.fromEntries(formData));
    },
    className: 'space-y-4 max-w-md mx-auto',
    children: [
      // Nome
      'div', { className: 'form-control' },
      [
        'label', { 
          className: 'label',
          children: ['span', { 
            className: 'label-text',
            children: 'Nome Completo' 
          }]
        },
        TextInput({
          name: 'name',
          placeholder: 'Seu nome completo',
          required: true,
          fullWidth: true,
          startAdornment: '👤'
        })
      ],

      // Email
      'div', { className: 'form-control' },
      [
        'label', { 
          className: 'label',
          children: ['span', { 
            className: 'label-text',
            children: 'Email' 
          }]
        },
        TextInput({
          name: 'email',
          type: 'email',
          placeholder: 'seu@email.com',
          required: true,
          fullWidth: true,
          startAdornment: '✉️',
          color: 'input-primary'
        })
      ],

      // Telefone
      'div', { className: 'form-control' },
      [
        'label', { 
          className: 'label',
          children: ['span', { 
            className: 'label-text',
            children: 'Telefone' 
          }]
        },
        TextInput({
          name: 'phone',
          type: 'tel',
          placeholder: '(11) 99999-9999',
          fullWidth: true,
          startAdornment: '📱'
        })
      ],

      // Mensagem
      'div', { className: 'form-control' },
      [
        'label', { 
          className: 'label',
          children: ['span', { 
            className: 'label-text',
            children: 'Mensagem' 
          }]
        },
        'textarea', {
          name: 'message',
          className: 'textarea textarea-bordered w-full',
          placeholder: 'Sua mensagem...',
          rows: 4,
          required: true
        }
      ],

      // Botão de envio
      'div', { className: 'form-control mt-6' },
      ['button', {
        type: 'submit',
        className: 'btn btn-primary',
        children: 'Enviar Mensagem'
      }]
    ]
  };
}
```

### Campo de Pesquisa Avançado
```typescript
import { TextInput } from '@jay-js/ui';

function AdvancedSearchField({ onSearch, onClear, suggestions = [] }) {
  let searchTimeout;
  
  const handleSearch = (query) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      onSearch(query);
    }, 300); // Debounce
  };

  const searchInput = TextInput({
    placeholder: 'Pesquisar produtos, categorias...',
    type: 'search',
    fullWidth: true,
    inputSize: 'input-lg',
    startAdornment: '🔍',
    endAdornment: (inputElement) => {
      return 'div', {
        className: 'flex items-center gap-1',
        children: [
          // Contador de resultados
          'span', {
            id: 'search-count',
            className: 'text-xs text-gray-500 px-2',
            children: ''
          },
          
          // Botão de limpar
          'button', {
            type: 'button',
            className: 'btn btn-ghost btn-circle btn-xs',
            onclick: () => {
              inputElement.value = '';
              inputElement.focus();
              onClear?.();
            },
            children: '✕'
          }
        ]
      };
    },
    oninput: (e) => {
      const query = e.target.value;
      handleSearch(query);
      
      // Atualiza contador
      const counter = document.getElementById('search-count');
      if (counter) {
        counter.textContent = query.length > 0 ? 
          `${suggestions.length} resultado${suggestions.length !== 1 ? 's' : ''}` : 
          '';
      }
    },
    onkeydown: (e) => {
      if (e.key === 'Escape') {
        e.target.blur();
        onClear?.();
      }
    }
  });

  return 'div', {
    className: 'relative',
    children: [
      searchInput,
      
      // Sugestões
      suggestions.length > 0 && 'div', {
        className: 'absolute top-full left-0 right-0 z-50 mt-1 bg-base-100 rounded-lg shadow-lg border border-base-300 max-h-60 overflow-y-auto',
        children: suggestions.map((suggestion, index) => 
          'button', {
            type: 'button',
            className: 'w-full text-left px-4 py-2 hover:bg-base-200 flex items-center gap-3',
            onclick: () => {
              searchInput.value = suggestion.text;
              onSearch(suggestion.text);
            },
            children: [
              suggestion.icon && 'span', { children: suggestion.icon },
              'span', { children: suggestion.text },
              'span', { 
                className: 'ml-auto text-xs text-gray-500',
                children: suggestion.category 
              }
            ]
          }
        )
      }
    ]
  };
}
```

### Formulário de Configurações
```typescript
import { TextInput } from '@jay-js/ui';

function SettingsForm({ settings, onSettingsChange }) {
  const handleInputChange = (field, value) => {
    onSettingsChange({ ...settings, [field]: value });
  };

  return 'div', {
    className: 'space-y-6',
    children: [
      // Configurações de perfil
      'div', { className: 'card bg-base-100 shadow' },
      ['div', { className: 'card-body' },
      [
        'h3', { 
          className: 'card-title mb-4',
          children: 'Informações do Perfil' 
        },
        
        'div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-4' },
        [
          // Nome
          'div', { className: 'form-control' },
          [
            'label', { className: 'label' },
            ['span', { 
              className: 'label-text',
              children: 'Nome' 
            }],
            TextInput({
              value: settings.name || '',
              placeholder: 'Seu nome',
              fullWidth: true,
              startAdornment: '👤',
              oninput: (e) => handleInputChange('name', e.target.value)
            })
          ],

          // Email
          'div', { className: 'form-control' },
          [
            'label', { className: 'label' },
            ['span', { 
              className: 'label-text',
              children: 'Email' 
            }],
            TextInput({
              type: 'email',
              value: settings.email || '',
              placeholder: 'seu@email.com',
              fullWidth: true,
              startAdornment: '✉️',
              color: 'input-primary',
              oninput: (e) => handleInputChange('email', e.target.value)
            })
          ]
        ]
      ]],

      // Configurações de segurança
      'div', { className: 'card bg-base-100 shadow' },
      ['div', { className: 'card-body' },
      [
        'h3', { 
          className: 'card-title mb-4',
          children: 'Segurança' 
        },
        
        'div', { className: 'space-y-4' },
        [
          // Senha atual
          'div', { className: 'form-control' },
          [
            'label', { className: 'label' },
            ['span', { 
              className: 'label-text',
              children: 'Senha Atual' 
            }],
            TextInput({
              type: 'password',
              placeholder: 'Sua senha atual',
              fullWidth: true,
              startAdornment: '🔒',
              endAdornment: (inputElement) => 'button', {
                type: 'button',
                className: 'btn btn-ghost btn-sm',
                onclick: () => {
                  inputElement.type = inputElement.type === 'password' ? 'text' : 'password';
                },
                children: '👁️'
              }
            })
          ],

          // Nova senha
          'div', { className: 'form-control' },
          [
            'label', { className: 'label' },
            ['span', { 
              className: 'label-text',
              children: 'Nova Senha' 
            }],
            TextInput({
              type: 'password',
              placeholder: 'Nova senha',
              fullWidth: true,
              startAdornment: '🗝️',
              color: 'input-accent'
            })
          ]
        ]
      ]],

      // Configurações de notificações
      'div', { className: 'card bg-base-100 shadow' },
      ['div', { className: 'card-body' },
      [
        'h3', { 
          className: 'card-title mb-4',
          children: 'Notificações' 
        },
        
        'div', { className: 'space-y-4' },
        [
          // Email de notificação
          'div', { className: 'form-control' },
          [
            'label', { className: 'label' },
            [
              'span', { 
                className: 'label-text',
                children: 'Email para Notificações' 
              },
              'span', { 
                className: 'label-text-alt',
                children: 'Pode ser diferente do email principal' 
              }
            ],
            TextInput({
              type: 'email',
              value: settings.notificationEmail || settings.email || '',
              placeholder: 'email@notificacoes.com',
              fullWidth: true,
              startAdornment: '📧',
              color: 'input-info',
              oninput: (e) => handleInputChange('notificationEmail', e.target.value)
            })
          ],

          // Webhook URL
          'div', { className: 'form-control' },
          [
            'label', { className: 'label' },
            [
              'span', { 
                className: 'label-text',
                children: 'Webhook URL' 
              },
              'span', { 
                className: 'label-text-alt',
                children: 'Para integrações externas' 
              }
            ],
            TextInput({
              type: 'url',
              value: settings.webhookUrl || '',
              placeholder: 'https://api.exemplo.com/webhook',
              fullWidth: true,
              startAdornment: '🔗',
              variant: 'input-ghost',
              oninput: (e) => handleInputChange('webhookUrl', e.target.value)
            })
          ]
        ]
      ]]
    ]
  };
}
```

## Padrões Avançados

### Input com Validação em Tempo Real
```typescript
import { TextInput } from '@jay-js/ui';

class ValidatedInput {
  static create({ name, rules = [], onValidate, ...inputProps }) {
    const validate = (value) => {
      const errors = [];
      
      for (const rule of rules) {
        if (!rule.test(value)) {
          errors.push(rule.message);
        }
      }
      
      onValidate?.(errors);
      return errors.length === 0;
    };

    return 'div', {
      className: 'form-control',
      children: [
        TextInput({
          ...inputProps,
          name,
          oninput: (e) => {
            const isValid = validate(e.target.value);
            const input = e.target;
            const container = input.closest('.form-control');
            
            // Remove classes anteriores
            input.classList.remove('input-error', 'input-success');
            
            // Adiciona classe baseada na validação
            if (e.target.value) {
              input.classList.add(isValid ? 'input-success' : 'input-error');
            }
            
            // Atualiza mensagem de erro
            const errorMsg = container.querySelector('.error-message');
            if (errorMsg) {
              errorMsg.remove();
            }
            
            if (!isValid && e.target.value) {
              const errorDiv = document.createElement('div');
              errorDiv.className = 'error-message text-error text-sm mt-1';
              errorDiv.textContent = rules.find(rule => !rule.test(e.target.value))?.message || 'Valor inválido';
              container.appendChild(errorDiv);
            }
            
            inputProps.oninput?.(e);
          }
        })
      ]
    };
  }
}

// Uso
const emailInput = ValidatedInput.create({
  name: 'email',
  type: 'email',
  placeholder: 'Digite seu email',
  fullWidth: true,
  startAdornment: '✉️',
  rules: [
    {
      test: (value) => value.length > 0,
      message: 'Email é obrigatório'
    },
    {
      test: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: 'Formato de email inválido'
    }
  ],
  onValidate: (errors) => {
    console.log('Validation errors:', errors);
  }
});

const passwordInput = ValidatedInput.create({
  name: 'password',
  type: 'password', 
  placeholder: 'Crie uma senha forte',
  fullWidth: true,
  startAdornment: '🔒',
  rules: [
    {
      test: (value) => value.length >= 8,
      message: 'Senha deve ter pelo menos 8 caracteres'
    },
    {
      test: (value) => /(?=.*[a-z])(?=.*[A-Z])/.test(value),
      message: 'Senha deve conter maiúsculas e minúsculas'
    },
    {
      test: (value) => /(?=.*\d)/.test(value),
      message: 'Senha deve conter pelo menos um número'
    }
  ]
});
```

### Input com Máscara Dinâmica
```typescript
import { TextInput } from '@jay-js/ui';

class MaskedInput {
  static create({ mask, maskChar = '_', ...inputProps }) {
    const applyMask = (value, maskPattern) => {
      let masked = '';
      let valueIndex = 0;
      
      for (let i = 0; i < maskPattern.length && valueIndex < value.length; i++) {
        if (maskPattern[i] === '9') {
          if (/\d/.test(value[valueIndex])) {
            masked += value[valueIndex];
            valueIndex++;
          } else {
            break;
          }
        } else if (maskPattern[i] === 'A') {
          if (/[a-zA-Z]/.test(value[valueIndex])) {
            masked += value[valueIndex];
            valueIndex++;
          } else {
            break;
          }
        } else {
          masked += maskPattern[i];
        }
      }
      
      return masked;
    };

    return TextInput({
      ...inputProps,
      oninput: (e) => {
        const rawValue = e.target.value.replace(/[^\w]/g, '');
        const maskedValue = applyMask(rawValue, mask);
        e.target.value = maskedValue;
        
        inputProps.oninput?.(e);
      },
      onkeydown: (e) => {
        // Permite navegação e edição
        if (['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
          return;
        }
        
        // Bloqueia caracteres inválidos
        const cursorPos = e.target.selectionStart;
        const maskPos = mask[cursorPos];
        
        if (maskPos === '9' && !/\d/.test(e.key)) {
          e.preventDefault();
        } else if (maskPos === 'A' && !/[a-zA-Z]/.test(e.key)) {
          e.preventDefault();
        }
        
        inputProps.onkeydown?.(e);
      }
    });
  }

  static phone(props = {}) {
    return this.create({
      ...props,
      mask: '(99) 99999-9999',
      placeholder: props.placeholder || '(11) 99999-9999',
      startAdornment: props.startAdornment || '📱'
    });
  }

  static cpf(props = {}) {
    return this.create({
      ...props,
      mask: '999.999.999-99',
      placeholder: props.placeholder || '000.000.000-00',
      startAdornment: props.startAdornment || '🆔'
    });
  }

  static cep(props = {}) {
    return this.create({
      ...props,
      mask: '99999-999',
      placeholder: props.placeholder || '00000-000',
      startAdornment: props.startAdornment || '📍'
    });
  }
}

// Uso
const phoneField = MaskedInput.phone({
  name: 'phone',
  fullWidth: true,
  color: 'input-primary'
});

const cpfField = MaskedInput.cpf({
  name: 'cpf',
  fullWidth: true,
  color: 'input-accent'
});
```

### Sistema de Input Compostos
```typescript
import { TextInput } from '@jay-js/ui';

class CompositeInput {
  static addressInput({ onAddressChange, ...props }) {
    const fields = {
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      cep: ''
    };

    const updateAddress = (field, value) => {
      fields[field] = value;
      onAddressChange?.(fields);
    };

    return 'div', {
      className: 'space-y-4',
      children: [
        // CEP
        'div', { className: 'form-control' },
        [
          'label', { 
            className: 'label',
            children: ['span', { 
              className: 'label-text',
              children: 'CEP' 
            }]
          },
          TextInput({
            name: 'cep',
            placeholder: '00000-000',
            inputSize: 'input-md',
            startAdornment: '📍',
            oninput: (e) => {
              let cep = e.target.value.replace(/\D/g, '');
              if (cep.length > 5) {
                cep = cep.replace(/(\d{5})(\d{1,3})/, '$1-$2');
              }
              e.target.value = cep;
              
              updateAddress('cep', cep);
              
              // Auto-complete via API (exemplo)
              if (cep.length === 9) {
                fetchAddressByCep(cep).then(address => {
                  if (address) {
                    // Preenche campos automaticamente
                    const streetInput = e.target.closest('.space-y-4').querySelector('[name="street"]');
                    const neighborhoodInput = e.target.closest('.space-y-4').querySelector('[name="neighborhood"]');
                    const cityInput = e.target.closest('.space-y-4').querySelector('[name="city"]');
                    const stateInput = e.target.closest('.space-y-4').querySelector('[name="state"]');
                    
                    if (streetInput) streetInput.value = address.street;
                    if (neighborhoodInput) neighborhoodInput.value = address.neighborhood;
                    if (cityInput) cityInput.value = address.city;
                    if (stateInput) stateInput.value = address.state;
                    
                    updateAddress('street', address.street);
                    updateAddress('neighborhood', address.neighborhood);
                    updateAddress('city', address.city);
                    updateAddress('state', address.state);
                  }
                });
              }
            }
          })
        ],

        // Endereço e número
        'div', { className: 'grid grid-cols-1 md:grid-cols-4 gap-4' },
        [
          'div', { className: 'md:col-span-3 form-control' },
          [
            'label', { 
              className: 'label',
              children: ['span', { 
                className: 'label-text',
                children: 'Endereço' 
              }]
            },
            TextInput({
              name: 'street',
              placeholder: 'Rua, Avenida...',
              fullWidth: true,
              startAdornment: '🏠',
              oninput: (e) => updateAddress('street', e.target.value)
            })
          ],

          'div', { className: 'form-control' },
          [
            'label', { 
              className: 'label',
              children: ['span', { 
                className: 'label-text',
                children: 'Número' 
              }]
            },
            TextInput({
              name: 'number',
              placeholder: '123',
              fullWidth: true,
              oninput: (e) => updateAddress('number', e.target.value)
            })
          ]
        ],

        // Complemento
        'div', { className: 'form-control' },
        [
          'label', { 
            className: 'label',
            children: ['span', { 
              className: 'label-text',
              children: 'Complemento' 
            }]
          },
          TextInput({
            name: 'complement',
            placeholder: 'Apto, Bloco, Sala...',
            fullWidth: true,
            startAdornment: '🏢',
            oninput: (e) => updateAddress('complement', e.target.value)
          })
        ],

        // Bairro, Cidade e Estado
        'div', { className: 'grid grid-cols-1 md:grid-cols-3 gap-4' },
        [
          'div', { className: 'form-control' },
          [
            'label', { 
              className: 'label',
              children: ['span', { 
                className: 'label-text',
                children: 'Bairro' 
              }]
            },
            TextInput({
              name: 'neighborhood',
              placeholder: 'Bairro',
              fullWidth: true,
              oninput: (e) => updateAddress('neighborhood', e.target.value)
            })
          ],

          'div', { className: 'form-control' },
          [
            'label', { 
              className: 'label',
              children: ['span', { 
                className: 'label-text',
                children: 'Cidade' 
              }]
            },
            TextInput({
              name: 'city',
              placeholder: 'Cidade',
              fullWidth: true,
              oninput: (e) => updateAddress('city', e.target.value)
            })
          ],

          'div', { className: 'form-control' },
          [
            'label', { 
              className: 'label',
              children: ['span', { 
                className: 'label-text',
                children: 'Estado' 
              }]
            },
            TextInput({
              name: 'state',
              placeholder: 'UF',
              maxLength: 2,
              fullWidth: true,
              oninput: (e) => {
                e.target.value = e.target.value.toUpperCase();
                updateAddress('state', e.target.value);
              }
            })
          ]
        ]
      ]
    };
  }
}

// Função auxiliar para buscar endereço
async function fetchAddressByCep(cep) {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    
    if (data.erro) return null;
    
    return {
      street: data.logradouro,
      neighborhood: data.bairro,
      city: data.localidade,
      state: data.uf
    };
  } catch (error) {
    console.error('Erro ao buscar CEP:', error);
    return null;
  }
}
```

## Melhores Práticas

### 1. Acessibilidade
```typescript
// Sempre associe labels com inputs
const accessibleInput = 'div', {
  children: [
    'label', {
      htmlFor: 'user-name',
      className: 'label',
      children: ['span', { children: 'Nome' }]
    },
    TextInput({
      id: 'user-name',
      name: 'name',
      placeholder: 'Digite seu nome',
      'aria-describedby': 'name-help',
      required: true
    }),
    'div', {
      id: 'name-help',
      className: 'text-sm text-gray-500 mt-1',
      children: 'Nome completo conforme documento'
    }
  ]
};
```

### 2. Estados Visuais Consistentes
```typescript
// Use cores de forma consistente
const stateInputs = {
  default: TextInput({ color: undefined }),
  success: TextInput({ color: 'input-success' }),
  warning: TextInput({ color: 'input-warning' }),
  error: TextInput({ color: 'input-error' }),
  info: TextInput({ color: 'input-info' })
};
```

### 3. Responsividade
```typescript
// Considere diferentes tamanhos de tela
const responsiveInput = TextInput({
  inputSize: 'input-sm', // Mobile
  className: 'md:input-md lg:input-lg', // Tablets e desktop
  fullWidth: true
});
```

### 4. Performance com Debounce
```typescript
// Implemente debounce para ações custosas
function createDebouncedInput({ delay = 300, onSearch, ...props }) {
  let timeoutId;
  
  return TextInput({
    ...props,
    oninput: (e) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        onSearch(e.target.value);
      }, delay);
    }
  });
}
```

## Exemplo Completo: Formulário de Registro Avançado

```typescript
import { TextInput } from '@jay-js/ui';

function AdvancedRegistrationForm({ onSubmit }) {
  const formState = {
    personal: {},
    contact: {},
    security: {}
  };

  const updateFormState = (section, field, value) => {
    formState[section][field] = value;
  };

  return 'form', {
    onSubmit: (e) => {
      e.preventDefault();
      onSubmit(formState);
    },
    className: 'max-w-4xl mx-auto p-6 space-y-8',
    children: [
      'h1', { 
        className: 'text-3xl font-bold text-center mb-8',
        children: 'Criar Conta' 
      },

      // Seção de informações pessoais
      'div', { className: 'card bg-base-100 shadow-lg' },
      ['div', { className: 'card-body' },
      [
        'h2', { 
          className: 'card-title mb-4',
          children: '👤 Informações Pessoais' 
        },
        
        'div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-4' },
        [
          // Nome
          'div', { className: 'form-control' },
          [
            'label', { 
              className: 'label',
              children: ['span', { 
                className: 'label-text',
                children: 'Nome Completo *' 
              }]
            },
            TextInput({
              name: 'firstName',
              placeholder: 'Seu nome completo',
              required: true,
              fullWidth: true,
              startAdornment: '👤',
              oninput: (e) => updateFormState('personal', 'name', e.target.value)
            })
          ],

          // Data de nascimento
          'div', { className: 'form-control' },
          [
            'label', { 
              className: 'label',
              children: ['span', { 
                className: 'label-text',
                children: 'Data de Nascimento' 
              }]
            },
            TextInput({
              name: 'birthDate',
              type: 'date',
              fullWidth: true,
              startAdornment: '📅',
              max: new Date().toISOString().split('T')[0],
              oninput: (e) => updateFormState('personal', 'birthDate', e.target.value)
            })
          ]
        ]
      ]],

      // Seção de contato
      'div', { className: 'card bg-base-100 shadow-lg' },
      ['div', { className: 'card-body' },
      [
        'h2', { 
          className: 'card-title mb-4',
          children: '📧 Informações de Contato' 
        },
        
        'div', { className: 'space-y-4' },
        [
          // Email
          'div', { className: 'form-control' },
          [
            'label', { 
              className: 'label',
              children: ['span', { 
                className: 'label-text',
                children: 'Email *' 
              }]
            },
            TextInput({
              name: 'email',
              type: 'email',
              placeholder: 'seu@email.com',
              required: true,
              fullWidth: true,
              startAdornment: '✉️',
              color: 'input-primary',
              endAdornment: (inputElement) => {
                return 'button', {
                  type: 'button',
                  className: 'btn btn-ghost btn-sm',
                  onclick: async () => {
                    const email = inputElement.value;
                    if (email) {
                      // Verifica disponibilidade do email
                      const available = await checkEmailAvailability(email);
                      inputElement.classList.toggle('input-success', available);
                      inputElement.classList.toggle('input-error', !available);
                    }
                  },
                  children: '✓'
                };
              },
              oninput: (e) => updateFormState('contact', 'email', e.target.value)
            })
          ],

          // Telefone
          'div', { className: 'form-control' },
          [
            'label', { 
              className: 'label',
              children: ['span', { 
                className: 'label-text',
                children: 'Telefone' 
              }]
            },
            TextInput({
              name: 'phone',
              type: 'tel',
              placeholder: '(11) 99999-9999',
              fullWidth: true,
              startAdornment: '📱',
              oninput: (e) => {
                // Máscara de telefone
                let phone = e.target.value.replace(/\D/g, '');
                if (phone.length > 10) {
                  phone = phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
                } else if (phone.length > 6) {
                  phone = phone.replace(/(\d{2})(\d{4})(\d+)/, '($1) $2-$3');
                } else if (phone.length > 2) {
                  phone = phone.replace(/(\d{2})(\d+)/, '($1) $2');
                }
                e.target.value = phone;
                updateFormState('contact', 'phone', phone);
              }
            })
          ]
        ]
      ]],

      // Seção de segurança
      'div', { className: 'card bg-base-100 shadow-lg' },
      ['div', { className: 'card-body' },
      [
        'h2', { 
          className: 'card-title mb-4',
          children: '🔒 Configurações de Segurança' 
        },
        
        'div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-4' },
        [
          // Senha
          'div', { className: 'form-control' },
          [
            'label', { 
              className: 'label',
              children: ['span', { 
                className: 'label-text',
                children: 'Senha *' 
              }]
            },
            TextInput({
              name: 'password',
              type: 'password',
              placeholder: 'Crie uma senha forte',
              required: true,
              fullWidth: true,
              startAdornment: '🔒',
              color: 'input-accent',
              endAdornment: (inputElement) => {
                return 'button', {
                  type: 'button',
                  className: 'btn btn-ghost btn-sm',
                  onclick: () => {
                    inputElement.type = inputElement.type === 'password' ? 'text' : 'password';
                  },
                  children: '👁️'
                };
              },
              oninput: (e) => {
                const password = e.target.value;
                updateFormState('security', 'password', password);
                
                // Validação de força da senha
                const strength = calculatePasswordStrength(password);
                const indicator = e.target.closest('.form-control').querySelector('.password-strength');
                if (indicator) {
                  indicator.className = `password-strength text-sm mt-1 ${
                    strength < 3 ? 'text-error' : 
                    strength < 5 ? 'text-warning' : 'text-success'
                  }`;
                  indicator.textContent = 
                    strength < 2 ? 'Senha muito fraca' :
                    strength < 4 ? 'Senha fraca' :
                    strength < 6 ? 'Senha boa' : 'Senha forte';
                }
              }
            }),
            'div', { 
              className: 'password-strength text-sm mt-1',
              children: '' 
            }
          ],

          // Confirmação de senha
          'div', { className: 'form-control' },
          [
            'label', { 
              className: 'label',
              children: ['span', { 
                className: 'label-text',
                children: 'Confirmar Senha *' 
              }]
            },
            TextInput({
              name: 'confirmPassword',
              type: 'password',
              placeholder: 'Confirme sua senha',
              required: true,
              fullWidth: true,
              startAdornment: '🔐',
              oninput: (e) => {
                const confirmPassword = e.target.value;
                const password = formState.security.password;
                
                e.target.classList.toggle('input-success', confirmPassword === password && password.length > 0);
                e.target.classList.toggle('input-error', confirmPassword !== password && confirmPassword.length > 0);
              }
            })
          ]
        ]
      ]],

      // Botões de ação
      'div', { className: 'flex justify-between items-center pt-6' },
      [
        'button', {
          type: 'button',
          className: 'btn btn-ghost',
          children: 'Voltar'
        },
        'button', {
          type: 'submit',
          className: 'btn btn-primary btn-lg',
          children: 'Criar Conta'
        }
      ]
    ]
  };
}

// Funções auxiliares
async function checkEmailAvailability(email) {
  // Simulação de verificação
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(!email.includes('teste')); // Simula email indisponível
    }, 500);
  });
}

function calculatePasswordStrength(password) {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  if (password.length >= 12) strength++;
  return strength;
}
```

Este exemplo completo demonstra como criar formulários robustos e interativos usando o componente TextInput, incluindo validação em tempo real, máscaras, verificação de disponibilidade e feedback visual adequado.