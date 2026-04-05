import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/features/blog/lib/mdx-components";

export function MDX({ code }: { code: string }) {
	return (
		<div className="space-y-6">
			<MDXRemote
				source={code}
				components={mdxComponents}
				options={{
					mdxOptions: {
						remarkPlugins: [remarkGfm],
					},
				}}
			/>
		</div>
	);
}
