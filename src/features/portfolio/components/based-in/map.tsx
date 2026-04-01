"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { PiClockLight } from "react-icons/pi";

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

		const backgroundColor = readCSSVar("--bg") || "#eff1f5";
		const primaryColor = readCSSVar("--primary") || "#fab387";
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
		<div className="h-full relative overflow-hidden">
			<div ref={mapRef} className="absolute inset-0" />

			<div
				ref={backgroundOverlayRef}
				className="absolute inset-0 pointer-events-none"
				style={{ mixBlendMode: "color", zIndex: 400 }}
			/>
			<div
				ref={primaryOverlayRef}
				className="absolute inset-0 pointer-events-none"
				style={{ mixBlendMode: "soft-light", zIndex: 401 }}
			/>

			<div className="absolute top-3 left-3 z-[1000] flex items-center gap-1.5 bg-surface-container-highest/90 backdrop-blur-sm border border-on-background px-2 py-1">
				<IoLocationSharp style={{ color: "var(--primary)" }} size={11} />
				<span className="font-label text-[10px] font-bold uppercase tracking-wider">
					Viseu, Portugal
				</span>
			</div>

			<div className="absolute bottom-3 left-3 right-3 z-[1000] flex items-end justify-between">
				<div className="bg-surface-container-highest/90 backdrop-blur-sm border border-on-background px-2 py-1">
					<span className="font-mono text-[10px] text-on-surface-variant">
						{LAT}°N · {Math.abs(LNG)}°W
					</span>
				</div>
				<div className="flex items-center gap-1.5 bg-surface-container-highest/90 backdrop-blur-sm border border-on-background px-2 py-1">
					<PiClockLight size={11} className="text-on-surface-variant" />
					<span className="font-mono text-[10px]">{time}</span>
				</div>
			</div>
		</div>
	);
}
