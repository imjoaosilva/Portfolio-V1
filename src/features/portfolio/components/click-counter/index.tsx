import { TbClick } from "react-icons/tb";
import { ClickCounterValue } from "./counter";

export function ClickCounter() {
	return (
		<div className="border border-on-background bg-surface-container-lowest window-shadow h-full flex flex-col">
			<div className="px-4 py-3 border-b border-on-background/20 flex items-center justify-between">
				<div className="flex items-center gap-2 text-on-surface-variant">
					<TbClick size={14} />
					<span className="font-label text-[10px] uppercase tracking-widest">
						click counter
					</span>
				</div>
			</div>

			<ClickCounterValue />
		</div>
	);
}
