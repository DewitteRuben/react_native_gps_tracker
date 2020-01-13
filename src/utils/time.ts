import moment from "moment";

const interval = 1000;

export class PreciseTimer {
  public isActive: boolean;

  private initTime: number;

  private timer: number;

  public elapsedTime: number;

  private paused: boolean;

  constructor() {
    this.elapsedTime = 0;
    this.isActive = false;
  }

  private step(cb: (dt: number) => void) {
    return () => {
      if (this.isActive) {
        const timeDiff = Date.now() - this.initTime;
        this.elapsedTime = timeDiff;
        cb(timeDiff);
      }
    };
  }

  public start(cb: (dt: number) => void) {
    this.isActive = true;

    if (this.paused) {
      this.initTime = Date.now() - this.elapsedTime;
    } else {
      this.initTime = Date.now();
    }

    this.timer = setInterval(this.step(cb), interval);
  }

  public stop() {
    if (this.timer) {
      this.isActive = false;
      this.elapsedTime = 0;
      clearInterval(this.timer);
    }
  }

  public pause() {
    this.isActive = false;
    this.paused = true;
  }

  getElapsedTime() {
    return this.elapsedTime;
  }
}

const durationToMoment = (duration: number) => moment.duration(duration);
const momentToTime = (mm: moment.Duration) => [mm.hours(), mm.minutes(), mm.seconds()];
const formatTime = (time: number[]) => time.map(item => item.toString().padStart(2, "0")).join(":");
const durationToTime = (ms: number) => formatTime(momentToTime(durationToMoment(ms)));

const msPerMeterToUnitPerHour = (distance: number, duration: number, distanceUnit: string) =>
  (distance / duration) * (distanceUnit === "km" ? 3600 : 2236.93629);

export { durationToTime, msPerMeterToUnitPerHour };
