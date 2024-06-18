export type Record = {
    wip: number,
    cardCount: number,
    startTime?: Date,
    fastestLeadTime?: number
    finalLeadTime?: number
}

export type Process = {
    name: string,
    startTime?: Date,
    endTime?: Date,
}

export type Card = {
    processes: Process[]
}