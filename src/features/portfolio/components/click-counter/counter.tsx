"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
	getClickCounterValue,
	hitClickCounter,
} from "@/features/portfolio/data/click-counter";
import type { FloatingPoint } from "@/features/portfolio/types/click-counter";

const COMBO_TIMEOUT_MS = 900;

export function ClickCounterValue() {
	const [count, setCount] = useState(0);
	const [key, setKey] = useState(0);
	const [combo, setCombo] = useState(0);
	const [floatingPoints, setFloatingPoints] = useState<FloatingPoint[]>([]);
	const [isSyncing, setIsSyncing] = useState(true);
	const comboTimeoutRef = useRef<number | null>(null);

	useEffect(() => {
		let isMounted = true;

		const loadCounter = async () => {
			try {
				const value = await getClickCounterValue();

				if (!isMounted) {
					return;
				}

				setCount(value);
				setKey((currentKey) => currentKey + 1);
			} catch {
				if (!isMounted) {
					return;
				}

				setCount(0);
			} finally {
				if (isMounted) {
					setIsSyncing(false);
				}
			}
		};

		void loadCounter();

		return () => {
			isMounted = false;

			if (comboTimeoutRef.current) {
				window.clearTimeout(comboTimeoutRef.current);
			}
		};
	}, []);

	const handleClick = async () => {
		setCount((currentCount) => currentCount + 1);
		setKey((currentKey) => currentKey + 1);
		setCombo((currentCombo) => currentCombo + 1);
		setFloatingPoints((currentPoints) => [
			...currentPoints,
			{
				driftX: (Math.random() - 0.5) * 48,
				id: Date.now() + Math.random(),
				left: 18 + Math.random() * 64,
				x: 0,
				y: 58 + Math.random() * 18,
			},
		]);

		if (comboTimeoutRef.current) {
			window.clearTimeout(comboTimeoutRef.current);
		}

		comboTimeoutRef.current = window.setTimeout(() => {
			setCombo(0);
		}, COMBO_TIMEOUT_MS);

		try {
			const nextValue = await hitClickCounter();
			setCount(nextValue);
			setKey((currentKey) => currentKey + 1);
		} catch {
			setCount((currentCount) => Math.max(0, currentCount - 1));
		}
	};

	return (
		<>
			<div className="px-4 pt-4 flex items-center justify-between">
				<div className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
					tap to click
				</div>
				<span className="font-label text-[10px] text-on-surface-variant border border-on-background/30 px-1.5 py-0.5">
					{isSyncing ? "syncing" : "global"}
				</span>
			</div>
			<button
				type="button"
				onClick={handleClick}
				className="relative overflow-hidden flex-1 flex flex-col items-center justify-center gap-3 p-6 group cursor-pointer"
			>
				<AnimatePresence>
					{floatingPoints.map((point) => (
						<motion.span
							key={point.id}
							className="pointer-events-none absolute font-label text-xs uppercase tracking-widest text-primary"
							style={{ left: `${point.left}%`, top: `${point.y}%` }}
							initial={{ x: point.x, y: point.y, opacity: 0, scale: 0.8 }}
							animate={{ x: point.driftX, y: point.y - 42, opacity: 1, scale: 1 }}
							exit={{ opacity: 0, y: point.y - 60, x: point.driftX * 1.2 }}
							transition={{ duration: 0.45, ease: "easeOut" }}
							onAnimationComplete={() => {
								setFloatingPoints((currentPoints) =>
									currentPoints.filter((currentPoint) => currentPoint.id !== point.id),
								);
							}}
						>
							+1
						</motion.span>
					))}
				</AnimatePresence>

				<AnimatePresence>
					{combo > 1 ? (
						<motion.span
							key={combo}
							className="absolute top-4 right-4 font-label text-[10px] uppercase tracking-[0.22em] text-primary"
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -8 }}
							transition={{ duration: 0.2 }}
						>
							x{combo} combo
						</motion.span>
					) : null}
				</AnimatePresence>

				<AnimatePresence mode="popLayout">
					<motion.span
						key={key}
						className="font-headline text-6xl font-black tabular-nums"
						initial={{ y: -20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: 20, opacity: 0 }}
						transition={{ type: "spring", stiffness: 400, damping: 25 }}
					>
						{count.toLocaleString()}
					</motion.span>
				</AnimatePresence>
				<motion.div
					className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant group-hover:text-primary transition-colors"
					whileTap={{ scale: 0.95 }}
				>
					tap to click →
				</motion.div>
			</button>
			<div className="h-[2px] bg-on-background/10">
				<motion.div
					className="h-full bg-primary"
					animate={{ width: `${Math.min((count / 100) * 100, 100)}%` }}
					transition={{ type: "spring", stiffness: 200, damping: 30 }}
				/>
			</div>
		</>
	);
}
