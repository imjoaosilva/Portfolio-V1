import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="group/layout void-shell">
			<SiteHeader />
			<main className="mx-auto min-h-screen w-full max-w-6xl overflow-x-hidden px-4 pb-16 pt-20 md:px-6 md:pt-28">
				{children}
			</main>
			<SiteFooter />
		</div>
	);
}
