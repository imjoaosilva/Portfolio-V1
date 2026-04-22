import { ClickCounterValue } from "./counter";

export function ClickCounter() {
	return (
		<div className="void-panel flex h-full min-h-[16rem] flex-col">
			<div className="flex items-center justify-between border-b border-border px-4 py-3">
				<div className="void-section-title">click counter</div>
			</div>

			<ClickCounterValue />
		</div>
	);
}
