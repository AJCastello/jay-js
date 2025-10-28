---
category: JSX
categoryId: 5
articleId: 7
slug: jsx-exemplos
title: Exemplos Práticos de JSX
description: Explore exemplos práticos e casos de uso reais do JSX no Jay JS, desde componentes simples até aplicações completas.
---

# Exemplos Práticos de JSX

## Referência da API

```typescript
// Principais imports para os exemplos
import { jsx, Fragment } from '@jay-js/jsx';
import { State, Derived } from '@jay-js/system';
```

## Visão Geral

Neste artigo, vamos explorar exemplos práticos do uso do JSX no Jay JS, desde componentes simples até aplicações mais complexas. Estes exemplos demonstram como utilizar efetivamente o JSX para construir interfaces de usuário modernas e reativas, integrando-o com outros pacotes do ecossistema Jay JS.

## Componentes Básicos

### Exemplo 1: Cartão de Perfil

Um componente simples para exibir um cartão de perfil de usuário:

```jsx
function CartaoPerfil({ usuario }) {
  const { nome, cargo, empresa, foto, redes } = usuario;
  
  return (
    <div className="cartao-perfil">
      <div className="cartao-cabecalho">
        <img src={foto} alt={nome} className="foto-perfil" />
        <div className="info-perfil">
          <h3>{nome}</h3>
          <p>{cargo} em {empresa}</p>
        </div>
      </div>
      
      <div className="redes-sociais">
        {redes.map(rede => (
          <a 
            key={rede.nome} 
            href={rede.url} 
            className={`rede-social ${rede.nome.toLowerCase()}`}
            target="_blank"
          >
            {rede.nome}
          </a>
        ))}
      </div>
    </div>
  );
}

// Uso do componente
document.getElementById('app').appendChild(
  <CartaoPerfil 
    usuario={{
      nome: 'Ana Silva',
      cargo: 'Desenvolvedora Frontend',
      empresa: 'TechBrasil',
      foto: '/imagens/ana-silva.jpg',
      redes: [
        { nome: 'LinkedIn', url: 'https://linkedin.com/in/anasilva' },
        { nome: 'GitHub', url: 'https://github.com/anasilva' },
        { nome: 'Twitter', url: 'https://twitter.com/anasilva' }
      ]
    }}
  />
);
```

### Exemplo 2: Componente de Navegação

Um componente de navegação com itens ativos:

```jsx
function NavBar({ itens, itemAtivo, onItemClick }) {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/logo.svg" alt="Logo" />
      </div>
      
      <ul className="menu">
        {itens.map(item => (
          <li 
            key={item.id}
            className={`menu-item ${item.id === itemAtivo ? 'ativo' : ''}`}
            onClick={() => onItemClick(item.id)}
          >
            {item.icone && <span className="icone">{item.icone}</span>}
            <span className="texto">{item.texto}</span>
          </li>
        ))}
      </ul>
      
      <div className="acoes">
        <button className="btn-perfil">Minha Conta</button>
        <button className="btn-sair">Sair</button>
      </div>
    </nav>
  );
}

// Uso do componente
const itensMenu = [
  { id: 'home', texto: 'Início', icone: '🏠' },
  { id: 'produtos', texto: 'Produtos', icone: '🛒' },
  { id: 'relatorios', texto: 'Relatórios', icone: '📊' },
  { id: 'configuracoes', texto: 'Configurações', icone: '⚙️' }
];

document.getElementById('header').appendChild(
  <NavBar 
    itens={itensMenu} 
    itemAtivo="home"
    onItemClick={(id) => console.log(`Item clicado: ${id}`)}
  />
);
```

## Integração com o Sistema de Estado

### Exemplo 3: Lista de Tarefas com Estado

Uma lista de tarefas simples usando o estado do Jay JS:

```jsx
// Importando o sistema de estado
import { State } from '@jay-js/system';

// Estados globais
const tarefas = State([
  { id: 1, texto: 'Aprender Jay JS', concluida: true },
  { id: 2, texto: 'Estudar JSX', concluida: false },
  { id: 3, texto: 'Criar um projeto', concluida: false }
]);

const filtro = State('todas'); // 'todas', 'ativas', 'concluidas'

// Componente de item de tarefa
function ItemTarefa({ tarefa, onToggle, onDelete }) {
  return (
    <li className={`tarefa ${tarefa.concluida ? 'concluida' : ''}`}>
      <input 
        type="checkbox" 
        checked={tarefa.concluida} 
        onChange={() => onToggle(tarefa.id)}
      />
      <span className="texto">{tarefa.texto}</span>
      <button className="btn-excluir" onClick={() => onDelete(tarefa.id)}>
        Excluir
      </button>
    </li>
  );
}

// Componente de lista de tarefas
function ListaTarefas() {
  // Função para alternar o estado de uma tarefa
  function toggleTarefa(id) {
    tarefas.set(lista => lista.map(tarefa => 
      tarefa.id === id 
        ? { ...tarefa, concluida: !tarefa.concluida } 
        : tarefa
    ));
  }
  
  // Função para excluir uma tarefa
  function excluirTarefa(id) {
    tarefas.set(lista => lista.filter(tarefa => tarefa.id !== id));
  }
  
  // Função para adicionar uma nova tarefa
  function adicionarTarefa(e) {
    e.preventDefault();
    const input = e.target.elements.novaTarefa;
    const texto = input.value.trim();
    
    if (texto) {
      // Gera um ID único
      const novoId = Math.max(0, ...tarefas.get().map(t => t.id)) + 1;
      
      tarefas.set(lista => [
        ...lista, 
        { id: novoId, texto, concluida: false }
      ]);
      
      input.value = '';
    }
  }
  
  // Renderizar o componente (será re-executado quando os estados mudarem)
  const tarefasFiltradas = () => {
    const filtroAtual = filtro.value;
    const listaTarefas = tarefas.value;
    
    switch (filtroAtual) {
      case 'ativas':
        return listaTarefas.filter(t => !t.concluida);
      case 'concluidas':
        return listaTarefas.filter(t => t.concluida);
      default:
        return listaTarefas;
    }
  };
  
  return (
    <div className="app-tarefas">
      <h1>Lista de Tarefas</h1>
      
      <form onSubmit={adicionarTarefa}>
        <input 
          type="text" 
          name="novaTarefa"
          placeholder="Adicionar nova tarefa..." 
        />
        <button type="submit">Adicionar</button>
      </form>
      
      <div className="filtros">
        <button 
          className={filtro.value === 'todas' ? 'ativo' : ''}
          onClick={() => filtro.set('todas')}
        >
          Todas
        </button>
        <button 
          className={filtro.value === 'ativas' ? 'ativo' : ''}
          onClick={() => filtro.set('ativas')}
        >
          Ativas
        </button>
        <button 
          className={filtro.value === 'concluidas' ? 'ativo' : ''}
          onClick={() => filtro.set('concluidas')}
        >
          Concluídas
        </button>
      </div>
      
      <ul className="lista-tarefas">
        {tarefasFiltradas().map(tarefa => (
          <ItemTarefa 
            key={tarefa.id}
            tarefa={tarefa}
            onToggle={toggleTarefa}
            onDelete={excluirTarefa}
          />
        ))}
      </ul>
      
      <div className="info">
        <p>
          {tarefas.value.filter(t => !t.concluida).length} tarefas restantes
        </p>
      </div>
    </div>
  );
}

// Renderizar o aplicativo
document.getElementById('app').appendChild(<ListaTarefas />);
```

## Formulários e Validação

### Exemplo 4: Formulário de Cadastro com Validação

```jsx
import { State, Derived } from '@jay-js/system';

// Estados para o formulário
const nome = State('');
const email = State('');
const senha = State('');
const confirmarSenha = State('');

// Estados para erros
const erroNome = Derived(() => {
  const valorNome = nome.value.trim();
  if (!valorNome) return 'Nome é obrigatório';
  if (valorNome.length < 3) return 'Nome deve ter pelo menos 3 caracteres';
  return '';
});

const erroEmail = Derived(() => {
  const valorEmail = email.value.trim();
  if (!valorEmail) return 'E-mail é obrigatório';
  if (!valorEmail.includes('@') || !valorEmail.includes('.')) {
    return 'E-mail inválido';
  }
  return '';
});

const erroSenha = Derived(() => {
  const valorSenha = senha.value;
  if (!valorSenha) return 'Senha é obrigatória';
  if (valorSenha.length < 6) return 'Senha deve ter pelo menos 6 caracteres';
  return '';
});

const erroConfirmacao = Derived(() => {
  if (confirmarSenha.value !== senha.value) {
    return 'As senhas não coincidem';
  }
  return '';
});

// Validade do formulário
const formularioValido = Derived(() => {
  return !erroNome.value && 
         !erroEmail.value && 
         !erroSenha.value && 
         !erroConfirmacao.value &&
         nome.value.trim() &&
         email.value.trim() &&
         senha.value &&
         confirmarSenha.value;
});

// Componente de campo de formulário
function Campo({ 
  label, 
  id, 
  tipo = 'text', 
  valor, 
  onChange, 
  erro, 
  placeholder = '' 
}) {
  return (
    <div className={`campo ${erro ? 'campo-erro' : ''}`}>
      <label htmlFor={id}>{label}</label>
      <input 
        id={id}
        type={tipo}
        value={valor}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {erro && <span className="mensagem-erro">{erro}</span>}
    </div>
  );
}

// Componente de formulário
function FormularioCadastro() {
  function handleSubmit(e) {
    e.preventDefault();
    
    if (formularioValido.value) {
      // Aqui você enviaria os dados para um servidor
      console.log('Dados enviados:', {
        nome: nome.value,
        email: email.value,
        senha: senha.value
      });
      
      // Limpar o formulário
      nome.set('');
      email.set('');
      senha.set('');
      confirmarSenha.set('');
      
      alert('Cadastro realizado com sucesso!');
    }
  }
  
  return (
    <div className="container-cadastro">
      <h2>Cadastre-se</h2>
      
      <form onSubmit={handleSubmit} className="formulario-cadastro">
        <Campo 
          label="Nome" 
          id="nome" 
          valor={nome.value} 
          onChange={nome.set} 
          erro={erroNome.value} 
          placeholder="Seu nome completo"
        />
        
        <Campo 
          label="E-mail" 
          id="email" 
          tipo="email" 
          valor={email.value} 
          onChange={email.set} 
          erro={erroEmail.value} 
          placeholder="seu@email.com"
        />
        
        <Campo 
          label="Senha" 
          id="senha" 
          tipo="password" 
          valor={senha.value} 
          onChange={senha.set} 
          erro={erroSenha.value}
        />
        
        <Campo 
          label="Confirmar Senha" 
          id="confirmarSenha" 
          tipo="password" 
          valor={confirmarSenha.value} 
          onChange={confirmarSenha.set} 
          erro={erroConfirmacao.value}
        />
        
        <div className="acoes-formulario">
          <button 
            type="submit" 
            className="btn-cadastrar"
            disabled={!formularioValido.value}
          >
            Cadastrar
          </button>
          
          <button 
            type="button" 
            className="btn-limpar"
            onClick={() => {
              nome.set('');
              email.set('');
              senha.set('');
              confirmarSenha.set('');
            }}
          >
            Limpar
          </button>
        </div>
      </form>
    </div>
  );
}

// Renderizar o formulário
document.getElementById('app').appendChild(<FormularioCadastro />);
```

## Aplicações Assíncronas

### Exemplo 5: Lista de Produtos com Dados da API

```jsx
import { State } from '@jay-js/system';

// Estados para a aplicação
const produtos = State([]);
const carregando = State(true);
const erro = State('');
const termoBusca = State('');
const categoriaSelecionada = State('todas');

// Componente assíncrono para carregar dados
async function ListaProdutos() {
  try {
    // Simula uma chamada de API
    const fetchProdutos = async () => {
      // Em uma aplicação real, isso seria uma chamada fetch
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return [
        { id: 1, nome: 'Smartphone Galaxy S21', preco: 3999.99, categoria: 'eletronicos' },
        { id: 2, nome: 'Notebook Dell XPS', preco: 8999.99, categoria: 'eletronicos' },
        { id: 3, nome: 'Tênis Nike Air Max', preco: 899.99, categoria: 'vestuario' },
        { id: 4, nome: 'Livro Clean Code', preco: 99.99, categoria: 'livros' },
        { id: 5, nome: 'Monitor LG Ultrawide', preco: 2499.99, categoria: 'eletronicos' }
      ];
    };
    
    // Busca os produtos
    const dadosProdutos = await fetchProdutos();
    produtos.set(dadosProdutos);
    carregando.set(false);
    
  } catch (e) {
    erro.set('Erro ao carregar produtos: ' + e.message);
    carregando.set(false);
  }
  
  // Função para filtrar produtos
  function filtrarProdutos() {
    const busca = termoBusca.value.toLowerCase();
    const categoria = categoriaSelecionada.value;
    
    return produtos.value.filter(produto => {
      const correspondeTermoBusca = produto.nome.toLowerCase().includes(busca);
      const correspondeCategoria = categoria === 'todas' || produto.categoria === categoria;
      
      return correspondeTermoBusca && correspondeCategoria;
    });
  }
  
  // Função para formatar preço
  function formatarPreco(preco) {
    return preco.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }
  
  // Renderiza o componente após o carregamento
  return (
    <div className="app-produtos">
      <h1>Catálogo de Produtos</h1>
      
      <div className="controles">
        <div className="campo-busca">
          <input 
            type="text" 
            placeholder="Buscar produtos..." 
            value={termoBusca.value}
            onChange={e => termoBusca.set(e.target.value)}
          />
        </div>
        
        <div className="filtro-categorias">
          <select 
            value={categoriaSelecionada.value}
            onChange={e => categoriaSelecionada.set(e.target.value)}
          >
            <option value="todas">Todas as categorias</option>
            <option value="eletronicos">Eletrônicos</option>
            <option value="vestuario">Vestuário</option>
            <option value="livros">Livros</option>
          </select>
        </div>
      </div>
      
      {carregando.value ? (
        <div className="carregando">
          <p>Carregando produtos...</p>
        </div>
      ) : erro.value ? (
        <div className="erro">
          <p>{erro.value}</p>
          <button onClick={() => window.location.reload()}>
            Tentar novamente
          </button>
        </div>
      ) : (
        <>
          <div className="lista-produtos">
            {filtrarProdutos().length === 0 ? (
              <p className="sem-resultados">
                Nenhum produto encontrado para esta pesquisa.
              </p>
            ) : (
              filtrarProdutos().map(produto => (
                <div key={produto.id} className="card-produto">
                  <h3>{produto.nome}</h3>
                  <p className="categoria">{produto.categoria}</p>
                  <p className="preco">{formatarPreco(produto.preco)}</p>
                  <button className="btn-adicionar">
                    Adicionar ao Carrinho
                  </button>
                </div>
              ))
            )}
          </div>
          
          <div className="resultado-busca">
            <p>
              {filtrarProdutos().length} produto(s) encontrado(s)
            </p>
          </div>
        </>
      )}
    </div>
  );
}

// Renderizar o componente assíncrono
document.getElementById('app').appendChild(<ListaProdutos />);
```

## Componentes Reutilizáveis

### Exemplo 6: Sistema de Abas (Tabs)

```jsx
import { State } from '@jay-js/system';

// Componente de sistema de abas reutilizável
function SistemaAbas({ abas, conteudoDefault = 0 }) {
  // Estado para a aba ativa
  const abaAtiva = State(conteudoDefault);
  
  return (
    <div className="sistema-abas">
      <div className="cabecalho-abas">
        {abas.map((aba, index) => (
          <div 
            key={index}
            className={`aba ${abaAtiva.value === index ? 'ativa' : ''}`}
            onClick={() => abaAtiva.set(index)}
          >
            {aba.titulo}
          </div>
        ))}
      </div>
      
      <div className="conteudo-abas">
        {abas.map((aba, index) => (
          <div 
            key={index}
            className={`painel-aba ${abaAtiva.value === index ? 'ativo' : ''}`}
          >
            {aba.conteudo}
          </div>
        ))}
      </div>
    </div>
  );
}

// Uso do componente de abas
function PaginaProduto() {
  const abas = [
    {
      titulo: 'Descrição',
      conteudo: (
        <div className="descricao-produto">
          <h3>Smartphone Galaxy S21</h3>
          <p>
            O Samsung Galaxy S21 é um smartphone de última geração
            com câmera de alta resolução, processador potente e
            tela AMOLED de 6.2 polegadas.
          </p>
          <ul>
            <li>Processador Exynos 2100</li>
            <li>8GB de RAM</li>
            <li>128GB de armazenamento</li>
            <li>Bateria de 4000mAh</li>
          </ul>
        </div>
      )
    },
    {
      titulo: 'Especificações',
      conteudo: (
        <table className="tabela-especificacoes">
          <tbody>
            <tr>
              <td>Tela</td>
              <td>6.2" AMOLED, 120Hz</td>
            </tr>
            <tr>
              <td>Processador</td>
              <td>Exynos 2100 Octa-core</td>
            </tr>
            <tr>
              <td>Memória</td>
              <td>8GB RAM</td>
            </tr>
            <tr>
              <td>Armazenamento</td>
              <td>128GB UFS 3.1</td>
            </tr>
            <tr>
              <td>Câmera Traseira</td>
              <td>12MP (Wide) + 12MP (Ultra-wide) + 64MP (Telephoto)</td>
            </tr>
            <tr>
              <td>Câmera Frontal</td>
              <td>10MP</td>
            </tr>
            <tr>
              <td>Bateria</td>
              <td>4000mAh</td>
            </tr>
            <tr>
              <td>Sistema Operacional</td>
              <td>Android 11</td>
            </tr>
          </tbody>
        </table>
      )
    },
    {
      titulo: 'Avaliações',
      conteudo: (
        <div className="avaliacoes">
          <div className="avaliacao">
            <div className="usuario">
              <img src="/avatars/user1.jpg" alt="João Silva" />
              <div>
                <h4>João Silva</h4>
                <div className="estrelas">★★★★★</div>
              </div>
            </div>
            <p>Ótimo smartphone, câmera excelente e bateria dura o dia todo!</p>
          </div>
          
          <div className="avaliacao">
            <div className="usuario">
              <img src="/avatars/user2.jpg" alt="Maria Oliveira" />
              <div>
                <h4>Maria Oliveira</h4>
                <div className="estrelas">★★★★☆</div>
              </div>
            </div>
            <p>Gostei muito do desempenho, mas a bateria poderia durar mais.</p>
          </div>
          
          <div className="avaliacao">
            <div className="usuario">
              <img src="/avatars/user3.jpg" alt="Carlos Santos" />
              <div>
                <h4>Carlos Santos</h4>
                <div className="estrelas">★★★★★</div>
              </div>
            </div>
            <p>Melhor celular que já tive. Recomendo fortemente!</p>
          </div>
        </div>
      )
    }
  ];
  
  return (
    <div className="pagina-produto">
      <div className="produto-header">
        <div className="produto-imagem">
          <img src="/produtos/galaxy-s21.jpg" alt="Galaxy S21" />
        </div>
        
        <div className="produto-info">
          <h2>Samsung Galaxy S21</h2>
          <p className="preco">R$ 3.999,99</p>
          <p className="disponibilidade">Em estoque</p>
          
          <div className="acoes">
            <button className="btn-comprar">Comprar Agora</button>
            <button className="btn-carrinho">Adicionar ao Carrinho</button>
          </div>
        </div>
      </div>
      
      <SistemaAbas abas={abas} />
    </div>
  );
}

// Renderizar o componente
document.getElementById('app').appendChild(<PaginaProduto />);
```

## Conclusão

Os exemplos acima demonstram como o JSX no Jay JS pode ser usado para criar desde componentes simples até aplicações completas e interativas. Alguns pontos-chave a serem observados:

1. **Integração com Estado**: O JSX funciona perfeitamente com o sistema de estado do Jay JS para criar UIs reativas
2. **Componentes Reutilizáveis**: A composição de componentes permite criar interfaces modulares e fáceis de manter
3. **Suporte Assíncrono**: O suporte nativo a componentes assíncronos facilita a integração com APIs e carregamento de dados
4. **Expressividade**: O JSX torna o código mais declarativo e fácil de entender

A combinação de JSX com os outros pacotes do ecossistema Jay JS proporciona uma experiência de desenvolvimento poderosa e produtiva para criação de aplicações web modernas. 