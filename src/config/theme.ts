export const themes = ["latte", "frappe", "macchiato", "mocha"] as const;
export type ThemeName = (typeof themes)[number];

export const accents = [
	{
		name: "rosewater",
		swatchClass: "bg-[#f5e0dc]",
	},
	{
		name: "green",
		swatchClass: "bg-[#a6e3a1]",
	},
	{
		name: "blue",
		swatchClass: "bg-[#89b4fa]",
  },
  {
		name: "pink",
		swatchClass: "bg-[#f4b8e4]",
   },
	{
		name: "peach",
		swatchClass: "bg-[#fab387]",
  },
] as const;

export type AccentName = (typeof accents)[number]["name"];
