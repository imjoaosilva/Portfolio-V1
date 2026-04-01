const ABACUS_API_BASE = "https://abacus.jasoncameron.dev";
const CLICK_COUNTER_NAMESPACE = "joaosilva";
const CLICK_COUNTER_KEY = "click-counter";

type AbacusCounterResponse = {
	value: number;
};

const getCounterUrl = (action: "get" | "hit") =>
	`${ABACUS_API_BASE}/${action}/${CLICK_COUNTER_NAMESPACE}/${CLICK_COUNTER_KEY}`;

const readCounterResponse = async (response: Response) => {
	if (!response.ok) {
		throw new Error(`Abacus request failed with status ${response.status}`);
	}

	return (await response.json()) as AbacusCounterResponse;
};

export const getClickCounterValue = async () => {
	const response = await fetch(getCounterUrl("get"), {
		cache: "no-store",
	});

	if (response.status === 404) {
		return 0;
	}

	const data = await readCounterResponse(response);
	return data.value;
};

export const hitClickCounter = async () => {
	const response = await fetch(getCounterUrl("hit"), {
		cache: "no-store",
	});
	const data = await readCounterResponse(response);
	return data.value;
};
