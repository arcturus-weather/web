<template>
  <el-row type="flex" align="middle" justify="center">
    <el-col class="aqi-circle-progress">
      <el-progress
        :stroke-width="10"
        type="dashboard"
        :format="text"
        :percentage="aqi.percentage"
        :color="aqi.color"
      ></el-progress>
    </el-col>
    <el-col :span="16" class="pollutions-container">
      <ice-aqi-progress
        v-for="(item, index) in aqi.components"
        :key="index"
        :value="item.value"
        :max="item.max"
        :desc="item.name"
        :sub="item.unit"
      ></ice-aqi-progress>
    </el-col>
  </el-row>
</template>
<script>
import { mapState } from "pinia";
import { useWeather } from "../store";
import iceAqiProgress from "./chart/ice-aqi-progress.vue";

export default {
  name: "ice-api-panel",
  components: { iceAqiProgress },
  computed: {
    ...mapState(useWeather, ["aqi"]),
  },
  methods: {
    text() { // 返回当前 AQI 值
      return this.aqi.value;
    },
  },
};
</script>

<style scoped>
.aqi-circle-progress {
  width: 126px;
  height: 126px;
  margin-right: 3em;
}

.pollutions-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
</style>