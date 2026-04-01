import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	HoverCard,
	HoverCardContent,
	HoverCardPositioner,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { USER_DATA } from "../data/user";

export const Overview = () => {
	return (
		<div className="flex-1 ">
			<h1 className="text-7xl font-headline font-bold leading-tight tracking-tighter md:text-8xl">
				Hey! I{"'"}m <span className="text-primary">João Silva</span>
			</h1>
			<ul className="font-label text-lg space-y-3 mt-7">
				{USER_DATA.points.map((point, index) => (
					<li className="flex items-start gap-3" key={point.text}>
						<span className="text-primary mt-1">
							{(index + 1).toLocaleString("en-US", {
								minimumIntegerDigits: 2,
								useGrouping: false,
							})}
						</span>
						<span>
							{point.text} at{" "}
							<HoverCard>
								<HoverCardTrigger
									className="border-b-2 border-primary-container text-primary hover:bg-primary-container/10 underline outline-none transition-colors"
									href={point.company.link}
									target="_blank"
									rel="noopener noreferrer"
								>
									@{point.company.name}
								</HoverCardTrigger>
								<HoverCardPositioner sideOffset={10}>
									<HoverCardContent className="w-72 border-on-background bg-background p-0 text-on-background">
										<div className="space-y-4 p-4">
											<div className="flex items-center gap-3">
												<Avatar className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-on-background bg-primary/15">
													<AvatarImage
														alt={point.company.name}
														className="size-full object-cover"
														src={`https://www.google.com/s2/favicons?domain=${getCompanyDomain(point.company.link)}&sz=128`}
													/>
													<AvatarFallback className="font-label text-sm text-primary">
														{getCompanyInitials(point.company.name)}
													</AvatarFallback>
												</Avatar>
												<div className="space-y-1">
													<p className="font-headline text-xl leading-none">
														{point.company.name}
													</p>
													<p className="font-label text-xs uppercase tracking-[0.2em] text-on-background/70">
														{getCompanyDomain(point.company.link)}
													</p>
												</div>
											</div>
											<p className="font-body text-sm leading-relaxed text-on-background/80">
												{point.text}
											</p>
											<a
												href={point.company.link}
												className="font-label text-xs uppercase tracking-[0.2em] text-primary"
											>
												Open company site
											</a>
										</div>
									</HoverCardContent>
								</HoverCardPositioner>
							</HoverCard>
							.
						</span>
					</li>
				))}
			</ul>
		</div>
	);
};

const getCompanyInitials = (name: string) =>
	name
		.split(/\s+/)
		.filter(Boolean)
		.slice(0, 2)
		.map((part) => part[0]?.toUpperCase() ?? "")
		.join("");

const getCompanyDomain = (link: string) => {
	try {
		return new URL(link).hostname.replace(/^www\./, "");
	} catch {
		return link;
	}
};
