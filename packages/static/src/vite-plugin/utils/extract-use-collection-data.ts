export function extractUseCollectionData(src: string) {
	//const useCollectionRegex = /(\w+)\.collection\s*=\s*\useCollection({([\s\S]*?)\})/;
	//  const useCollectionRegex = /(\w+)\.collection\s*=\s*useCollection(?:<\w+>)?\({([\s\S]*?)\})/;
	const useCollectionRegex = /(\w+)\.collection\s*=\s*useCollection(?:<\w+>)?\(\{([\s\S]*?)\}\)/;

	const match = src.match(useCollectionRegex);

	if (match) {
		const objectName = match[1];
		const content = match[2];
		//const contentPathRegex = /contentPath:\s*['"](.+?)['"],/;
		// const formatRegex = /format:\s*['"](.+?)['"],/;
		const dirRegex = /dir:\s*['"](.+?)['"]/;
		const metadataRegex = /metadata:\s*\[([\s\S]*?)\]/;

		//const contentPathMatch = content.match(contentPathRegex);
		// const formatMatch = content.match(formatRegex);
		const dirMatch = content.match(dirRegex);
		const metadataMatch = content.match(metadataRegex);

		if (dirMatch) {
			// contentPathMatch && formatMatch
			const metadata = metadataMatch ? metadataMatch[1].split(",").map((item) => item.trim().replace(/['"]/g, "")) : [];
			return {
				objectName,
				contentPath: "../collection", // contentPathMatch[1],
				format: "js", // formatMatch[1],
				dir: dirMatch[1],
				metadata,
			};
		}
	}

	return null;
}
