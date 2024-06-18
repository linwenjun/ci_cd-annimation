import { Ref, ref, nextTick } from "vue"
import { delayInSecond } from "../utils";

type WorkType = {
    type: string;
    isFinished: boolean;
    bgColor: string;
    duration?: number;
};

export const useTask = () => {
    const itemRefs: Ref<Array<HTMLElement>> = ref([]);
    const processes: Ref<WorkType[]> = ref([]);

    const startWork = async (work: WorkType) => {
        work.duration = parseFloat((Math.random() * (1.5 - 0.5) + 0.5).toFixed(1));
        processes.value.push(work);
        await nextTick();
        await playAnimation();
    };

    const playAnimation = async () => {
        const currentWorkIndex = processes.value.length - 1;
        const currentProcessRef = itemRefs.value[currentWorkIndex];
        if (!currentProcessRef) {
            return;
        }
        const process = processes.value[currentWorkIndex]

        currentProcessRef.classList.add("animated-element");
        currentProcessRef.style.backgroundColor = process.bgColor;
        currentProcessRef.style.animationDuration = `${process.duration}s`;

        await delayInSecond(process.duration!);
    };

    const createProcessRef = (el: HTMLElement | null, key: number) => {
        if (el) {
            itemRefs.value[key] = el;
        }
    };

    return {
        startWork,
        processes,
        createProcessRef,
    };
}
