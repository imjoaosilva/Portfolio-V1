import { getBlogCopy } from "@/features/blog/lib/blog-locale";
import { formatPostDate } from "@/features/blog/lib/format-post-date";
import type { BlogLocale, Post } from "@/features/blog/types/post";

export function PostPageSidebar({
	post,
	locale,
}: {
	post: Post;
	locale: BlogLocale;
}) {
	const copy = getBlogCopy(locale);

	return (
		<aside className="h-fit border border-on-surface/15 bg-surface-container-lowest p-5">
			<p className="font-mono text-[10px] uppercase tracking-[0.18em] text-outline">
				{copy.postDetails}
			</p>
			<div className="mt-4 space-y-4">
				<div>
					<p className="font-mono text-[9px] uppercase tracking-[0.12em] text-outline">
						{copy.published}
					</p>
					<p className="mt-1 text-sm text-on-surface">
						{formatPostDate(post.metadata.publishedAt, {
							day: "2-digit",
							month: "long",
							year: "numeric",
						})}
					</p>
				</div>
				<div>
					<p className="font-mono text-[9px] uppercase tracking-[0.12em] text-outline">
						{copy.readTime}
					</p>
					<p className="mt-1 text-sm text-on-surface">
						{post.metadata.readTime}
					</p>
				</div>
				<div>
					<p className="font-mono text-[9px] uppercase tracking-[0.12em] text-outline">
						{copy.topic}
					</p>
					<p className="mt-1 text-sm text-on-surface">
						{post.metadata.category}
					</p>
				</div>
			</div>
		</aside>
	);
}
