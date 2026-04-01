import { Suspense } from "react";
import { TbBrandGithub } from "react-icons/tb";
import {
	RecentCommitsList,
	RecentCommitsListFallback,
} from "./commits-list";

export function RecentCommits() {
	return (
		<div className="border border-on-background bg-surface-container-lowest window-shadow h-full flex flex-col">
			<div className="px-4 py-3 border-b border-on-background/20 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<TbBrandGithub size={14} className="text-on-surface-variant" />
					<span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
						recent commits
					</span>
				</div>
				<span className="font-mono text-[10px] text-on-surface-variant">
					live github data
				</span>
			</div>

			<Suspense fallback={<RecentCommitsListFallback />}>
				<RecentCommitsList />
			</Suspense>
		</div>
	);
}
