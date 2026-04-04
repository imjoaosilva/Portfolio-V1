import type { Metadata } from "next";
import Link from "next/link";
import { SITE_INFO } from "@/config/site";
import {
	filterPosts,
	getBlogCategories,
	getBlogLocale,
} from "@/features/blog/data/posts";
import { getBlogCopy, getLocaleLabel } from "@/features/blog/lib/blog-locale";
import { PostList } from "@/features/blog/components/post-list";
import { PostSearchInput } from "@/features/blog/components/post-search-input";

type BlogPageProps = {
	searchParams: Promise<{
		category?: string;
		q?: string;
		lang?: string;
	}>;
};

export async function generateMetadata({
	searchParams,
}: BlogPageProps): Promise<Metadata> {
	const { lang } = await searchParams;
	const locale = getBlogLocale(lang);
	const copy = getBlogCopy(locale);

	return {
		title: "Blog",
		description: copy.blogDescription,
		alternates: {
			canonical: locale === "en" ? "/blog" : `/blog?lang=${locale}`,
		},
		openGraph: {
			title: `Blog | ${SITE_INFO.name}`,
			description: copy.blogDescription,
			url: locale === "en" ? "/blog" : `/blog?lang=${locale}`,
			type: "website",
			siteName: SITE_INFO.name,
			locale: locale === "pt" ? "pt_PT" : "en_US",
		},
		twitter: {
			card: "summary_large_image",
			title: `Blog | ${SITE_INFO.name}`,
			description: copy.blogDescription,
		},
	};
}

export default async function Page({ searchParams }: BlogPageProps) {
	const { category, q, lang } = await searchParams;
	const locale = getBlogLocale(lang);
	const copy = getBlogCopy(locale);
	const filters = getBlogCategories(locale);
	const activeCategory =
		category && filters.includes(category) ? category : "All Posts";
	const searchQuery = q?.trim() ?? "";
	const posts = filterPosts({
		category: activeCategory,
		query: searchQuery,
		locale,
	});

	return (
		<div className="min-h-svh max-w-5xl mx-auto px-4 md:px-6 py-8 font-sans">
			<header className="border-b border-on-surface/15 pb-6">
				<div className="px-1">
					<p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
						{copy.notesLabel}
					</p>
					<h1 className="font-headline text-[clamp(2.5rem,7vw,4rem)] font-black leading-[0.95] tracking-tight">
						{copy.blogTitle}
					</h1>
					<p className="mt-3 max-w-2xl font-mono text-sm leading-7 text-on-surface-variant">
						{copy.blogDescription}
					</p>
				</div>

				<div className="mt-6 grid gap-4 border-t border-on-surface/10 pt-4 md:grid-cols-[minmax(0,1fr)_18rem]">
					<div className="space-y-3">
						<div className="flex flex-wrap gap-2">
							{(["en", "pt"] as const).map((item) => {
								const params = new URLSearchParams();

								if (item !== "en") {
									params.set("lang", item);
								}

								if (category && category !== "All Posts") {
									params.set("category", category);
								}

								if (searchQuery) {
									params.set("q", searchQuery);
								}

								return (
									<Link
										key={item}
										href={params.toString() ? `/blog?${params}` : "/blog"}
										className={`inline-flex h-8 items-center border px-3 font-mono text-[10px] uppercase leading-none tracking-[0.14em] transition-colors ${
											locale === item
												? "border-primary text-primary"
												: "border-on-surface/20 text-outline hover:border-primary/40 hover:text-primary"
										}`}
									>
										{getLocaleLabel(item)}
									</Link>
								);
							})}
						</div>

						<div className="flex flex-wrap gap-2">
							{filters.map((filterName) => {
								const params = new URLSearchParams();

								if (locale !== "en") {
									params.set("lang", locale);
								}

								if (filterName !== "All Posts") {
									params.set("category", filterName);
								}

								if (searchQuery) {
									params.set("q", searchQuery);
								}

								return (
									<Link
										key={filterName}
										href={params.toString() ? `/blog?${params}` : "/blog"}
										aria-current={activeCategory === filterName ? "page" : undefined}
										className={`inline-flex h-8 items-center border px-3 font-mono text-[10px] uppercase leading-none tracking-[0.14em] transition-colors ${
											activeCategory === filterName
												? "border-primary text-primary"
												: "border-on-surface/20 text-outline hover:border-primary/40 hover:text-primary"
										}`}
									>
										{filterName}
									</Link>
								);
							})}
						</div>
					</div>

					<PostSearchInput
						key={activeCategory}
						category={activeCategory}
						defaultValue={searchQuery}
						locale={locale}
					/>
				</div>
			</header>

			<div className="mt-8 mb-6 flex items-center gap-4 font-mono text-[9px] uppercase tracking-[0.2em] text-outline">
				<span>
					{searchQuery || activeCategory !== "All Posts"
						? copy.filteredPosts
						: copy.allPosts}
				</span>
				<span className="flex-1 h-px bg-on-surface/10" />
			</div>

			{posts.length > 0 ? (
				<PostList posts={posts} locale={locale} />
			) : (
				<div className="border border-dashed border-on-surface/20 p-10 text-center">
					<p className="font-headline text-2xl font-bold">{copy.noPostsTitle}</p>
					<p className="mt-3 text-sm text-on-surface-variant">
						{copy.noPostsDescription}
					</p>
				</div>
			)}
		</div>
	);
}
