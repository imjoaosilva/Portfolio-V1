export type FloatingPoint = {
	driftX: number;
	id: number;
	left: number;
	x: number;
	y: number;
};

export type AbacusCounterResponse = {
	value: number;
};

export type ClickCounterSnapshot = {
	confirmedCount: number;
	pendingClicks: number;
};
