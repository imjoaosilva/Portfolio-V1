"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu } from "@/config/menu";
import { cn } from "@/utils/cn";

export const SiteHeader = () => {
	const pathname = usePathname();
	const segments = pathname === "/" ? [] : pathname.split("/").filter(Boolean);

	return (
		<header className="fixed top-0 z-50 flex h-14 w-full items-center justify-between border-b border-on-background/20 bg-background/90 px-6 backdrop-blur-md transition-colors duration-300">
			<div className="flex items-center font-label text-sm font-medium leading-none tracking-tight">
				<Link
					href="/"
					className="text-primary transition-colors hover:text-primary/70"
					aria-label="Go to home"
				>
					~
				</Link>

				{segments.length === 0 ? (
					<span className="ml-px text-on-background/90">/</span>
				) : (
					segments.map((seg, i) => {
						const segPath = `/${segments.slice(0, i + 1).join("/")}`;
						const isLast = i === segments.length - 1;

						return (
							<span key={segPath} className="flex items-center">
								<span className="ml-px">/</span>
								{isLast ? (
									<span className="ml-px text-on-background">{seg}</span>
								) : (
									<Link
										href={segPath}
										className="ml-px text-on-background transition-colors hover:text-primary"
									>
										{seg}
									</Link>
								)}
							</span>
						);
					})
				)}

				<div className="ml-1 h-3.5 w-1 shrink-0 bg-primary/70" />
			</div>

			<nav className="hidden h-full items-center gap-8 md:flex">
				{Menu.map((item) => {
					const isSelected = pathname === item.to;
					const isChildRoute =
						item.to !== "/" && pathname.startsWith(`${item.to}/`);
					return (
						<Link
							key={item.label}
							className={cn(
								"flex h-full items-center font-mono text-sm font-medium uppercase tracking-tight transition-colors",
								isSelected
									? "border-b-2 border-primary text-primary"
									: isChildRoute
										? "text-primary/80 hover:text-primary"
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
