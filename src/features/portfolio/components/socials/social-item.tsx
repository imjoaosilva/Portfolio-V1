"use client";

import type { SocialLink } from "../../types/social-links";

export const SocialItem = ({ title, description, href }: SocialLink) => {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="group flex items-center justify-between gap-3 bg-bg-panel px-4 py-4 text-sm transition-colors hover:bg-bg-raised md:px-5"
		>
			<div className="space-y-1">
				<div className="text-xs uppercase tracking-[0.18em] text-fg-dim">{title}</div>
				<div className="text-fg">{description}</div>
			</div>
			<div className="shrink-0 text-xs uppercase tracking-[0.18em] text-primary transition-transform group-hover:translate-x-0.5">
				↗
			</div>
		</a>
	);
};
