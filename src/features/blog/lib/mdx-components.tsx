import type { MDXRemoteProps } from "next-mdx-remote/rsc";

export const mdxComponents: MDXRemoteProps["components"] = {
	h1: (props: React.ComponentProps<"h1">) => (
		<h1
			className="font-headline text-4xl font-black leading-tight tracking-tight"
			{...props}
		/>
	),
	h2: (props: React.ComponentProps<"h2">) => (
		<h2
			className="mt-12 font-headline text-3xl font-bold leading-tight tracking-tight"
			{...props}
		/>
	),
	h3: (props: React.ComponentProps<"h3">) => (
		<h3 className="mt-10 font-headline text-2xl font-bold leading-tight" {...props} />
	),
	p: (props: React.ComponentProps<"p">) => (
		<p className="text-[15px] leading-8 text-on-surface-variant" {...props} />
	),
	strong: (props: React.ComponentProps<"strong">) => (
		<strong className="font-semibold text-primary" {...props} />
	),
	em: (props: React.ComponentProps<"em">) => (
		<em className="italic text-on-surface" {...props} />
	),
	ul: (props: React.ComponentProps<"ul">) => (
		<ul
			className="list-disc space-y-3 pl-6 text-[15px] leading-8 text-on-surface-variant"
			{...props}
		/>
	),
	ol: (props: React.ComponentProps<"ol">) => (
		<ol
			className="list-decimal space-y-3 pl-6 text-[15px] leading-8 text-on-surface-variant"
			{...props}
		/>
	),
	li: (props: React.ComponentProps<"li">) => <li {...props} />,
	blockquote: (props: React.ComponentProps<"blockquote">) => (
		<blockquote
			className="border-l-2 border-primary pl-4 italic text-on-surface"
			{...props}
		/>
	),
	a: (props: React.ComponentProps<"a">) => (
		<a className="text-primary underline underline-offset-4" {...props} />
	),
	hr: (props: React.ComponentProps<"hr">) => (
		<hr className="border-on-surface/15" {...props} />
	),
	code: (props: React.ComponentProps<"code">) => (
		<code
			className="rounded bg-surface-container px-1.5 py-0.5 font-mono text-sm"
			{...props}
		/>
	),
	pre: (props: React.ComponentProps<"pre">) => (
		<pre
			className="overflow-x-auto rounded border border-on-surface/15 bg-surface-container-lowest p-4 font-mono text-sm leading-7 text-on-surface"
			{...props}
		/>
	),
};
