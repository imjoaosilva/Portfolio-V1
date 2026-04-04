import type { BlogLocale } from "@/features/blog/types/post";

export function getLocaleLabel(locale: BlogLocale) {
	return locale === "pt" ? "Português" : "English";
}

export function getBlogCopy(locale: BlogLocale) {
	if (locale === "pt") {
		return {
			blogTitle: "Blog",
			blogDescription:
				"Artigos de João Silva sobre desenvolvimento, design e ideias.",
			notesLabel: "Notas",
			allPosts: "Todos os posts",
			filteredPosts: "Posts filtrados",
			noPostsTitle: "Nenhum post encontrado",
			noPostsDescription:
				"Tente outra categoria ou um termo de busca mais amplo.",
			backToBlog: "Voltar para o blog",
			prev: "Anterior",
			next: "Próximo",
			previousPost: "← Post anterior",
			nextPost: "Próximo post →",
			relatedPosts: "Posts relacionados",
			postDetails: "Detalhes do post",
			published: "Publicado",
			readTime: "Tempo de leitura",
			topic: "Tema",
			liveFilter: "Filtro ao vivo",
			updating: "Atualizando",
			ready: "Pronto",
			searchPlaceholder: "Busque por título, tag ou categoria",
		};
	}

	return {
		blogTitle: "Blog",
		blogDescription:
			"Articles by João Silva on development, design, and ideas.",
		notesLabel: "Notes",
		allPosts: "All Posts",
		filteredPosts: "Filtered Posts",
		noPostsTitle: "No posts found",
		noPostsDescription: "Try another category or a broader search term.",
		backToBlog: "Back to blog",
		prev: "Prev",
		next: "Next",
		previousPost: "← Previous post",
		nextPost: "Next post →",
		relatedPosts: "Related posts",
		postDetails: "Post details",
		published: "Published",
		readTime: "Read time",
		topic: "Topic",
		liveFilter: "Live filter",
		updating: "Updating",
		ready: "Ready",
		searchPlaceholder: "Search by title, tag or category",
	};
}
