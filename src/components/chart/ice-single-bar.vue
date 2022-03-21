<template>
  <div class="bar-container">
    <!-- 中心线 -->
    <div class="line"></div>
    <div class="bar-content" :style="{ transform: `translateY(${offset}px)` }">
      <!-- 最大值 -->
      <div>{{ max }}</div>
      <!-- 这是一个条形图 -->
      <div
        class="bar"
        :style="{ background: bgColor, height: `${height}px` }"
      />
      <!-- 最小值 -->
      <div>{{ min }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useWeather } from "../../store";

export default {
  name: "ice-single-bar",
  props: {
    bgColor: {
      type: String,
      default: "#7bc8ff",
    },
    max: Number, // 最大值
    min: Number, // 最小值
  },
  computed: {
    ...mapState(useWeather, ["average", "deltaTemp"]),
    offset() {
      const d = this.deltaTemp;
      const max = this.max;
      const min = this.min;
      const step = 40 / d; // 步长
      const average = this.average;

      return (average - (max + min) / 2) * step;
    },
    height() {
      const d = this.deltaTemp;
      const max = this.max;
      const min = this.min;
      const step = 40 / d; // 步长
      return step * (max - min);
    },
  },
};
</script>

<style scoped>
.bar-container {
  height: 100px;
  margin: 0.5em 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.bar {
  border-radius: 4px;
  width: 8px;
  margin: 3px 0;
}

.line {
  height: 100%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-right: 2px dotted #eee;
  z-index: 1;
}

.bar-content {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2;
}
</style>