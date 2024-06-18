import { MIN_TIME, MAX_TIME, ProcessStatus } from './constants';
import Process from './Process';

export default class Card {
  time: number;
  private _processes: Process[] = [];
  constructor() {
    this.time = parseFloat((Math.random() * (MAX_TIME - MIN_TIME) + MIN_TIME).toFixed(1));;
  }

  async start(processName: string) {
    if (this._processes.some((process) => [ProcessStatus.IN_PROGRESS, ProcessStatus.NOT_STARTED].includes(process.status))) {
      throw new Error('Some process is already running. Please wait for it to complete.');
    }
    const process = new Process(processName);
    this._processes.push(process);
    await process.start();
  }

  isProcessing() {
    return this._processes.some((process) => process.status === ProcessStatus.IN_PROGRESS);
  }

}