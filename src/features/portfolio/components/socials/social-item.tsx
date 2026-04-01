"use client";

import { GoArrowUpRight } from "react-icons/go";
import type { SocialLink } from "../../types/social-links";

export const SocialItem = ({ Icon, title, description, href }: SocialLink) => {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="flex items-center gap-1 hover:text-primary font-mono transition-all duration-300 ease-in"
		>
			<Icon />
			{title}
			<GoArrowUpRight className="w-3 h-3" />
		</a>
	);
};
