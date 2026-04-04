"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { TbSearch, TbX } from "react-icons/tb";
import { getBlogCopy } from "@/features/blog/lib/blog-locale";
import type { BlogLocale } from "@/features/blog/types/post";

export const PostSearchInput = ({
	category,
	defaultValue,
	locale = "en",
}: {
	category?: string;
	defaultValue?: string;
	locale?: BlogLocale;
}) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [query, setQuery] = useState(defaultValue ?? "");
	const [isPending, startTransition] = useTransition();
	const copy = getBlogCopy(locale);

	useEffect(() => {
		const currentQueryString = searchParams.toString();
		const timeoutId = window.setTimeout(() => {
			const params = new URLSearchParams(currentQueryString);

			if (category && category !== "All Posts") {
				params.set("category", category);
			} else {
				params.delete("category");
			}

			if (locale !== "en") {
				params.set("lang", locale);
			} else {
				params.delete("lang");
			}

			if (query.trim()) {
				params.set("q", query.trim());
			} else {
				params.delete("q");
			}

			const nextUrl = params.toString() ? `${pathname}?${params}` : pathname;
			const currentUrl = currentQueryString
				? `${pathname}?${currentQueryString}`
				: pathname;

			if (nextUrl === currentUrl) {
				return;
			}

			startTransition(() => {
				router.replace(nextUrl, { scroll: false });
			});
		}, 180);

		return () => window.clearTimeout(timeoutId);
	}, [category, locale, pathname, query, router, searchParams]);

	return (
		<div className="relative w-full md:max-w-sm">
			<motion.div
				layout
				className="flex h-10 items-center gap-3 border border-primary/30 bg-primary/5 px-3.5 text-on-background shadow-[0_0_0_1px_rgba(0,0,0,0.02)] transition-colors focus-within:border-primary"
				animate={{
					boxShadow: isPending
						? "0 0 0 1px rgba(0,0,0,0.02), 0 0 0 3px color-mix(in srgb, var(--color-primary) 12%, transparent)"
						: "0 0 0 1px rgba(0,0,0,0.02)",
				}}
				transition={{ duration: 0.2, ease: "easeOut" }}
			>
				<motion.div
					animate={{
						scale: isPending ? 1.06 : 1,
						opacity: isPending ? 1 : 0.8,
					}}
					transition={{ duration: 0.2 }}
				>
					<TbSearch className="shrink-0 text-base text-primary" />
				</motion.div>
				<input
					value={query}
					onChange={(event) => setQuery(event.target.value)}
					type="text"
					placeholder={copy.searchPlaceholder}
					className="w-full bg-transparent font-label text-sm leading-none outline-none placeholder:text-on-surface-variant"
				/>
				<AnimatePresence>
					{query ? (
						<motion.button
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.8 }}
							transition={{ duration: 0.15 }}
							type="button"
							onClick={() => setQuery("")}
							className="inline-flex h-6 w-6 shrink-0 items-center justify-center border border-on-background/15 text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
							aria-label="Clear search"
						>
							<TbX className="text-sm" />
						</motion.button>
					) : null}
				</AnimatePresence>
			</motion.div>
			<div className="mt-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-on-surface-variant">
				<span>{copy.liveFilter}</span>
				<AnimatePresence mode="wait" initial={false}>
					<motion.span
						key={isPending ? "updating" : "ready"}
						initial={{ opacity: 0, y: 4 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -4 }}
						transition={{ duration: 0.16 }}
						className={isPending ? "text-primary" : undefined}
					>
						{isPending ? copy.updating : copy.ready}
					</motion.span>
				</AnimatePresence>
			</div>
		</div>
	);
};
