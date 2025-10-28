---
categoria: Internacionalização
categoriaId: 6
artigoId: 6
slug: exemplos-i18n
titulo: Exemplos e Padrões de I18n
descricao: Padrões de uso comuns e exemplos para o sistema de internacionalização
---

# Exemplos e Padrões de I18n

Este guia fornece exemplos práticos e padrões comuns para usar o sistema de internacionalização em diferentes cenários.

## Configuração Completa da Aplicação

Aqui está um exemplo completo de configuração do i18n em uma aplicação típica:

```typescript
// types/i18n.ts
export interface Translations {
  common: {
    welcome: string;
    loading: string;
    error: string;
  };
  auth: {
    login: string;
    logout: string;
    'email.label': string;
    'email.placeholder': string;
    'password.label': string;
    'password.placeholder': string;
  };
}

// locales/en.ts
export default {
  common: {
    welcome: 'Bem-vindo ao nosso aplicativo',
    loading: 'Carregando...',
    error: 'Ocorreu um erro'
  },
  auth: {
    login: 'Entrar',
    logout: 'Sair',
    'email.label': 'Endereço de Email',
    'email.placeholder': 'Digite seu email',
    'password.label': 'Senha',
    'password.placeholder': 'Digite sua senha'
  }
};

// i18n.ts
import { Ii18nOptions, useI18n } from '@jay-js/system';
import type { Translations } from './types/i18n';

export const i18nConfig: Ii18nOptions = {
  defaultLocale: 'en',
  nestedKeys: true,
  saveToLocalStorage: true,
  languages: [
    {
      code: 'en',
      import: () => import('./locales/en')
    },
    {
      code: 'es',
      import: () => import('./locales/es')
    }
  ]
};

export const i18n = useI18n<Translations>();

// main.ts
import { i18nProvider } from '@jay-js/system';
import { i18nConfig } from './i18n';
import { renderApp } from './app';

i18nProvider(() => {
  renderApp();
}, i18nConfig);
```

## Padrão de Componentes Comuns

Exemplo de criação de componentes reutilizáveis internacionalizados:

```typescript
// components/LoginForm.ts
import { i18n } from '../i18n';

export function LoginForm() {
  return `
    <form>
      <div>
        <label>${i18n('auth.email.label')}</label>
        <input
          type="email"
          placeholder="${i18n('auth.email.placeholder')}"
        />
      </div>
      <div>
        <label>${i18n('auth.password.label')}</label>
        <input
          type="password"
          placeholder="${i18n('auth.password.placeholder')}"
        />
      </div>
      <button>${i18n('auth.login')}</button>
    </form>
  `;
}
```

## Componente de Troca de Idioma

Um exemplo prático de um componente de troca de idioma:

```typescript
import { setLanguage, getCurrentLocale } from '@jay-js/system';
import { i18n } from '../i18n';

export function LanguageSwitcher() {
  const currentLocale = getCurrentLocale();

  const languages = [
    { code: 'en', label: 'Inglês' },
    { code: 'es', label: 'Espanhol' },
    { code: 'fr', label: 'Francês' }
  ];

  return `
    <div class="language-switcher">
      <label>${i18n('common.language')}</label>
      <select
        onchange="handleLanguageChange(event)"
        value="${currentLocale}"
      >
        ${languages.map(lang => `
          <option
            value="${lang.code}"
            ${currentLocale === lang.code ? 'selected' : ''}
          >
            ${lang.label}
          </option>
        `).join('')}
      </select>
    </div>
  `;
}

function handleLanguageChange(event: Event) {
  const select = event.target as HTMLSelectElement;
  setLanguage(select.value);
}
```

## Carregamento Dinâmico de Conteúdo

Exemplo de carregamento de traduções com base na interação do usuário:

```typescript
import { setLanguage } from '@jay-js/system';
import { i18n } from '../i18n';

async function loadLanguageContent(code: string) {
  try {
    // Mostrar estado de carregamento
    showLoading(i18n('common.loading'));

    // Alterar idioma - isso acionará o carregamento dinâmico
    await setLanguage(code);

    // Atualizar UI
    hideLoading();
    showSuccess(i18n('common.language.changed'));
  } catch (error) {
    hideLoading();
    showError(i18n('common.error.loading'));
  }
}
```

## Formatação com Variáveis

Exemplo avançado de uso de variáveis em traduções:

```typescript
// types/i18n.ts
interface Translations {
  notifications: {
    'count.none': string;
    'count.one': string;
    'count.many': string;
    'last.updated': string;
  };
}

// Uso no componente
function NotificationBadge({ count, lastUpdate }: Props) {
  const message = count === 0
    ? i18n('notifications.count.none')
    : count === 1
      ? i18n('notifications.count.one', { count })
      : i18n('notifications.count.many', { count });

  const updated = i18n('notifications.last.updated', {
    time: new Date(lastUpdate).toLocaleTimeString()
  });

  return `
    <div>
      <span>${message}</span>
      <small>${updated}</small>
    </div>
  `;
}
```