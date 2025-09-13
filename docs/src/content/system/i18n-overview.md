---
category: Internacionalização
categoryId: 6
articleId: 1
slug: i18n-overview
title: Visão Geral da Internacionalização
description: Um sistema de internacionalização leve e type-safe para aplicações JavaScript e TypeScript
---

# Internacionalização (i18n)

## Referência da API

### API Principal

| Função | Descrição |
|----------|-------------|
| `i18nDefineOptions()` | Configura o sistema i18n com idiomas e opções |
| `i18nProvider()` | Inicializa o sistema i18n com um callback |
| `initLanguage()` | Inicializa manualmente o sistema de idiomas |
| `setLanguage()` | Altera o idioma ativo |
| `getCurrentLocale()` | Obtém o código do idioma ativo atual |
| `useI18n()` | Hook React para acessar traduções |

### Tipos de Configuração

```typescript
interface Ii18nOptions {
  languages: LanguageConfig[];
  defaultLocale?: string;
  saveToLocalStorage?: boolean;
  localStorageKey?: string;
  nestedKeys?: boolean;
}

interface LanguageConfig {
  code: string;
  data?: Record<string, any>;
  import?: () => Promise<Record<string, any>>;
}
```

O sistema de internacionalização do Jay-JS fornece uma solução leve e type-safe para gerenciar traduções em aplicações JavaScript e TypeScript. Oferece uma API simples, mas poderosa, que facilita a internacionalização de suas aplicações mantendo total segurança de tipos.

## Recursos

- **Traduções type-safe**: Suporte completo ao TypeScript com inferência de tipos
- **Chaves planas ou aninhadas**: Suporte para chaves de string diretas e estruturas aninhadas
- **Substituição de variáveis**: Conteúdo dinâmico usando variáveis de template
- **Detecção automática de idioma**: Baseada nas configurações do navegador
- **Preferências persistentes**: Salva preferências de idioma no localStorage
- **Carregamento lazy**: Suporte para carregamento dinâmico de arquivos de tradução
- **Integração simples**: Fácil de configurar e usar com qualquer framework

## Conceitos Básicos

1. **Chaves de Tradução**: Podem ser strings planas ou caminhos de notação de pontos aninhados
2. **Arquivos de Idioma**: Arquivos JSON contendo traduções para cada idioma suportado
3. **Variáveis**: Variáveis de template nas traduções usando a sintaxe `{{variável}}`
4. **Segurança de Tipos**: Suporte completo ao TypeScript para detectar erros em tempo de compilação
5. **Gerenciamento de Estado**: Gerenciamento de estado integrado para troca de idiomas
6. **Persistência**: Salvamento e carregamento automático de preferências de idioma

## Começando

Para começar com o sistema de internacionalização, você precisará:

1. Definir seus tipos e arquivos de tradução
2. Configurar o sistema i18n com seus idiomas
3. Inicializar o sistema
4. Usar o hook de tradução em seus componentes

Consulte as seções de documentação subsequentes para informações detalhadas sobre cada aspecto do sistema.