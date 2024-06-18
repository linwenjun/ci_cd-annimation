

<template>
  <div>
    <div ref="stageRef" class="stage">
      <Column
        v-for="(column, index) in stages"
        :key="column"
        :title="column"
        :ref="(el) => createColumnRefs(el, index)"
      />
      <Bucket
        v-for="(_, n) in bucketCount"
        :key="n"
        :ref="
          (el) => {
            buildBucketRef(el, n);
          }
        "
        :item-key="n"
      />
    </div>
    <Button class="button" @click="handleClickEvent">Start</Button>
    <RoundRecord />
  </div>
</template>
<script lang="ts">
import Bucket from "./Bucket.vue";
import Column from "./Column.vue";
import RoundRecord from "./RoundRecord.vue";
import { onMounted, ref, Ref } from "vue";
import { updatePosition, stages, tasksInBucket } from "../utils/settings";

export default {
  components: {
    Bucket,
    Column,
    RoundRecord,
  },
  setup() {
    const bucketCount = ref(12 / tasksInBucket);

    const stageRef = ref<HTMLElement | null>(null);
    const bucketRefs: Ref<Array<InstanceType<typeof Bucket>>> = ref([]);
    const bucketRef = ref<InstanceType<typeof Bucket> | null>(null);

    const columnRefs: Ref<Array<InstanceType<typeof Column>>> = ref([]);

    const handleClickEvent = () => {
      if (!bucketRefs.value) {
        return;
      }
      for (let i = 0; i < bucketCount.value; i++) {
        bucketRefs.value[i].startWork();
      }
    };

    onMounted(() => {
      columnRefs.value.forEach(
        (item: InstanceType<typeof Column>, index: number) => {
          const left =
            item.getBoundingClientRect()!.x -
            stageRef.value!.getBoundingClientRect().x;
          const top =
            item.getBoundingClientRect()!.y -
            stageRef.value!.getBoundingClientRect().y;
          const width = item.getBoundingClientRect()!.width;
          updatePosition(stages[index], { left, top, width });
        }
      );
    });

    const createColumnRefs = (
      el: InstanceType<typeof Column>,
      index: number
    ) => {
      columnRefs.value[index] = el;
    };

    const buildBucketRef = (el: InstanceType<typeof Bucket>, index: number) => {
      bucketRefs.value[index] = el;
    };

    return {
      bucketCount,
      handleClickEvent,
      bucketRef,
      createColumnRefs,
      stageRef,
      stages,
      bucketRefs,
      buildBucketRef,
    };
  },
};
</script>
<style scoped>
button {
  margin-top: 20px;
  background-color: #f0f0f0;
  color: #000;
}
.stage {
  width: 1080px;
  height: 500px;
  background-color: #f0f0f0;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: space-between;
  /* left: 50%; */
}
</style>