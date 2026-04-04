export function formatPostDate(
	value: string,
	options?: Intl.DateTimeFormatOptions,
) {
	return new Intl.DateTimeFormat(
		"en",
		options ?? {
			month: "short",
			year: "numeric",
		},
	).format(new Date(value));
}
