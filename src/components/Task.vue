<template>
  <div>
    <div ref="task" class="task" v-motion>
      <div
        v-for="(item, index) in processes"
        :key="index"
        class="process"
        :ref="(el) => createProcessRef(el, index)"
      >
        {{ item.duration }}d
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { useTask } from "../composables/useTask";

export default {
  setup() {
    const { startWork, processes, createProcessRef } = useTask();

    return {
      startWork,
      processes,
      createProcessRef,
    };
  },
};
</script>
<style scoped>
.task {
  height: 30px;
  background-color: #42b883;
  overflow: hidden;
  position: relative;
  border: 1px solid #303030;
}

.process {
  font-size: 15px;
  color: #000;
  width: 0;
  background-color: #b1dd43;
  overflow: hidden;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.animated-element {
  width: 0;
  animation: widthAnimation 2s linear forwards; /* 使用自定义动画 */
}

@keyframes widthAnimation {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
</style>