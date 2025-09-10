---
category: Elements
categoryId: 1
articleId: 4
slug: examples
title: Exemplos Práticos e Casos de Uso
description: Exemplos completos do @jay-js/elements incluindo formulários, lifecycle, async content, componentes interativos, performance e testes.
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

## 📋 Formulários Avançados

### 1. Formulário de Contato Completo

```typescript
import { Form, TextInput, TextArea, Select, SelectItem, Checkbox, Button, Typography, Box } from '@jay-js/elements';

function criarFormularioContato() {
  const dadosFormulario = {
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: '',
    newsletter: false,
    urgencia: 'baixa'
  };

  const errors = {};

  const titulo = Typography({
    tag: 'h2',
    children: 'Entre em Contato',
    className: 'text-3xl font-bold text-center mb-6 text-gray-800'
  });

  const campoNome = TextInput({
    placeholder: 'Nome completo *',
    required: true,
    className: 'w-full px-4 py-3 border border-gray-300 rounded-lg mb-1 focus:outline-none focus:ring-2 focus:ring-blue-500',
    oninput: (e) => {
      dadosFormulario.nome = e.target.value;
      validarCampo('nome', e.target.value.trim().length >= 2, 'Nome deve ter pelo menos 2 caracteres');
    },
    onblur: (e) => validarCampo('nome', e.target.value.trim().length >= 2, 'Nome deve ter pelo menos 2 caracteres')
  });

  const erroNome = Typography({
    tag: 'div',
    children: '',
    className: 'text-red-500 text-sm mb-3 h-5'
  });

  const campoEmail = TextInput({
    type: 'email',
    placeholder: 'seu@email.com *',
    required: true,
    className: 'w-full px-4 py-3 border border-gray-300 rounded-lg mb-1 focus:outline-none focus:ring-2 focus:ring-blue-500',
    oninput: (e) => {
      dadosFormulario.email = e.target.value;
      const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value);
      validarCampo('email', emailValido, 'Email deve ter um formato válido');
    },
    onblur: (e) => {
      const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value);
      validarCampo('email', emailValido, 'Email deve ter um formato válido');
    }
  });

  const erroEmail = Typography({
    tag: 'div',
    children: '',
    className: 'text-red-500 text-sm mb-3 h-5'
  });

  const campoTelefone = TextInput({
    type: 'tel',
    placeholder: '(11) 99999-9999',
    className: 'w-full px-4 py-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500',
    oninput: (e) => {
      dadosFormulario.telefone = e.target.value;
      // Formatação automática do telefone
      let valor = e.target.value.replace(/\D/g, '');
      if (valor.length >= 11) {
        valor = valor.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      } else if (valor.length >= 7) {
        valor = valor.replace(/(\d{2})(\d{4})(\d+)/, '($1) $2-$3');
      } else if (valor.length >= 3) {
        valor = valor.replace(/(\d{2})(\d+)/, '($1) $2');
      }
      e.target.value = valor;
    }
  });

  const selectUrgencia = Select({
    className: 'w-full px-4 py-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500',
    onchange: (e) => {
      dadosFormulario.urgencia = e.target.value;
    }
  });

  selectUrgencia.appendChild(SelectItem({ value: 'baixa', children: 'Baixa urgência' }));
  selectUrgencia.appendChild(SelectItem({ value: 'media', children: 'Média urgência' }));
  selectUrgencia.appendChild(SelectItem({ value: 'alta', children: 'Alta urgência', selected: false }));

  const campoAssunto = TextInput({
    placeholder: 'Assunto *',
    required: true,
    className: 'w-full px-4 py-3 border border-gray-300 rounded-lg mb-1 focus:outline-none focus:ring-2 focus:ring-blue-500',
    oninput: (e) => {
      dadosFormulario.assunto = e.target.value;
      validarCampo('assunto', e.target.value.trim().length >= 3, 'Assunto deve ter pelo menos 3 caracteres');
    },
    onblur: (e) => validarCampo('assunto', e.target.value.trim().length >= 3, 'Assunto deve ter pelo menos 3 caracteres')
  });

  const erroAssunto = Typography({
    tag: 'div',
    children: '',
    className: 'text-red-500 text-sm mb-3 h-5'
  });

  const campoMensagem = TextArea({
    placeholder: 'Sua mensagem *',
    required: true,
    rows: 5,
    className: 'w-full px-4 py-3 border border-gray-300 rounded-lg mb-1 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none',
    oninput: (e) => {
      dadosFormulario.mensagem = e.target.value;
      validarCampo('mensagem', e.target.value.trim().length >= 10, 'Mensagem deve ter pelo menos 10 caracteres');
    },
    onblur: (e) => validarCampo('mensagem', e.target.value.trim().length >= 10, 'Mensagem deve ter pelo menos 10 caracteres')
  });

  const erroMensagem = Typography({
    tag: 'div',
    children: '',
    className: 'text-red-500 text-sm mb-3 h-5'
  });

  const checkboxNewsletter = Checkbox({
    id: 'newsletter',
    className: 'mr-2',
    onchange: (e) => {
      dadosFormulario.newsletter = e.target.checked;
    }
  });

  const labelNewsletter = Typography({
    tag: 'label',
    htmlFor: 'newsletter',
    children: 'Desejo receber newsletters e atualizações',
    className: 'text-sm text-gray-600 cursor-pointer'
  });

  const botaoEnviar = Button({
    type: 'submit',
    children: 'Enviar Mensagem',
    className: 'w-full px-6 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors',
    disabled: true
  });

  const formulario = Form({
    children: [
      titulo,
      campoNome, erroNome,
      campoEmail, erroEmail,
      campoTelefone,
      selectUrgencia,
      campoAssunto, erroAssunto,
      campoMensagem, erroMensagem,
      Box({
        children: [checkboxNewsletter, labelNewsletter],
        className: 'flex items-center mb-6'
      }),
      botaoEnviar
    ],
    className: 'max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-xl',
    onsubmit: (e) => {
      e.preventDefault();
      if (validarFormulario()) {
        console.log('Dados do formulário:', dadosFormulario);
        alert('Mensagem enviada com sucesso!');
        resetarFormulario();
      }
    }
  });

  function validarCampo(campo, valido, mensagem) {
    const elementoErro = {
      'nome': erroNome,
      'email': erroEmail,
      'assunto': erroAssunto,
      'mensagem': erroMensagem
    }[campo];

    if (valido) {
      errors[campo] = false;
      if (elementoErro) elementoErro.textContent = '';
    } else {
      errors[campo] = true;
      if (elementoErro) elementoErro.textContent = mensagem;
    }

    atualizarBotaoEnviar();
  }

  function validarFormulario() {
    const camposObrigatorios = ['nome', 'email', 'assunto', 'mensagem'];
    return camposObrigatorios.every(campo => !errors[campo] && dadosFormulario[campo].trim().length > 0);
  }

  function atualizarBotaoEnviar() {
    botaoEnviar.disabled = !validarFormulario();
  }

  function resetarFormulario() {
    Object.keys(dadosFormulario).forEach(key => {
      if (key === 'newsletter') dadosFormulario[key] = false;
      else if (key === 'urgencia') dadosFormulario[key] = 'baixa';
      else dadosFormulario[key] = '';
    });
    
    Object.keys(errors).forEach(key => errors[key] = false);
    
    formulario.reset();
    atualizarBotaoEnviar();
  }

  return formulario;
}

document.body.appendChild(criarFormularioContato());
```

### 2. Formulário Multi-etapas

```typescript
import { Box, Button, Typography, TextInput, Select, SelectItem, Radio } from '@jay-js/elements';

function criarFormularioMultiEtapas() {
  let etapaAtual = 0;
  const totalEtapas = 3;
  
  const dadosFormulario = {
    // Etapa 1: Informações pessoais
    nome: '',
    email: '',
    idade: '',
    // Etapa 2: Preferências
    area: '',
    experiencia: '',
    // Etapa 3: Contato
    telefone: '',
    melhorHorario: ''
  };

  const container = Box({
    className: 'max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-xl'
  });

  function criarIndicadorProgresso() {
    const indicadores = [];
    
    for (let i = 0; i < totalEtapas; i++) {
      const circulo = Box({
        children: (i + 1).toString(),
        className: `w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
          i <= etapaAtual ? 'bg-blue-600' : 'bg-gray-300'
        }`
      });
      
      indicadores.push(circulo);
      
      if (i < totalEtapas - 1) {
        const linha = Box({
          className: `flex-1 h-1 ${i < etapaAtual ? 'bg-blue-600' : 'bg-gray-300'}`
        });
        indicadores.push(linha);
      }
    }

    return Box({
      children: indicadores,
      className: 'flex items-center mb-8'
    });
  }

  function criarEtapa1() {
    return Box({
      children: [
        Typography({
          tag: 'h2',
          children: 'Informações Pessoais',
          className: 'text-2xl font-bold mb-6'
        }),
        TextInput({
          placeholder: 'Nome completo',
          value: dadosFormulario.nome,
          className: 'w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500',
          oninput: (e) => dadosFormulario.nome = e.target.value
        }),
        TextInput({
          type: 'email',
          placeholder: 'E-mail',
          value: dadosFormulario.email,
          className: 'w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500',
          oninput: (e) => dadosFormulario.email = e.target.value
        }),
        TextInput({
          type: 'number',
          placeholder: 'Idade',
          value: dadosFormulario.idade,
          className: 'w-full px-4 py-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500',
          oninput: (e) => dadosFormulario.idade = e.target.value
        })
      ]
    });
  }

  function criarEtapa2() {
    return Box({
      children: [
        Typography({
          tag: 'h2',
          children: 'Preferências Profissionais',
          className: 'text-2xl font-bold mb-6'
        }),
        Select({
          className: 'w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500',
          onchange: (e) => dadosFormulario.area = e.target.value,
          children: [
            SelectItem({ value: '', children: 'Selecione sua área' }),
            SelectItem({ value: 'frontend', children: 'Frontend' }),
            SelectItem({ value: 'backend', children: 'Backend' }),
            SelectItem({ value: 'fullstack', children: 'Fullstack' }),
            SelectItem({ value: 'mobile', children: 'Mobile' }),
            SelectItem({ value: 'design', children: 'Design' })
          ]
        }),
        Typography({
          tag: 'div',
          children: 'Nível de experiência:',
          className: 'font-semibold mb-3'
        }),
        ...['junior', 'pleno', 'senior'].map(nivel => 
          Box({
            children: [
              Radio({
                name: 'experiencia',
                value: nivel,
                id: `exp-${nivel}`,
                className: 'mr-2',
                onchange: (e) => {
                  if (e.target.checked) dadosFormulario.experiencia = nivel;
                }
              }),
              Typography({
                tag: 'label',
                htmlFor: `exp-${nivel}`,
                children: nivel.charAt(0).toUpperCase() + nivel.slice(1),
                className: 'cursor-pointer'
              })
            ],
            className: 'flex items-center mb-2'
          })
        )
      ]
    });
  }

  function criarEtapa3() {
    return Box({
      children: [
        Typography({
          tag: 'h2',
          children: 'Informações de Contato',
          className: 'text-2xl font-bold mb-6'
        }),
        TextInput({
          type: 'tel',
          placeholder: 'Telefone',
          value: dadosFormulario.telefone,
          className: 'w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500',
          oninput: (e) => dadosFormulario.telefone = e.target.value
        }),
        Typography({
          tag: 'div',
          children: 'Melhor horário para contato:',
          className: 'font-semibold mb-3'
        }),
        ...['manha', 'tarde', 'noite'].map(horario => 
          Box({
            children: [
              Radio({
                name: 'horario',
                value: horario,
                id: `hor-${horario}`,
                className: 'mr-2',
                onchange: (e) => {
                  if (e.target.checked) dadosFormulario.melhorHorario = horario;
                }
              }),
              Typography({
                tag: 'label',
                htmlFor: `hor-${horario}`,
                children: horario.charAt(0).toUpperCase() + horario.slice(1),
                className: 'cursor-pointer'
              })
            ],
            className: 'flex items-center mb-2'
          })
        )
      ]
    });
  }

  function criarBotoes() {
    const botaoAnterior = Button({
      children: 'Anterior',
      className: 'px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 mr-4',
      onclick: voltarEtapa,
      style: { display: etapaAtual === 0 ? 'none' : 'inline-block' }
    });

    const botaoProximo = Button({
      children: etapaAtual === totalEtapas - 1 ? 'Finalizar' : 'Próximo',
      className: 'px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700',
      onclick: etapaAtual === totalEtapas - 1 ? finalizarFormulario : proximaEtapa
    });

    return Box({
      children: [botaoAnterior, botaoProximo],
      className: 'flex justify-between mt-8'
    });
  }

  function renderizarEtapa() {
    container.innerHTML = '';
    
    const etapas = [criarEtapa1(), criarEtapa2(), criarEtapa3()];
    
    container.appendChild(criarIndicadorProgresso());
    container.appendChild(etapas[etapaAtual]);
    container.appendChild(criarBotoes());
  }

  function proximaEtapa() {
    if (validarEtapaAtual() && etapaAtual < totalEtapas - 1) {
      etapaAtual++;
      renderizarEtapa();
    }
  }

  function voltarEtapa() {
    if (etapaAtual > 0) {
      etapaAtual--;
      renderizarEtapa();
    }
  }

  function validarEtapaAtual() {
    switch (etapaAtual) {
      case 0:
        if (!dadosFormulario.nome || !dadosFormulario.email || !dadosFormulario.idade) {
          alert('Por favor, preencha todos os campos obrigatórios.');
          return false;
        }
        break;
      case 1:
        if (!dadosFormulario.area || !dadosFormulario.experiencia) {
          alert('Por favor, selecione sua área e nível de experiência.');
          return false;
        }
        break;
      case 2:
        if (!dadosFormulario.telefone || !dadosFormulario.melhorHorario) {
          alert('Por favor, preencha as informações de contato.');
          return false;
        }
        break;
    }
    return true;
  }

  function finalizarFormulario() {
    if (validarEtapaAtual()) {
      console.log('Dados completos:', dadosFormulario);
      alert('Formulário enviado com sucesso!');
    }
  }

  renderizarEtapa();
  return container;
}

document.body.appendChild(criarFormularioMultiEtapas());
```

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

## ⚡ Conteúdo Assíncrono

### 1. Carregamento de Dados com Loading States

```typescript
import { Box, Typography, Button } from '@jay-js/elements';

function criarCarregadorDados() {
  async function buscarDadosUsuario(id) {
    // Simula uma chamada à API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      id,
      nome: `Usuário ${id}`,
      email: `usuario${id}@exemplo.com`,
      avatar: `https://ui-avatars.com/api/?name=Usuario+${id}&background=0D8ABC&color=fff`
    };
  }

  function criarSkeletonLoader() {
    return Box({
      children: [
        Box({
          className: 'w-16 h-16 bg-gray-300 rounded-full animate-pulse mb-4'
        }),
        Box({
          className: 'h-4 bg-gray-300 rounded animate-pulse mb-2'
        }),
        Box({
          className: 'h-4 bg-gray-300 rounded animate-pulse w-3/4'
        })
      ],
      className: 'p-6 border border-gray-200 rounded-lg'
    });
  }

  function criarCartaoUsuario(usuario) {
    return Box({
      children: [
        Box({
          style: {
            backgroundImage: `url(${usuario.avatar})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          },
          className: 'w-16 h-16 rounded-full mb-4'
        }),
        Typography({
          tag: 'h3',
          children: usuario.nome,
          className: 'text-xl font-semibold mb-2'
        }),
        Typography({
          tag: 'p',
          children: usuario.email,
          className: 'text-gray-600'
        })
      ],
      className: 'p-6 border border-gray-200 rounded-lg bg-white shadow-sm'
    });
  }

  let proximoId = 1;

  const container = Box({
    className: 'max-w-4xl mx-auto p-6'
  });

  const titulo = Typography({
    tag: 'h2',
    children: 'Usuários Carregados Dinamicamente',
    className: 'text-2xl font-bold mb-6'
  });

  const botaoCarregar = Button({
    children: 'Carregar Novo Usuário',
    className: 'mb-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700',
    onclick: () => {
      const id = proximoId++;
      
      // Cria skeleton loader imediatamente
      const skeleton = criarSkeletonLoader();
      usuariosContainer.appendChild(skeleton);
      
      // Cria promise para carregar dados
      const promiseUsuario = buscarDadosUsuario(id).then(usuario => {
        return criarCartaoUsuario(usuario);
      });
      
      // Substitui skeleton quando os dados chegarem
      promiseUsuario.then(cartaoUsuario => {
        skeleton.replaceWith(cartaoUsuario);
      }).catch(error => {
        console.error('Erro ao carregar usuário:', error);
        skeleton.replaceWith(Typography({
          children: 'Erro ao carregar usuário',
          className: 'text-red-500 p-6'
        }));
      });
    }
  });

  const usuariosContainer = Box({
    className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
  });

  container.appendChild(titulo);
  container.appendChild(botaoCarregar);
  container.appendChild(usuariosContainer);

  return container;
}

document.body.appendChild(criarCarregadorDados());
```

### 2. Lazy Loading de Imagens

```typescript
import { Box, Typography, Img } from '@jay-js/elements';

function criarGaleriaLazyLoading() {
  const imagens = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    url: `https://picsum.photos/300/200?random=${i + 1}`,
    titulo: `Imagem ${i + 1}`,
    descricao: `Descrição da imagem ${i + 1}`
  }));

  function criarPlaceholderImagem() {
    return Box({
      children: [
        Box({
          className: 'w-full h-48 bg-gray-200 animate-pulse flex items-center justify-center'
        }),
        Typography({
          children: 'Carregando...',
          className: 'text-center mt-2 text-gray-500'
        })
      ],
      className: 'bg-white rounded-lg shadow-md overflow-hidden'
    });
  }

  function criarCartaoImagem(imagem) {
    const container = Box({
      className: 'bg-white rounded-lg shadow-md overflow-hidden'
    });

    // Promise para carregar a imagem
    const promiseImagem = new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve(Img({
          src: imagem.url,
          alt: imagem.titulo,
          className: 'w-full h-48 object-cover'
        }));
      };
      img.onerror = reject;
      img.src = imagem.url;
    });

    // Conteúdo do cartão com lazy loading
    const conteudoCartao = Box({
      children: [
        // A imagem será carregada assincronamente
        promiseImagem.catch(() => 
          Box({
            children: 'Erro ao carregar',
            className: 'w-full h-48 bg-red-100 flex items-center justify-center text-red-500'
          })
        ),
        Box({
          children: [
            Typography({
              tag: 'h3',
              children: imagem.titulo,
              className: 'font-semibold text-lg mb-1'
            }),
            Typography({
              children: imagem.descricao,
              className: 'text-gray-600 text-sm'
            })
          ],
          className: 'p-4'
        })
      ]
    });

    container.appendChild(conteudoCartao);
    return container;
  }

  const titulo = Typography({
    tag: 'h2',
    children: 'Galeria com Lazy Loading',
    className: 'text-3xl font-bold text-center mb-8'
  });

  const galeria = Box({
    children: imagens.map(imagem => {
      // Para demonstrar o loading, criamos um placeholder primeiro
      const placeholder = criarPlaceholderImagem();
      
      // Depois substituímos com o cartão real após um delay
      setTimeout(() => {
        const cartao = criarCartaoImagem(imagem);
        placeholder.replaceWith(cartao);
      }, Math.random() * 3000); // Delay aleatório para simular carregamento

      return placeholder;
    }),
    className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
  });

  return Box({
    children: [titulo, galeria],
    className: 'max-w-7xl mx-auto p-6'
  });
}

document.body.appendChild(criarGaleriaLazyLoading());
```

## 🎯 Componentes Interativos

### 1. Modal Dinâmico

```typescript
import { Box, Button, Typography, TextInput } from '@jay-js/elements';

function criarSistemaModal() {
  let modalAtivo = null;

  function criarOverlay() {
    return Box({
      className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50',
      onclick: (e) => {
        if (e.target === e.currentTarget) {
          fecharModal();
        }
      }
    });
  }

  function criarModal(titulo, conteudo, acoes = []) {
    const modal = Box({
      children: [
        // Cabeçalho
        Box({
          children: [
            Typography({
              tag: 'h3',
              children: titulo,
              className: 'text-xl font-semibold'
            }),
            Button({
              children: '×',
              className: 'text-2xl font-bold text-gray-500 hover:text-gray-700 w-8 h-8 flex items-center justify-center',
              onclick: fecharModal
            })
          ],
          className: 'flex justify-between items-center p-6 border-b border-gray-200'
        }),
        // Conteúdo
        Box({
          children: conteudo,
          className: 'p-6 flex-1'
        }),
        // Rodapé com ações
        Box({
          children: acoes,
          className: 'p-6 border-t border-gray-200 flex justify-end space-x-3'
        })
      ],
      className: 'bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-screen overflow-hidden flex flex-col',
      onclick: (e) => e.stopPropagation()
    });

    return modal;
  }

  function abrirModal(titulo, conteudo, acoes) {
    if (modalAtivo) {
      fecharModal();
    }

    const overlay = criarOverlay();
    const modal = criarModal(titulo, conteudo, acoes);
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    modalAtivo = overlay;

    // Animação de entrada
    overlay.style.opacity = '0';
    modal.style.transform = 'scale(0.9)';
    
    requestAnimationFrame(() => {
      overlay.style.transition = 'opacity 0.2s ease';
      modal.style.transition = 'transform 0.2s ease';
      overlay.style.opacity = '1';
      modal.style.transform = 'scale(1)';
    });
  }

  function fecharModal() {
    if (!modalAtivo) return;

    const overlay = modalAtivo;
    const modal = overlay.firstChild;

    overlay.style.opacity = '0';
    modal.style.transform = 'scale(0.9)';

    setTimeout(() => {
      if (overlay.parentNode) {
        overlay.remove();
      }
      modalAtivo = null;
    }, 200);
  }

  // Exemplos de modais
  const botaoInfo = Button({
    children: 'Modal de Informação',
    className: 'px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mr-4 mb-4',
    onclick: () => {
      abrirModal(
        'Informação',
        [
          Typography({
            children: 'Este é um modal simples com informações.',
            className: 'mb-4'
          }),
          Typography({
            children: 'Você pode clicar fora do modal ou no X para fechá-lo.',
            className: 'text-gray-600'
          })
        ],
        [
          Button({
            children: 'Entendi',
            className: 'px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700',
            onclick: fecharModal
          })
        ]
      );
    }
  });

  const botaoConfirmacao = Button({
    children: 'Modal de Confirmação',
    className: 'px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 mr-4 mb-4',
    onclick: () => {
      abrirModal(
        'Confirmar Ação',
        [
          Typography({
            children: 'Tem certeza de que deseja executar esta ação?',
            className: 'mb-4'
          }),
          Typography({
            children: 'Esta ação não pode ser desfeita.',
            className: 'text-red-600 font-semibold'
          })
        ],
        [
          Button({
            children: 'Cancelar',
            className: 'px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 mr-2',
            onclick: fecharModal
          }),
          Button({
            children: 'Confirmar',
            className: 'px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700',
            onclick: () => {
              alert('Ação confirmada!');
              fecharModal();
            }
          })
        ]
      );
    }
  });

  const botaoFormulario = Button({
    children: 'Modal com Formulário',
    className: 'px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4',
    onclick: () => {
      const campoNome = TextInput({
        placeholder: 'Seu nome',
        className: 'w-full px-3 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-500'
      });

      const campoEmail = TextInput({
        type: 'email',
        placeholder: 'Seu e-mail',
        className: 'w-full px-3 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-500'
      });

      abrirModal(
        'Cadastro Rápido',
        [
          Typography({
            children: 'Preencha os campos abaixo:',
            className: 'mb-4'
          }),
          campoNome,
          campoEmail
        ],
        [
          Button({
            children: 'Cancelar',
            className: 'px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 mr-2',
            onclick: fecharModal
          }),
          Button({
            children: 'Salvar',
            className: 'px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700',
            onclick: () => {
              const nome = campoNome.value;
              const email = campoEmail.value;
              
              if (nome && email) {
                alert(`Usuário ${nome} cadastrado com sucesso!`);
                fecharModal();
              } else {
                alert('Por favor, preencha todos os campos.');
              }
            }
          })
        ]
      );
    }
  });

  return Box({
    children: [
      Typography({
        tag: 'h2',
        children: 'Sistema de Modais',
        className: 'text-2xl font-bold mb-6'
      }),
      Box({
        children: [botaoInfo, botaoConfirmacao, botaoFormulario],
        className: 'flex flex-wrap'
      })
    ],
    className: 'max-w-2xl mx-auto p-6'
  });
}

document.body.appendChild(criarSistemaModal());
```

### 2. Sistema de Abas (Tabs)

```typescript
import { Box, Button, Typography } from '@jay-js/elements';

function criarSistemaAbas() {
  let abaAtiva = 0;

  const abas = [
    {
      titulo: 'Perfil',
      conteudo: () => Box({
        children: [
          Typography({
            tag: 'h3',
            children: 'Informações do Perfil',
            className: 'text-xl font-semibold mb-4'
          }),
          Typography({
            children: 'Nome: João Silva',
            className: 'mb-2'
          }),
          Typography({
            children: 'E-mail: joao@exemplo.com',
            className: 'mb-2'
          }),
          Typography({
            children: 'Cargo: Desenvolvedor Frontend',
            className: 'mb-2'
          }),
          Button({
            children: 'Editar Perfil',
            className: 'mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
          })
        ],
        className: 'p-6'
      })
    },
    {
      titulo: 'Configurações',
      conteudo: () => Box({
        children: [
          Typography({
            tag: 'h3',
            children: 'Configurações da Conta',
            className: 'text-xl font-semibold mb-4'
          }),
          Box({
            children: [
              Typography({
                children: 'Notificações por E-mail',
                className: 'font-medium'
              }),
              Button({
                children: 'Ativado',
                className: 'ml-auto px-3 py-1 bg-green-500 text-white text-sm rounded'
              })
            ],
            className: 'flex justify-between items-center p-3 border border-gray-200 rounded mb-3'
          }),
          Box({
            children: [
              Typography({
                children: 'Modo Escuro',
                className: 'font-medium'
              }),
              Button({
                children: 'Desativado',
                className: 'ml-auto px-3 py-1 bg-gray-500 text-white text-sm rounded'
              })
            ],
            className: 'flex justify-between items-center p-3 border border-gray-200 rounded mb-3'
          }),
          Button({
            children: 'Salvar Configurações',
            className: 'mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'
          })
        ],
        className: 'p-6'
      })
    },
    {
      titulo: 'Histórico',
      conteudo: () => Box({
        children: [
          Typography({
            tag: 'h3',
            children: 'Histórico de Atividades',
            className: 'text-xl font-semibold mb-4'
          }),
          ...Array.from({ length: 5 }, (_, i) => 
            Box({
              children: [
                Typography({
                  children: `Atividade ${i + 1}`,
                  className: 'font-medium'
                }),
                Typography({
                  children: `Há ${i + 1} hora${i > 0 ? 's' : ''}`,
                  className: 'text-sm text-gray-500'
                })
              ],
              className: 'p-3 border border-gray-200 rounded mb-2'
            })
          ),
          Button({
            children: 'Ver Mais',
            className: 'mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
          })
        ],
        className: 'p-6'
      })
    }
  ];

  const navAbas = Box({
    children: abas.map((aba, index) => 
      Button({
        children: aba.titulo,
        className: `px-6 py-3 border-b-2 transition-colors ${
          index === abaAtiva 
            ? 'border-blue-600 text-blue-600 bg-blue-50' 
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`,
        onclick: () => {
          abaAtiva = index;
          atualizarAbas();
        }
      })
    ),
    className: 'flex border-b border-gray-200'
  });

  const conteudoAbas = Box({
    className: 'bg-white'
  });

  function atualizarAbas() {
    // Atualizar navegação
    navAbas.innerHTML = '';
    abas.forEach((aba, index) => {
      const botaoAba = Button({
        children: aba.titulo,
        className: `px-6 py-3 border-b-2 transition-colors ${
          index === abaAtiva 
            ? 'border-blue-600 text-blue-600 bg-blue-50' 
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`,
        onclick: () => {
          abaAtiva = index;
          atualizarAbas();
        }
      });
      navAbas.appendChild(botaoAba);
    });

    // Atualizar conteúdo
    conteudoAbas.innerHTML = '';
    conteudoAbas.appendChild(abas[abaAtiva].conteudo());
  }

  // Inicializar
  atualizarAbas();

  return Box({
    children: [
      Typography({
        tag: 'h2',
        children: 'Sistema de Abas',
        className: 'text-2xl font-bold mb-6'
      }),
      Box({
        children: [navAbas, conteudoAbas],
        className: 'bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg'
      })
    ],
    className: 'max-w-4xl mx-auto p-6'
  });
}

document.body.appendChild(criarSistemaAbas());
```

## 🛒 Aplicação Completa: Carrinho de Compras

```typescript
import { Box, Typography, Button, TextInput, Img } from '@jay-js/elements';

function criarCarrinhoCompras() {
  const produtos = [
    { id: 1, nome: 'Smartphone', preco: 999.99, imagem: 'https://via.placeholder.com/100x100', estoque: 5 },
    { id: 2, nome: 'Notebook', preco: 1999.99, imagem: 'https://via.placeholder.com/100x100', estoque: 3 },
    { id: 3, nome: 'Fones de Ouvido', preco: 299.99, imagem: 'https://via.placeholder.com/100x100', estoque: 10 },
    { id: 4, nome: 'Mouse Gamer', preco: 199.99, imagem: 'https://via.placeholder.com/100x100', estoque: 7 }
  ];

  let carrinho = [];
  let produtosFiltrados = [...produtos];

  const campoBusca = TextInput({
    placeholder: 'Buscar produtos...',
    className: 'w-full px-4 py-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500',
    oninput: (e) => {
      const termo = e.target.value.toLowerCase();
      produtosFiltrados = produtos.filter(produto => 
        produto.nome.toLowerCase().includes(termo)
      );
      renderizarProdutos();
    }
  });

  const listaProdutos = Box({
    className: 'grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'
  });

  const listaCarrinho = Box({
    className: 'space-y-4'
  });

  const totalDisplay = Typography({
    tag: 'div',
    children: 'Total: R$ 0,00',
    className: 'text-2xl font-bold text-right mb-4'
  });

  function formatarPreco(preco) {
    return `R$ ${preco.toFixed(2).replace('.', ',')}`;
  }

  function criarCardProduto(produto) {
    return Box({
      children: [
        Img({
          src: produto.imagem,
          alt: produto.nome,
          className: 'w-20 h-20 object-cover rounded'
        }),
        Box({
          children: [
            Typography({
              tag: 'h3',
              children: produto.nome,
              className: 'font-semibold text-lg mb-1'
            }),
            Typography({
              children: formatarPreco(produto.preco),
              className: 'text-blue-600 font-bold text-xl mb-2'
            }),
            Typography({
              children: `Estoque: ${produto.estoque}`,
              className: 'text-gray-500 text-sm mb-3'
            }),
            Button({
              children: 'Adicionar ao Carrinho',
              className: 'w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400',
              disabled: produto.estoque === 0,
              onclick: () => adicionarAoCarrinho(produto)
            })
          ],
          className: 'flex-1'
        })
      ],
      className: 'flex space-x-4 p-4 border border-gray-200 rounded-lg'
    });
  }

  function criarItemCarrinho(item) {
    return Box({
      children: [
        Img({
          src: item.produto.imagem,
          alt: item.produto.nome,
          className: 'w-16 h-16 object-cover rounded'
        }),
        Box({
          children: [
            Typography({
              tag: 'h4',
              children: item.produto.nome,
              className: 'font-semibold'
            }),
            Typography({
              children: formatarPreco(item.produto.preco),
              className: 'text-blue-600'
            })
          ],
          className: 'flex-1'
        }),
        Box({
          children: [
            Button({
              children: '-',
              className: 'w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded',
              onclick: () => alterarQuantidade(item.produto.id, -1)
            }),
            Typography({
              children: item.quantidade.toString(),
              className: 'mx-2 font-semibold'
            }),
            Button({
              children: '+',
              className: 'w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded',
              onclick: () => alterarQuantidade(item.produto.id, 1)
            })
          ],
          className: 'flex items-center'
        }),
        Typography({
          children: formatarPreco(item.produto.preco * item.quantidade),
          className: 'font-bold text-lg min-w-[100px] text-right'
        }),
        Button({
          children: '🗑️',
          className: 'ml-4 w-8 h-8 bg-red-500 text-white hover:bg-red-600 rounded',
          onclick: () => removerDoCarrinho(item.produto.id)
        })
      ],
      className: 'flex items-center space-x-4 p-4 border border-gray-200 rounded-lg'
    });
  }

  function adicionarAoCarrinho(produto) {
    const itemExistente = carrinho.find(item => item.produto.id === produto.id);
    
    if (itemExistente) {
      if (itemExistente.quantidade < produto.estoque) {
        itemExistente.quantidade++;
      } else {
        alert('Estoque insuficiente!');
        return;
      }
    } else {
      carrinho.push({ produto, quantidade: 1 });
    }
    
    atualizarCarrinho();
  }

  function alterarQuantidade(produtoId, delta) {
    const item = carrinho.find(item => item.produto.id === produtoId);
    if (!item) return;

    const novaQuantidade = item.quantidade + delta;
    
    if (novaQuantidade <= 0) {
      removerDoCarrinho(produtoId);
    } else if (novaQuantidade <= item.produto.estoque) {
      item.quantidade = novaQuantidade;
      atualizarCarrinho();
    } else {
      alert('Estoque insuficiente!');
    }
  }

  function removerDoCarrinho(produtoId) {
    carrinho = carrinho.filter(item => item.produto.id !== produtoId);
    atualizarCarrinho();
  }

  function calcularTotal() {
    return carrinho.reduce((total, item) => 
      total + (item.produto.preco * item.quantidade), 0
    );
  }

  function renderizarProdutos() {
    listaProdutos.innerHTML = '';
    produtosFiltrados.forEach(produto => {
      listaProdutos.appendChild(criarCardProduto(produto));
    });
  }

  function atualizarCarrinho() {
    listaCarrinho.innerHTML = '';
    
    if (carrinho.length === 0) {
      listaCarrinho.appendChild(Typography({
        children: 'Seu carrinho está vazio',
        className: 'text-gray-500 text-center py-8'
      }));
    } else {
      carrinho.forEach(item => {
        listaCarrinho.appendChild(criarItemCarrinho(item));
      });
    }
    
    const total = calcularTotal();
    totalDisplay.textContent = `Total: ${formatarPreco(total)}`;
  }

  function finalizarCompra() {
    if (carrinho.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }

    const total = calcularTotal();
    const itens = carrinho.length;
    
    if (confirm(`Finalizar compra de ${itens} item(ns) por ${formatarPreco(total)}?`)) {
      alert('Compra realizada com sucesso!');
      carrinho = [];
      atualizarCarrinho();
    }
  }

  // Inicializar
  renderizarProdutos();
  atualizarCarrinho();

  return Box({
    children: [
      Typography({
        tag: 'h1',
        children: 'Loja Virtual',
        className: 'text-3xl font-bold text-center mb-8'
      }),
      
      // Seção de produtos
      Box({
        children: [
          Typography({
            tag: 'h2',
            children: 'Produtos',
            className: 'text-2xl font-semibold mb-4'
          }),
          campoBusca,
          listaProdutos
        ],
        className: 'bg-white p-6 rounded-lg shadow-lg mb-8'
      }),
      
      // Seção do carrinho
      Box({
        children: [
          Typography({
            tag: 'h2',
            children: 'Carrinho de Compras',
            className: 'text-2xl font-semibold mb-4'
          }),
          listaCarrinho,
          totalDisplay,
          Button({
            children: 'Finalizar Compra',
            className: 'w-full px-6 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 text-lg',
            onclick: finalizarCompra
          })
        ],
        className: 'bg-white p-6 rounded-lg shadow-lg'
      })
    ],
    className: 'max-w-6xl mx-auto p-6'
  });
}

document.body.appendChild(criarCarrinhoCompras());
```

## 🔧 Integração com @jay-js/system

### 1. Gerenciamento de Estado Global

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

## 📱 Padrões de Performance

### 1. Virtual Scrolling para Listas Grandes

```typescript
import { Box, Typography } from '@jay-js/elements';

function criarVirtualScrolling() {
  const ITEM_HEIGHT = 60;
  const VISIBLE_ITEMS = 10;
  const TOTAL_ITEMS = 10000;

  let scrollTop = 0;
  let startIndex = 0;
  let endIndex = VISIBLE_ITEMS;

  // Gerar dados mock
  const dados = Array.from({ length: TOTAL_ITEMS }, (_, i) => ({
    id: i,
    nome: `Item ${i + 1}`,
    descricao: `Descrição do item ${i + 1}`,
    valor: Math.random() * 1000
  }));

  const container = Box({
    className: 'max-w-2xl mx-auto p-6'
  });

  const scrollContainer = Box({
    className: 'relative border border-gray-300 rounded-lg overflow-hidden',
    style: {
      height: `${VISIBLE_ITEMS * ITEM_HEIGHT}px`
    }
  });

  const scrollableArea = Box({
    className: 'absolute top-0 left-0 w-full overflow-auto',
    style: {
      height: `${VISIBLE_ITEMS * ITEM_HEIGHT}px`
    },
    onscroll: (e) => {
      scrollTop = e.target.scrollTop;
      startIndex = Math.floor(scrollTop / ITEM_HEIGHT);
      endIndex = Math.min(startIndex + VISIBLE_ITEMS, TOTAL_ITEMS);
      renderizarItens();
    }
  });

  const spacerTop = Box({
    style: { height: '0px' }
  });

  const spacerBottom = Box({
    style: { height: '0px' }
  });

  const itensContainer = Box({
    className: 'divide-y divide-gray-200'
  });

  // Área total para simular o scroll
  const scrollTrack = Box({
    style: {
      height: `${TOTAL_ITEMS * ITEM_HEIGHT}px`,
      width: '1px'
    }
  });

  function criarItem(item) {
    return Box({
      children: [
        Typography({
          tag: 'div',
          children: item.nome,
          className: 'font-semibold text-lg'
        }),
        Typography({
          tag: 'div',
          children: item.descricao,
          className: 'text-gray-600'
        }),
        Typography({
          tag: 'div',
          children: `R$ ${item.valor.toFixed(2)}`,
          className: 'text-green-600 font-bold'
        })
      ],
      className: 'p-4 hover:bg-gray-50',
      style: {
        height: `${ITEM_HEIGHT}px`,
        minHeight: `${ITEM_HEIGHT}px`
      }
    });
  }

  function renderizarItens() {
    // Calcular espaçadores
    spacerTop.style.height = `${startIndex * ITEM_HEIGHT}px`;
    spacerBottom.style.height = `${(TOTAL_ITEMS - endIndex) * ITEM_HEIGHT}px`;

    // Limpar container
    itensContainer.innerHTML = '';

    // Renderizar apenas itens visíveis
    for (let i = startIndex; i < endIndex; i++) {
      if (dados[i]) {
        itensContainer.appendChild(criarItem(dados[i]));
      }
    }
  }

  // Montar estrutura
  scrollableArea.appendChild(spacerTop);
  scrollableArea.appendChild(itensContainer);
  scrollableArea.appendChild(spacerBottom);
  scrollableArea.appendChild(scrollTrack);
  
  scrollContainer.appendChild(scrollableArea);

  // Renderização inicial
  renderizarItens();

  container.appendChild(Typography({
    tag: 'h2',
    children: 'Virtual Scrolling',
    className: 'text-2xl font-bold mb-4'
  }));

  container.appendChild(Typography({
    children: `Lista de ${TOTAL_ITEMS.toLocaleString()} itens com performance otimizada`,
    className: 'text-gray-600 mb-6'
  }));

  container.appendChild(scrollContainer);

  return container;
}

document.body.appendChild(criarVirtualScrolling());
```

### 2. Debounced Search

```typescript
import { Box, Typography, TextInput } from '@jay-js/elements';

function criarBuscaDebounced() {
  let timeoutId;
  let cache = new Map();

  async function simularBuscaAPI(termo) {
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simular resultados
    const resultados = Array.from({ length: Math.floor(Math.random() * 10) + 1 }, (_, i) => ({
      id: i,
      titulo: `Resultado ${i + 1} para "${termo}"`,
      descricao: `Descrição do resultado que contém "${termo}"`
    }));
    
    return resultados;
  }

  const campoBusca = TextInput({
    placeholder: 'Digite para buscar...',
    className: 'w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
  });

  const loadingIndicator = Typography({
    children: 'Buscando...',
    className: 'text-blue-600 text-center py-4 hidden'
  });

  const resultadosContainer = Box({
    className: 'space-y-3'
  });

  const contadorResultados = Typography({
    children: '',
    className: 'text-gray-600 text-sm mb-4'
  });

  function mostrarLoading() {
    loadingIndicator.classList.remove('hidden');
    resultadosContainer.innerHTML = '';
    contadorResultados.textContent = '';
  }

  function ocultarLoading() {
    loadingIndicator.classList.add('hidden');
  }

  function exibirResultados(resultados, termo) {
    ocultarLoading();
    
    contadorResultados.textContent = 
      `${resultados.length} resultado(s) encontrado(s) para "${termo}"`;

    resultadosContainer.innerHTML = '';

    if (resultados.length === 0) {
      resultadosContainer.appendChild(Typography({
        children: 'Nenhum resultado encontrado',
        className: 'text-gray-500 text-center py-8'
      }));
      return;
    }

    resultados.forEach(resultado => {
      const item = Box({
        children: [
          Typography({
            tag: 'h3',
            children: resultado.titulo,
            className: 'font-semibold text-lg mb-1'
          }),
          Typography({
            children: resultado.descricao,
            className: 'text-gray-600'
          })
        ],
        className: 'p-4 border border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer transition-colors'
      });

      resultadosContainer.appendChild(item);
    });
  }

  async function buscar(termo) {
    if (!termo.trim()) {
      ocultarLoading();
      resultadosContainer.innerHTML = '';
      contadorResultados.textContent = '';
      return;
    }

    // Verificar cache
    if (cache.has(termo)) {
      exibirResultados(cache.get(termo), termo);
      return;
    }

    mostrarLoading();

    try {
      const resultados = await simularBuscaAPI(termo);
      
      // Armazenar no cache
      cache.set(termo, resultados);
      
      // Verificar se o termo ainda é atual (usuário não digitou outra coisa)
      if (campoBusca.value.trim() === termo) {
        exibirResultados(resultados, termo);
      }
    } catch (error) {
      ocultarLoading();
      console.error('Erro na busca:', error);
      
      resultadosContainer.innerHTML = '';
      resultadosContainer.appendChild(Typography({
        children: 'Erro ao realizar busca. Tente novamente.',
        className: 'text-red-500 text-center py-8'
      }));
    }
  }

  // Implementar debounce
  campoBusca.oninput = (e) => {
    const termo = e.target.value.trim();
    
    // Cancelar busca anterior
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Agendar nova busca
    timeoutId = setTimeout(() => {
      buscar(termo);
    }, 300); // 300ms de delay
  };

  return Box({
    children: [
      Typography({
        tag: 'h2',
        children: 'Busca com Debounce',
        className: 'text-2xl font-bold mb-4'
      }),
      Typography({
        children: 'Digite para ver a busca otimizada com debounce e cache',
        className: 'text-gray-600 mb-6'
      }),
      campoBusca,
      loadingIndicator,
      contadorResultados,
      resultadosContainer
    ],
    className: 'max-w-2xl mx-auto p-6'
  });
}

document.body.appendChild(criarBuscaDebounced());
```

## 🧪 Padrões de Teste

### 1. Funções Utilitárias para Teste

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

### 2. Exemplo de Teste de Componente

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

## 📚 Conclusão

Esta documentação fornece uma base sólida para trabalhar com o **@jay-js/elements**. Os exemplos demonstram:

- **Progressão gradual**: Do básico ao avançado
- **Padrões reais**: Soluções para problemas comuns de desenvolvimento
- **Performance**: Técnicas otimizadas para aplicações modernas
- **Manutenibilidade**: Código organizando e testável
- **Integração**: Como combinar com outras partes do ecossistema Jay JS

### Próximos Passos

1. **Experimente os exemplos**: Copie e cole em seus projetos
2. **Adapte para suas necessidades**: Modifique conforme sua aplicação
3. **Integre com @jay-js/system**: Para estado global e roteamento
4. **Explore outros pacotes**: jsx, ui, cli para funcionalidades adicionais

### Dicas de Performance

- Use **virtual scrolling** para listas com mais de 100 itens
- Implemente **debounce** em campos de busca
- Utilize **lazy loading** para conteúdo pesado
- **Cache** resultados de APIs quando possível
- **Limpe recursos** em onunmount para evitar vazamentos de memória

O **@jay-js/elements** oferece uma base sólida e flexível para construir interfaces modernas e performáticas. Use estes exemplos como ponto de partida e adapte conforme necessário!