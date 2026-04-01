"use client";

import {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
	type ReactNode,
} from "react";
import { accents, type AccentName, themes, type ThemeName } from "@/config/theme";

const DEFAULT_THEME: ThemeName = "macchiato";
const DEFAULT_ACCENT: AccentName = "peach";
const STORAGE_THEME_KEY = "joaosilva-theme";
const STORAGE_ACCENT_KEY = "joaosilva-accent";

type ThemeContextValue = {
	accent: AccentName;
	setAccent: (accent: AccentName) => void;
	setTheme: (theme: ThemeName) => void;
	theme: ThemeName;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const isThemeName = (value: string | undefined): value is ThemeName =>
	!!value && themes.includes(value as ThemeName);

const isAccentName = (value: string | undefined): value is AccentName =>
	!!value && accents.some((item) => item.name === value);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [theme, setTheme] = useState<ThemeName>(DEFAULT_THEME);
	const [accent, setAccent] = useState<AccentName>(DEFAULT_ACCENT);

	useEffect(() => {
		const root = document.documentElement;
		const storedTheme = localStorage.getItem(STORAGE_THEME_KEY) ?? undefined;
		const storedAccent = localStorage.getItem(STORAGE_ACCENT_KEY) ?? undefined;
		const initialTheme = isThemeName(storedTheme)
			? storedTheme
			: isThemeName(root.dataset.theme)
				? root.dataset.theme
				: DEFAULT_THEME;
		const initialAccent = isAccentName(storedAccent)
			? storedAccent
			: isAccentName(root.dataset.accent)
				? root.dataset.accent
				: DEFAULT_ACCENT;

		setTheme(initialTheme);
		setAccent(initialAccent);
	}, []);

	useEffect(() => {
		document.documentElement.dataset.theme = theme;
		localStorage.setItem(STORAGE_THEME_KEY, theme);
	}, [theme]);

	useEffect(() => {
		document.documentElement.dataset.accent = accent;
		localStorage.setItem(STORAGE_ACCENT_KEY, accent);
	}, [accent]);

	const value = useMemo(
		() => ({
			accent,
			setAccent,
			setTheme,
			theme,
		}),
		[accent, theme],
	);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
	const context = useContext(ThemeContext);

	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}

	return context;
};
