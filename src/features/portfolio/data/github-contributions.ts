import { unstable_cache } from "next/cache";

import type { Activity } from "@/components/kibo-ui/contribution-graph";
import { USER_DATA } from "@/features/portfolio/data/user";

type GitHubContributionsResponse = {
	contributions: Activity[];
};

export const getGitHubContributions = unstable_cache(
	async () => {
		const res = await fetch(
			`https://github-contributions-api.jogruber.de/v4/${USER_DATA.github_username}?y=2026`,
		);
		const data = (await res.json()) as GitHubContributionsResponse;
		return data.contributions;
	},
	["github-contributions"],
	{ revalidate: 86400 },
); // Cache for 1 day (86400 seconds)
