"use client";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { cn } from "@/utils/cn";

function TooltipProvider({
	delay = 0,
	...props
}: TooltipPrimitive.Provider.Props) {
	return (
		<TooltipPrimitive.Provider
			data-slot="tooltip-provider"
			delay={delay}
			{...props}
		/>
	);
}

function TooltipRoot(props: TooltipPrimitive.Root.Props) {
	return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
}

function Tooltip(props: TooltipPrimitive.Root.Props) {
	return (
		<TooltipProvider>
			<TooltipPrimitive.Root data-slot="tooltip" {...props} />
		</TooltipProvider>
	);
}

function TooltipTrigger(props: TooltipPrimitive.Trigger.Props) {
	return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
	className,
	side = "top",
	sideOffset = 8,
	align = "center",
	alignOffset = 0,
	children,
	...props
}: TooltipPrimitive.Popup.Props &
	Pick<
		TooltipPrimitive.Positioner.Props,
		"align" | "alignOffset" | "side" | "sideOffset"
	>) {
	return (
		<TooltipPrimitive.Portal>
			<TooltipPrimitive.Positioner
				align={align}
				alignOffset={alignOffset}
				side={side}
				sideOffset={sideOffset}
				className="isolate z-50"
			>
				<TooltipPrimitive.Popup
					data-slot="tooltip-content"
					className={cn(
						"z-50 w-fit max-w-xs origin-[var(--transform-origin)] border border-primary/25 bg-surface-container-highest text-on-background shadow-[3px_3px_0px_0px_var(--surface)]",
						"rounded-lg px-4 py-2 text-sm transition-[opacity,transform] duration-150 ease-out",
						"data-starting-style:scale-95 data-starting-style:opacity-0",
						"data-ending-style:scale-95 data-ending-style:opacity-0",
						"data-instant:duration-0 selection:bg-primary selection:text-on-primary",
						className,
					)}
					{...props}
				>
					{children}
					<TooltipPrimitive.Arrow
						className={cn(
							"bg-surface-container-highest fill-surface-container-highest data-[side=bottom]:top-1 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5",
							"size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-xs",
							"data-[side=bottom]:rounded-br-sm data-[side=top]:rounded-tl-sm",
						)}
					/>
				</TooltipPrimitive.Popup>
			</TooltipPrimitive.Positioner>
		</TooltipPrimitive.Portal>
	);
}

export {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipRoot,
	TooltipTrigger,
};
