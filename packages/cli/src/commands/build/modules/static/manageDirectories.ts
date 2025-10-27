import path from "node:path";
import fs from "fs-extra";
import { jayJsOptions } from "../../../../options/jayJsDefineOptions";
import { face, log } from "../../../../utils/terminal";

export async function manageDirectories() {
	try {
		face.setMessage("Cloning {yellow content} and {yellow transformed} folders...");
		const cwd = process.cwd();
		const { srcDir, contentDir, contentTransformedDir, outDir } = jayJsOptions.build;
		await fs.remove(path.join(cwd, srcDir, contentTransformedDir));
		await fs.move(path.join(cwd, outDir, contentTransformedDir), path.join(cwd, outDir, contentDir), {
			overwrite: true,
		});
	} catch (error) {
		log`Failed to manage directories: ${error}`;
	}
}
