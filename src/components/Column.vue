<template>
  <div class="column">
    <h3 class="column-title">{{ title }}</h3>
    <div class="workarea" ref="workareaRef"></div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";

export default {
  name: "Column",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    const workareaRef = ref<HTMLElement | null>(null);

    onMounted(() => {
      // console.log(getBoundingClientRect());
    });
    
    const getBoundingClientRect = () => {
      if (!workareaRef.value) {
        return;
      }
      return workareaRef.value.getBoundingClientRect();
    };
    return { workareaRef, getBoundingClientRect };
  },
};
</script>

<style scoped>
.column {
  width: 150px;
  height: 100%;
  border-left: 10px solid #999;
  border-right: 10px solid #999;
}
.column-title {
  text-align: center;
  color: #ff0000;
  margin: 0;
  padding: 10px 0;
}
.workarea {
  width: 100%;
  height: 100%;
  background-color: #ccc;
}
</style>