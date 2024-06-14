import chalkTemplate from "chalk-template";

export class Face {
  private frames: string[] = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  private currentMessage: string = "";
  private currentFrame: number = 0;
  private progressInterval?: NodeJS.Timeout;

  startProgress(message?: string): void {
    this.currentMessage = message || "";
    this.progressInterval = setInterval(() => {
      this.updateLine(faceChalk`{yellow ${this.frames[this.currentFrame]}} ${this.currentMessage}`);
      this.currentFrame = (this.currentFrame + 1) % this.frames.length;
    }, 80);
  }

  private updateLine(message: string): void {
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write(message);
  }

  endProgress(): void {
    if (this.progressInterval) {
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
      clearInterval(this.progressInterval);
    }
  }

  setMessage(message: string): void {
    this.currentMessage = faceChalk`${message}`;
  }

  write(message: string): void {
    if (this.progressInterval) {
      this.endProgress();
    }
    process.stdout.write(message);
  }
}

export const face = new Face();

export function log(strings: TemplateStringsArray, ...values: any[]) {
  console.log(chalkTemplate(strings, ...values));
};

export function faceChalk(strings: TemplateStringsArray, ...values: any[]) {
  return chalkTemplate(strings, ...values);
};
