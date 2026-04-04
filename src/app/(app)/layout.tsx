import { SiteHeader } from "@/components/site-header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="group/layout">
			<SiteHeader />
			<main className="overflow-x-hidden px-2 pt-24 md:pt-36 max-w-7xl mx-auto">
				{children}
			</main>
		</div>
	);
}
