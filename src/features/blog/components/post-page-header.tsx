import Link from "next/link";
import { getBlogCopy, getLocaleLabel } from "@/features/blog/lib/blog-locale";
import type { BlogLocale, Post } from "@/features/blog/types/post";

export function PostPageHeader({
	nextPost,
	previousPost,
	locale,
	slug,
	availableLocales,
}: {
	nextPost?: Post;
	previousPost?: Post;
	locale: BlogLocale;
	slug: string;
	availableLocales: BlogLocale[];
}) {
	const copy = getBlogCopy(locale);

	return (
		<div className="flex items-center justify-between gap-4 border-b border-on-surface/15 pb-5">
			<div className="flex items-center gap-3">
				<Link
					href={locale === "en" ? "/blog" : `/blog?lang=${locale}`}
					className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-outline transition-colors hover:text-primary"
				>
					<span>←</span>
					<span>{copy.backToBlog}</span>
				</Link>
				<div className="flex items-center gap-1">
					{availableLocales.map((item) => (
						<Link
							key={item}
							href={item === "en" ? `/blog/${slug}` : `/blog/${slug}?lang=${item}`}
							className={`inline-flex h-7 items-center border px-2.5 font-mono text-[10px] uppercase leading-none tracking-[0.14em] transition-colors ${
								item === locale
									? "border-primary text-primary"
									: "border-on-surface/20 text-outline hover:border-primary/40 hover:text-primary"
							}`}
						>
							{getLocaleLabel(item)}
						</Link>
					))}
				</div>
			</div>
			<div className="flex items-center gap-2">
				{nextPost ? (
					<Link
						href={locale === "en" ? `/blog/${nextPost.slug}` : `/blog/${nextPost.slug}?lang=${locale}`}
						className="border border-on-surface/15 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
					>
						{copy.prev}
					</Link>
				) : null}
				{previousPost ? (
					<Link
						href={locale === "en" ? `/blog/${previousPost.slug}` : `/blog/${previousPost.slug}?lang=${locale}`}
						className="border border-on-surface/15 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
					>
						{copy.next}
					</Link>
				) : null}
			</div>
		</div>
	);
}
