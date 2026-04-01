export type RecentCommit = {
	message: string;
	repo: string;
	sha: string;
	time: string;
	url: string;
};

export type LanguageShare = {
	bytes: number;
	name: string;
	percentage: number;
};

export type GitHubActivitySummary = {
	commits: RecentCommit[];
	languages: LanguageShare[];
};

export type GitHubRepo = {
	fork: boolean;
	languages_url: string;
	name: string;
	owner: {
		login: string;
	};
	pushed_at: string;
};

export type GitHubLanguagesResponse = Record<string, number>;

export type GitHubCommitResponse = {
	commit: {
		author: {
			date: string;
		};
		message: string;
	};
	html_url: string;
	sha: string;
};

export type CommitsByRepo = {
	commits: GitHubCommitResponse[];
	repo: GitHubRepo;
};
