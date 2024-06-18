import { MAX_TIME, MIN_TIME, ProcessStatus } from "./constants";

export default class Process {
    name: string;
    time: number;
    private _status: ProcessStatus = ProcessStatus.NOT_STARTED;
    private resolveFunction: (() => void) | undefined;
    constructor(name: string) {
        this.name = name;
        this.time = parseFloat((Math.random() * (MAX_TIME - MIN_TIME) + MIN_TIME).toFixed(1));
    }

    start(): Promise<void>{
        this._status = ProcessStatus.IN_PROGRESS;
        return new Promise<void>((resolve) => {
            this.resolveFunction = resolve;
        });
    }

    complete() {
        this._status = ProcessStatus.COMPLETED;
        this.resolveFunction && this.resolveFunction();
    }

    get status() {
        return this._status;
    }
}