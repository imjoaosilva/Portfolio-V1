import { formatDistanceToNow } from "date-fns";
import { unstable_cache } from "next/cache";
import { USER_DATA } from "@/features/portfolio/data/user";
import type {
	CommitsByRepo,
	GitHubActivitySummary,
	GitHubCommitResponse,
	GitHubLanguagesResponse,
	GitHubRepo,
} from "@/features/portfolio/types/github-activity";

const GITHUB_API_BASE = "https://api.github.com";
const COMMITS_LIMIT = 5;
const LANGUAGES_LIMIT = 5;
const REPOS_FOR_COMMITS_LIMIT = 8;
const COMMITS_PER_REPO_LIMIT = 3;

const getGitHubHeaders = () => ({
	Accept: "application/vnd.github+json",
	Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
});

const isOwnedRepository = (repo: GitHubRepo) =>
	!repo.fork &&
	repo.owner.login.toLowerCase() === USER_DATA.github_username.toLowerCase();

const toRelativeTime = (value: string) =>
	formatDistanceToNow(new Date(value), { addSuffix: true });

const normalizeCommitMessage = (message: string) => {
	const firstLine = message.split("\n")[0]?.trim();
	return firstLine || "commit";
};

const fetchUserRepositories = async (headers: ReturnType<typeof getGitHubHeaders>) => {
	const response = await fetch(
		`${GITHUB_API_BASE}/users/${USER_DATA.github_username}/repos?per_page=100&sort=updated`,
		{
			headers,
			next: { revalidate: 86400 },
		},
	);

	if (!response.ok) {
		return [];
	}

	return (await response.json()) as GitHubRepo[];
};

const getOwnedRepositories = (repositories: GitHubRepo[]) =>
	repositories
		.filter(isOwnedRepository)
		.sort(
			(a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
		);

const fetchRepositoryLanguages = async (
	repositories: GitHubRepo[],
	headers: ReturnType<typeof getGitHubHeaders>,
) =>
	Promise.all(
		repositories.map(async (repo) => {
			const response = await fetch(repo.languages_url, {
				headers,
				next: { revalidate: 86400 },
			});

			if (!response.ok) {
				return {};
			}

			return (await response.json()) as GitHubLanguagesResponse;
		}),
	);

const fetchRepositoryCommits = async (
	repositories: GitHubRepo[],
	headers: ReturnType<typeof getGitHubHeaders>,
): Promise<CommitsByRepo[]> =>
	Promise.all(
		repositories.slice(0, REPOS_FOR_COMMITS_LIMIT).map(async (repo) => {
			const response = await fetch(
				`${GITHUB_API_BASE}/repos/${repo.owner.login}/${repo.name}/commits?author=${USER_DATA.github_username}&per_page=${COMMITS_PER_REPO_LIMIT}`,
				{
					headers,
					next: { revalidate: 3600 },
				},
			);

			if (!response.ok) {
				return {
					commits: [],
					repo,
				};
			}

			return {
				commits: (await response.json()) as GitHubCommitResponse[],
				repo,
			};
		}),
	);

const buildRecentCommits = (
	commitsByRepo: CommitsByRepo[],
): GitHubActivitySummary["commits"] => {
	const uniqueCommits = new Map<
		string,
		GitHubActivitySummary["commits"][number] & {
			dateMs: number;
		}
	>();

	for (const { commits, repo } of commitsByRepo) {
		for (const commit of commits) {
			if (uniqueCommits.has(commit.sha)) {
				continue;
			}

			uniqueCommits.set(commit.sha, {
				dateMs: new Date(commit.commit.author.date).getTime(),
				message: normalizeCommitMessage(commit.commit.message),
				repo: repo.name,
				sha: commit.sha,
				time: toRelativeTime(commit.commit.author.date),
				url: commit.html_url,
			});
		}
	}

	return Array.from(uniqueCommits.values())
		.sort((a, b) => b.dateMs - a.dateMs)
		.slice(0, COMMITS_LIMIT)
		.map(({ dateMs: _dateMs, ...commit }) => commit);
};

const buildLanguageShares = (
	repositories: GitHubRepo[],
	languagesByRepo: GitHubLanguagesResponse[],
): GitHubActivitySummary["languages"] => {
	const totals = new Map<string, number>();

	repositories.forEach((repo, index) => {
		const languages = languagesByRepo[index] ?? {};

		for (const [language, bytes] of Object.entries(languages)) {
			totals.set(language, (totals.get(language) ?? 0) + bytes);
		}
	});

	const totalBytes = Array.from(totals.values()).reduce(
		(sum, bytes) => sum + bytes,
		0,
	);

	if (!totalBytes) {
		return [];
	}

	return Array.from(totals.entries())
		.map(([name, bytes]) => ({
			bytes,
			name,
			percentage: (bytes / totalBytes) * 100,
		}))
		.sort((a, b) => b.bytes - a.bytes)
		.slice(0, LANGUAGES_LIMIT);
};

export const getGitHubActivitySummary = unstable_cache(
	async (): Promise<GitHubActivitySummary> => {
		const headers = getGitHubHeaders();
		const repositories = await fetchUserRepositories(headers);
		const ownedRepositories = getOwnedRepositories(repositories);

		if (!ownedRepositories.length) {
			return {
				commits: [],
				languages: [],
			};
		}

		const [languagesByRepo, commitsByRepo] = await Promise.all([
			fetchRepositoryLanguages(ownedRepositories, headers),
			fetchRepositoryCommits(ownedRepositories, headers),
		]);

		return {
			commits: buildRecentCommits(commitsByRepo),
			languages: buildLanguageShares(ownedRepositories, languagesByRepo),
		};
	},
	["github-activity-summary"],
	{ revalidate: 3600 },
);
