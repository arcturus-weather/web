<template>
  <el-card shadow="never">
    <div slot="header" class="title">日月升落</div>
    <ice-track
      :sunRise="sunRise"
      :sunSet="sunSet"
      :moonRise="moonRise"
      :moonSet="moonSet"
    ></ice-track>
    <!-- 日月时间详情 -->
    <el-row class="time" type="flex" align="middle" justify="space-between">
      <!-- 日出时间 -->
      <el-tag> <i class="el-icon-sunrise"></i> {{ sr }}↑ </el-tag>
      <!-- 日落时间 -->
      <el-tag> <i class="el-icon-sunset"></i> {{ ss }}↓ </el-tag>
      <!-- 月出时间 -->
      <el-tag> <i class="el-icon-moon"></i> {{ mr }}↑ </el-tag>
      <!-- 月落时间 -->
      <el-tag> <i class="el-icon-moon-night"></i> {{ ms }}↓ </el-tag>
    </el-row>
  </el-card>
</template>
<script>
import { mapState } from "pinia";
import { useWeather } from "../../store";
import iceTrack from "./ice-track.vue";

export default {
  name: "ice-sun-moon",
  data() {
    return {
      curveLineColor: "#fff", // 轨道颜色
    };
  },
  components: {
    iceTrack,
  },
  computed: {
    ...mapState(useWeather, [
      "moonRise",
      "moonSet",
      "moonIcon",
      "sunRise",
      "sunSet",
    ]),
    sr() {
      return new Date(this.sunRise).format("hh:mm");
    },
    ss() {
      return new Date(this.sunSet).format("hh:mm");
    },
    mr() {
      return new Date(this.moonRise).format("hh:mm");
    },
    ms() {
      return new Date(this.moonSet).format("hh:mm");
    },
  },
};
</script>

<style scoped>
.time {
  margin-top: 0.5em;
}

.title {
  font-weight: bold;
}
</style>