<template>
  <el-card class="hours" shadow="never">
    <div slot="header" class="title">逐时概述</div>
    <div class="hours-item-container hidden-native-scroll-bar">
      <div class="hours-item" v-for="(item, index) in hours" :key="index">
        <!-- 天气时间 -->
        <div class="hours-time margin">{{ item.time }}</div>
        <!-- 天气图标 -->
        <ice-icon :name="`icon-${item.icon}`"></ice-icon>
        <!-- 温度 -->
        <div class="hours-temp margin">{{ item.temp }}</div>
        <!-- 天气情况 -->
        <div class="hours-desc margin">{{ item.text }}</div>
        <!-- 风况 -->
        <div class="hours-wind margin">
          <div
            class="wind-icon"
            :style="{ transform: `rotate(${item.wind360}}deg)` }"
          >
            <i
              class="el-icon-position"
              :style="{ color: windColor, fontSize: '1.5em' }"
            ></i>
          </div>
          <div>{{ item.windScale }}级</div>
        </div>
      </div>
    </div>
  </el-card>
</template>
<script>
import { mapState } from "pinia";
import { useWeather } from "../store";
import iceIcon from "./ice-icon.vue";

export default {
  name: "ice-hours",
  data() {
    return {
      windColor: "#FCCF31",
    };
  },
  components: {
    iceIcon,
  },
  computed: {
    ...mapState(useWeather, ["hours"]),
  },
};
</script>

<style scoped>
.hours .title {
  font-weight: bold;
}

.hours-item-container {
  display: flex;
  overflow-x: scroll;
}

.hours-item {
  width: 3em;
  display: flex;
  flex: 0 0 60px;
  align-items: center;
  flex-direction: column;
}

.hours-wind {
  text-align: center;
}

.hours .margin {
  margin: 0.2em 0;
}
</style>