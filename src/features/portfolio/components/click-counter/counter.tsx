"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
	getClickCounterValue,
	hitClickCounter,
} from "@/features/portfolio/data/click-counter";
import type {
	ClickCounterSnapshot,
	FloatingPoint,
} from "@/features/portfolio/types/click-counter";

const COMBO_TIMEOUT_MS = 900;
const COUNTER_STORAGE_KEY = "joaosilva-click-counter";

const readSnapshot = (): ClickCounterSnapshot => {
	if (typeof window === "undefined") {
		return { confirmedCount: 0, pendingClicks: 0 };
	}

	try {
		const rawSnapshot = window.localStorage.getItem(COUNTER_STORAGE_KEY);

		if (!rawSnapshot) {
			return { confirmedCount: 0, pendingClicks: 0 };
		}

		const snapshot = JSON.parse(rawSnapshot) as Partial<ClickCounterSnapshot>;
		const confirmedCount =
			typeof snapshot.confirmedCount === "number" &&
			snapshot.confirmedCount >= 0
				? snapshot.confirmedCount
				: 0;
		const pendingClicks =
			typeof snapshot.pendingClicks === "number" && snapshot.pendingClicks >= 0
				? snapshot.pendingClicks
				: 0;

		return { confirmedCount, pendingClicks };
	} catch {
		return { confirmedCount: 0, pendingClicks: 0 };
	}
};

const writeSnapshot = (snapshot: ClickCounterSnapshot) => {
	window.localStorage.setItem(COUNTER_STORAGE_KEY, JSON.stringify(snapshot));
};

export function ClickCounterValue() {
	const [confirmedCount, setConfirmedCount] = useState(0);
	const [pendingClicks, setPendingClicks] = useState(0);
	const [key, setKey] = useState(0);
	const [combo, setCombo] = useState(0);
	const [floatingPoints, setFloatingPoints] = useState<FloatingPoint[]>([]);
	const [isSyncing, setIsSyncing] = useState(true);
	const [hasSyncIssue, setHasSyncIssue] = useState(false);
	const comboTimeoutRef = useRef<number | null>(null);
	const pendingClicksRef = useRef(0);
	const isFlushingRef = useRef(false);

	const count = useMemo(
		() => confirmedCount + pendingClicks,
		[confirmedCount, pendingClicks],
	);

	const persistSnapshot = useCallback(
		(nextConfirmedCount: number, nextPendingClicks: number) => {
			writeSnapshot({
				confirmedCount: nextConfirmedCount,
				pendingClicks: nextPendingClicks,
			});
		},
		[],
	);

	const flushPendingClicks = useCallback(async () => {
		if (isFlushingRef.current || pendingClicksRef.current === 0) {
			return;
		}

		isFlushingRef.current = true;
		setIsSyncing(true);
		setHasSyncIssue(false);

		try {
			while (pendingClicksRef.current > 0) {
				const nextValue = await hitClickCounter();

				setConfirmedCount(nextValue);
				setPendingClicks((currentPendingClicks) => {
					const nextPendingClicks = Math.max(0, currentPendingClicks - 1);
					pendingClicksRef.current = nextPendingClicks;
					persistSnapshot(nextValue, nextPendingClicks);
					return nextPendingClicks;
				});
			}
		} catch {
			setHasSyncIssue(true);
		} finally {
			isFlushingRef.current = false;
			setIsSyncing(false);
		}
	}, [persistSnapshot]);

	useEffect(() => {
		let isMounted = true;

		const loadCounter = async () => {
			const snapshot = readSnapshot();

			if (isMounted) {
				setConfirmedCount(snapshot.confirmedCount);
				setPendingClicks(snapshot.pendingClicks);
				pendingClicksRef.current = snapshot.pendingClicks;
				setKey((currentKey) => currentKey + 1);
			}

			try {
				const value = await getClickCounterValue();

				if (!isMounted) {
					return;
				}

				const nextConfirmedCount = Math.max(value, snapshot.confirmedCount);

				setConfirmedCount(nextConfirmedCount);
				persistSnapshot(nextConfirmedCount, pendingClicksRef.current);
				setKey((currentKey) => currentKey + 1);
			} catch {
				if (!isMounted) {
					return;
				}

				setHasSyncIssue(pendingClicksRef.current > 0);
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
	}, [persistSnapshot]);

	useEffect(() => {
		void flushPendingClicks();
	}, [flushPendingClicks]);

	useEffect(() => {
		const handleOnline = () => {
			setHasSyncIssue(false);
			void flushPendingClicks();
		};

		window.addEventListener("online", handleOnline);
		return () => {
			window.removeEventListener("online", handleOnline);
		};
	}, [flushPendingClicks]);

	const handleClick = async () => {
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

		setPendingClicks((currentPendingClicks) => {
			const nextPendingClicks = currentPendingClicks + 1;
			pendingClicksRef.current = nextPendingClicks;
			persistSnapshot(confirmedCount, nextPendingClicks);
			return nextPendingClicks;
		});

		void flushPendingClicks();
	};

	const counterStatusLabel = isSyncing
		? "syncing"
		: hasSyncIssue || pendingClicks > 0
			? "offline"
			: "global";

	return (
		<>
			<div className="px-4 pt-4 flex items-center justify-between">
				<div className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
					tap to click
				</div>
				<span className="font-label text-[10px] text-on-surface-variant border border-on-background/30 px-1.5 py-0.5">
					{counterStatusLabel}
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
							animate={{
								x: point.driftX,
								y: point.y - 42,
								opacity: 1,
								scale: 1,
							}}
							exit={{ opacity: 0, y: point.y - 60, x: point.driftX * 1.2 }}
							transition={{ duration: 0.45, ease: "easeOut" }}
							onAnimationComplete={() => {
								setFloatingPoints((currentPoints) =>
									currentPoints.filter(
										(currentPoint) => currentPoint.id !== point.id,
									),
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
