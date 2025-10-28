# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.3.0] - 27/10/2025

### Melhorado
- **Arquitetura**: Eliminada duplicação massiva de código JSX
  - Criado arquivo compartilhado `src/types/jsx-intrinsic-elements.d.ts` (130 linhas)
  - Redução de ~246 linhas duplicadas em jsx-runtime.ts e jsx-dev-runtime.ts
  - Manutenção simplificada: alterações JSX feitas em um único lugar
  - Princípio DRY (Don't Repeat Yourself) aplicado corretamente
- **Testes**: Migração de Jest para Vitest
  - Testes agora rodam mais rápido com compilação sob demanda
  - Suporte melhorado para ES Modules nativos
  - Compatibilidade mantida com TypeScript strict mode
- **TypeScript**: Melhorias na configuração
  - Adicionado `esModuleInterop` e `allowSyntheticDefaultImports` para melhor compatibilidade de módulos
  - Mudança de `moduleResolution` de "Node" para "Bundler" para melhor suporte a bibliotecas modernas
  - Path mappings configurados para `@jay-js/elements`
  - Tipos: Corrigido caminho de definições no package.json

### Adicionado
- Configuração do Vitest (vitest.config.ts)
- Suporte para UI de testes com `@vitest/ui`
- Cobertura de testes com `@vitest/coverage-v8`
- Novos scripts: `test:ui` para interface visual de testes
- Arquivo `src/types/global.d.ts` com definições globais
- Arquivo `src/types/jsx-intrinsic-elements.d.ts` com definições JSX compartilhadas

### Removido
- Dependências do Jest (jest, @types/jest, jest-environment-jsdom, ts-jest)
- Arquivo `jest.config.js`

### Corrigido
- Imports nos testes atualizados para API do Vitest
- Scripts de teste atualizados para usar comandos do Vitest
- Configuração TypeScript ajustada (removido types "jest")
- Linting: warnings de parâmetros não utilizados (prefixados com underscore)

### Atualizado
- Peer dependencies:
  - `@jay-js/ui`: ^3.1.1 → ^4.2.0
  - `@jay-js/elements`: ^1.1.0 → ^1.2.0

### Problemas Conhecidos
- 1 de 8 testes falhando: teste de event listeners (`onClick`) - bug pré-existente no componente `Base` do pacote `@jay-js/elements`

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