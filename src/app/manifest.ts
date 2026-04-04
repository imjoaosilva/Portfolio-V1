import type { MetadataRoute } from "next";
import { SITE_INFO, getAbsoluteUrl } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: SITE_INFO.name,
		short_name: SITE_INFO.name,
		description: SITE_INFO.description,
		start_url: "/",
		scope: "/",
		display: "standalone",
		background_color: "#11111b",
		theme_color: "#f5a97f",
		icons: [
			{
				src: getAbsoluteUrl("/favicon.ico"),
				sizes: "any",
				type: "image/x-icon",
			},
			{
				src: getAbsoluteUrl("/window.svg"),
				sizes: "any",
				type: "image/svg+xml",
			},
		],
	};
}
