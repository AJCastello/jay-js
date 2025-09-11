---
category: Examples
categoryId: 4
articleId: 8
slug: examples-performance
title: Padrões de Performance
description: Técnicas e padrões para melhorar a performance como virtual scrolling para listas grandes e renderização eficiente.
---



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