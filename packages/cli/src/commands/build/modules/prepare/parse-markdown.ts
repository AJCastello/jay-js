// parsers
import matter from "gray-matter";
import { marked } from "marked";
import { log } from "../../../../utils/terminal";

export async function parseMarkdown(src: string): Promise<Record<string, any>> {
	try {
		const { data, content } = matter(src);
		const htmlContent = await marked(content);
		return { ...data, content: htmlContent };
	} catch (error) {
		log`Failed to parse markdown: ${error}`;
		return { content: "" };
	}
}
