const COMMIT_COLORS: Record<string, string> = {
	chore: "#9399b2",
	docs: "#f9e2af",
	feat: "var(--color-primary)",
	fix: "#f38ba8",
	refactor: "#a6e3a1",
	style: "#cba6f7",
};

const LANGUAGE_COLORS: Record<string, string> = {
	CSS: "#663399",
	Go: "#00ADD8",
	HTML: "#e34c26",
	Java: "#b07219",
	JavaScript: "#f1e05a",
	PHP: "#4F5D95",
	Python: "#3572A5",
	Rust: "#dea584",
	Shell: "#89e051",
	TypeScript: "#3178c6",
};

export const getCommitColor = (message: string) => {
	const type = message.split(":")[0].toLowerCase();
	return COMMIT_COLORS[type] ?? "var(--color-on-surface-variant)";
};

export const getLanguageColor = (language: string) =>
	LANGUAGE_COLORS[language] ?? "var(--color-primary)";
