import { State, StateType } from "../core/state.js";

/**
 * Cria um estado persistente que salva valores no localStorage
 * @param key Chave para armazenamento no localStorage
 * @param defaultValue Valor padrão quando não há dados salvos
 */
export function PersistentState<T>(
  key: string,
  defaultValue: T
): StateType<T> {
  // Tenta recuperar o valor do localStorage
  let initialValue: T;
  try {
    const savedValue = localStorage.getItem(key);
    initialValue = savedValue ? JSON.parse(savedValue) : defaultValue;
  } catch (error) {
    initialValue = defaultValue;
  }

  // Cria um estado com o valor inicial
  const state = State<T>(initialValue);

  // Sobrescreve o método set para persistir alterações
  const originalSet = state.set;
  state.set = (newData, options) => {
    // Chama o método set original
    originalSet(newData, options);
    
    // Persiste o valor atualizado no localStorage
    try {
      localStorage.setItem(key, JSON.stringify(state.get()));
    } catch (error) {
      console.error(`Erro ao salvar estado em localStorage: ${error}`);
    }
  };

  return state;
}

/**
 * Combina múltiplos estados em um único objeto
 * @param states Objeto com estados a serem combinados
 * @returns Um novo estado que mantém os valores combinados atualizados
 */
export function CombineStates<T extends Record<string, any>>(
  states: { [K in keyof T]: StateType<T[K]> }
): StateType<T> {
  // Obtém valores iniciais de cada estado
  const initialValue = Object.entries(states).reduce(
    (acc, [key, state]) => {
      acc[key] = state.get();
      return acc;
    }, 
    {} as Record<string, any>
  ) as T;

  // Cria um estado combinado
  const combinedState = State<T>(initialValue);

  // Assina cada estado para atualizar o valor combinado
  Object.entries(states).forEach(([key, state]) => {
    state.sub(`combined_${key}`, (newValue) => {
      combinedState.set((current) => ({
        ...current,
        [key]: newValue
      }));
    });
  });

  return combinedState;
}

/**
 * Cria um estado derivado que depende de outro estado
 * @param sourceState Estado fonte
 * @param transform Função que transforma o valor do estado fonte
 */
export function DerivedState<T, U>(
  sourceState: StateType<T>,
  transform: (value: T) => U
): StateType<U> {
  // Cria o estado derivado com o valor transformado inicial
  const derivedState = State<U>(transform(sourceState.get()));
  
  // Assina o estado fonte para atualizar o derivado
  sourceState.sub("derived_state", (value) => {
    derivedState.set(transform(value));
  });
  
  return derivedState;
}