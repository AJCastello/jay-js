import { Listener } from "../components";

export function useListener(type: string, listeners: Listener) {
  const listener = Object.entries(listeners).find(([key, _value]) => key === type);
  if (!listener || !listener[1]) return;
  (listener[1] as any)();  
}