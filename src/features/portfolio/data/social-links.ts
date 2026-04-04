import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { SiDailydotdev } from "react-icons/si";
import type { SocialLink } from "../types/social-links";

export const SOCIAL_LINKS: SocialLink[] = [
	{
		Icon: FaGithub,
		title: "GitHub",
		description: "imjoaosilva",
		href: "https://github.com/imjoaosilva",
	},
	{
		Icon: FaLinkedinIn,
		title: "LinkedIn",
		description: "João Silva",
		href: "https://linkedin.com/in/imjoaosilva",
	},
	{
		Icon: SiDailydotdev,
		title: "daily.dev",
		description: "@imjoaosilva",
		href: "https://app.daily.dev/imjoaosilva",
	},
];
