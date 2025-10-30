import { Button, Section, useRef } from "@jay-js/elements";
import { Effect, render, State } from "@jay-js/system";

export function Home() {
	return Section({
		tag: "section",
		className: "grid grid-cols-3 gap-4 justify-center items-center",
		children: [
			VanillaCounter(),
			RefCounter(),
			InstanceCounter(),
			StateCounterWithSubscription(),
			StateCounterWithEffect(),
			CounterWithLifeCycleControl()
		]
	})
}

/**
 * Abordagem Vanilla - JavaScript puro sem reatividade
 * Manipula o DOM diretamente através do event.target.
 */
function VanillaCounter() {
	let count = 0;

	function handleCount(event: MouseEvent) {
		count++;
		const target = event.target as HTMLButtonElement;
		target.innerHTML = `Count is ${count}`;
	}

	return Button({
		className: "px-4 py-2 bg-emerald-400 text-zinc-800 rounded hover:bg-emerald-400 cursor-pointer",
		children: `Count is ${count}`,
		onclick: handleCount
	})
}

/**
 * Abordagem com useRef - Mantém referência estável ao elemento
 * Útil quando você precisa acessar o elemento fora do contexto do evento.
 * useRef garante acesso seguro ao elemento DOM após a montagem.
 */
function RefCounter() {
	const btnRef = useRef<HTMLButtonElement>();
	let count = 0;

	function handleCount() {
		count++;
		if (btnRef.current) {
			btnRef.current.innerHTML = `Count is ${count}`;
		}
	}

	return Button({
		ref: btnRef,
		className: "px-4 py-2 bg-emerald-400 text-zinc-800 rounded hover:bg-emerald-400 cursor-pointer",
		children: `Count is ${count}`,
		onclick: handleCount
	})
}

/**
 * Abordagem com Instância - Armazena o elemento em uma variável
 * Muito elegante! Você cria o elemento antes de retornar e pode acessá-lo diretamente.
 * Elimina a necessidade de refs ou queries, mantendo o código limpo e direto.
 */
function InstanceCounter() {
	let count = 0;

	function handleCount() {
		count++;
		CounterButton.innerHTML = `Count is ${count}`;
	}

	const CounterButton = Button({
		className: "px-4 py-2 bg-emerald-400 text-zinc-800 rounded hover:bg-emerald-400 cursor-pointer",
		children: `Count is ${count}`,
		onclick: handleCount
	})

	return CounterButton;
}

/**
 * Abordagem com State e Subscription - Gerenciamento de estado reativo
 * Separa a lógica de estado da UI. O State pode ser observado e atualiza a UI quando muda.
 * FLEXÍVEL: você pode usar ID (como aqui), instância, useRef ou querySelector para atualizar o elemento.
 * Combine com outras abordagens conforme sua necessidade!
 */
function StateCounterWithSubscription() {
	const counter = State(0);
	counter.sub("on-change", (newValue) => {
		render("#state-counter", `Count is ${newValue}`);
	});

	return Button({
		id: "state-counter",
		className: "px-4 py-2 bg-emerald-400 text-zinc-800 rounded hover:bg-emerald-400 cursor-pointer",
		children: `Count is ${counter.value}`,
		onclick: () => counter.value++,
	})
}

/**
 * Abordagem com State e Effect - Reatividade automática
 * O Effect detecta automaticamente dependências (counter.value) e re-executa quando mudam.
 * Sintaxe declarativa: você descreve o efeito colateral e o framework gerencia as atualizações.
 * Também pode combinar com instância, useRef ou qualquer forma de acessar elementos!
 */
function StateCounterWithEffect() {
	const counter = State(0);

	Effect(() => {
		render("#counter-effect", `Count is ${counter.value}`);
	});

	return Button({
		id: "counter-effect",
		className: "px-4 py-2 bg-emerald-400 text-zinc-800 rounded hover:bg-emerald-400 cursor-pointer",
		children: `Count is ${counter.value}`,
		onclick: () => counter.value++,
	})
}

/**
 * Abordagem com State e Lifecycle Control - Controle total do ciclo de vida
 * RECOMENDADO para produção! Usa onmount/onunmount para gerenciar subscriptions corretamente.
 * O elemento é passado diretamente no callback, eliminando necessidade de IDs ou refs.
 * Garante limpeza de memória ao desmontar (unsub), prevenindo memory leaks.
 * Combine com qualquer técnica: o elemento vem como parâmetro no onmount!
 */
function CounterWithLifeCycleControl() {
	const counter = State(0);

	function onChangeCounter(el: HTMLElement) {
		counter.sub("on-change", (newValue) => {
			el.innerText = `Count is ${newValue}`;
		}, true);
	}

	function onUnmountCounter() {
		console.log("Desmontando e limpando subscription...");
		counter.unsub("on-change");
	}

	return Button({
		onmount: onChangeCounter,
		onunmount: onUnmountCounter,
		className: "px-4 py-2 bg-emerald-400 text-zinc-800 rounded hover:bg-emerald-400 cursor-pointer",
		onclick: () => counter.value++,
	})
}
