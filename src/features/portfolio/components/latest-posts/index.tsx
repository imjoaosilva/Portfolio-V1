import Link from "next/link";
import { TbArrowRight, TbPencil } from "react-icons/tb";

const posts = [
	{
		title: "Building a TLS fingerprinting engine",
		description:
			"How I built a high-performance TLS fingerprinting system capable of handling millions of requests per second.",
		date: "Mar 2025",
		slug: "tls-fingerprinting-engine",
		tags: ["rust", "networking"],
	},
	{
		title: "My Neovim setup in 2025",
		description:
			"A deep dive into my current Neovim configuration, plugins, and workflow for full-stack development.",
		date: "Feb 2025",
		slug: "neovim-setup-2025",
		tags: ["tooling", "dx"],
	},
	{
		title: "Why I switched from Next.js to Remix",
		description:
			"After two years with Next.js, I decided to give Remix a real shot. Here's what I found.",
		date: "Jan 2025",
		slug: "nextjs-to-remix",
		tags: ["react", "dx"],
	},
];

export function LatestPosts() {
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
								{post.date}
							</span>
						</div>

						<h3 className="font-headline font-bold text-xl uppercase leading-tight group-hover:text-primary transition-colors">
							{post.title}
						</h3>

						<p className="font-label text-xs text-on-surface-variant leading-relaxed line-clamp-2 flex-1">
							{post.description}
						</p>

						<div className="flex items-center justify-between mt-auto">
							<div className="flex flex-wrap gap-1.5">
								{post.tags.slice(0, 2).map((tag) => (
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
