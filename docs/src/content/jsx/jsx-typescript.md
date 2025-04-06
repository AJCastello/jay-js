---
category: JSX
categoryId: 5
articleId: 6
slug: jsx-typescript
title: Integração com TypeScript
description: Aprenda a configurar e utilizar o JSX do Jay JS com TypeScript para obter uma experiência de desenvolvimento com tipagem completa.
---

# Integração com TypeScript

## Referência da API

### Namespace JSX

```typescript
// O namespace JSX para TypeScript
declare namespace JSX {
  interface IntrinsicElements {
    // Elementos HTML padrão com tipos tipados
    div: TBase<"div">;
    span: TBase<"span">;
    button: TBase<"button">;
    // ... e todos os outros elementos HTML
    
    // Permite elementos personalizados
    [elemName: string]: any;
  }
}

// Tipo para elementos base do Jay JS
type TBase<T extends keyof HTMLElementTagNameMap> = {
  [K: string]: any;
  children?: any[] | any;
  // Propriedades específicas para cada tipo de elemento
};
```

### Configuração TypeScript

```json
// tsconfig.json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@jay-js/jsx",
    // Outras opções do TypeScript...
  }
}
```

## Visão Geral

A integração do JSX do Jay JS com TypeScript proporciona uma experiência de desenvolvimento mais segura e produtiva, adicionando verificação de tipos e autocompleção para seus componentes e elementos JSX. Este artigo explora como configurar e utilizar efetivamente o TypeScript com o JSX do Jay JS.

## Configuração do TypeScript para JSX

### Passo 1: Configure o tsconfig.json

O primeiro passo para integrar JSX com TypeScript é configurar corretamente o arquivo `tsconfig.json` na raiz do seu projeto:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    
    /* Configurações específicas para JSX */
    "jsx": "react-jsx",
    "jsxImportSource": "@jay-js/jsx",
    
    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    
    /* Verificação de tipo rigorosa */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

As opções chave para o JSX são:
- `"jsx": "react-jsx"`: Instrui o TypeScript a transformar o JSX em chamadas de função (em vez de React.createElement)
- `"jsxImportSource": "@jay-js/jsx"`: Define o pacote de onde o runtime JSX será importado automaticamente

### Passo 2: Crie Arquivos .tsx

Com o TypeScript configurado, você pode criar arquivos com a extensão `.tsx` que suportam a sintaxe JSX com tipagem:

```tsx
// src/components/Botao.tsx
interface BotaoProps {
  texto: string;
  onClick?: () => void;
  tipo?: 'primario' | 'secundario' | 'perigo';
  desabilitado?: boolean;
}

function Botao({ 
  texto, 
  onClick, 
  tipo = 'primario', 
  desabilitado = false 
}: BotaoProps) {
  return (
    <button 
      className={`btn btn-${tipo}`} 
      onClick={onClick}
      disabled={desabilitado}
    >
      {texto}
    </button>
  );
}

export default Botao;
```

## Entendendo o Namespace JSX

O pacote `@jay-js/jsx` define um namespace JSX que o TypeScript usa para fornecer tipagem para elementos JSX. Este namespace é uma parte fundamental da integração entre JSX e TypeScript:

```typescript
declare namespace JSX {
  interface IntrinsicElements {
    // Elementos HTML com tipos específicos
    div: TBase<"div">;
    span: TBase<"span">;
    // ... mais elementos
    
    // Elementos customizados
    [elemName: string]: any;
  }
}
```

O tipo `TBase<T>` é fornecido pelo pacote `@jay-js/ui` e define as propriedades disponíveis para cada tipo de elemento HTML, garantindo que você use apenas propriedades válidas para cada elemento.

## Tipagem de Componentes

### Componentes Funcionais

Você pode definir tipos para as props dos seus componentes usando interfaces ou tipos TypeScript:

```tsx
// Usando interface
interface CardProps {
  titulo: string;
  subtitulo?: string;
  conteudo: string | JSX.Element;
  rodape?: JSX.Element;
  onClose?: () => void;
}

function Card({ titulo, subtitulo, conteudo, rodape, onClose }: CardProps) {
  return (
    <div className="card">
      <div className="card-cabecalho">
        <h3>{titulo}</h3>
        {subtitulo && <h4>{subtitulo}</h4>}
        {onClose && (
          <button className="btn-fechar" onClick={onClose}>
            ✕
          </button>
        )}
      </div>
      <div className="card-conteudo">
        {conteudo}
      </div>
      {rodape && (
        <div className="card-rodape">
          {rodape}
        </div>
      )}
    </div>
  );
}
```

### Componentes Genéricos

TypeScript permite criar componentes genéricos, que são extremamente úteis para componentes reutilizáveis:

```tsx
// Componente de lista genérico
interface ListaProps<T> {
  itens: T[];
  renderItem: (item: T, index: number) => JSX.Element;
  className?: string;
}

function Lista<T>({ itens, renderItem, className = '' }: ListaProps<T>) {
  return (
    <ul className={`lista ${className}`}>
      {itens.map((item, index) => (
        <li key={index} className="lista-item">
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
}

// Uso do componente genérico
interface Usuario {
  id: number;
  nome: string;
  email: string;
}

function ListaUsuarios() {
  const usuarios: Usuario[] = [
    { id: 1, nome: 'Alice', email: 'alice@exemplo.com' },
    { id: 2, nome: 'Bob', email: 'bob@exemplo.com' },
    { id: 3, nome: 'Carlos', email: 'carlos@exemplo.com' }
  ];
  
  return (
    <Lista<Usuario>
      itens={usuarios}
      renderItem={(usuario) => (
        <div className="usuario-item">
          <strong>{usuario.nome}</strong>
          <span>{usuario.email}</span>
        </div>
      )}
      className="lista-usuarios"
    />
  );
}
```

## Tipos para Children

O TypeScript permite tipar o conteúdo children de seus componentes:

```tsx
// Componente que aceita apenas elementos específicos como children
interface PainelProps {
  titulo: string;
  children: JSX.Element | JSX.Element[];
}

function Painel({ titulo, children }: PainelProps) {
  return (
    <div className="painel">
      <div className="painel-cabecalho">
        <h2>{titulo}</h2>
      </div>
      <div className="painel-conteudo">
        {children}
      </div>
    </div>
  );
}

// Uso correto (TypeScript não mostrará erro)
function App() {
  return (
    <Painel titulo="Meu Painel">
      <p>Este é um conteúdo válido</p>
      <button>Um botão</button>
    </Painel>
  );
}

// Uso incorreto (TypeScript mostrará erro)
function AppInvalido() {
  return (
    <Painel titulo="Meu Painel">
      Isto é apenas uma string e causará um erro de tipo
    </Painel>
  );
}
```

## Tipos para Eventos

TypeScript fornece tipos específicos para eventos do DOM, que podem ser usados nos seus componentes JSX:

```tsx
// Tipando eventos DOM
function FormularioLogin() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Lógica de login
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Lógica de atualização de campo
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        placeholder="Email"
        onChange={handleInputChange}
      />
      <input 
        type="password" 
        placeholder="Senha"
        onChange={handleInputChange}
      />
      <button type="submit">Entrar</button>
    </form>
  );
}
```

## Extensão de Tipos Intrínsecos

Em alguns casos, você pode precisar estender os tipos intrínsecos do JSX para adicionar propriedades personalizadas a elementos HTML:

```tsx
// arquivo types.d.ts
import '@jay-js/jsx';

declare module '@jay-js/jsx' {
  namespace JSX {
    interface IntrinsicElements {
      // Estendendo o tipo do elemento 'input'
      input: TBase<'input'> & {
        // Propriedades personalizadas
        validator?: (value: string) => boolean;
        formatValue?: (value: string) => string;
      };
    }
  }
}
```

## Boas Práticas com TypeScript e JSX

### 1. Use Interfaces para Definir Props

Prefira interfaces para definir as props dos seus componentes, pois elas são mais claras e extensíveis:

```tsx
// Bom: Interface para props de componente
interface BotaoProps {
  texto: string;
  onClick?: () => void;
}

// Evite: Tipo inline
function Botao({ texto, onClick }: { texto: string, onClick?: () => void }) {
  // ...
}
```

### 2. Defina Tipos Reutilizáveis

Crie tipos reutilizáveis para padrões comuns:

```tsx
// Tipo reutilizável para compor props
type WithClassName = {
  className?: string;
};

type WithChildren = {
  children?: React.ReactNode;
};

// Componente que usa os tipos compostos
interface CardProps extends WithClassName, WithChildren {
  titulo: string;
}

function Card({ titulo, children, className = '' }: CardProps) {
  return (
    <div className={`card ${className}`}>
      <h2>{titulo}</h2>
      <div className="card-conteudo">{children}</div>
    </div>
  );
}
```

### 3. Use Union Types para Props com Variantes

```tsx
// Variantes de botão
type BotaoVariante = 'primario' | 'secundario' | 'perigo' | 'sucesso';

interface BotaoProps {
  texto: string;
  variante?: BotaoVariante;
  tamanho?: 'pequeno' | 'medio' | 'grande';
  onClick?: () => void;
}
```

### 4. Organize seus Tipos

Mantenha seus tipos bem organizados, possivelmente em arquivos separados:

```
src/
├── types/
│   ├── components.ts        # Tipos para componentes
│   ├── api.ts               # Tipos para API/dados
│   └── events.ts            # Tipos para eventos
├── components/
│   ├── Botao.tsx
│   └── Card.tsx
```

## Integração com Ferramentas de Desenvolvimento

### TypeScript + VSCode

A integração entre TypeScript e VSCode proporciona uma excelente experiência para desenvolvimento JSX:

1. **IntelliSense**: Autocompleção para propriedades JSX
2. **Hover Information**: Informações de tipo ao passar o mouse sobre elementos
3. **Error Highlighting**: Erros de tipo destacados enquanto você digita
4. **Quick Fixes**: Correções rápidas para problemas comuns

### ESLint para TypeScript + JSX

Configure o ESLint para melhorar a qualidade do seu código TypeScript + JSX:

```js
// .eslintrc.js
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    // Regras personalizadas
  }
};
```

No próximo artigo, exploraremos exemplos práticos do uso do JSX em projetos Jay JS, reunindo todos os conceitos que vimos até agora. 