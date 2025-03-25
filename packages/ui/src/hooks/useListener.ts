import type { Listener } from "../components/Base/Base.types.js";

/**
 * A hook to handle event listeners
 * 
 * @param type - The event type to listen for (e.g., 'click', 'input')
 * @param listeners - An object containing event handler functions
 * @returns void
 */
export function useListener(type: string, listeners: Listener) {
  const listener = Object.entries(listeners).find(([key, _value]) => key === type);
  if (!listener || !listener[1]) return;
  (listener[1] as any)();
}
