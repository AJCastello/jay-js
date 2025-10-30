export function Home() {
	return (
		<section className="flex flex-col justify-center items-center gap-6 p-8">
			<p className="text-center">
				Ideal para sites de conteúdo, blogs, documentação e landing pages que precisam de performance máxima e SEO otimizado.
			</p>
			<a href="/blog" className="px-4 py-2 bg-emerald-400 text-zinc-800 rounded hover:bg-emerald-400 cursor-pointer">
				Saiba mais
			</a>
		</section>
	)
}
