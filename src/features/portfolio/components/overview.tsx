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
		<section className="void-divider pb-10 pt-4 md:pb-14 md:pt-8">
			<div className="grid gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)] md:items-start">
				<div className="space-y-5">
					<div className="space-y-4 border-l-2 pl-4 void-fade-up" style={{ borderColor: "var(--accent)" }}>
						<div className="flex flex-wrap items-center gap-x-4 gap-y-2">
							<p className="void-section-title" style={{ color: "var(--accent)" }}>
								/ full-stack developer
							</p>
							<p className="void-section-title" style={{ color: "var(--fg-dim)" }}>
								🇵🇹 portugal
							</p>
						</div>
						<h1 className="max-w-2xl font-headline text-[clamp(3.2rem,10vw,6.2rem)] leading-[0.92] tracking-[-0.05em] text-fg void-fade-up" style={{ animationDelay: "60ms" }}>
							joao
							<br />
							<span style={{ color: "var(--accent)" }}>silva.</span>
						</h1>
						<h2 className="max-w-2xl font-headline text-[clamp(2rem,6vw,3.6rem)] leading-[0.95] tracking-[-0.04em] text-fg void-fade-up" style={{ animationDelay: "120ms" }}>
							building on the
							<br />
							<span style={{ color: "var(--accent)" }}>web</span>
							<br />
							from portugal.
						</h2>
						<p className="max-w-xl text-sm leading-7 text-fg-dim void-fade-up" style={{ animationDelay: "180ms" }}>
							i build products, interfaces, and the backend work behind them.
						</p>
					</div>

					<div className="flex flex-wrap gap-x-5 gap-y-2 text-xs uppercase tracking-[0.18em] text-fg-dim void-fade-up" style={{ animationDelay: "240ms" }}>
						<span>viseu, portugal</span>
						<span style={{ color: "var(--accent)" }}>
							● available for selected work
						</span>
					</div>
				</div>

				<div className="space-y-4 border-l-0 border-border pl-0 md:border-l md:pl-8 void-fade-up" style={{ animationDelay: "160ms" }}>
					<div className="void-section-title">now</div>
					<ul className="space-y-4 text-sm leading-6">
						{USER_DATA.points.map((point, index) => (
							<li
								className="grid grid-cols-[28px_minmax(0,1fr)] gap-3 border-t border-border pt-4 first:border-t-0 first:pt-0"
								key={point.text}
							>
								<span className="text-xs uppercase tracking-[0.16em] text-primary">
									{(index + 1).toLocaleString("en-US", {
										minimumIntegerDigits: 2,
										useGrouping: false,
									})}
								</span>
								<p className="text-fg-dim">
									<span className="text-fg">{point.text}</span>{" "}
									at{" "}
									<HoverCard>
										<HoverCardTrigger
											className="void-link text-primary outline-none"
											href={point.company.link}
											target="_blank"
											rel="noopener noreferrer"
										>
											{point.company.name}
										</HoverCardTrigger>
										<HoverCardPositioner sideOffset={10}>
											<HoverCardContent className="w-72 rounded-none border-border bg-bg-panel p-0 text-on-background shadow-none">
												<div className="space-y-4 p-4">
													<div className="flex items-center gap-3">
														<Avatar className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-none border border-border bg-bg-raised">
															<AvatarImage
																alt={point.company.name}
																className="size-full object-cover"
																src={`https://www.google.com/s2/favicons?domain=${getCompanyDomain(point.company.link)}&sz=128`}
															/>
															<AvatarFallback className="bg-bg-raised text-xs text-primary">
																{getCompanyInitials(point.company.name)}
															</AvatarFallback>
														</Avatar>
														<div className="space-y-1">
															<p className="font-headline text-2xl leading-none text-fg">
																{point.company.name}
															</p>
															<p className="text-[10px] uppercase tracking-[0.18em] text-fg-dim">
																{getCompanyDomain(point.company.link)}
															</p>
														</div>
													</div>
													<p className="text-sm leading-6 text-fg-dim">{point.text}</p>
													<p className="text-[10px] uppercase tracking-[0.18em]" style={{ color: "var(--accent)" }}>
														open company site ↗
													</p>
												</div>
											</HoverCardContent>
										</HoverCardPositioner>
									</HoverCard>
									.
								</p>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
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
