"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu } from "@/config/menu";
import { cn } from "@/utils/cn";

export const SiteHeader = () => {
	const pathname = usePathname();

	return (
		<header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-14 bg-background/90 backdrop-blur-md border-b border-on-background/20 transition-colors duration-300">
			<div className="flex items-center">
				<div className="font-label text-sm font-medium leading-none tracking-tight text-primary ">
					~
				</div>
				<div className="font-label text-sm font-medium leading-none tracking-tight text-on-background/90 ml-px">
					{pathname}
				</div>
				<div className="h-3.5 w-1 shrink-0 bg-primary/70 ml-1" />
			</div>

			<nav className="hidden md:flex gap-8 items-center h-full">
				{Menu.map((item) => {
					const isSelected = item.to === pathname;

					return (
						<Link
							key={item.label}
							className={cn(
								"font-mono text-sm tracking-tight font-medium uppercase h-full flex items-center transition-colors",
								isSelected
									? "border-b-2 border-primary text-primary"
									: "text-on-surface-variant hover:text-on-background",
							)}
							href={item.to}
						>
							{item.label}
						</Link>
					);
				})}
			</nav>
			<div className="flex items-center gap-4">
				<ThemeToggle />
			</div>
		</header>
	);
};
