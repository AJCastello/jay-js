---
category: Examples
categoryId: 4
articleId: 4
slug: examples-async
title: Conteúdo Assíncrono
description: Demonstrações de carregamento assíncrono de dados com estados de loading e lazy loading de imagens usando Promises no @jay-js/elements.
---

# Conteúdo Assíncrono

## 1. Carregamento de Dados com Loading States

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

## 2. Lazy Loading de Imagens

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