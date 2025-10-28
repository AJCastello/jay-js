// parsers
import matter from "gray-matter";
import { marked } from "marked";

export function parseMarkdown(src: string): any {
	try {
		const { data, content } = matter(src);
		const htmlContent = marked(content);
		return { ...data, content: htmlContent };
	} catch (error) {
		console.error("Failed to parse markdown", error);
		return { content: "" };
	}
}
