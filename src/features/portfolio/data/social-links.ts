import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { SiDailydotdev } from "react-icons/si";
import type { SocialLink } from "../types/social-links";

export const SOCIAL_LINKS: SocialLink[] = [
	{
		Icon: FaGithub,
		title: "GitHub",
		description: "ncdai",
		href: "https://github.com/imjoaosilva",
	},
	{
		Icon: FaLinkedinIn,
		title: "LinkedIn",
		description: "ncdai",
		href: "https://linkedin.com/in/ncdai",
	},
	{
		Icon: SiDailydotdev,
		title: "daily.dev",
		description: "@ncdai",
		href: "https://app.daily.dev/ncdai",
	},
];
