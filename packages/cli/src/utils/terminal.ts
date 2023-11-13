export class Face {
  private frames: string[] = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  private currentMessage: string = "";
  private currentFrame: number = 0;
  private progressInterval?: NodeJS.Timeout;

  startProgress(message?: string): void {
    //this.currentMessage = message;
    this.progressInterval = setInterval(() => {
      this.updateLine(`${this.frames[this.currentFrame]} ${this.currentMessage}`);
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
      clearInterval(this.progressInterval);
    }
  }

  setMessage(message: string): void {
    this.currentMessage = message;
  }

  write(message: string): void {
    if (this.progressInterval) {
      this.endProgress();
    }
    process.stdout.write(message);
  }
}
