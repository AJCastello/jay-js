import fs from "fs-extra";
import path from "path";

interface DownloadOptions {
	repo: string;
	branch: string;
	remotePath: string;
	localPath: string;
}

export async function downloadFromGithub(options: DownloadOptions) {
	const { repo, branch, remotePath, localPath } = options;

	const baseUrl = `https://api.github.com/repos/${repo}/contents/${remotePath}`;

	try {
		const response = await fetch(`${baseUrl}?ref=${branch}`);

		if (!response.ok) {
			throw new Error(`Failed to fetch component: ${response.status} ${response.statusText}`);
		}

		const data = await response.json();

		if (!Array.isArray(data)) {
			throw new Error(`Expected directory contents, got: ${typeof data}`);
		}

		await fs.ensureDir(localPath);

		for (const file of data) {
			if (file.type === "file") {
				const fileResponse = await fetch(file.download_url);

				if (!fileResponse.ok) {
					throw new Error(`Failed to download file ${file.name}: ${fileResponse.status}`);
				}

				const content = await fileResponse.text();
				const filePath = path.join(localPath, file.name);

				await fs.writeFile(filePath, content, "utf8");
			}
		}
	} catch (error) {
		throw new Error(
			`Failed to download component from GitHub: ${error instanceof Error ? error.message : String(error)}`,
		);
	}
}
