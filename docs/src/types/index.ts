export interface IJayJSPackage {
	name: string;
	packageName: string;
	description: string;
	image: string;
	url: string;
}

export type TCollection = Array<TArticle>;

export type TArticle = {
	title: string;
	slug: string;
	content: string;
	category: string;
	categoryId: number;
	articleId: number;
	description?: string;
};

export interface ICollectionGrouped {
	title: string;
	id: number;
	articles: Array<ICollectionArticle>;
}

export interface ICollectionArticle {
	id: number;
	title: string;
	slug: string;
}

export type TArticleFooter = {
	position: "previous" | "next";
	title: string;
	slug: string;
	category: string;
	categoryId: number;
	articleId: number;
	description?: string;
};

export type TContentFormatter = {
	element: HTMLElement;
	list: TOnThisPageList;
};

export type TOnThisPageList = Array<TOnThisPageListItem>;

export type TOnThisPageListItem = {
	textContent: string;
	id: string;
};
