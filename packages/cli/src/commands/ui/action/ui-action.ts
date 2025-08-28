import { log, faceChalk } from "../../../utils/terminal.js";
import { downloadComponents } from "../modules/download-components.js";

export async function ui(components: string[]) {
  try {
    log`{bold Adding UI components:} {green ${components.join(", ")}}`;
    
    await downloadComponents(components);
    
    log`{green ✓} Components added successfully!`;
    log`{gray Make sure to import the components in your project where needed.}`;
  } catch (error) {
    console.error(faceChalk`{red Error adding components:}`, error);
    process.exit(1);
  }
}