import type { Project } from "../types/projects/project";

export const PROJECTS = [
	{
		id: "signalboard",
		title: "Signalboard",
		description:
			"A monitoring dashboard for APIs and background workers with clear alerting and fast triage.",
		overview:
			"Signalboard is a control panel for internal infrastructure. I built it to make incident response less noisy, with focused status views, deploy context, and a cleaner path from alert to action.",
		image: "/images/project-1.jpg",
		tags: ["next.js", "typescript", "postgres", "observability"],
		link: "https://project-1.com",
		github_url: "https://github.com/imjoaosilva/signalboard",
		on_github: true,
		featured: true,
		year: "2025",
		status: "active",
		role: "Product design, full-stack implementation, infra.",
		highlights: [
			"Incident timeline with deploy correlation.",
			"Service health widgets tuned for fast scanning.",
			"Team-focused status views instead of noisy dashboards.",
		],
	},
	{
		id: "folioforge",
		title: "Folioforge",
		description:
			"A portfolio CMS for fast personal sites with themed blocks, posts, and project feeds.",
		overview:
			"Folioforge started as a personal publishing system and evolved into a toolkit for small portfolio sites. The focus is expressive presentation, low maintenance, and components that feel authored rather than templated.",
		image: "/images/project-2.jpg",
		tags: ["react", "content", "design-system", "mdx"],
		link: "https://project-2.com",
		github_url: "https://github.com/imjoaosilva/folioforge",
		on_github: true,
		featured: true,
		year: "2024",
		status: "shipped",
		role: "Frontend architecture, MDX pipeline, UI system.",
		highlights: [
			"Composable page sections for projects and writing.",
			"Theme tokens shared across pages and components.",
			"Editorial layout tuned for readability first.",
		],
	},
	{
		id: "packetlab",
		title: "Packetlab",
		description:
			"A playground for protocol experiments, packet inspection, and small network tooling.",
		overview:
			"Packetlab is where I test ideas around networking, traffic analysis, and protocol ergonomics. It is intentionally experimental, with a bias toward trying sharp ideas quickly and documenting the useful ones later.",
		image: "/images/project-1.jpg",
		tags: ["rust", "networking", "cli", "experiments"],
		link: "https://project-1.com",
		year: "2024",
		status: "experimental",
		role: "Research, prototyping, systems implementation.",
		highlights: [
			"Fast prototypes for packet parsing and fingerprinting.",
			"CLI workflows that make debugging less tedious.",
			"A space to validate ideas before productionizing them.",
		],
	},
] satisfies Project[];

export const FEATURED_PROJECTS = PROJECTS.filter((project) => project.featured);

export const getProjectById = (projectId: string) =>
	PROJECTS.find((project) => project.id === projectId);
