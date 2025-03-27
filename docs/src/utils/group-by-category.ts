import type { ICollectionGrouped, TCollection } from "../types";

export function groupByCategory(data: TCollection): Array<ICollectionGrouped> {
	const groupedData: Record<string, ICollectionGrouped> = {};
	data.forEach((item) => {
		if (!groupedData[item.categoryId]) {
			groupedData[item.categoryId] = {
				title: item.category,
				id: item.categoryId,
				articles: [],
			};
		}
		groupedData[item.categoryId].articles.push({
			id: item.articleId,
			title: item.title,
			slug: item.slug,
		});
	});
	const result = Object.values(groupedData).sort((a, b) => a.id - b.id);
	result.forEach((category) => {
		category.articles.sort((a, b) => a.id - b.id);
	});
	return result;
}
