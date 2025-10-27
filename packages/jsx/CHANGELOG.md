# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.2.2] - 27/10/2025

### Mudanças Importantes
- **BREAKING**: Migração de Jest para Vitest como framework de testes
- Atualização de peer dependencies para versões corretas dos pacotes Jay JS

### Adicionado
- Configuração do Vitest (vitest.config.ts)
- Suporte para UI de testes com `@vitest/ui`
- Cobertura de testes com `@vitest/coverage-v8`
- Novos scripts: `test:ui` para interface visual de testes

### Melhorado
- TypeScript: Adicionado `esModuleInterop` e `allowSyntheticDefaultImports` para melhor compatibilidade de módulos
- TypeScript: Mudança de `moduleResolution` de "Node" para "Bundler" para melhor suporte a bibliotecas modernas
- Tipos: Corrigido caminho de definições TypeScript no package.json (de `dist/index.d.ts` para `dist/jsx/src/index.d.ts`)
- Linting: Corrigido warnings de parâmetros não utilizados (prefixados com underscore)
- Peer dependencies atualizadas:
  - `@jay-js/ui`: ^3.1.1 → ^4.2.0
  - `@jay-js/elements`: ^1.1.0 → ^1.2.0

### Removido
- Dependências do Jest:
  - `@types/jest`
  - `jest`
  - `jest-environment-jsdom`
  - `ts-jest`
- Arquivo `jest.config.js` removido

### Corrigido
- Imports nos testes atualizados para API do Vitest
- Scripts de teste atualizados para usar comandos do Vitest
- Configuração TypeScript ajustada para types corretos (removido "jest", mantido apenas "node")

### Problemas Conhecidos
- 1 de 8 testes falhando: teste de event listeners (`onClick`) - bug pré-existente no componente `Base` do pacote `@jay-js/elements`
- Estrutura de tipos ainda contém pastas aninhadas (`dist/jsx/src/` e `dist/elements/src/`) devido a limitações do TypeScript com workspaces

### Notas Técnicas
- Testes agora rodam mais rápido com Vitest (compilação sob demanda com Vite)
- Suporte melhorado para ES Modules nativos
- Compatibilidade mantida com TypeScript strict mode

## [1.2.1] - 18/09/2025

### Melhorado
- Configuração do TypeScript atualizada para incluir definições de tipo
- Arquivo de definições globais TypeScript adicionado
- Compatibilidade aprimorada com ferramentas de desenvolvimento
- Configuração do Biome atualizada para incluir arquivos JavaScript

### Corrigido
- Scripts de build padronizados para usar npm consistentemente
- Melhoria na detecção de tipos durante o desenvolvimento

## [1.2.0] - Março/2025

### Adicionado
- Configuração Jest e scripts de teste
- Suporte aprimorado para JSX/TSX

## [1.1.4] - Anterior

### Melhorado
- Correções menores e melhorias de estabilidade

## [1.0.0] - Inicial

### Adicionado
- Versão inicial da biblioteca JSX para Jay JS
- Sistema de componentes JSX/TSX
- Plugin Vite para transformação JSX
- Runtime JSX personalizado