"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/theme-provider";
import {
	type AccentName,
	accents,
	type ThemeName,
	themes,
} from "@/config/theme";
import { cn } from "@/utils/cn";

export const ThemeToggle = () => {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const { accent, setAccent, setTheme, theme } = useTheme();

	useEffect(() => {
		const handlePointerDown = (event: MouseEvent) => {
			if (!containerRef.current?.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handlePointerDown);
		document.addEventListener("keydown", handleEscape);
		return () => {
			document.removeEventListener("mousedown", handlePointerDown);
			document.removeEventListener("keydown", handleEscape);
		};
	}, []);

	const handleThemeChange = (nextTheme: ThemeName) => {
		setTheme(nextTheme);
		setIsOpen(false);
	};

	const handleAccentChange = (nextAccent: AccentName) => {
		setAccent(nextAccent);
		setIsOpen(false);
	};

	return (
		<div ref={containerRef} className="relative flex items-center">
			<button
				type="button"
				aria-label={`Open theme switcher, current theme ${theme}`}
				aria-expanded={isOpen}
				aria-haspopup="menu"
				title={`Theme: ${theme}`}
				onClick={() => setIsOpen((open) => !open)}
				className="material-symbols-outlined text-on-surface-variant hover:text-primary scale-95 active:scale-90 transition-transform"
			>
				grid_view
			</button>

			{isOpen && (
				<motion.div
					role="menu"
					className="absolute right-0 top-[calc(100%+10px)] min-w-52 border border-on-background bg-background/95 p-1.5 backdrop-blur-md shadow-[4px_4px_0px_0px_currentColor]"
					key={`${isOpen}`}
					initial={{ scale: 0, opacity: 0.5 }}
					animate={{ scale: 1, opacity: 1 }}
				>
					<div className="px-2 py-1 font-label text-[10px] uppercase tracking-[0.18em] text-on-surface-variant">
						Themes
					</div>
					<div className="space-y-1">
						{themes.map((item) => {
							const isActive = item === theme;

							return (
								<button
									key={item}
									type="button"
									role="menuitem"
									onClick={() => handleThemeChange(item)}
									className={cn(
										"flex w-full items-center justify-between px-2 py-2 text-left font-label text-xs uppercase transition-colors",
										isActive
											? "bg-primary text-background"
											: "text-on-background hover:bg-surface-container-highest",
									)}
								>
									<span>{item}</span>
									<span
										className={cn(
											"material-symbols-outlined text-sm leading-none",
											isActive ? "opacity-100" : "opacity-0",
										)}
									>
										check_small
									</span>
								</button>
							);
						})}
					</div>
					<div className="mt-2 border-t border-on-background/15 px-2 py-2 font-label text-[10px] uppercase tracking-[0.18em] text-on-surface-variant">
						Accent
					</div>
					<div className="grid grid-cols-4 gap-2 px-2 pb-1">
						{accents.map((item) => {
							const isActive = item.name === accent;

							return (
								<button
									key={item.name}
									type="button"
									aria-label={`Set accent ${item.name}`}
									title={item.name}
									onClick={() => handleAccentChange(item.name)}
									className={cn(
										"h-6 w-6 border border-on-background transition-transform hover:scale-105",
										item.swatchClass,
										isActive
											? "ring-2 ring-on-background ring-offset-2 ring-offset-background"
											: "",
									)}
								/>
							);
						})}
					</div>
				</motion.div>
			)}
		</div>
	);
};
