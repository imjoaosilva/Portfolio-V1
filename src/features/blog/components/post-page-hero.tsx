import Image from "next/image";
import Link from "next/link";
import type { BlogLocale, Post } from "@/features/blog/types/post";
import { formatPostDate } from "@/features/blog/lib/format-post-date";

export function PostPageHero({
	post,
	locale,
}: {
	post: Post;
	locale: BlogLocale;
}) {
	return (
		<>
			<div className="pt-8">
				<div className="mt-8 flex flex-wrap gap-3 font-mono text-[10px] uppercase tracking-[0.14em] text-outline">
					<span>
						{formatPostDate(post.metadata.publishedAt, {
							day: "2-digit",
							month: "short",
							year: "numeric",
						})}
					</span>
					<span>{post.metadata.readTime}</span>
					<span className="text-primary">{post.metadata.category}</span>
				</div>

				<h1 className="mt-4 font-headline font-black text-[clamp(2.6rem,7vw,5rem)] leading-[0.95] tracking-tight">
					{post.metadata.title}
				</h1>

				<p className="mt-5 max-w-2xl text-base leading-8 text-on-surface-variant">
					{post.metadata.description}
				</p>

				<div className="mt-6 flex flex-wrap gap-2">
					{post.metadata.tags.map((tag) => (
						<Link
							key={tag}
							href={
								locale === "en"
									? `/blog?category=${encodeURIComponent(post.metadata.category)}&q=${encodeURIComponent(tag)}`
									: `/blog?lang=${locale}&category=${encodeURIComponent(post.metadata.category)}&q=${encodeURIComponent(tag)}`
							}
							className="font-mono text-[10px] uppercase tracking-[0.12em] px-2.5 py-1 border border-on-surface/20 text-on-surface-variant hover:border-primary hover:text-primary transition-colors"
						>
							{tag}
						</Link>
					))}
				</div>
			</div>

			<div className="mt-10 aspect-[16/8] overflow-hidden border border-on-surface/10 bg-surface-container">
				<Image
					src={post.metadata.image}
					alt={post.metadata.title}
					width={1600}
					height={800}
					className="h-full w-full object-cover"
				/>
			</div>
		</>
	);
}
