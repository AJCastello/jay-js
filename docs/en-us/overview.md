# System Package Overview

O **@jay-js/system** é o pacote core do Jay JS framework, fornecendo as funcionalidades fundamentais necessárias para criar aplicações web modernas e robustas. Este pacote oferece uma base sólida para desenvolvimento de single page applications (SPAs) com TypeScript.

## O que é o System Package?

O System package é o núcleo do Jay JS framework que integra várias funcionalidades essenciais em uma biblioteca coesa. Ele foi projetado para simplificar o desenvolvimento de aplicações web modernas, oferecendo ferramentas poderosas e flexíveis para gerenciar estado, roteamento, carregamento lazy, internacionalização e muito mais.

## Principais Funcionalidades

### 🏪 **State Management**
Sistema robusto de gerenciamento de estado que permite:
- Controlo centralizado do estado da aplicação
- Reatividade automática com atualizações eficientes
- Padrões previsíveis para mutação de estado
- Suporte para estados locais e globais

### 🚦 **Router**
Sistema de roteamento avançado que oferece:
- Navegação client-side suave
- Roteamento dinâmico com parâmetros
- Guards de rota para controlo de acesso
- Navegação programática e declarativa
- Suporte para lazy loading de rotas

### ⚡ **Lazy Loading**
Carregamento otimizado de módulos que proporciona:
- Divisão automática de código
- Carregamento sob demanda de componentes
- Melhoria significativa na performance inicial
- Gestão inteligente de dependências

### 🌐 **Internationalization (i18n)**
Sistema completo de internacionalização com:
- Suporte multi-idioma
- Carregamento dinâmico de traduções
- Interpolação de variáveis
- Pluralização inteligente
- Detecção automática de idioma

### 🛡️ **Guards**
Sistema de proteção para rotas e recursos:
- Controlo de acesso baseado em condições
- Redirecionamento automático
- Validação antes da navegação
- Integração com sistemas de autenticação

### 📋 **Forms**
Gestão avançada de formulários que inclui:
- Validação robusta com suporte para Zod e Yup
- Gestão automática de estado de formulários
- Feedback visual de erros
- Submissão assíncrona
- Campos dinâmicos

### 🎨 **Theme System**
Sistema de temas flexível com:
- Alternância entre temas claro/escuro
- Personalização completa de estilos
- Persistência de preferências
- Integração com CSS custom properties

### 🔧 **Utilities**
Conjunto de utilitários essenciais:
- Seletores DOM otimizados
- Geração de chaves únicas
- Renderização eficiente
- Helpers para desenvolvimento

## Vantagens do System Package

- **🚀 Performance**: Otimizado para aplicações de alta performance
- **📦 Modular**: Arquitetura modular que permite uso seletivo
- **🔒 Type-Safe**: Desenvolvido completamente em TypeScript
- **🧪 Testado**: Cobertura completa de testes automatizados
- **📚 Bem Documentado**: Documentação abrangente e exemplos práticos
- **🔄 Reativo**: Sistema reativo que atualiza automaticamente a UI

## Compatibilidade

O System package é compatível com:
- **Navegadores modernos** que suportam ES modules
- **TypeScript** 5.4+
- **Bundlers** como Vite, Webpack, Rollup
- **Frameworks de validação** como Zod e Yup (peer dependencies)

## Começar a Usar

Para começar a usar o @jay-js/system no seu projeto:

```bash
npm install @jay-js/system
```

```typescript
import { state, router, lazy } from '@jay-js/system';

// Exemplo básico de uso
const appState = state({ count: 0 });
const myRouter = router();
const LazyComponent = lazy(() => import('./MyComponent.js'));
```

O @jay-js/system fornece a base sólida que precisa para construir aplicações web modernas, eficientes e escaláveis com o Jay JS framework.