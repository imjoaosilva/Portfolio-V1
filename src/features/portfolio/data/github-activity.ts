import { formatDistanceToNow } from "date-fns";
import { unstable_cache } from "next/cache";
import { USER_DATA } from "@/features/portfolio/data/user";
import type {
	GitHubActivitySummary,
	GitHubCommitResponse,
	GitHubRepo,
} from "@/features/portfolio/types/github-activity";

type Languages = Record<string, number>;

export const getGitHubActivitySummary = unstable_cache(
	async (): Promise<GitHubActivitySummary> => {
		const headers = {
			Accept: "application/vnd.github+json",
			Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
		};

		const reposRes = await fetch(
			`https://api.github.com/users/${USER_DATA.github_username}/repos?per_page=100&sort=updated`,
			{ headers, next: { revalidate: 86400 } },
		);

		if (!reposRes.ok) throw new Error("Failed to fetch repositories");

		const repos = ((await reposRes.json()) as GitHubRepo[])
			.filter(
				(r) =>
					!r.fork &&
					r.owner.login.toLowerCase() ===
						USER_DATA.github_username.toLowerCase(),
			)
			.sort(
				(a, b) =>
					new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
			);

		if (!repos.length) throw new Error("No repositories found");

		const [languageResults, commitResults] = await Promise.all([
			Promise.all(
				repos.map((repo) =>
					fetch(repo.languages_url, { headers, next: { revalidate: 86400 } })
						.then((r) => (r.ok ? (r.json() as Promise<Languages>) : {}))
						.catch(() => ({}) as Languages),
				),
			),
			Promise.all(
				repos.slice(0, 8).map((repo) =>
					fetch(
						`https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits?author=${USER_DATA.github_username}&per_page=3`,
						{ headers, next: { revalidate: 3600 } },
					)
						.then((r) =>
							r.ok ? (r.json() as Promise<GitHubCommitResponse[]>) : [],
						)
						.catch(() => [] as GitHubCommitResponse[])
						.then((commits) => ({ repo, commits })),
				),
			),
		]);

		const byteTotals = new Map<string, number>();
		repos.forEach((_, i) => {
			for (const [lang, bytes] of Object.entries(languageResults[i] ?? {})) {
				byteTotals.set(lang, (byteTotals.get(lang) ?? 0) + bytes);
			}
		});
		const totalBytes = Array.from(byteTotals.values()).reduce(
			(s, b) => s + b,
			0,
		);
		const languages = totalBytes
			? Array.from(byteTotals.entries())
					.map(([name, bytes]) => ({
						name,
						bytes,
						percentage: (bytes / totalBytes) * 100,
					}))
					.sort((a, b) => b.bytes - a.bytes)
					.slice(0, 5)
			: [];

		const seen = new Set<string>();
		const commits = commitResults
			.flatMap(({ repo, commits }) =>
				commits.map((c) => ({
					sha: c.sha,
					repo: repo.name,
					message: c.commit.message.split("\n")[0]?.trim() || "commit",
					url: c.html_url,
					time: formatDistanceToNow(new Date(c.commit.author.date), {
						addSuffix: true,
					}),
					dateMs: new Date(c.commit.author.date).getTime(),
				})),
			)
			.filter((c) => (seen.has(c.sha) ? false : (seen.add(c.sha), true)))
			.sort((a, b) => b.dateMs - a.dateMs)
			.slice(0, 5)
			.map(({ dateMs: _, ...c }) => c);

		return { commits, languages };
	},
	["github-activity-summary"],
	{ revalidate: 3600 },
);
