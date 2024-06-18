import { describe, it, expect, vi } from 'vitest';
import { useRoundRecord } from './useRoundRecord';

describe("useRoundRecord", ()=> {

    it("should init a record", ()=> {
        const {records} = useRoundRecord()
        expect(records.value.length).toBe(0)
    })  

    it("should add a record", ()=> {
        const {records, addRecord} = useRoundRecord()

        const mockDate = new Date(2024, 0, 1);
        const dateSpy = vi
            .spyOn(globalThis, 'Date')
            .mockImplementationOnce(() => mockDate as unknown as Date);

        addRecord({
            cardCount: 12,
            wip: 3
        })

        dateSpy.mockRestore();

        expect(records.value[0].wip).toBe(3)
        expect(records.value[0].cardCount).toBe(12)
        expect(records.value[0].startTime?.getFullYear()).toBe(2024)
        expect(records.value[0].startTime?.getMonth()).toBe(0)
    })

    it("should calculate delivery time for cards", ()=> {
        const {records, addRecord, calculateLeadTime} = useRoundRecord()

        const mockDate = new Date(2024, 0, 1);
        const dateSpy = vi
            .spyOn(globalThis, 'Date')
            .mockImplementationOnce(() => mockDate as unknown as Date);

        addRecord({
            cardCount: 12,
            wip: 3
        })

        dateSpy.mockRestore();

        calculateLeadTime([{
            processes:[{
                name: "BA",
                endTime: new Date(2024, 0, 1, 0, 1, 0) // 2024-01-01 00:01:00 
            }, {
                name: "DEV",
                endTime: new Date(2024, 0, 1, 0, 2, 0) // 2024-01-01 00:02:00 
            }, {
                name: "Delivery",
                endTime: new Date(2024, 0, 1, 0, 3, 0) // 2024-01-01 00:03:00 
            }]
        }, {
            processes:[{
                name: "BA",
                endTime: new Date(2024, 0, 1, 0, 4, 0) // 2024-01-01 00:01:00 
            }, {
                name: "DEV",
                endTime: new Date(2024, 0, 1, 0, 5, 0) // 2024-01-01 00:02:00 
            }, {
                name: "Delivery",
                endTime: new Date(2024, 0, 1, 0, 6, 0) // 2024-01-01 00:03:00 
            }]
        }])

        expect(records.value[0].fastestLeadTime).toBe(180)
        expect(records.value[0].finalLeadTime).toBe(360)
    })
})