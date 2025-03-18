/**
 * Opções para renderização de conteúdo
 */
export interface RenderOptions {
  /** Como inserir o conteúdo: append ou prepend */
  insert?: "append" | "prepend";
}

/**
 * Tipos suportados para renderização
 */
export type RenderContent = Node | string | HTMLElement | (Node | string | HTMLElement)[] | null | undefined;

/**
 * Tipos de alvo aceitos para renderização
 */
export type RenderTarget = HTMLElement | string | null;

/**
 * Opções para queries no DOM
 */
export interface QueryOptions {
  /** Se deve retornar apenas elementos ativos/visíveis */
  onlyVisible?: boolean;
  /** Se deve incluir elementos aninhados */
  includeNested?: boolean;
}