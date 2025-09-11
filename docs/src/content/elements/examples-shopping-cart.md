---
category: Examples
categoryId: 4
articleId: 6
slug: examples-shopping-cart
title: Aplicação Completa: Carrinho de Compras
description: Implementação de um carrinho de compras completo com adição, remoção e atualização de itens usando @jay-js/elements.
---

# Aplicação Completa: Carrinho de Compras

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