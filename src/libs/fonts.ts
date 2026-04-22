import {
	Doto,
	JetBrains_Mono,
} from "next/font/google";

const Display = Doto({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-headline",
});

const Mono = JetBrains_Mono({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	variable: "--font-jetbrains-mono",
});

const BodyMono = JetBrains_Mono({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	variable: "--font-body",
});

export { BodyMono, Display, Mono };
