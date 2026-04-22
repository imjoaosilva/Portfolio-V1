import { BasedIn } from "@/features/portfolio/components/based-in";
import { ClickCounter } from "@/features/portfolio/components/click-counter";
import { GitHubContributions } from "@/features/portfolio/components/github-contributions";
import { LatestPosts } from "@/features/portfolio/components/latest-posts";
import { Overview } from "@/features/portfolio/components/overview";
import { Projects } from "@/features/portfolio/components/projects";
import { RecentCommits } from "@/features/portfolio/components/recent-commits";
import { Socials } from "@/features/portfolio/components/socials";

export default function Page() {
	return (
		<div className="min-h-screen text-on-background selection:bg-primary selection:text-black transition-colors duration-300">
			<div className="flex flex-col gap-8 md:gap-10">
				<Overview />
				<Socials />
				<Projects />
				<section className="flex flex-col gap-4 pt-2">
					<div className="flex items-end justify-between gap-4 border-b border-border pb-4">
						<div>
							<div className="void-section-title">writing and activity</div>
							<h2 className="mt-2 font-headline text-[clamp(1.8rem,4vw,3rem)] leading-none tracking-[-0.03em]">
								recent signals.
							</h2>
						</div>
					</div>

					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
						<div className="col-span-1 lg:col-span-3">
							<ClickCounter />
						</div>

						<div className="col-span-1 lg:col-span-3">
							<BasedIn />
						</div>

						<div className="col-span-1 sm:col-span-2 lg:col-span-6">
							<GitHubContributions />
						</div>

						<div className="col-span-1 sm:col-span-2 lg:col-span-7">
							<LatestPosts />
						</div>

						<div className="col-span-1 sm:col-span-2 lg:col-span-5">
							<RecentCommits />
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
