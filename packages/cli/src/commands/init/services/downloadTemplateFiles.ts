import path from "node:path";
import degit from "degit";
import fs from "fs-extra";
import os from "os";
import { toKebabCase } from "../../../utils/case";
import { face, log } from "../../../utils/terminal";

export async function downloadTemplateFiles(templateId: string, projectName: string) {
	const templatePath = `templates/${templateId}`;
	const tempDir = path.join(os.tmpdir(), toKebabCase(projectName));

	if (fs.existsSync(tempDir)) {
		fs.removeSync(tempDir);
	}

	try {
		fs.ensureDirSync(toKebabCase(projectName));
		face.setMessage(`Cloning template (${templateId})...`);

		const emitter = degit(`AJCastello/jay-js/${templatePath}`, {
			cache: false,
			force: true,
			verbose: true,
		});

		emitter.on("info", (info) => {
			face.setMessage(`${info.message.substring(0, 50)}...`);
		});

		const projectPath = path.join(process.cwd(), toKebabCase(projectName));
		await emitter.clone(projectPath);

		fs.removeSync(tempDir);
	} catch (err) {
		log`{red Error setting up the project: ${err}}`;
	}
}

// import fs from "fs-extra";
// import path from "path";
// import chalk from "chalk";
// import { face } from "../../../utils/terminal";

// export async function downloadTemplateFiles(templateId: string, projectName: string) {
//   try {
//     async function downloadRepository(
//       dirPath: string,
//       targetDir: string
//     ) {
//       const baseUrl = `https://api.github.com/repos/AJCastello/jay-js/contents/templates/${dirPath}`;
//       const response = await fetch(baseUrl);
//       if (response.ok) {
//         const items: any[] = await response.json();
//         for (const item of items) {
//           if (item.type === "file") {
//             const fileUrl = item.download_url;
//             const fileName = item.name;
//             const arrayBuffer = await (await fetch(fileUrl)).arrayBuffer();
//             const buffer = Buffer.from(arrayBuffer);
//             face.setMessage(`File created: ${path.join(targetDir, fileName)}`);
//             fs.writeFileSync(path.join(targetDir, fileName), buffer);
//           } else if (item.type === "dir") {
//             const subDirPath = path.join(dirPath, item.name);
//             const subTargetDir = path.join(targetDir, item.name);
//             face.setMessage(`Directory created: ${subTargetDir}`);
//             fs.mkdirSync(subTargetDir, { recursive: true });
//             await downloadRepository(subDirPath, subTargetDir);
//           }
//         }
//       } else {
//         throw new Error(`Error downloading repository: ${response.statusText}`);
//       }
//     }
//     const targetDir = path.join(process.cwd(), projectName);
//     await downloadRepository(templateId, targetDir);
//   } catch (err) {
//     console.error(`Error setting up the project: ${err}`);
//   }
// }
