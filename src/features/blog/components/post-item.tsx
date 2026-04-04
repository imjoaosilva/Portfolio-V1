import Image from "next/image";
import Link from "next/link";
import { formatPostDate } from "@/features/blog/lib/format-post-date";
import type { BlogLocale, Post } from "@/features/blog/types/post";

export const PostItem = ({
	post,
	locale = "en",
}: {
	post: Post;
	locale?: BlogLocale;
}) => {
	return (
		<Link
			href={locale === "en" ? `/blog/${post.slug}` : `/blog/${post.slug}?lang=${locale}`}
			className="group flex h-full flex-col overflow-hidden border border-on-surface/15 bg-surface-container-lowest transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)]"
		>
			<div className="relative aspect-video overflow-hidden bg-surface-container">
				<div className="absolute inset-x-0 top-0 z-10 h-1 bg-primary/80" />
				<Image
					src={post.metadata.image}
					alt={post.metadata.title}
					width={1200}
					height={675}
					className="w-full h-full object-cover grayscale-30 group-hover:grayscale-0 group-hover:scale-[1.06] transition-all duration-400"
				/>
			</div>
			<div className="flex flex-1 flex-col p-5">
				<div className="mb-3 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.14em] text-outline">
					<span>{formatPostDate(post.metadata.publishedAt)}</span>
					<span>{post.metadata.readTime}</span>
				</div>
				<h3 className="mb-3 font-headline text-xl font-bold leading-[1.1] transition-colors group-hover:text-primary">
					{post.metadata.title}
				</h3>
				<p className="line-clamp-3 text-sm leading-7 text-on-surface-variant">
					{post.metadata.description}
				</p>
				<div className="mt-5 flex items-center justify-between">
					<span className="inline-flex h-7 items-center border border-primary/30 bg-primary/8 px-2.5 font-mono text-[9px] uppercase leading-none tracking-[0.12em] text-primary">
						{post.metadata.category}
					</span>
					<span className="font-mono text-[10px] uppercase tracking-[0.16em] text-on-surface-variant transition-colors group-hover:text-primary">
						Read →
					</span>
				</div>
			</div>
		</Link>
	);
};
