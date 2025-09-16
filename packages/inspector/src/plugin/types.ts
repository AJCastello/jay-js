export interface JayJsInspectorOptions {
  /** Enable/disable the inspector (default: NODE_ENV === 'development') */
  enabled?: boolean;

  /** Editor to open files in (default: 'code') */
  editor?: 'vscode' | 'code' | 'vscode-insiders' | 'cursor' | 'webstorm' | 'atom';

  /** Custom overlay styles */
  overlayStyles?: {
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: string;
    borderStyle?: string;
    opacity?: number;
  };

  /** Include/exclude patterns for files to instrument */
  include?: string[];
  exclude?: string[];

  /** Custom key combination to enable inspector (default: 'shift+click') */
  activationKey?: 'click' | 'shift+click' | 'ctrl+click' | 'alt+click';
}

export interface ComponentMetadata {
	/** Component name (e.g., 'Box', 'Button') */
	component: string;

	/** File path where component is used */
	file: string;

	/** Line number in the file */
	line: number;

	/** Column number in the file */
	column: number;

	/** Props passed to the component */
	props?: Record<string, any>;
}

export interface InstrumentedCallExpression {
	/** Original component call */
	originalCall: string;

	/** Metadata to inject */
	metadata: ComponentMetadata;

	/** Start position in source */
	start: number;

	/** End position in source */
	end: number;
}
