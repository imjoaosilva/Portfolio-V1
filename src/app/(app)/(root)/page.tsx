import { SiteHeader } from "@/components/site-header";
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
		<div className="root min-h-screen bg-background text-on-background font-body selection:bg-primary-container selection:text-white transition-colors duration-300 grid-pattern">
			<SiteHeader />
			<div className="pt-24 md:pt-36 max-w-7xl mx-auto flex flex-col px-4 md:px-5">
				<Overview />
				<Socials />
				<Projects />
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 mb-20 pt-12 md:pt-20">
					<div className="col-span-1 sm:col-span-1 lg:col-span-3">
						<ClickCounter />
					</div>

					<div className="col-span-1 sm:col-span-1 lg:col-span-3">
						<BasedIn />
					</div>

					<div className="col-span-1 sm:col-span-2 lg:col-span-6">
						<GitHubContributions />
					</div>

					<div className="col-span-1 sm:col-span-1 lg:col-span-6 pt-2">
						<LatestPosts />
					</div>

					<div className="col-span-1 sm:col-span-1 lg:col-span-6 pt-2">
						<RecentCommits />
					</div>
				</div>
			</div>
		</div>
	);
}
