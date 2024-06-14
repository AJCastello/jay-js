import { toCamelCase } from "../../../utils/case";

export function localeFileTemplate(value: string) {
  return `import { Ii18nBase } from "./i18n.types";

const ${toCamelCase(value)}: Ii18nBase = {
}

export default ${toCamelCase(value)};
`;
}