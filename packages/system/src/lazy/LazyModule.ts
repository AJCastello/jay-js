// components
import { ErrorImport, NotFound, ModuleWrapper } from "./components";

// collector
import { ImportedModules } from "./utils/collector";

// types
import { ILazyModule } from "./types";

export function LazyModule(module: ILazyModule, loader?: HTMLElement) {
  if (!module) {
    return NotFound();
  }

  let moduleSection: HTMLElement;

  if (module.module in ImportedModules) {
    moduleSection = ImportedModules[module.module].module({ ...module.props });
    ImportedModules[module.module].lastUsed = 0;
    return moduleSection;
  } else {
    moduleSection = loader || ModuleWrapper();
  }

  module
    .import()
    .then((moduleImported) => {
      ImportedModules[module.module] = {
        module: moduleImported[module.module],
        lastUsed: 0,
        collect: module.collect ?? true
      };
      moduleSection.replaceWith(ImportedModules[module.module].module({ ...module.props }));
    })
    .catch((_error) => {
      moduleSection.replaceWith(ErrorImport());
    });

  return moduleSection;
}
