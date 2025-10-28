declare global {
	interface Window {
		__jayjs_debug__?: (element: any, metadata: any) => void;
	}
}

export {};
