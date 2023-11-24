import { IImportedModule } from "../types/index.js";

export const ImportedModules: { [key: string]: IImportedModule } = {};

let idleTime = 0;

let ModulesCollector = setInterval(Collector, 2000);

function Collector() {
  const toRemove = [];
  for (const module in ImportedModules) {
    if (ImportedModules[module].lastUsed > 5 && ImportedModules[module].collect) {
      toRemove.push(module);
    } else {
      ImportedModules[module].lastUsed++;
    }
  }
  toRemove.forEach((module) => {
    delete ImportedModules[module];
  });

  idleTime++;
  if (idleTime > 6) {
    clearInterval(ModulesCollector);
    for (const module in ImportedModules) {
      ImportedModules[module].lastUsed = 0;
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
    for (const module in ImportedModules) {
      ImportedModules[module].lastUsed = 0;
    }
  }
}, 60000);