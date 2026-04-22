import { BasedInMap } from "./map";

export function BasedIn() {
	return (
		<div className="void-panel relative flex h-full min-h-[16rem] flex-col overflow-hidden">
			<div className="flex items-center justify-between border-b border-border px-4 py-3">
				<div className="void-section-title">based in</div>
			</div>
			<BasedInMap />
		</div>
	);
}
