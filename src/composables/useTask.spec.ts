import { describe, it, expect } from 'vitest';
import { useTask } from './useTask';
import { mount } from '@vue/test-utils';

const TestComponent = {
    template: `
    <div>
      <div
        v-for="(item, index) in processes"
        :key="index"
        class="process"
        :ref="(el) => createProcessRef(el, index)"
      >
        {{ item.duration }}d
      </div>
    </div>
    `,
    setup() {
        const { startWork, processes, createProcessRef } = useTask()
        return { startWork, processes, createProcessRef }
    }
}

describe('useTask', () => {
    it("should add process after startwork", async() => {
        const wrapper = mount(TestComponent)
        const { processes, startWork } = wrapper.vm;

        await startWork({
            type: "BA",
            isFinished: false,
            bgColor: "#0CF"
        })

        await startWork({
            type: "DEV",
            isFinished: false,
            bgColor: "#0CF"
        })
        console.log(wrapper.html())
        expect(processes.length).toBe(2)
    })

})