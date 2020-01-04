export default class PreciseElapsedTime {
  private initTime: number;

  constructor() {
    this.initTime = 0;
  }

  public start() {
    this.initTime = Date.now();
  }

  public stop() {
    this.initTime = 0;
  }

  public isActive() {
    return this.initTime > 0;
  }

  public getElapsedTime() {
    if (!this.isActive()) {
      throw new Error("Timer must be active before getting the elapsed time.");
    }

    const curTime = Date.now();
    return (curTime - this.initTime);
  }
}
