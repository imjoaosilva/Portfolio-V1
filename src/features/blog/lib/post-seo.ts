import type { Metadata } from "next";
import { SITE_INFO, getAbsoluteUrl } from "@/config/site";
import type { BlogLocale, Post } from "@/features/blog/types/post";

function getPostImageUrl(image: string) {
	return image.startsWith("http") ? image : getAbsoluteUrl(image);
}

export function getPostMetadata(post: Post, locale: BlogLocale): Metadata {
	return {
		title: post.metadata.title,
		description: post.metadata.description,
		alternates: {
			canonical: locale === "en" ? `/blog/${post.slug}` : `/blog/${post.slug}?lang=${locale}`,
		},
		openGraph: {
			title: post.metadata.title,
			description: post.metadata.description,
			url: locale === "en" ? `/blog/${post.slug}` : `/blog/${post.slug}?lang=${locale}`,
			type: "article",
			siteName: SITE_INFO.name,
			locale: locale === "pt" ? "pt_PT" : "en_US",
			publishedTime: new Date(post.metadata.publishedAt).toISOString(),
			modifiedTime: new Date(
				post.metadata.updatedAt ?? post.metadata.publishedAt,
			).toISOString(),
			authors: [SITE_INFO.name],
			images: [
				{
					url: getPostImageUrl(post.metadata.image),
					alt: post.metadata.title,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: post.metadata.title,
			description: post.metadata.description,
			images: [getPostImageUrl(post.metadata.image)],
		},
	};
}

export function getPostJsonLd(post: Post, locale: BlogLocale) {
	return {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.metadata.title,
		description: post.metadata.description,
		datePublished: new Date(post.metadata.publishedAt).toISOString(),
		dateModified: new Date(
			post.metadata.updatedAt ?? post.metadata.publishedAt,
		).toISOString(),
		author: {
			"@type": "Person",
			name: SITE_INFO.name,
		},
		url: getAbsoluteUrl(
			locale === "en" ? `/blog/${post.slug}` : `/blog/${post.slug}?lang=${locale}`,
		),
		image: getPostImageUrl(post.metadata.image),
	};
}
