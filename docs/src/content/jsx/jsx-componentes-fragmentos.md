---
category: JSX
categoryId: 5
articleId: 4
slug: jsx-componentes-fragmentos
title: Componentes e Fragmentos
description: Aprenda a criar e utilizar componentes funcionais e fragmentos no JSX do Jay JS para construir interfaces modulares e eficientes.
---

# Componentes e Fragmentos

## Referência da API

### Componentes

```typescript
// Tipo de um componente JSX
type JSXComponent = (props: JSXProps) => HTMLElement | Promise<HTMLElement>;

// Interface para as props de componentes
interface JSXProps {
  [key: string]: any;
  children?: any[] | any;
}

// Exemplo de componente simples
function MeuComponente(props: JSXProps): HTMLElement {
  return jsx("div", { ...props });
}
```

### Fragmentos

```typescript
// Importando Fragment
import { Fragment } from '@jay-js/jsx';

// Uso do Fragment
function ListaItems({ items }) {
  return (
    <Fragment>
      {items.map(item => <li key={item.id}>{item.nome}</li>)}
    </Fragment>
  );
}

// Sintaxe abreviada para Fragment
function ListaItems({ items }) {
  return (
    <>
      {items.map(item => <li key={item.id}>{item.nome}</li>)}
    </>
  );
}
```

## Visão Geral

Componentes e fragmentos são conceitos fundamentais para construir interfaces de usuário modernas e modulares com JSX. No Jay JS, os componentes são funções JavaScript que retornam elementos HTML, enquanto os fragmentos permitem agrupar múltiplos elementos sem adicionar nós extras ao DOM.

Este artigo explora como criar e utilizar componentes e fragmentos em suas aplicações Jay JS.

## Componentes Funcionais

No Jay JS, um componente é simplesmente uma função que recebe props (propriedades) e retorna um elemento HTML ou uma Promise que resolve para um elemento HTML.

### Criando Componentes Básicos

```jsx
function Botao({ texto, onClick, className }) {
  return (
    <button 
      className={`btn ${className || ''}`} 
      onClick={onClick}
    >
      {texto}
    </button>
  );
}

// Uso do componente
document.body.appendChild(
  <Botao 
    texto="Clique-me" 
    onClick={() => alert('Botão clicado!')} 
    className="btn-primario"
  />
);
```

### Props e Children

Os componentes podem receber vários tipos de props, incluindo:

- **Strings, números e booleanos**: Para atributos e configurações
- **Funções**: Para event handlers e callbacks
- **Arrays e objetos**: Para dados estruturados
- **Children**: Conteúdo aninhado dentro do componente

O parâmetro `children` é especial e representa todo o conteúdo dentro das tags do componente:

```jsx
function Painel({ titulo, children, estilo }) {
  return (
    <div className={`painel ${estilo || 'padrao'}`}>
      <h2 className="painel-titulo">{titulo}</h2>
      <div className="painel-conteudo">
        {children}
      </div>
    </div>
  );
}

// Uso com children
document.body.appendChild(
  <Painel titulo="Informações do Usuário" estilo="destaque">
    <p>Nome: João Silva</p>
    <p>Email: joao@exemplo.com</p>
    <button>Editar Perfil</button>
  </Painel>
);
```

### Componentes Assíncronos

Uma característica poderosa do JSX no Jay JS é o suporte nativo a componentes assíncronos:

```jsx
async function PerfilUsuario({ userId }) {
  // Simulando uma chamada de API
  const buscarUsuario = async (id) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          id,
          nome: 'Ana Silva',
          email: 'ana@exemplo.com',
          avatar: 'https://exemplo.com/avatars/ana.jpg'
        });
      }, 500);
    });
  };

  // Aguarda o retorno dos dados
  const usuario = await buscarUsuario(userId);
  
  // Renderiza o componente após carregar os dados
  return (
    <div className="perfil-usuario">
      <img src={usuario.avatar} alt={usuario.nome} />
      <h3>{usuario.nome}</h3>
      <p>{usuario.email}</p>
    </div>
  );
}

// Uso do componente assíncrono
const container = document.querySelector('#app');
container.appendChild(<PerfilUsuario userId={123} />);
```

O runtime JSX lida automaticamente com o resultado assíncrono, aguardando a resolução da Promise antes de inserir o componente no DOM.

## Fragmentos

Fragmentos permitem agrupar uma lista de elementos sem adicionar um nó extra ao DOM. Isso é especialmente útil para:

- Retornar múltiplos elementos de um componente
- Criar listas de elementos sem elementos container desnecessários
- Adicionar elementos a um container existente sem aninhamento extra

### Uso Básico de Fragmentos

```jsx
import { Fragment } from '@jay-js/jsx';

function ItemsLista({ items }) {
  return (
    <Fragment>
      {items.map(item => (
        <li key={item.id} className="item-lista">
          {item.nome}
        </li>
      ))}
    </Fragment>
  );
}

// Uso
const lista = document.createElement('ul');
lista.appendChild(
  <ItemsLista items={[
    { id: 1, nome: 'Item 1' },
    { id: 2, nome: 'Item 2' },
    { id: 3, nome: 'Item 3' }
  ]} />
);
document.body.appendChild(lista);
```

Neste exemplo, os elementos `<li>` são adicionados diretamente ao elemento `<ul>`, sem um elemento container intermediário.

### Sintaxe Abreviada

O Jay JS também suporta a sintaxe abreviada `<>...</>` para fragmentos:

```jsx
function Cabecalho() {
  return (
    <>
      <h1>Título Principal</h1>
      <h2>Subtítulo</h2>
      <p>Descrição do conteúdo...</p>
    </>
  );
}

const header = document.querySelector('header');
header.appendChild(<Cabecalho />);
```

## Composição de Componentes

Uma das principais vantagens dos componentes JSX é a capacidade de compor interfaces complexas a partir de componentes mais simples:

```jsx
// Componente para um campo de formulário
function Campo({ label, id, tipo = 'text', ...props }) {
  return (
    <div className="campo-formulario">
      <label htmlFor={id}>{label}</label>
      <input id={id} type={tipo} {...props} />
    </div>
  );
}

// Componente para um botão
function Botao({ children, tipo = 'padrao', ...props }) {
  return (
    <button className={`btn btn-${tipo}`} {...props}>
      {children}
    </button>
  );
}

// Componente composto usando os componentes mais simples
function FormularioLogin({ onSubmit }) {
  return (
    <form className="formulario-login" onSubmit={onSubmit}>
      <h2>Login</h2>
      
      <Campo 
        label="E-mail" 
        id="email" 
        type="email" 
        required 
        placeholder="Seu e-mail"
      />
      
      <Campo 
        label="Senha" 
        id="senha" 
        type="password" 
        required 
        placeholder="Sua senha"
      />
      
      <div className="acoes-formulario">
        <Botao tipo="secundario">Cancelar</Botao>
        <Botao tipo="primario" submitType="submit">Entrar</Botao>
      </div>
    </form>
  );
}

// Uso do formulário
document.getElementById('app').appendChild(
  <FormularioLogin onSubmit={(e) => {
    e.preventDefault();
    // Lógica de login
  }} />
);
```

## Boas Práticas

Ao trabalhar com componentes e fragmentos no Jay JS, considere as seguintes práticas:

### Para Componentes:

1. **Mantenha componentes focados**: Cada componente deve fazer uma coisa bem feita
2. **Desacople dados da apresentação**: Receba dados via props em vez de buscá-los dentro do componente
3. **Use nomes descritivos**: Os nomes dos componentes devem refletir claramente sua função
4. **Forneça valores padrão**: Use valores padrão para props opcionais
5. **Destructuring de props**: Use destructuring para extrair as props que o componente utiliza

### Para Fragmentos:

1. **Prefira fragmentos a divs desnecessárias**: Use fragmentos quando não precisar de um container extra
2. **Use a sintaxe abreviada quando possível**: A forma `<>...</>` é mais concisa
3. **Listas em fragmentos**: Fragmentos são ideais para renderizar listas de elementos

## Limitações e Soluções

### Estado Local

O Jay JS não possui um sistema de estado local integrado nos componentes como o React. Para gerenciar estado, você pode:

1. Usar o sistema de estado global do Jay JS (`@jay-js/system`)
2. Implementar manualmente a atualização de elementos
3. Usar closures para manter estado local

### Ciclo de Vida

Como os componentes são funções que executam uma única vez para retornar um elemento, para manipular o ciclo de vida do componente:

1. Use o retorno da função para configurar o elemento inicial
2. Adicione event listeners para responder a mudanças
3. Use o sistema de estado para reações a mudanças

No próximo artigo, exploraremos o plugin Vite para JSX, que simplifica a configuração e uso do JSX em projetos Vite. 