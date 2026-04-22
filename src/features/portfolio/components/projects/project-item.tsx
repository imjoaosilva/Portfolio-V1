import Link from "next/link";
import type { Project } from "../../types/projects/project";

const STATUS_LABELS = {
	active: "active",
	shipped: "shipped",
	experimental: "experimental",
} as const;

export function ProjectCard({ project }: { project: Project }) {
	return (
		<article className="group border-b border-border bg-background/40 py-6 first:pt-0">
			<div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_180px] md:items-start">
				<div className="space-y-3">
					<div className="flex flex-wrap items-center gap-x-3 gap-y-2">
						<h3 className="font-headline text-[clamp(2rem,4vw,3rem)] leading-[0.94] tracking-[-0.03em] text-fg transition-colors group-hover:text-primary">
							{project.title}
						</h3>
						<span className="text-[10px] uppercase tracking-[0.18em] text-primary">
							{STATUS_LABELS[project.status]}
						</span>
					</div>

					<p className="max-w-2xl text-sm leading-7 text-fg-dim">
						{project.description}
					</p>

					<div className="flex flex-wrap gap-x-4 gap-y-2 text-[11px] uppercase tracking-[0.16em] text-fg-dim">
						<span>{project.year}</span>
						{project.tags.slice(0, 3).map((tag) => (
							<span key={tag}>{tag}</span>
						))}
					</div>
				</div>

				<div className="flex flex-wrap items-start justify-start gap-3 md:justify-end">
					<Link href={`/projects/${project.id}`} className="void-link text-xs uppercase tracking-[0.18em] text-primary no-underline">
						open case →
					</Link>
					<a
						href={project.link}
						target="_blank"
						rel="noopener noreferrer"
						className="void-link text-xs uppercase tracking-[0.18em] text-fg-dim no-underline hover:text-primary"
					>
						visit ↗
					</a>
				</div>
			</div>
		</article>
	);
}
