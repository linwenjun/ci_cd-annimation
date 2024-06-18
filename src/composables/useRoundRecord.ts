import { ref, Ref } from "vue"

import { Record, Card } from '../types'

export const useRoundRecord = ()=> {
    const records: Ref<Array<Record>> = ref([])

    const addRecord = (record: Record)=> {
        record.startTime = new Date()
        records.value.push(record)
    }

    const calculateLeadTime = (cards: Card[])=> {
        const curIdx = records.value.length - 1
        const record = records.value[curIdx]
        if(!record) { return }
        if(!cards.length) {
            return
        }
        const fastestCard = cards[0]
        const fastestFinishedProcess = fastestCard.processes[fastestCard.processes.length - 1]
        const fastestTimeDifference = fastestFinishedProcess.endTime!.getTime() - record.startTime!.getTime()

        const slowestCard = cards[cards.length - 1]
        const slowestFinishedProcess = slowestCard.processes[slowestCard.processes.length - 1]
        const slowestTimeDifference = slowestFinishedProcess.endTime!.getTime() - record.startTime!.getTime()

        // [1].endTime?.getTime() - record.startTime?.getTime()
        records.value[curIdx].fastestLeadTime = Math.round(fastestTimeDifference / 1000)
        records.value[curIdx].finalLeadTime = Math.round(slowestTimeDifference / 1000)
    }

    return {
        records,
        addRecord,
        calculateLeadTime
    }
}