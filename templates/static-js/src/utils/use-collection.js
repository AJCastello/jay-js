export function useCollection({ dir, metadata }) {
	return {
		dir,
		metadata,
		async get() {
			const filePath = `../content/${this.dir}.collection.js`;
			const data = await import(/* @vite-ignore */ filePath);
			return data.default;
		},
	};
}
