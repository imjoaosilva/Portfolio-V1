export type BlogPageProps = {
	searchParams: Promise<{
		category?: string;
		q?: string;
		lang?: string;
	}>;
};

export type PostPageProps = {
	params: Promise<{
		slug: string;
	}>;
	searchParams: Promise<{
		lang?: string;
	}>;
};
