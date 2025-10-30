# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [4.0.1] - 30/10/2025

### Adicionado
- **Sistema de Temas**: Implementação completa do theme management system com configuração e testes
- **AutoReactiveState**: Sistema de reatividade automática para detecção e transformação de estado
- **Utilitários de Renderização**: Novas funções utilitárias para renderização de elementos e merge de classes
- **Documentação do Router**: Exemplos detalhados para sintaxe de path patterns (named, optional, wildcard parameters)
- **Route Metadata**: Suporte a metadados de rota no sistema de roteamento
- **Subscription Registry**: Gerenciamento aprimorado de subscrições no sistema de estado com lifecycle management

### Melhorado
- **Estado Simplificado**: Removidas funções PersistentState e CombineStates para streamline do gerenciamento de estado
- **Helpers Legados**: Draggable e Theme movidos para helpers legados
- Exportação de utilitários relacionados a tema no módulo utils
- Configuração TypeScript atualizada (paths include/exclude)

### Corrigido
- **Module Loader**: Adicionado await na função loadModule para garantir comportamento assíncrono adequado
- Scripts de build refinados e formatação de versão normalizada

## [4.0.0] - 18/09/2025

### ⚠️ BREAKING CHANGES

- **useForm API**: Alterada ordem dos parâmetros no callback `onSubmit` - agora `(data, event) => void` em vez de `(event, data) => void`
- **useForm API**: Alterada ordem dos parâmetros no callback `beforeChange` nas opções de registro - agora `(value, event) => string | undefined` em vez de `(event, value) => string | undefined`

### Adicionado
- Opção `replace` na função render que permite substituir o elemento de destino usando `replaceWith`
- Suporte para conteúdo em array quando usando a opção `replace` com document fragment para múltiplos elementos
- Novos métodos `reset` e `destroy` no useForm para melhor gerenciamento de formulários
- Opção `debounceMs` no useForm para timing de validação customizável
- Função `getCurrentTheme` para recuperar tema e modo atuais
- Sistema avançado de gerenciamento de temas com definições e troca de modo
- Propriedade `loader` no tipo TRoute para componentes de carregamento customizados
- Integração com LazyModule para importações dinâmicas
- Sistema Guard para controle de acesso baseado em funções com gerenciamento de permissões
- Opção `setPathname` para manipulação de path customizada no router
- Função `findThemeByName` para localizar temas por ID ou nome da variante

### Melhorado
- Função render aprimorada para suportar substituição de elementos além de inserção de conteúdo
- Validação melhorada para temas armazenados com lógica de fallback
- Flexibilidade aprimorada com `oninput` opcional no tipo TRegister
- Funcionalidade de roteamento aprimorada com resolução de elemento de destino
- Gerenciamento de formulários melhorado com tipos atualizados
- Configuração de tema padrão no gerenciador de configuração de tema

### Removido
- Funcionalidade de prefetch da documentação e código do lazy loading
- Utilitários de draggable legados e testes associados
- Opção force update e testes relacionados do gerenciamento de estado

## [3.0.1] - Março/2025

### Melhorado
- Scripts de build padronizados e formatação refinada

## Versões Anteriores

Consulte as releases do GitHub para mudanças históricas anteriores à versão 3.0.0.