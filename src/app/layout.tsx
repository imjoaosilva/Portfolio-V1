import type { Metadata } from "next";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SITE_INFO } from "@/config/site";
import { accents, themes } from "@/config/theme";
import {
	DEFAULT_ACCENT,
	DEFAULT_THEME,
	STORAGE_ACCENT_KEY,
	STORAGE_THEME_KEY,
} from "@/config/theme-storage";
import { BodyMono, Display, Mono } from "@/libs/fonts";
import { cn } from "@/utils/cn";

export const metadata: Metadata = {
	metadataBase: new URL(SITE_INFO.url),
	alternates: {
		canonical: "/",
	},
	title: {
		default: `${SITE_INFO.name} | Portfolio & Blog`,
		template: `%s | ${SITE_INFO.titleSuffix}`,
	},
	description: SITE_INFO.description,
	keywords: SITE_INFO.keywords,
	authors: [
		{
			name: SITE_INFO.name,
			url: SITE_INFO.url,
		},
	],
	creator: SITE_INFO.creator,
	openGraph: {
		type: "website",
		url: SITE_INFO.url,
		title: `${SITE_INFO.name} | Portfolio & Blog`,
		description: SITE_INFO.description,
		siteName: SITE_INFO.name,
		locale: "en_US",
	},
	twitter: {
		card: "summary_large_image",
		title: `${SITE_INFO.name} | Portfolio & Blog`,
		description: SITE_INFO.description,
	},
};

const themeBootScript = `
(() => {
	const themeKey = ${JSON.stringify(STORAGE_THEME_KEY)};
	const accentKey = ${JSON.stringify(STORAGE_ACCENT_KEY)};
	const fallbackTheme = ${JSON.stringify(DEFAULT_THEME)};
	const fallbackAccent = ${JSON.stringify(DEFAULT_ACCENT)};
	const validThemes = new Set(${JSON.stringify([...themes])});
	const validAccents = new Set(${JSON.stringify(accents.map((accent) => accent.name))});
	try {
		const root = document.documentElement;
		const storedTheme = window.localStorage.getItem(themeKey);
		const storedAccent = window.localStorage.getItem(accentKey);
		root.dataset.theme = validThemes.has(storedTheme) ? storedTheme : fallbackTheme;
		root.dataset.accent = validAccents.has(storedAccent) ? storedAccent : fallbackAccent;
		root.dataset.themeReady = "true";
	} catch {
		document.documentElement.dataset.themeReady = "true";
	}
})();
`;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const websiteJsonLd = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: SITE_INFO.name,
		url: SITE_INFO.url,
		description: SITE_INFO.description,
	};

	const personJsonLd = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: SITE_INFO.name,
		url: SITE_INFO.url,
		sameAs: [`https://github.com/${SITE_INFO.githubUsername}`],
	};

	return (
		<html
			lang="en"
			suppressHydrationWarning
			data-theme="mocha"
			data-accent="green"
			data-theme-ready="false"
			className={cn(
				"h-full",
				"antialiased",
				Display.variable,
				Mono.variable,
				BodyMono.variable,
				"font-mono",
			)}
		>
			<head>
				<script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
			</head>
			<body className="min-h-full flex flex-col">
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
					}}
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
					}}
				/>
				<ThemeProvider>{children}</ThemeProvider>
			</body>
		</html>
	);
}
