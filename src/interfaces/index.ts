export type IProcess = {
    name: string,
    isFinished: boolean,
    startTime?: Date,
    endTime?: Date,
    start(): void
}

export interface ICard {
    processes: IProcess[]
}

export interface IBucket {
    name: string
    cards: ICard[]
}

export interface IRound {
    wip: number;
    cardCount: number;
    startTime?: Date;
    fastestLeadTime?: number;
    finalLeadTime?: number;

    calculateLeadTime(buckets: IBucket[]): void
}