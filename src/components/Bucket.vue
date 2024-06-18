<template>
  <div ref="bucketRef" class="bucket">
    <Task
      v-for="(_, n) in itemCount"
      :key="n"
      :ref="createTaskRef(n)"
    />
  </div>
</template>
  <script lang="ts">
import "animate.css";
import Task from "./Task.vue";
import { nextTick, onMounted, ref, computed, watch } from "vue";
import { useStore } from 'vuex'
import { key } from '../store'

import { delayInSecond } from "../utils";
import { getPositionByKey, stages, stageDefination, tasksInBucket } from '../utils/settings'
export default {
  components: {
    Task,
  },
  props: {
    itemKey: {
      type: Number,
      required: true
    }
  },
  setup(props: {itemKey: number}) {
    const itemCount = ref(tasksInBucket);
    const currentStage = ref(0);
    const working = ref(false);
    const itemRefs = ref<Array<InstanceType<typeof Task>>>([]);
    const bucketRef = ref<HTMLElement | null>(null);
    let bgColor = "#000000";
    const store = useStore(key)

    const stageStates = computed(() => store.state.stageStates);

    watch(store.state.stageStates, (value)=> {
      console.log("key: ", props.itemKey, currentStage.value + 1)
      console.log(value[currentStage.value + 1]?.count)
      startWork();
    })

    const createTaskRef = (index: number) => {
      return (el: InstanceType<typeof Task>) => {
        if (el) {
          itemRefs.value[index]= el;
        }
      };
    };

    const startWork = async () => {
      if(currentStage.value >= stages.length - 1) {
        // 全部动画都结束了
        return
      }
      
      const itemCountOfNextStage = stageStates.value[currentStage.value + 1].count
      if(itemCountOfNextStage) {
        return
      }

      if(working.value) {
        return;
      }
      working.value = true;
      store.commit('moveToNextColumn', ++currentStage.value)
      await moveToNext()
      store.commit('leaveCurrentColumn', currentStage.value - 1)
      await startTasksWork(stages[currentStage.value])
      working.value = false;
      await startWork()
    };

    onMounted(async ()=> {
      await nextTick()
      await moveToNext()
    })

    

    const  moveToNext = async ()=> {
      if (!bucketRef.value) {
        return;
      }

      const stageName = stages[currentStage.value]

      const bounding = getPositionByKey(stageName)
      const left = bounding.left + (bounding.width - bucketRef.value.getBoundingClientRect().width) / 2;
      const top = bounding.top + 10 + props.itemKey * bucketRef.value.getBoundingClientRect().height;

      bucketRef.value.classList.add('annimation')
      bucketRef.value.style.left = `${left}px`;
      bucketRef.value.style.top = `${top}px`;
      
      await delayInSecond(0.8)
    }

    const startTasksWork = async (columnName: string) => {
      bgColor = stageDefination[columnName].color
      const work = {
        type: "BA",
        isFinished: false,
        bgColor
      };

      for (let i = 0; i < itemRefs.value.length; i++) {
        await itemRefs.value[i].startWork(Object.assign({}, work));
      }
    };

    return { createTaskRef, startWork, bucketRef, itemCount };
  },
};
</script>
  <style scoped>
.bucket {
  width: 120px;
  border: 2px solid #a1a1a1;
  position: absolute;
  top: 30px;
  left: 0;
  
}

.annimation {
  transition: left 0.8s ease, top 0.8s ease;
}
</style>