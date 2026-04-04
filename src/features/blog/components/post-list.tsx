"use client";

import { AnimatePresence, motion } from "motion/react";
import type { BlogLocale, Post } from "@/features/blog/types/post";
import { PostItem } from "./post-item";

export const PostList = ({
	posts,
	locale = "en",
}: {
	posts: Post[];
	locale?: BlogLocale;
}) => {
	return (
		<motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
			<AnimatePresence mode="popLayout">
				{posts.map((post, index) => (
					<motion.div
						key={post.slug}
						layout
						initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
						animate={{
							opacity: 1,
							y: 0,
							filter: "blur(0px)",
							transition: {
								duration: 0.28,
								delay: index * 0.03,
								ease: "easeOut",
							},
						}}
						exit={{
							opacity: 0,
							y: -10,
							filter: "blur(4px)",
							transition: { duration: 0.18, ease: "easeInOut" },
						}}
					>
						<PostItem post={post} locale={locale} />
					</motion.div>
				))}
			</AnimatePresence>
		</motion.div>
	);
};
