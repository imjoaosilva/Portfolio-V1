import { Suspense } from "react";
import {
	RecentCommitsList,
	RecentCommitsListFallback,
} from "./commits-list";

export function RecentCommits() {
	return (
		<div className="void-panel flex h-full min-h-[24rem] flex-col">
			<div className="flex items-center justify-between border-b border-border px-4 py-3">
				<div className="void-section-title">recent commits</div>
				<span className="text-[10px] uppercase tracking-[0.18em] text-fg-dim">
					live github data
				</span>
			</div>

			<Suspense fallback={<RecentCommitsListFallback />}>
				<RecentCommitsList />
			</Suspense>
		</div>
	);
}
