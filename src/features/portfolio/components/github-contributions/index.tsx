import { Suspense } from "react";
import { getGitHubContributions } from "../../data/github-contributions";
import { GitHubContributionFallback, GitHubContributionGraph } from "./graph";

export function GitHubContributions() {
	const contributions = getGitHubContributions();

	return (
		<div className="void-panel h-full min-h-[16rem]">
			<div className="flex items-center justify-between border-b border-border px-4 py-3">
				<div className="void-section-title">contributions</div>
				<span className="border border-border px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-fg-dim">
					last 12 months
				</span>
			</div>
			<div className="p-4 md:p-5">
				<Suspense fallback={<GitHubContributionFallback />}>
					<GitHubContributionGraph contributions={contributions} />
				</Suspense>
			</div>
		</div>
	);
}
