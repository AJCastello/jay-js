---
category: Examples
categoryId: 4
articleId: 2
slug: examples-advanced-forms
title: Formulários Avançados
description: Implementação de formulários mais complexos como formulário de contato completo com validação e formulário multi-etapas usando @jay-js/elements.
---

# Formulários Avançados

## 1. Formulário de Contato Completo

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

## 2. Formulário Multi-etapas

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