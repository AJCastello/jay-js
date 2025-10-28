# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.1.0] - 18/09/2025

### Adicionado
- Plugin de inspetor completo com funcionalidades de debugging
- Sistema de transformação de código para click-to-source
- Runtime de inspetor com registro automático de elementos em desenvolvimento
- Endpoints de health check e debug report
- Suporte para ESM e filtragem por padrões glob
- Atalhos de teclado para funcionalidades do inspetor
- Sistema de bridge para comunicação entre runtime e plugin
- Logging melhorado para desenvolvimento
- Testes unitários para utilitários do inspetor

### Melhorado
- Configuração do TypeScript atualizada para compatibilidade
- Integração com elementos base para registro em desenvolvimento
- Sistema de arquivos temporários para servir scripts runtime
- Injeção de HTML automática para funcionalidades do inspetor

### Removido
- Arquivos de exemplo e componentes obsoletos
- Utilitários de debug antigos

## [1.0.0] - Março/2025

### Adicionado
- Versão inicial do pacote @jay-js/inspector
- Estrutura básica do projeto
- Configuração inicial de build e publicação