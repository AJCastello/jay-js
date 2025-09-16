/**
 * Enhanced communication bridge between browser and editor
 * Handles different editor protocols and error recovery
 */

export interface EditorOpenRequest {
  file: string;
  line: number;
  column: number;
  editor?: string;
}

export interface EditorOpenResponse {
  success: boolean;
  error?: string;
}

/**
 * Client-side bridge for communicating with the Vite dev server
 */
export class InspectorBridge {
  private static instance: InspectorBridge;
  
  static getInstance(): InspectorBridge {
    if (!InspectorBridge.instance) {
      InspectorBridge.instance = new InspectorBridge();
    }
    return InspectorBridge.instance;
  }
  
  /**
   * Send request to open file in editor
   */
  async openInEditor(request: EditorOpenRequest): Promise<EditorOpenResponse> {
    try {
      const response = await fetch('/__jayjs-inspector/open-in-editor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
  
  /**
   * Test if the inspector bridge is available
   */
  async isAvailable(): Promise<boolean> {
    try {
      const response = await fetch('/__jayjs-inspector/health', {
        method: 'GET',
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}

/**
 * Server-side utilities for handling editor integration
 */
export class EditorIntegration {
  private static supportedEditors = {
    'code': {
      command: 'code',
      args: (file: string, line: number, column: number) => ['--goto', `${file}:${line}:${column}`],
    },
    'vscode': {
      command: 'code',
      args: (file: string, line: number, column: number) => ['--goto', `${file}:${line}:${column}`],
    },
    'cursor': {
      command: 'cursor',
      args: (file: string, line: number, column: number) => ['--goto', `${file}:${line}:${column}`],
    },
    'webstorm': {
      command: 'webstorm',
      args: (file: string, line: number) => ['--line', line.toString(), file],
    },
    'atom': {
      command: 'atom',
      args: (file: string, line: number, column: number) => [`${file}:${line}:${column}`],
    },
  };
  
  /**
   * Open file in the specified editor
   */
  static async openFile(
    file: string,
    line: number,
    column: number,
    editor: string = 'code'
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const editorConfig = this.supportedEditors[editor as keyof typeof this.supportedEditors];
      
      if (!editorConfig) {
        return { success: false, error: `Unsupported editor: ${editor}` };
      }
      
      const { spawn } = await import('child_process');
      const args = editorConfig.args(file, line, column);
      
      return new Promise((resolve) => {
        const child = spawn(editorConfig.command, args, {
          detached: true,
          stdio: 'ignore',
        });
        
        child.unref();
        
        child.on('error', (error) => {
          resolve({ success: false, error: error.message });
        });
        
        // If no error occurs within 1 second, assume success
        setTimeout(() => {
          resolve({ success: true });
        }, 1000);
      });
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
  
  /**
   * Detect available editors on the system
   */
  static async detectAvailableEditors(): Promise<string[]> {
    const { execSync } = await import('child_process');
    const available: string[] = [];
    
    for (const [name, config] of Object.entries(this.supportedEditors)) {
      try {
        execSync(`which ${config.command}`, { stdio: 'ignore' });
        available.push(name);
      } catch {
        // Editor not available
      }
    }
    
    return available;
  }
}