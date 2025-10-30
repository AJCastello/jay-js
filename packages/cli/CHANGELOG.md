# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [3.1.0] - 30/10/2025

### Adicionado
- **Templates Tailwind**: Estilos padrão para html/body incluídos automaticamente no CSS do template init
- **Build otimizado**: Script `build:css` do Tailwind CLI incluído em projetos static Vite

### Melhorado
- **Build simplificado**: Consolidados pre/post build steps em único comando Vite build para projetos static
- Remoção de configuração `.npmrc` template desnecessária

### Corrigido
- Campo `packageManager` removido do package.json gerado (evita conflitos de gerenciador de pacotes)
- Lógica de inicialização do packageManager removida para maior flexibilidade
- Branch do GitHub atualizado de "main" para "development" no download de componentes

## [3.0.1] - 30/10/2025

### Corrigido
- jsxImportSource gerado pelo comando `init` (de `"@jay-js/jsx/runtime"` para `"@jay-js/jsx"`)
- Versões dos pacotes fixadas nos templates (substituído "latest" por versões semânticas)

## [3.0.0] - 27/10/2025

### ⚠️ BREAKING CHANGES
- **Removidos comandos legados**: Os seguintes comandos foram removidos da CLI:
  - `jayjs run` - Execução de arquivos Jay JS
  - `jayjs ctx` / `jayjs context` - Criação de contextos estruturados
  - `jayjs i18n` / `jayjs intl` - Gerenciamento de internacionalização
  - `jayjs md` / `jayjs module` - Criação de módulos estruturados
- A CLI agora foca em 3 comandos essenciais: `init`, `build` e `ui`

### Melhorado
- Refatoração completa dos imports do Node.js para padrão moderno
- Remoção de non-null assertions desnecessários no loader de assets
- Código mais limpo e manutenível com melhor organização de imports

### Corrigido
- Correções de linting em todo o pacote
- Remoção de variável não utilizada em staticCompiler

## [2.1.1] - 18/09/2025

### Melhorado
- Configuração do TypeScript atualizada para incluir definições de tipo
- Compatibilidade aprimorada com ferramentas de desenvolvimento
- Scripts de build padronizados para usar npm consistentemente
- Configuração do Biome atualizada para incluir arquivos JavaScript

### Corrigido
- Melhoria no gerenciamento de gerenciador de pacotes
- Prompts de usuário aprimorados para instalação de dependências
- Padronização no uso do npm em vez de pnpm para consistência

## [2.1.0] - Anterior

### Adicionado
- Funcionalidades de CLI expandidas
- Comandos para gerenciamento de projetos Jay JS

## [2.0.0] - Anterior

### Adicionado
- Refatoração major da CLI
- Novos comandos e funcionalidades

## [1.0.0] - Inicial

### Adicionado
- Versão inicial da CLI Jay JS
- Comandos básicos para scaffolding de projetos
- Sistema de templates
- Geração de componentes