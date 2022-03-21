<template>
  <div class="weather">
    <el-row class="location" align="center" type="flex">
      <i class="el-icon-location-outline icon"></i>
      <div class="location-info">
        <div v-if="addr" class="address">{{ addr }}</div>
        <div v-if="city" class="city">{{ city }}</div>
      </div>
    </el-row>

    <!-- 天气简报 -->
    <div class="weather-brief-info">
      <div class="temperature">{{ temperature }}{{ unit }}</div>
      <div class="weather-condition">
        {{ desc }}, 体感 {{ feelsLike }}{{ unit }}
      </div>
      <!--  空气质量  -->
      <div>
        <el-tag @click="displayAqi = true">空气质量({{ category }})</el-tag>
      </div>
    </div>
    <!-- 空气质量面板 -->
    <el-dialog title="空气质量指数" :visible.sync="displayAqi">
      <ice-aqi-panel></ice-aqi-panel>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useWeather, useLocation } from "../store";
import iceAqiPanel from "./ice-aqi-panel.vue";

export default {
  name: "ice-weather-brief",
  data() {
    return {
      unit: "°", // 温度单位
      displayAqi: false, // 是否打开空气质量面板
    };
  },
  components: {
    iceAqiPanel,
  },
  computed: {
    ...mapState(useWeather, {
      desc: (store) => {
        return store.now.desc;
      },
      feelsLike: (store) => {
        return store.now.feelsLike;
      },
      temperature: (store) => {
        return store.now.temperature;
      },
      category: (store) => {
        return store.aqi.category;
      },
    }),
    ...mapState(useLocation, ["city", "addr"]),
  },
};
</script>

<style scoped>
.weather {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #fff;
  box-sizing: border-box;
  padding: 1em;
}

/* 温度 */
.temperature {
  font-size: 5em;
}

/* 天气条件 */
.weather-condition {
  margin: 0.5em 0;
}

/* 空气质量 tag */
.weather-brief-info .el-tag {
  cursor: pointer;
}

.icon {
  margin-right: 0.2em;
  font-size: 2em;
}

.location-info {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.city {
  font-size: 0.7em;
}

.address {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>