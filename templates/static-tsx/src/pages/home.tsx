export function Home() {
	return (
		<section className="flex flex-col justify-center items-center gap-6 p-8">
			<h1 className="text-4xl font-bold text-primary">
				Welcome to Jay JS
			</h1>
			<p className="text-lg text-center max-w-2xl">
				Este é um site estático gerado com Jay JS. Todo o conteúdo é pré-renderizado em HTML puro, sem JavaScript no cliente.
			</p>
			<p className="text-center text-gray-600">
				Ideal para sites de conteúdo, blogs, documentação e landing pages que precisam de performance máxima e SEO otimizado.
			</p>
			<a href="/about" className="px-4 py-2 bg-emerald-400 text-zinc-800 rounded hover:bg-emerald-400 cursor-pointer">
				Saiba mais
			</a>
		</section>
	)
}
