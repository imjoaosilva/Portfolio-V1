"use client";

import { SOCIAL_LINKS } from "../../data/social-links";

export const Socials = () => {
	return (
		<section className="void-divider pb-6 md:pb-8">
			<div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
				<div className="void-section-title">elsewhere</div>
				<div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-fg-dim">
					{SOCIAL_LINKS.map((link) => (
						<a
							key={link.title}
							href={link.href}
							target="_blank"
							rel="noopener noreferrer"
							className="void-link no-underline transition-colors hover:text-primary"
						>
							<span className="text-fg">{link.title.toLowerCase()}</span>
							{" · "}
							{link.description}
						</a>
					))}
				</div>
			</div>
		</section>
	);
};
