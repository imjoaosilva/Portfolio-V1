export type ProjectStatus = "active" | "shipped" | "experimental";

export type Project = {
	id: string;
	title: string;
	description: string;
	overview: string;
	image: string;
	tags: string[];
	link: string;
	github_url?: string;
	on_github?: boolean;
	featured?: boolean;
	year: string;
	status: ProjectStatus;
	role: string;
	highlights: string[];
};
