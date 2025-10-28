# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.2.0] - 26/10/2025

### Removido
- Componente TextInput - redundante, use `Input({ type: "text" })` diretamente
- Componente Checkbox - redundante, use `Input({ type: "checkbox" })` diretamente
- Componente Radio - redundante, use `Input({ type: "radio" })` diretamente
- Componente FileInput - redundante, use `Input({ type: "file" })` diretamente
- Componente Range - redundante, use `Input({ type: "range" })` diretamente

### Alterado
- Pacote mais enxuto focado apenas em elementos primitivos HTML
- Componentes específicos de input movidos para @jay-js/ui com estilização DaisyUI

### Melhorado
- Simplificação da função Base para atribuição de ID
- Remoção de registro de inspetor exclusivo para desenvolvimento

## [1.1.0] - 18/09/2025

### Adicionado
- Testes unitários completos para o componente Base
- Testes para hooks de lifecycle (onMount, onUnmount)
- Sistema de testes Jest configurado com cobertura
- Testes para componentes e utilitários diversos
- Integração aprimorada com sistema de inspeção em desenvolvimento

### Melhorado
- Componente Base refatorado para melhor gerenciamento de className
- Remoção do utilitário mergeClasses em favor de soluções mais simples
- Configuração do Biome atualizada para incluir arquivos JavaScript
- Configuração do TypeScript otimizada para compatibilidade

### Removido
- Utilitário mergeClasses obsoleto
- Dependências desnecessárias de merge de classes

### Corrigido
- Registro de elementos apenas em ambiente de desenvolvimento para inspeção
- Melhoria na gestão de ciclo de vida dos elementos

## [1.0.0] - Março/2025

### Adicionado
- Versão inicial do pacote @jay-js/elements
- Biblioteca headless de elementos básicos
- Componente Base fundamental
- Sistema de lifecycle para elementos
- Estrutura básica de componentes (Box, Button, Input, etc.)