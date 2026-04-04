import Link from "next/link";
import { getBlogCopy } from "@/features/blog/lib/blog-locale";
import type { BlogLocale, Post } from "@/features/blog/types/post";

export function PostPageNavigation({
	nextPost,
	previousPost,
	locale,
}: {
	nextPost?: Post;
	previousPost?: Post;
	locale: BlogLocale;
}) {
	const copy = getBlogCopy(locale);

	return (
		<div className="mt-16 grid gap-4 md:grid-cols-2">
			{nextPost ? (
				<Link
					href={locale === "en" ? `/blog/${nextPost.slug}` : `/blog/${nextPost.slug}?lang=${locale}`}
					className="group border border-on-surface/15 bg-surface-container-lowest p-5 transition-colors hover:border-primary"
				>
					<p className="font-mono text-[9px] uppercase tracking-[0.14em] text-outline">
						{copy.previousPost}
					</p>
					<p className="mt-3 font-headline text-xl font-bold leading-tight transition-colors group-hover:text-primary">
						{nextPost.metadata.title}
					</p>
					<p className="mt-3 text-sm leading-7 text-on-surface-variant">
						{nextPost.metadata.description}
					</p>
				</Link>
			) : (
				<div className="border border-dashed border-on-surface/10 p-5" />
			)}

			{previousPost ? (
				<Link
					href={locale === "en" ? `/blog/${previousPost.slug}` : `/blog/${previousPost.slug}?lang=${locale}`}
					className="group border border-on-surface/15 bg-surface-container-lowest p-5 transition-colors hover:border-primary"
				>
					<p className="font-mono text-[9px] uppercase tracking-[0.14em] text-outline">
						{copy.nextPost}
					</p>
					<p className="mt-3 font-headline text-xl font-bold leading-tight transition-colors group-hover:text-primary">
						{previousPost.metadata.title}
					</p>
					<p className="mt-3 text-sm leading-7 text-on-surface-variant">
						{previousPost.metadata.description}
					</p>
				</Link>
			) : (
				<div className="border border-dashed border-on-surface/10 p-5" />
			)}
		</div>
	);
}
