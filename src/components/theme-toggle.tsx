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
				suppressHydrationWarning
				aria-label={`Open theme switcher, current theme ${theme}`}
				aria-expanded={isOpen}
				aria-haspopup="menu"
				title={`Theme: ${theme}`}
				onClick={() => setIsOpen((open) => !open)}
				className="border border-border px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-fg-dim transition-colors hover:border-primary hover:text-primary"
			>
				theme
			</button>

			{isOpen && (
				<motion.div
					role="menu"
					className="absolute right-0 top-[calc(100%+10px)] min-w-56 border border-border bg-bg-panel/95 p-1.5 backdrop-blur-md"
					key={`${isOpen}`}
					initial={{ scale: 0, opacity: 0.5 }}
					animate={{ scale: 1, opacity: 1 }}
				>
					<div className="px-2 py-1 font-label text-[10px] uppercase tracking-[0.18em] text-fg-dim">
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
										"flex w-full items-center justify-between px-2 py-2 text-left font-label text-[11px] uppercase tracking-[0.12em] transition-colors",
										isActive
											? "bg-primary text-black"
											: "text-on-background hover:bg-bg-raised",
									)}
								>
									<span>{item}</span>
									<span
										className={cn(
											"text-sm leading-none",
											isActive ? "opacity-100" : "opacity-0",
										)}
									>
										✓
									</span>
								</button>
							);
						})}
					</div>
					<div className="mt-2 border-t border-border px-2 py-2 font-label text-[10px] uppercase tracking-[0.18em] text-fg-dim">
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
										"h-6 w-6 border border-border transition-transform hover:scale-105",
										item.swatchClass,
										isActive
											? "ring-1 ring-primary ring-offset-2 ring-offset-background"
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
