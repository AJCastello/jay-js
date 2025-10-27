import fs from "fs-extra";
import path from "path";
import { jayJsOptions } from "../../../../options/jayJsDefineOptions";
import { face, log } from "../../../../utils/terminal";

export async function finalizeOutDirectory() {
	try {
		face.setMessage("Finalizing out directory...");
		const cwd = process.cwd();
		const { outDir, transformedDir } = jayJsOptions.build;

		await fs.move(path.join(cwd, outDir), path.join(cwd, "dist_temp"), { overwrite: true });
		face.setMessage("Moving transformed content to out directory...");
		await fs.move(path.join(cwd, "dist_temp", transformedDir), path.join(cwd, outDir), { overwrite: true });
		await fs.remove(path.join(cwd, "dist_temp"));
	} catch (error) {
		log`Failed to finalize out directory: ${error}`;
	}
}
