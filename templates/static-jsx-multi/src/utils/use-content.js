export function useContent({ dir, param, fileExt }) {
	return {
		dir,
		fileExt,
		param,
		async get(slug) {
			const filePath = `../content/${this.dir}/${slug}.${this.fileExt}`;
			const data = await import(/* @vite-ignore */ filePath);
			return data.default;
		},
	};
}
