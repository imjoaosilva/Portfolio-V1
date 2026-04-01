"use client";

import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import {
	type AccentName,
	accents,
	type ThemeName,
	themes,
} from "@/config/theme";
import {
	DEFAULT_ACCENT,
	DEFAULT_THEME,
	STORAGE_ACCENT_KEY,
	STORAGE_THEME_KEY,
} from "@/config/theme-storage";

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

const getInitialTheme = (): ThemeName => {
	if (typeof window === "undefined") {
		return DEFAULT_THEME as ThemeName;
	}

	const root = document.documentElement;
	const storedTheme = localStorage.getItem(STORAGE_THEME_KEY) ?? undefined;

	if (isThemeName(storedTheme)) {
		return storedTheme;
	}

	if (isThemeName(root.dataset.theme)) {
		return root.dataset.theme;
	}

	return DEFAULT_THEME as ThemeName;
};

const getInitialAccent = (): AccentName => {
	if (typeof window === "undefined") {
		return DEFAULT_ACCENT as AccentName;
	}

	const root = document.documentElement;
	const storedAccent = localStorage.getItem(STORAGE_ACCENT_KEY) ?? undefined;

	if (isAccentName(storedAccent)) {
		return storedAccent;
	}

	if (isAccentName(root.dataset.accent)) {
		return root.dataset.accent;
	}

	return DEFAULT_ACCENT as AccentName;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [theme, setTheme] = useState<ThemeName>(getInitialTheme);
	const [accent, setAccent] = useState<AccentName>(getInitialAccent);

	useEffect(() => {
		document.documentElement.dataset.theme = theme;
		document.documentElement.dataset.themeReady = "true";
		localStorage.setItem(STORAGE_THEME_KEY, theme);
	}, [theme]);

	useEffect(() => {
		document.documentElement.dataset.accent = accent;
		document.documentElement.dataset.themeReady = "true";
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

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	const context = useContext(ThemeContext);

	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}

	return context;
};
