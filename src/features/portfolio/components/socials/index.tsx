"use client";

import { motion } from "motion/react";
import { SOCIAL_LINKS } from "../../data/social-links";
import { SocialItem } from "./social-item";

export const Socials = () => {
	return (
		<motion.div className="flex flex-row items-center gap-4 mt-7">
			{SOCIAL_LINKS.map((link) => (
				<SocialItem key={link.title} {...link} />
			))}
		</motion.div>
	);
};
