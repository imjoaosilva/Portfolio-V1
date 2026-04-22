import Link from "next/link";
import { Menu } from "@/config/menu";

export const SiteFooter = () => {
	const year = new Date().getFullYear();

	return (
		<footer className="border-t border-border">
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 md:px-6 md:py-14">
				<div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
					<div className="space-y-3">
						<div className="flex items-center gap-2">
							<span className="text-primary">●</span>
							<span className="font-mono text-[11px] tracking-[0.08em] text-fg">joao@silva:~$</span>
						</div>
						<p className="max-w-xs text-xs leading-6 text-fg-faint">
							full-stack developer building products & interfaces from portugal.
						</p>
					</div>

					<nav className="flex flex-wrap gap-x-6 gap-y-2">
						{Menu.map((item) => (
							<Link
								key={item.label}
								href={item.to}
								className="font-mono text-[11px] tracking-[0.08em] text-fg-dim no-underline transition-colors hover:text-primary"
							>
								~/{item.label.toLowerCase()}
							</Link>
						))}
					</nav>
				</div>

				<div className="flex flex-col gap-2 border-t border-border pt-6 md:flex-row md:items-center md:justify-between">
					<p className="font-mono text-[10px] tracking-[0.1em] text-fg-ghost">
						© {year} joão silva — all rights reserved
					</p>
					<p className="font-mono text-[10px] tracking-[0.1em] text-fg-ghost">
						🇵🇹 viseu, portugal
					</p>
				</div>
			</div>
		</footer>
	);
};
