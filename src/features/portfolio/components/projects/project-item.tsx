"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, useState } from "react";
import type { MouseEvent } from "react";
import { getColorFromSeed } from "@/utils/random_color";
import type { Project } from "../../types/projects/project";

const STATUS_LABELS = {
	active: "active",
	shipped: "shipped",
	experimental: "experimental",
} as const;

export function ProjectCard({ project }: { project: Project }) {
	const cardRef = useRef<HTMLDivElement>(null);
	const [isHovered, setIsHovered] = useState(false);
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
		stiffness: 200,
		damping: 25,
	});
	const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
		stiffness: 200,
		damping: 25,
	});

	const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
		if (!cardRef.current) return;

		const rect = cardRef.current.getBoundingClientRect();
		mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
		mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
	};

	const handleMouseLeave = () => {
		mouseX.set(0);
		mouseY.set(0);
		setIsHovered(false);
	};

	return (
		<motion.article
			ref={cardRef}
			style={{
				rotateX,
				rotateY,
				transformPerspective: 800,
				transformStyle: "preserve-3d",
			}}
			className="relative border border-on-background bg-surface-container-lowest window-shadow"
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={handleMouseLeave}
			whileHover={{ boxShadow: "6px 6px 0px 0px rgb(var(--primary-rgb) / 0.35)" }}
		>
			<div className="flex h-10 items-center justify-between border-b border-on-background bg-surface-container-highest px-4">
				<div className="flex gap-1.5">
					{["#ff5f56", "#ffbd2e", "#27c93f"].map((color) => (
						<div
							key={color}
							className="h-3 w-3 rounded-full border border-black/10"
							style={{ backgroundColor: color }}
						/>
					))}
				</div>

				<span className="font-label text-xs font-bold tracking-tight">
					imjoaosilva / <span className="text-primary">{project.id}</span>
				</span>

				<div className="border border-on-background bg-background px-1.5 py-0.5 font-label text-[10px] uppercase">
					{STATUS_LABELS[project.status]}
				</div>
			</div>

			<div className="space-y-4 p-6">
				<div className="flex items-start justify-between gap-4">
					<div className="space-y-2">
						<h3 className="font-headline text-2xl font-bold uppercase">{project.title}</h3>
						<p className="text-sm leading-relaxed text-on-surface-variant">
							{project.description}
						</p>
					</div>
					<span className="font-mono text-[10px] uppercase text-on-surface-variant">
						{project.year}
					</span>
				</div>

				<div className="flex flex-wrap gap-2 pt-2">
					{project.tags.map((tag, index) => (
						<motion.span
							key={tag}
							style={{ color: getColorFromSeed(tag + index) }}
							className="rounded border border-on-background bg-secondary-container px-2 py-0.5 font-label text-xs font-semibold uppercase"
							whileHover={{ scale: 1.05, y: -2 }}
						>
							{tag}
						</motion.span>
					))}
				</div>

				<motion.div
					className="overflow-hidden"
					animate={{
						height: isHovered ? "auto" : 0,
						opacity: isHovered ? 1 : 0,
					}}
					transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
				>
					<div className="mt-2 flex flex-wrap items-center gap-2">
						<Link
							href={`/projects/${project.id}`}
							className="inline-flex items-center gap-1.5 border border-on-background bg-background px-3 py-1.5 font-label text-xs font-bold uppercase transition-colors hover:bg-primary hover:text-on-primary"
						>
							Open case →
						</Link>
						<a
							href={project.link}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-1.5 border border-on-background px-3 py-1.5 font-label text-xs font-bold uppercase text-on-surface-variant transition-colors hover:text-on-background"
						>
							Visit live
						</a>
					</div>
				</motion.div>
			</div>

			<motion.div
				className="absolute bottom-0 left-0 h-0.5 bg-primary"
				animate={{ width: isHovered ? "100%" : "0%" }}
				transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
			/>
		</motion.article>
	);
}
