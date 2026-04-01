import { VscGitCommit } from "react-icons/vsc";
import {
	getCommitColor,
	getLanguageColor,
} from "@/features/portfolio/data/github-activity-colors";
import { getGitHubActivitySummary } from "@/features/portfolio/data/github-activity";

export async function RecentCommitsList() {
	const { commits, languages } = await getGitHubActivitySummary();

	return (
		<>
			<div className="min-h-0 max-h-40 flex-1 flex flex-col divide-y divide-on-background/10 overflow-y-auto font-mono">
				{commits.length ? (
					commits.map((commit) => (
						<a
							key={commit.sha}
							href={commit.url}
							target="_blank"
							rel="noreferrer"
							className="px-4 py-2.5 flex items-center gap-3 hover:bg-surface-container transition-colors group"
						>
							<VscGitCommit
								size={14}
								style={{ color: getCommitColor(commit.message), flexShrink: 0 }}
							/>
							<div className="min-w-0 flex-1">
								<div className="text-xs truncate">{commit.message}</div>
								<div className="mt-1 flex items-center gap-2 text-[10px] text-on-surface-variant">
									<span>{commit.repo}</span>
									<span className="opacity-50">/</span>
									<span>{commit.time}</span>
								</div>
							</div>
							<span
								className="text-[10px] border border-on-background/30 px-1.5 py-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
								style={{ color: getCommitColor(commit.message) }}
							>
								{commit.sha.slice(0, 7)}
							</span>
						</a>
					))
				) : (
					<div className="px-4 py-6 text-sm text-on-surface-variant">
						No recent public commits found.
					</div>
				)}
			</div>

			<div className="border-t border-on-background/20 px-4 pt-8 pb-3 space-y-2.5">
				<div className="flex items-center justify-between">
					<span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
						language share
					</span>
					<span className="font-mono text-[10px] text-on-surface-variant">
						public repos
					</span>
				</div>

				<div className="flex h-2 overflow-hidden border border-on-background/20 bg-background">
					{languages.map((language) => (
						<div
							key={language.name}
							className="h-full"
							style={{
								backgroundColor: getLanguageColor(language.name),
								width: `${language.percentage}%`,
							}}
							title={`${language.name}: ${language.percentage.toFixed(1)}%`}
						/>
					))}
				</div>

				<div className="flex flex-wrap gap-1.5 pt-0.5">
					{languages.map((language) => (
						<div
							key={language.name}
							className="border border-on-background/20 bg-background px-2 py-0.5 text-[10px] font-label uppercase"
						>
							<span
								className="inline-block h-2 w-2 mr-1.5"
								style={{ backgroundColor: getLanguageColor(language.name) }}
							/>
							<span className="text-on-background">{language.name}</span>{" "}
							<span style={{ color: getLanguageColor(language.name) }}>
								{language.percentage.toFixed(1)}%
							</span>
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export function RecentCommitsListFallback() {
	return (
		<>
			<div className="flex-1 px-4 py-4 space-y-3">
				{Array.from({ length: 4 }).map((_, index) => (
					<div
						key={index}
						className="h-11 border border-on-background/10 bg-surface-container-highest/60 animate-pulse"
					/>
				))}
			</div>
			<div className="border-t border-on-background/20 px-4 py-3 space-y-3">
				<div className="h-2 border border-on-background/20 bg-surface-container-highest/60 animate-pulse" />
				<div className="flex gap-2">
					{Array.from({ length: 3 }).map((_, index) => (
						<div
							key={index}
							className="h-6 w-20 border border-on-background/10 bg-surface-container-highest/60 animate-pulse"
						/>
					))}
				</div>
			</div>
		</>
	);
}
