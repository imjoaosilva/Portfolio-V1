import { Suspense } from "react";
import { TbBrandGithub } from "react-icons/tb";
import { getGitHubContributions } from "../../data/github-contributions";
import { GitHubContributionFallback, GitHubContributionGraph } from "./graph";

export function GitHubContributions() {
	const contributions = getGitHubContributions();

	return (
		<div className="border border-on-background bg-surface-container-lowest window-shadow h-full">
			<div className="px-4 py-3 border-b border-on-background/20 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<TbBrandGithub size={14} className="text-on-surface-variant" />
					<span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
						contributions
					</span>
				</div>
				<span className="font-label text-[10px] text-on-surface-variant border border-on-background/30 px-1.5 py-0.5">
					last 12 months
				</span>
			</div>
			<div className="p-6">
				<Suspense fallback={<GitHubContributionFallback />}>
					<GitHubContributionGraph contributions={contributions} />
				</Suspense>
			</div>
		</div>
	);
}
