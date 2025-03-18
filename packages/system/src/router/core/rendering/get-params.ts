/**
 * Extrai parâmetros dinâmicos da URL
 * @param path Padrão da rota (ex: /users/:id)
 * @param result Resultado da correspondência de regex
 */
export function getParams(path: string, result: RegExpMatchArray | null): Record<string, string> {
  const params: Record<string, string> = {};
  
  if (!result) {
    return params;
  }

  // Extrai os nomes dos parâmetros do padrão da rota
  const paramNames = path.match(/:(\w+)/g)?.map(param => param.substring(1)) || [];
  
  // Associa os valores capturados aos nomes dos parâmetros
  paramNames.forEach((name, index) => {
    params[name] = result[index + 1];
  });

  return params;
}