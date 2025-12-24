import { subscriberManager } from "../core/subscriber.js";
import { Effect } from "./helpers.js";

type TKey = string | number | symbol;
type TKeySelector<T> = keyof T | ((item: T, index: number) => TKey);

const EACH_NODE_MARKER = Symbol("jayjs-each-node");

function scheduleMicrotask(fn: () => void) {
	if (typeof queueMicrotask === "function") {
		queueMicrotask(fn);
		return;
	}
	Promise.resolve().then(fn);
}

function untrack<T>(fn: () => T): T {
	const current = subscriberManager.getSubscriber();
	subscriberManager.clearSubscriber();
	try {
		return fn();
	} finally {
		subscriberManager.setSubscriber(current);
	}
}

function isNode(value: unknown): value is Node {
	return typeof value === "object" && value !== null && value instanceof Node;
}

function normalizeChildrenToNodes(value: any): Node[] {
	if (value === null || value === undefined || typeof value === "boolean") {
		return [document.createTextNode("")];
	}

	if (Array.isArray(value)) {
		const out: Node[] = [];
		for (const item of value) {
			out.push(...normalizeChildrenToNodes(item));
		}
		return out.length ? out : [document.createTextNode("")];
	}

	if (value instanceof Promise) {
		const slot = document.createElement("jayjs-lazy-slot");
		value
			.then((resolved) => {
				const nodes = normalizeChildrenToNodes(resolved);
				slot.replaceWith(...nodes);
			})
			.catch((error) => {
				console.error("JayJS: Error resolving each() Promise child:", error);
				slot.replaceWith(document.createTextNode(""));
			});
		return [slot];
	}

	if (typeof value === "string" || typeof value === "number") {
		return [document.createTextNode(String(value))];
	}

	if (value instanceof DocumentFragment) {
		const nodes = Array.from(value.childNodes);
		return nodes.length ? nodes : [document.createTextNode("")];
	}

	if (isNode(value)) {
		return [value];
	}

	return [document.createTextNode(String(value))];
}

function resolveKey<T extends object>(item: T, index: number, key: TKeySelector<T>): TKey {
	if (typeof key === "function") {
		return key(item, index);
	}
	return (item as any)[key as any] as TKey;
}

export function each<T extends object>(
	getter: () => Array<T> | ReadonlyArray<T> | null | undefined,
	key: TKeySelector<T>,
	render: (item: T, index: number) => any,
): DocumentFragment {
	const start = document.createComment("jayjs-each-start");
	const end = document.createComment("jayjs-each-end");

	let mountRetryScheduled = false;

	const keyToIndex = new Map<TKey, number>();

	type Entry = {
		key: TKey;
		item: T;
		nodes: Node[];
	};

	const cache = new Map<TKey, Entry>();

	function nextManagedSibling(after: ChildNode): ChildNode {
		let n = after.nextSibling;
		while (n && n !== end) {
			if ((n as any)[EACH_NODE_MARKER] === start) {
				return n as ChildNode;
			}
			n = n.nextSibling;
		}
		return end;
	}

	function insertAfter(cursor: ChildNode, nodes: Node[]) {
		const parent = cursor.parentNode;
		if (!parent) return;

		const reference = nextManagedSibling(cursor);
		const fragment = document.createDocumentFragment();
		for (const node of nodes) {
			fragment.appendChild(node);
		}
		parent.insertBefore(fragment, reference);
	}

	function moveAfter(cursor: ChildNode, entry: Entry) {
		const first = entry.nodes[0] as ChildNode | undefined;
		if (!first) return;

		const reference = nextManagedSibling(cursor);
		if (reference === first) {
			return;
		}

		insertAfter(cursor, entry.nodes);
	}

	function markNodes(nodes: Node[]) {
		for (const node of nodes) {
			(node as any)[EACH_NODE_MARKER] = start;
		}
	}

	function createStableListItemProxy(resolved: TKey): T {
		return new Proxy(Object.create(null), {
			get(_target, prop) {
				const idx = keyToIndex.get(resolved);
				if (idx === undefined) return undefined;
				const list = getter() as any;
				if (!list) return undefined;
				return list[idx]?.[prop as any];
			},
			set(_target, prop, value) {
				const idx = keyToIndex.get(resolved);
				if (idx === undefined) return true;
				const list = getter() as any;
				if (!list) return true;
				list[idx][prop as any] = value;
				return true;
			},
			has(_target, prop) {
				const idx = keyToIndex.get(resolved);
				if (idx === undefined) return false;
				const list = getter() as any;
				return Boolean(list && prop in (list[idx] ?? {}));
			},
			ownKeys() {
				const idx = keyToIndex.get(resolved);
				if (idx === undefined) return [];
				const list = getter() as any;
				return Reflect.ownKeys(list?.[idx] ?? {});
			},
			getOwnPropertyDescriptor(_target, prop) {
				const idx = keyToIndex.get(resolved);
				if (idx === undefined) return undefined;
				const list = getter() as any;
				const obj = list?.[idx];
				const desc = obj ? Object.getOwnPropertyDescriptor(obj, prop) : undefined;
				if (desc) return desc;
				return {
					configurable: true,
					enumerable: true,
					writable: true,
					value: obj?.[prop as any],
				};
			},
		}) as T;
	}

	function createEntry(index: number, resolved: TKey): Entry {
		const stableItem = createStableListItemProxy(resolved);
		const rendered = render(stableItem, index);
		const nodes = normalizeChildrenToNodes(rendered);
		markNodes(nodes);
		return {
			key: resolved,
			item: stableItem,
			nodes,
		};
	}

	function removeEntry(entry: Entry) {
		for (const node of entry.nodes) {
			const anyNode = node as any;
			if (typeof anyNode.remove === "function") {
				anyNode.remove();
				continue;
			}
			if (node.parentNode) {
				node.parentNode.removeChild(node);
			}
		}
	}

	function update() {
		// First run can happen before the fragment is mounted;
		// in that case, we can't insert nodes yet.
		if (!start.parentNode) {
			if (!mountRetryScheduled) {
				mountRetryScheduled = true;
				scheduleMicrotask(() => {
					mountRetryScheduled = false;
					Effect(update);
				});
			}
			return;
		}

		const listProxy = getter() ?? [];
		const length = (listProxy as any).length ?? 0;
		void (listProxy as any).length; // subscribe only to array length changes

		keyToIndex.clear();
		untrack(() => {
			for (let i = 0; i < length; i++) {
				const item = (listProxy as any)[i] as T;
				const resolved = resolveKey(item, i, key);
				keyToIndex.set(resolved, i);
			}
		});

		const seen = new Set<TKey>();
		const keep = new Set<TKey>();

		let cursor: ChildNode = start;

		for (let i = 0; i < length; i++) {
			const rawItem = untrack(() => (listProxy as any)[i] as T);
			const resolved = untrack(() => resolveKey(rawItem, i, key));

			if (resolved === null || resolved === undefined) {
				console.warn("JayJS: each() received an item with null/undefined key.");
				continue;
			}

			if (seen.has(resolved)) {
				console.warn(`JayJS: each() received a duplicate key: ${String(resolved)}`);
			}
			seen.add(resolved);
			keep.add(resolved);

			let entry = cache.get(resolved);
			if (!entry) {
				entry = createEntry(i, resolved);
				cache.set(resolved, entry);
				insertAfter(cursor, entry.nodes);
			} else {
				moveAfter(cursor, entry);
			}

			cursor = entry.nodes[entry.nodes.length - 1] as ChildNode;
		}

		for (const [cachedKey, entry] of cache) {
			if (!keep.has(cachedKey)) {
				removeEntry(entry);
				cache.delete(cachedKey);
			}
		}
	}

	Effect(update);

	const fragment = document.createDocumentFragment();
	fragment.appendChild(start);
	fragment.appendChild(end);
	return fragment;
}
