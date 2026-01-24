# Changelog

## Unreleased

### Changed

- Migração do componente `Button` para TSX, removendo dependência direta de `@jay-js/elements`.
- `Button` não aceita mais `tag` customizável (sempre renderiza `<button>`).
- Migração dos componentes básicos de formulário para TSX: `Checkbox`, `Radio`, `Range`, `FileInput`, `Select`, `TextArea`, `TextInput`, `Toggle`.
- Componentes migrados não aceitam mais `tag` customizável (seguem o padrão do piloto).
- Ajustes de configuração no `@jay-js/ui` para suportar `.tsx` (TypeScript e Biome).
- Migração dos componentes de layout para TSX: `Card` (e subcomponentes), `Divider`, `Stack`.
- Migração dos componentes de feedback para TSX: `Alert`, `Badge`, `Indicator`, `Loading`, `Progress`, `Tooltip`, `Toast`, `ToastContainer`, `Modal` (e subcomponentes), `Drawer` (e subcomponentes).
- Remoção de dependências diretas de `@jay-js/elements` nos componentes de feedback migrados.
- Padronização de exports ESM em `Progress` e `Indicator`.
