import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDX } from "@/components/mdx";
import {
	getAdjacentPosts,
	getAllPosts,
	getBlogLocale,
	getPostBySlug,
	getRelatedPosts,
} from "@/features/blog/data/posts";
import { PostPageHeader } from "@/features/blog/components/post-page-header";
import { PostPageHero } from "@/features/blog/components/post-page-hero";
import { PostPageNavigation } from "@/features/blog/components/post-page-navigation";
import { PostPageRelated } from "@/features/blog/components/post-page-related";
import { PostPageSidebar } from "@/features/blog/components/post-page-sidebar";
import { getPostJsonLd, getPostMetadata } from "@/features/blog/lib/post-seo";

type PostPageProps = {
	params: Promise<{
		slug: string;
	}>;
	searchParams: Promise<{
		lang?: string;
	}>;
};

export async function generateStaticParams() {
	return getAllPosts("en").map((post) => ({
		slug: post.slug,
	}));
}

export async function generateMetadata({
	params,
	searchParams,
}: PostPageProps): Promise<Metadata> {
	const { slug } = await params;
	const { lang } = await searchParams;
	const locale = getBlogLocale(lang);
	const post = getPostBySlug(slug, locale);

	if (!post) {
		return {
			title: "Post not found",
		};
	}

	return getPostMetadata(post, locale);
}

export default async function BlogPostPage({
	params,
	searchParams,
}: PostPageProps) {
	const { slug } = await params;
	const { lang } = await searchParams;
	const locale = getBlogLocale(lang);
	const post = getPostBySlug(slug, locale);

	if (!post) {
		notFound();
	}

	const relatedPosts = getRelatedPosts(post, 2, locale);
	const { nextPost, previousPost } = getAdjacentPosts(post.slug, locale);
	const articleJsonLd = getPostJsonLd(post, locale);

	return (
		<div className="min-h-svh max-w-4xl mx-auto px-6 py-10">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
				}}
			/>

			<PostPageHeader
				nextPost={nextPost}
				previousPost={previousPost}
				locale={locale}
				slug={post.slug}
				availableLocales={post.availableLocales}
			/>
			<PostPageHero post={post} locale={locale} />

			<div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem]">
				<article>
					<MDX code={post.content} />
				</article>

				<PostPageSidebar post={post} locale={locale} />
			</div>

			<PostPageNavigation
				nextPost={nextPost}
				previousPost={previousPost}
				locale={locale}
			/>
			<PostPageRelated posts={relatedPosts} locale={locale} />
		</div>
	);
}
