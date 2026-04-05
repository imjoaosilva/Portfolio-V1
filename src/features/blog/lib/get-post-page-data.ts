import {
	getAdjacentPosts,
	getPostBySlug,
	getRelatedPosts,
} from "@/features/blog/data/posts";
import { getPostJsonLd } from "@/features/blog/lib/post-seo";
import type { BlogLocale } from "@/features/blog/types/post";

export function getPostPageData(slug: string, locale: BlogLocale) {
	const post = getPostBySlug(slug, locale);

	if (!post) {
		return null;
	}

	return {
		post,
		relatedPosts: getRelatedPosts(post, 2, locale),
		...getAdjacentPosts(post.slug, locale),
		articleJsonLd: getPostJsonLd(post, locale),
	};
}
