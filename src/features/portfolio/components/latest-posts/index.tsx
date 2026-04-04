import Link from "next/link";
import { TbArrowRight, TbPencil } from "react-icons/tb";
import { getLatestPosts } from "@/features/blog/data/posts";
import { formatPostDate } from "@/features/blog/lib/format-post-date";

export function LatestPosts() {
	const posts = getLatestPosts();

	return (
		<div className="border border-on-background bg-surface-container-lowest window-shadow">
			<div className="px-6 py-4 border-b border-on-background/20 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<TbPencil size={14} className="text-on-surface-variant" />
					<span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
						latest posts
					</span>
				</div>
				<span className="font-label text-[10px] text-on-surface-variant border border-on-background/30 px-1.5 py-0.5">
					{posts.length} posts
				</span>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-on-background/20">
				{posts.map((post, i) => (
					<Link
						key={post.slug}
						href={`/blog/${post.slug}`}
						className="p-6 flex flex-col gap-4 hover:bg-surface-container transition-colors group"
					>
						<div className="flex items-center justify-between">
							<span className="font-mono text-[10px] text-on-surface-variant">
								{String(i + 1).padStart(2, "0")}
							</span>
							<span className="font-mono text-[10px] text-on-surface-variant">
								{formatPostDate(post.metadata.publishedAt)}
							</span>
						</div>

						<h3 className="font-headline font-bold text-xl uppercase leading-tight group-hover:text-primary transition-colors">
							{post.metadata.title}
						</h3>

						<p className="font-label text-xs text-on-surface-variant leading-relaxed line-clamp-2 flex-1">
							{post.metadata.description}
						</p>

						<div className="flex items-center justify-between mt-auto">
							<div className="flex flex-wrap gap-1.5">
								{post.metadata.tags.slice(0, 2).map((tag) => (
									<span
										key={tag}
										className="font-label text-[10px] border border-on-background/30 px-1.5 py-0.5 uppercase text-on-surface-variant"
									>
										{tag}
									</span>
								))}
							</div>
							<TbArrowRight
								size={14}
								className="text-on-surface-variant group-hover:text-primary group-hover:translate-x-1 transition-all"
							/>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
