import type { MetadataRoute } from "next";
import { SITE_INFO } from "@/config/site";
import { getAllPosts } from "@/features/blog/data/posts";

export default function sitemap(): MetadataRoute.Sitemap {
	const routes: MetadataRoute.Sitemap = ["", "/blog"].map((route) => ({
		url: `${SITE_INFO.url}${route}`,
		lastModified: new Date().toISOString(),
	}));

	const posts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
		url: `${SITE_INFO.url}/blog/${post.slug}`,
		lastModified: new Date(
			post.metadata.updatedAt ?? post.metadata.publishedAt,
		).toISOString(),
	}));

	return [...routes, ...posts];
}
