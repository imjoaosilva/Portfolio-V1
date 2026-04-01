export const getColorFromSeed = (seed: string): string => {
	const hslColors: Record<string, string> = {
		slate:   "hsl(217 30% 80%)",
		gray:    "hsl(220 15% 82%)",
		zinc:    "hsl(240 10% 83%)",
		neutral: "hsl(0 0% 83%)",
		stone:   "hsl(20 15% 80%)",
		red:     "hsl(0 80% 85%)",
		orange:  "hsl(33 90% 83%)",
		amber:   "hsl(40 90% 82%)",
		yellow:  "hsl(50 95% 78%)",
		lime:    "hsl(90 70% 78%)",
		green:   "hsl(142 60% 78%)",
		emerald: "hsl(155 65% 76%)",
		teal:    "hsl(170 60% 76%)",
		cyan:    "hsl(190 70% 78%)",
		sky:     "hsl(200 80% 80%)",
		blue:    "hsl(217 80% 80%)",
		indigo:  "hsl(243 70% 82%)",
		violet:  "hsl(263 80% 83%)",
		purple:  "hsl(276 75% 83%)",
		fuchsia: "hsl(310 75% 82%)",
		pink:    "hsl(330 80% 83%)",
		rose:    "hsl(346 75% 82%)",
	};
	const hash = seed
		.split("")
		.reduce((acc, char) => acc + char.charCodeAt(0), 0);
	const index = hash % Object.keys(hslColors).length;
	return hslColors[Object.keys(hslColors)[index]];
};
