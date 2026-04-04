import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { BlogLocale, Post, PostMetadata } from "@/features/blog/types/post";

const contentDirectory = path.join(process.cwd(), "src/features/blog/content");
const defaultLocale: BlogLocale = "en";
const supportedLocales: BlogLocale[] = ["en", "pt"];

function parseFrontmatter(fileContent: string) {
	const file = matter(fileContent);

	return {
		metadata: file.data as PostMetadata,
		content: file.content,
	};
}

function getLocaleDirectory(locale: BlogLocale) {
	return path.join(contentDirectory, locale);
}

function getMDXFiles(dir: string) {
	if (!fs.existsSync(dir)) {
		return [];
	}

	return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
	const rawContent = fs.readFileSync(filePath, "utf-8");
	return parseFrontmatter(rawContent);
}

function getPostsForLocale(locale: BlogLocale) {
	const localeDirectory = getLocaleDirectory(locale);
	const mdxFiles = getMDXFiles(localeDirectory);

	return mdxFiles.map((file) => {
		const { metadata, content } = readMDXFile(path.join(localeDirectory, file));
		const slug = path.basename(file, path.extname(file));

		return {
			metadata,
			slug,
			content,
		};
	});
}

function sortPosts(posts: Post[]) {
	return posts.sort((left, right) => {
		if (left.metadata.pinned && !right.metadata.pinned) {
			return -1;
		}

		if (!left.metadata.pinned && right.metadata.pinned) {
			return 1;
		}

		return (
			new Date(right.metadata.publishedAt).getTime() -
			new Date(left.metadata.publishedAt).getTime()
		);
	});
}

export function getBlogLocale(value?: string): BlogLocale {
	return supportedLocales.includes(value as BlogLocale)
		? (value as BlogLocale)
		: defaultLocale;
}

export function getAvailableLocalesBySlug(slug: string): BlogLocale[] {
	return supportedLocales.filter((locale) => {
		const localeDirectory = getLocaleDirectory(locale);
		return fs.existsSync(path.join(localeDirectory, `${slug}.mdx`));
	});
}

export function getAllPosts(locale: BlogLocale = defaultLocale) {
	const localizedPosts = getPostsForLocale(locale);
	const fallbackPosts =
		locale === defaultLocale ? [] : getPostsForLocale(defaultLocale);
	const postsMap = new Map<string, Post>();

	for (const post of fallbackPosts) {
		postsMap.set(post.slug, {
			...post,
			locale: defaultLocale,
			availableLocales: getAvailableLocalesBySlug(post.slug),
		});
	}

	for (const post of localizedPosts) {
		postsMap.set(post.slug, {
			...post,
			locale,
			availableLocales: getAvailableLocalesBySlug(post.slug),
		});
	}

	return sortPosts(Array.from(postsMap.values()));
}

export function getPostBySlug(slug: string, locale: BlogLocale = defaultLocale) {
	return getAllPosts(locale).find((post) => post.slug === slug);
}

export function getLatestPosts(limit = 3, locale: BlogLocale = defaultLocale) {
	return getAllPosts(locale).slice(0, limit);
}

export function getBlogCategories(locale: BlogLocale = defaultLocale) {
	return [
		"All Posts",
		...new Set(getAllPosts(locale).map((post) => post.metadata.category)),
	];
}

export function filterPosts({
	category,
	query,
	locale = defaultLocale,
}: {
	category?: string;
	query?: string;
	locale?: BlogLocale;
}) {
	const normalizedQuery = query?.trim().toLowerCase() ?? "";
	const normalizedCategory =
		category && category !== "All Posts" ? category : undefined;

	return getAllPosts(locale).filter((post) => {
		const haystack = [
			post.metadata.title,
			post.metadata.description,
			post.metadata.category,
			...post.metadata.tags,
		]
			.join(" ")
			.toLowerCase();

		const matchesCategory = normalizedCategory
			? post.metadata.category === normalizedCategory
			: true;
		const matchesQuery = normalizedQuery
			? haystack.includes(normalizedQuery)
			: true;

		return matchesCategory && matchesQuery;
	});
}

export function getRelatedPosts(
	currentPost: Post,
	limit = 2,
	locale: BlogLocale = defaultLocale,
) {
	return getAllPosts(locale)
		.filter((post) => post.slug !== currentPost.slug)
		.map((post) => ({
			post,
			score:
				Number(post.metadata.category === currentPost.metadata.category) * 2 +
				post.metadata.tags.filter((tag) =>
					currentPost.metadata.tags.includes(tag),
				).length,
		}))
		.sort((left, right) => {
			if (right.score !== left.score) {
				return right.score - left.score;
			}

			return (
				new Date(right.post.metadata.publishedAt).getTime() -
				new Date(left.post.metadata.publishedAt).getTime()
			);
		})
		.slice(0, limit)
		.map(({ post }) => post);
}

export function getAdjacentPosts(
	slug: string,
	locale: BlogLocale = defaultLocale,
) {
	const posts = getAllPosts(locale);
	const index = posts.findIndex((post) => post.slug === slug);

	return {
		nextPost: index > 0 ? posts[index - 1] : undefined,
		previousPost:
			index >= 0 && index < posts.length - 1 ? posts[index + 1] : undefined,
	};
}

export function getBlogStats(locale: BlogLocale = defaultLocale) {
	const posts = getAllPosts(locale);

	return {
		postCount: posts.length,
		categoryCount: new Set(posts.map((post) => post.metadata.category)).size,
		tagCount: new Set(posts.flatMap((post) => post.metadata.tags)).size,
	};
}
