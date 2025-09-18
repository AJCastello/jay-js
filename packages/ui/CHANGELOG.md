# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [3.7.0] - 10/03/2025

### Adicionado
- Sistema de utilitários `cn` para gerenciamento de classes CSS
- Integração com `clsx` e `tailwind-merge` para merge inteligente de classes
- Novos hooks: `useDrawer`, `useModal`, `useToast`
- Sistema de componentes Toast completo
- Componente TextInput aprimorado com tipos mais específicos

### Melhorado
- Refatoração completa da gestão de className em todos os componentes
- Substituição do `mergeClasses` pelo novo sistema `cn`
- Melhoria na tipagem TypeScript de componentes
- Configuração do Biome atualizada para incluir arquivos JavaScript
- Atualização de dependências (@biomejs/biome, clsx, tailwind-merge)

### Removido
- Componente RippleEffect descontinuado
- Utilitário mergeClasses obsoleto

## [3.6.0] - Anterior

### Adicionado
- Funcionalidades de UI expandidas

## [3.0.0] - Anterior

### Adicionado
- Componente Radio exportado
- Reestruturação major da biblioteca

## Versões Anteriores

Consulte as releases do GitHub para mudanças históricas anteriores à versão 3.0.0.