"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const LAT = 40.66101;
const LNG = -7.90971;

const readCSSVar = (variable: string): string =>
	getComputedStyle(document.documentElement).getPropertyValue(variable).trim();

const parseCSSColor = (color: string): [number, number, number] => {
	const canvas = document.createElement("canvas");
	canvas.width = 1;
	canvas.height = 1;

	const context = canvas.getContext("2d");

	if (!context) {
		return [0, 0, 0];
	}

	context.fillStyle = color;
	context.fillRect(0, 0, 1, 1);

	const { data } = context.getImageData(0, 0, 1, 1);
	return [data[0], data[1], data[2]];
};

const getLuminance = (r: number, g: number, b: number) =>
	(0.299 * r + 0.587 * g + 0.114 * b) / 255;

export function BasedInMap() {
	const mapRef = useRef<HTMLDivElement>(null);
	const backgroundOverlayRef = useRef<HTMLDivElement>(null);
	const primaryOverlayRef = useRef<HTMLDivElement>(null);
	const [time, setTime] = useState("");

	const updateOverlay = useCallback(() => {
		if (!backgroundOverlayRef.current || !primaryOverlayRef.current) {
			return;
		}

		const backgroundColor = readCSSVar("--bg") || "#000000";
		const primaryColor = readCSSVar("--primary") || "#a6e3a1";
		const [red, green, blue] = parseCSSColor(backgroundColor);
		const isDark = getLuminance(red, green, blue) < 0.5;

		const tilePane =
			mapRef.current?.querySelector<HTMLElement>(".leaflet-tile-pane");

		if (tilePane) {
			tilePane.style.filter = isDark
				? "grayscale(1) invert(1) brightness(0.78) contrast(0.88)"
				: "grayscale(1) brightness(0.96) contrast(0.95)";
		}

		backgroundOverlayRef.current.style.background = backgroundColor;
		backgroundOverlayRef.current.style.opacity = isDark ? "0.45" : "0.30";

		primaryOverlayRef.current.style.background = primaryColor;
		primaryOverlayRef.current.style.opacity = isDark ? "0.25" : "0.18";
	}, []);

	useEffect(() => {
		const updateTime = () => {
			setTime(
				new Date().toLocaleTimeString("pt-PT", {
					hour: "2-digit",
					minute: "2-digit",
					second: "2-digit",
					timeZone: "Europe/Lisbon",
				}),
			);
		};

		updateTime();

		const interval = setInterval(updateTime, 1000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const container = mapRef.current;

		if (!container) {
			return;
		}

		let observer: MutationObserver | null = null;
		let timeoutId: ReturnType<typeof setTimeout> | null = null;

		void import("leaflet").then((leaflet) => {
			if (
				(container as HTMLDivElement & { _leaflet_id?: number })._leaflet_id
			) {
				return;
			}

			const map = leaflet.map(container, {
				attributionControl: false,
				center: [LAT, LNG],
				dragging: true,
				scrollWheelZoom: true,
				zoom: 12,
				zoomControl: false,
			});

			leaflet
				.tileLayer(
					"https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
					{ maxZoom: 19 },
				)
				.addTo(map);

			map.on("tileload", updateOverlay);
			timeoutId = setTimeout(updateOverlay, 100);

			observer = new MutationObserver(updateOverlay);
			observer.observe(document.documentElement, {
				attributeFilter: ["class", "data-theme", "data-accent", "style"],
				attributes: true,
			});
		});

		return () => {
			observer?.disconnect();

			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		};
	}, [updateOverlay]);

	return (
		<div className="relative h-full flex-1 overflow-hidden z-0">
			<div ref={mapRef} className="absolute inset-0 z-0" />

			<div
				ref={backgroundOverlayRef}
				className="absolute inset-0 pointer-events-none"
				style={{ mixBlendMode: "color", zIndex: 0 }}
			/>
			<div
				ref={primaryOverlayRef}
				className="absolute inset-0 pointer-events-none"
				style={{ mixBlendMode: "soft-light", zIndex: 1 }}
			/>

			<div className="absolute left-3 top-3 z-10 flex items-center gap-1.5 border border-border bg-bg-panel/90 px-2 py-1 backdrop-blur-sm">
				<span className="text-primary">▣</span>
				<span className="text-[10px] uppercase tracking-[0.18em] text-fg">
					Viseu, Portugal
				</span>
			</div>

			<div className="absolute bottom-3 left-3 right-3 z-10 flex items-end justify-between gap-2">
				<div className="border border-border bg-bg-panel/90 px-2 py-1 backdrop-blur-sm">
					<span className="font-mono text-[10px] text-fg-dim">
						{LAT}°N · {Math.abs(LNG)}°W
					</span>
				</div>
				<div className="flex items-center gap-1.5 border border-border bg-bg-panel/90 px-2 py-1 backdrop-blur-sm">
					<span className="text-fg-dim">◉</span>
					<span className="font-mono text-[10px] text-fg">{time}</span>
				</div>
			</div>
		</div>
	);
}
