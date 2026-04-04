import Link from "next/link";

export const metadata = {
	title: "Page Not Found",
};

export default function NotFound() {
	return (
		<div className="mx-auto flex min-h-[70svh] max-w-3xl flex-col items-center justify-center px-6 text-center">
			<p className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
				404
			</p>
			<h1 className="mt-4 font-headline text-[clamp(2.5rem,7vw,4.5rem)] font-black leading-[0.95] tracking-tight">
				Page not found
			</h1>
			<p className="mt-4 max-w-xl text-sm leading-7 text-on-surface-variant">
				The page you were looking for does not exist anymore, was moved, or
				never existed in the first place.
			</p>
			<div className="mt-8 flex flex-wrap items-center justify-center gap-3">
				<Link
					href="/"
					className="border border-primary bg-primary px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-primary-foreground transition-opacity hover:opacity-90"
				>
					Go home
				</Link>
				<Link
					href="/blog"
					className="border border-on-surface/20 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-on-surface-variant transition-colors hover:border-primary/40 hover:text-primary"
				>
					Open blog
				</Link>
			</div>
		</div>
	);
}
