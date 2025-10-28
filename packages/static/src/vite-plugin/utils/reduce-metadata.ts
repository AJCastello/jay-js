export function reduceMetadata(parsedContent: any, metadata?: Array<string>) {
	if (metadata === undefined) {
		return parsedContent;
	}
	return metadata.reduce((acc, item) => {
		(acc as any)[item] = parsedContent[item];
		return acc;
	}, {});
}
