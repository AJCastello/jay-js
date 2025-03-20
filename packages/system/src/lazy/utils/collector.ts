import { IImportedModule } from "../types";

export const moduleCache = new Map<string, IImportedModule>();

let idleTime = 0;

let ModulesCollector = setInterval(Collector, 2000);

function Collector() {
  const toRemove = [];
  for (const [_, module] of moduleCache) {
    if (module.lastUsed > 5 && module.collect) {
      toRemove.push(module);
    } else {
      module.lastUsed++;
    }
  }
  
  for (const module of toRemove) {
    moduleCache.delete(module.module);
    module.lastUsed = 0;
    module.collect = false;
  }
  if (toRemove.length > 0) {
    console.log("Garbage collector removed modules:", toRemove);
  }

  idleTime++;
  if (idleTime > 6) {
    clearInterval(ModulesCollector);
    for (const [_, module] of moduleCache) {
      module.lastUsed = 0;
    }
  }
}

const resetIdle = () => {
  idleTime = 0;
  if (!ModulesCollector) {
    ModulesCollector = setInterval(Collector, 60000);
  }
};

const idleOptions = {
  passive: true,
  capture: true
};

window.addEventListener("mousemove", resetIdle, idleOptions);
window.addEventListener("keypress", resetIdle, idleOptions);

setInterval(() => {
  idleTime++;
  if (idleTime > 3) {
    for (const [_, module] of moduleCache) {
      module.lastUsed = 0;
    }
  }
}, 60000);