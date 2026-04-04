export type BlogLocale = "en" | "pt";

export type PostMetadata = {
	title: string;
	description: string;
	publishedAt: string;
	updatedAt?: string;
	readTime: string;
	category: string;
	tags: string[];
	image: string;
	pinned?: boolean;
	featured?: boolean;
};

export type Post = {
	metadata: PostMetadata;
	slug: string;
	content: string;
	locale: BlogLocale;
	availableLocales: BlogLocale[];
};
