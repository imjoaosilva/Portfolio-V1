"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu } from "@/config/menu";
import { cn } from "@/utils/cn";

export const SiteHeader = () => {
	const pathname = usePathname();
	const currentLabel =
		Menu.find((item) => pathname === item.to || pathname.startsWith(`${item.to}/`))
			?.label.toLowerCase() ?? "index";

	return (
		<header className="sticky top-0 z-50 border-b border-border bg-background/92 backdrop-blur-md transition-colors duration-300">
			<div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
				<div className="flex min-w-0 items-center gap-3">
					<Link
						href="/"
						className="min-w-0 no-underline"
						aria-label="Go to home"
					>
						<div className="flex min-w-0 items-center gap-2 border border-border bg-bg-panel/70 px-3 py-2">
							<span className="text-primary">●</span>
							<div className="min-w-0">
								<div className="truncate font-mono text-[11px] tracking-[0.08em] text-fg">
									joao@silva:~$
								</div>
								<div className="truncate font-mono text-[10px] text-fg-dim">
									cd /{currentLabel}
								</div>
							</div>
						</div>
					</Link>
				</div>

				<nav className="hidden items-center gap-1 border border-border bg-bg-panel/80 p-1 md:flex">
					{Menu.map((item) => {
						const isSelected = pathname === item.to;
						const isChildRoute =
							item.to !== "/" && pathname.startsWith(`${item.to}/`);
						return (
							<Link
								key={item.label}
								className={cn(
									"flex items-center border border-transparent px-3 py-1.5 font-mono text-[11px] transition-colors no-underline",
									isSelected
										? "border-primary/40 bg-primary/8 text-primary"
										: isChildRoute
											? "text-primary/75 hover:text-primary"
											: "text-fg-dim hover:bg-bg-raised hover:text-on-background",
								)}
								href={item.to}
							>
								~/{item.label.toLowerCase()}
							</Link>
						);
					})}
				</nav>

				<div className="flex items-center gap-3">
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
};
