import {
	Inter as InterFont,
	JetBrains_Mono,
	Space_Grotesk,
} from "next/font/google";

const spaceGrotesk = Space_Grotesk({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	variable: "--font-headline",
});

const Mono = JetBrains_Mono({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	variable: "--font-jetbrains-mono",
});

const Inter = InterFont({
	subsets: ["latin"],
	weight: ["400", "500", "600"],
	variable: "--font-body",
});

export { Inter, Mono, spaceGrotesk };
