<template>
  <el-card class="days" shadow="never">
    <div slot="header" class="title">逐日概述</div>
    <div class="days-item-container hidden-native-scroll-bar">
      <div class="days-item" v-for="(item, index) in days" :key="index">
        <!-- 星期 -->
        <div class="days-week margin">{{ item.weekday }}</div>
        <!-- 几号 -->
        <div class="days-time margin">{{ item.day }}</div>
        <!-- 白天天气情况 -->
        <div class="days-desc margin">{{ item.textDay }}</div>
        <!-- 白天天气图标 -->
        <ice-icon :name="`icon-${item.iconDay}`"></ice-icon>

        <!-- 温度图 -->
        <ice-single-bar
          :max="item.tempMax"
          :min="item.tempMin"
        ></ice-single-bar>

        <!-- 夜间天气图标 -->
        <ice-icon :name="`icon-${item.iconNight}`"></ice-icon>
        <!-- 夜间天气描述 -->
        <div class="hours-desc margin">{{ item.textNight }}</div>
      </div>
    </div>
  </el-card>
</template>

<script>
import { mapState } from "pinia";
import { useWeather } from "../store";
import iceIcon from "./ice-icon.vue";
import iceSingleBar from "./chart/ice-single-bar.vue";

export default {
  name: "ice-days",
  components: {
    iceIcon,
    iceSingleBar,
  },
  computed: {
    ...mapState(useWeather, ["days"]),
  },
};
</script>

<style scoped>
.days .title {
  font-weight: bold;
}

.days-item-container {
  display: flex;
  overflow-x: scroll;
}

.days-item {
  width: 3em;
  display: flex;
  flex: 0 0 60px;
  align-items: center;
  flex-direction: column;
}

.days .margin {
  margin: 0.2em 0;
}

.days-time {
  color: #909399;
}
</style>