import Link from "next/link";
import { getBlogCopy } from "@/features/blog/lib/blog-locale";
import type { BlogLocale, Post } from "@/features/blog/types/post";

export function PostPageRelated({
	posts,
	locale,
}: {
	posts: Post[];
	locale: BlogLocale;
}) {
	const copy = getBlogCopy(locale);

	return (
		<section className="mt-16 border-t border-on-surface/15 pt-8">
			<div className="flex items-center gap-4 font-mono text-[9px] uppercase tracking-[0.18em] text-outline">
				<span>{copy.relatedPosts}</span>
				<span className="h-px flex-1 bg-on-surface/10" />
			</div>

			<div className="mt-6 grid gap-4 md:grid-cols-2">
				{posts.map((post) => (
					<Link
						key={post.slug}
						href={locale === "en" ? `/blog/${post.slug}` : `/blog/${post.slug}?lang=${locale}`}
						className="border border-on-surface/15 p-5 hover:border-primary transition-colors"
					>
						<p className="font-mono text-[9px] uppercase tracking-[0.14em] text-outline">
							{post.metadata.category}
						</p>
						<h2 className="mt-3 font-headline text-xl font-bold leading-tight">
							{post.metadata.title}
						</h2>
						<p className="mt-3 text-sm leading-7 text-on-surface-variant">
							{post.metadata.description}
						</p>
					</Link>
				))}
			</div>
		</section>
	);
}
