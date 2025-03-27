export function useContent<T>({
	dir,
	param,
	fileExt,
}: {
	dir: string;
	fileExt: "md" | "mdx" | "js";
	param: string;
}) {
	return {
		dir,
		fileExt,
		param,
		async get(slug: string): Promise<T> {
			const filePath = `../content/${this.dir}/${slug}.${this.fileExt}`;
			const data = await import(/* @vite-ignore */ filePath);
			return data.default;
		},
	};
}
