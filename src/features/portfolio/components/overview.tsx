import { USER_DATA } from "../data/user";

export const Overview = () => {
	return (
		<div className="flex-1 ">
			<h1 className="text-7xl font-headline font-bold leading-tight tracking-tighter md:text-8xl">
				Hey! I{"'"}m <span className="text-primary">João Silva</span>
			</h1>
			<ul className="font-label text-lg space-y-3 mt-7">
				{USER_DATA.points.map((point, index) => (
					<li className="flex items-start gap-3" key={point.text}>
						<span className="text-primary mt-1">
							{(index + 1).toLocaleString("en-US", {
								minimumIntegerDigits: 2,
								useGrouping: false,
							})}
						</span>
						<span>
							{point.text} at{" "}
							<a
								className="border-b-2 border-primary-container text-primary hover:bg-primary-container/10 underline"
								href="https://youtube.com"
							>
								@{point.company.name}
							</a>
							.
						</span>
					</li>
				))}
			</ul>
		</div>
	);
};
