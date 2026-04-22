import Link from "next/link";
import { getLatestPosts } from "@/features/blog/data/posts";
import { formatPostDate } from "@/features/blog/lib/format-post-date";

export function LatestPosts() {
	const posts = getLatestPosts();

	return (
		<div className="void-panel h-full">
			<div className="flex items-center justify-between border-b border-border px-4 py-3">
				<div className="void-section-title">latest writing</div>
				<span className="border border-border px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-fg-dim">
					{posts.length} posts
				</span>
			</div>

			<div className="grid grid-cols-1 divide-y divide-border xl:grid-cols-3 xl:divide-x xl:divide-y-0">
				{posts.map((post, i) => (
					<Link
						key={post.slug}
						href={`/blog/${post.slug}`}
						className="group flex flex-col gap-4 p-5 transition-colors hover:bg-bg-raised"
					>
						<div className="flex items-center justify-between">
							<span className="text-[10px] uppercase tracking-[0.18em] text-fg-dim">
								{String(i + 1).padStart(2, "0")}
							</span>
							<span className="text-[10px] uppercase tracking-[0.18em] text-fg-dim">
								{formatPostDate(post.metadata.publishedAt)}
							</span>
						</div>

						<h3 className="font-headline text-[clamp(1.8rem,3vw,2.5rem)] leading-[0.98] tracking-[-0.03em] transition-colors group-hover:text-primary">
							{post.metadata.title}
						</h3>

						<p className="flex-1 text-sm leading-6 text-fg-dim line-clamp-3">
							{post.metadata.description}
						</p>

						<div className="flex items-center justify-between mt-auto">
							<div className="flex flex-wrap gap-1.5">
								{post.metadata.tags.slice(0, 2).map((tag) => (
									<span
										key={tag}
										className="border border-border px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-fg-dim"
									>
										{tag}
									</span>
								))}
							</div>
							<span className="text-xs uppercase tracking-[0.18em] text-primary">→ read</span>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
