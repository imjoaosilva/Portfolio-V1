import { USER_DATA } from "@/features/portfolio/data/user";

export const SITE_URL =
	process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const SITE_INFO = {
	name: USER_DATA.name,
	url: SITE_URL,
	titleSuffix: "João Silva",
	description:
		"Portfolio, writing, and experiments by João Silva about frontend, systems, tooling, and product-minded engineering.",
	keywords: [
		"João Silva",
		"joao silva",
		"portfolio",
		"blog",
		"frontend",
		"next.js",
		"react",
		"typescript",
		"software engineer",
	],
	creator: "João Silva",
	githubUsername: USER_DATA.github_username,
};

export function getAbsoluteUrl(path = "/") {
	return new URL(path, SITE_INFO.url).toString();
}
