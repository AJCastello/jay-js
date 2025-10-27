import path from "node:path";
import fs from "fs-extra";
import { faceChalk, log } from "../../../utils/terminal.js";
import { downloadFromGithub } from "../services/github-downloader.js";
import { validateComponent } from "../utils/validate-component.js";

const GITHUB_REPO = "AJCastello/jay-js";
const GITHUB_BRANCH = "development";
const COMPONENTS_PATH = "packages/ui/src/components";

export async function downloadComponents(components: string[]) {
	const componentsDir = path.join(process.cwd(), "src", "components", "ui");

	await fs.ensureDir(componentsDir);

	for (const component of components) {
		try {
			log`{gray Adding component:} {cyan ${component}}`;

			const isValid = await validateComponent(component);
			if (!isValid) {
				log`{yellow ⚠} Component {cyan ${component}} not found. Skipping...`;
				continue;
			}

			const componentPath = `${COMPONENTS_PATH}/${component}`;
			const targetPath = path.join(componentsDir, component);

			await downloadFromGithub({
				repo: GITHUB_REPO,
				branch: GITHUB_BRANCH,
				remotePath: componentPath,
				localPath: targetPath,
			});

			log`{green ✓} Added {cyan ${component}}`;
		} catch (error) {
			console.error(faceChalk`{red ✗} Failed to add ${component}:`, error);
		}
	}
}
