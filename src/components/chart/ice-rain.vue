<template>
  <el-card shadow="never" v-if="isPrecip">
    <div slot="header" class="title">两小时降雨(雪)</div>
    <div ref="precipitation" style="width: 100%; height: 180px"></div>
    <el-alert :title="summary" type="info" :closable="false"> </el-alert>
  </el-card>
</template>
<script>
import { mapState } from "pinia";
import { useWeather } from "../../store";
import createOptions from "./options";

export default {
  name: "ice-rain",
  methods: {
    // 绘制降水图
    draw() {
      const chart = this.$echarts.init(this.$refs.precipitation);
      const option = createOptions(this.value);
      option && chart.setOption(option);
    },
  },
  computed: {
    ...mapState(useWeather, {
      isPrecip: (store) => {
        return store.precipitation.minutely.every((e) => e.precip !== 0.0);
      },
      value: (store) => {
        return store.precipitation.minutely.map((e) => e.precip);
      },
      summary: (store) => {
        return store.precipitation.summary;
      },
    }),
  },
  watch: {
    value() {
      if (this.isPrecip) {
        this.$nextTick(() => {
          this.draw();
        });
      }
    },
  },
};
</script>

<style scoped>
.title {
  font-weight: bold;
}
</style>