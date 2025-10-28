---
category: Components
categoryId: 2
articleId: 3
slug: components-elements-interface
title: Elementos de Interface
description: Documentação dos elementos de interface como Box, Section, Link, Img, Fragment e Outlet para construção de layouts e estruturas de página.
---

# Elementos de Interface

## Box

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

## Section

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

## Link

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

## Img

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

## Fragment

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

## Outlet

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