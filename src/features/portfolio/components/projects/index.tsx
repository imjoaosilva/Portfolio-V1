import Link from "next/link";
import { FEATURED_PROJECTS } from "../../data/projects";
import { ProjectCard } from "./project-item";


export function Projects() {
	return (
		<section className="flex w-full flex-col gap-4 pt-1">
			<div className="flex w-full items-end justify-between gap-4 border-b border-border pb-4">
				<div>
					<div className="void-section-title">selected projects</div>
					<h2 className="mt-2 font-headline text-[clamp(2rem,5vw,3.5rem)] leading-none tracking-[-0.03em]">
						recent work.
					</h2>
				</div>
				<Link
					href="/projects"
					className="void-link hidden text-xs uppercase tracking-[0.18em] text-primary sm:inline-flex"
				>
					view all ↗
				</Link>
			</div>
			<div className="grid gap-0">
				{FEATURED_PROJECTS.map((project) => (
					<ProjectCard key={project.id} project={project} />
				))}
			</div>
		</section>
	);
}
