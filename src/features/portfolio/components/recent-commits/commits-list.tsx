import {
	getCommitColor,
	getLanguageColor,
} from "@/features/portfolio/data/github-activity-colors";
import { getGitHubActivitySummary } from "@/features/portfolio/data/github-activity";

export async function RecentCommitsList() {
	const { commits, languages } = await getGitHubActivitySummary();

	return (
		<>
			<div className="min-h-0 max-h-64 flex-1 divide-y divide-border overflow-y-auto font-mono">
				{commits.length ? (
					commits.map((commit) => (
						<a
							key={commit.sha}
							href={commit.url}
							target="_blank"
							rel="noreferrer"
							className="group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-bg-raised"
						>
							<span
								className="shrink-0 text-xs"
								style={{ color: getCommitColor(commit.message) }}
							>
								●
							</span>
							<div className="min-w-0 flex-1">
								<div className="truncate text-xs text-fg">{commit.message}</div>
								<div className="mt-1 flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-fg-dim">
									<span>{commit.repo}</span>
									<span className="opacity-50">/</span>
									<span>{commit.time}</span>
								</div>
							</div>
							<span
								className="shrink-0 border border-border px-2 py-1 text-[10px] uppercase tracking-[0.16em] opacity-0 transition-opacity group-hover:opacity-100"
								style={{ color: getCommitColor(commit.message) }}
							>
								{commit.sha.slice(0, 7)}
							</span>
						</a>
					))
				) : (
					<div className="px-4 py-6 text-sm text-fg-dim">
						No recent public commits found.
					</div>
				)}
			</div>

			<div className="space-y-2.5 border-t border-border px-4 pb-3 pt-4">
				<div className="flex items-center justify-between">
					<span className="text-[10px] uppercase tracking-[0.18em] text-fg-dim">
						language share
					</span>
					<span className="text-[10px] uppercase tracking-[0.18em] text-fg-dim">
						public repos
					</span>
				</div>

				<div className="flex h-2 overflow-hidden border border-border bg-background">
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
							className="border border-border bg-background px-2 py-1 text-[10px] uppercase tracking-[0.14em]"
						>
							<span
								className="mr-1.5 inline-block h-2 w-2"
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
			<div className="flex-1 space-y-3 px-4 py-4">
				{Array.from({ length: 4 }).map((_, index) => (
					<div
						key={index}
						className="h-11 border border-border bg-bg-raised animate-pulse"
					/>
				))}
			</div>
			<div className="space-y-3 border-t border-border px-4 py-3">
				<div className="h-2 border border-border bg-bg-raised animate-pulse" />
				<div className="flex gap-2">
					{Array.from({ length: 3 }).map((_, index) => (
						<div
							key={index}
							className="h-6 w-20 border border-border bg-bg-raised animate-pulse"
						/>
					))}
				</div>
			</div>
		</>
	);
}
