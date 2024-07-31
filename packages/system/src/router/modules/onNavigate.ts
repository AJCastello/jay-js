import { routerDefineOptions } from "./routerDefineOptions";

export function onNavigate(callback: () => void){
  routerDefineOptions({ onNavigate: callback });
}