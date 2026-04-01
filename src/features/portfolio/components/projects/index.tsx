import Link from "next/link";
import { IoMdArrowForward } from "react-icons/io";
import { FEATURED_PROJECTS } from "../../data/projects";
import { ProjectCard } from "./project-item";


export function Projects() {
	return (
		<div className="mt-20 flex w-full flex-col gap-4">
			<div className="mb-3 flex w-full items-end justify-between border-b border-outline pb-2">
				<h1 className="mb-2 font-label text-4xl font-bold italic">Projects</h1>
				<Link
					href="/projects"
					className="group hidden items-center gap-1 font-mono text-sm text-primary/90 underline decoration-dashed underline-offset-4 transition-all duration-300 hover:opacity-65 sm:inline-flex"
				>
					View all
					<IoMdArrowForward className="text-primary/90 group-hover:text-primary" />
				</Link>
			</div>
			<div className="grid gap-8 md:grid-cols-2">
				{FEATURED_PROJECTS.map((project) => (
					<ProjectCard key={project.id} project={project} />
				))}
			</div>
		</div>
	);
}
