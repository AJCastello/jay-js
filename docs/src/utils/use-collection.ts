export function useCollection<T>({ dir, metadata }: { dir: string; metadata: Array<string> }) {
	return {
		dir,
		metadata,
		async get(): Promise<T> {
			const filePath = `../content/${this.dir}.collection.js`;
			const data = await import(/* @vite-ignore */ filePath);
			return data.default;
		},
	};
}
