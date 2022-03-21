<template>
  <el-container v-loading="loading">
    <el-aside width="300px">
      <!-- 天气背景图 -->
      <div class="weather-bg">
        <ice-weather-bg :name="weatherType"></ice-weather-bg>
      </div>
      <!-- 天气简报 -->
      <transition
        name="animate__animated animate__fade"
        enter-active-class="animate__fadeIn"
      >
        <ice-weather-brief v-if="!loading"></ice-weather-brief>
      </transition>
    </el-aside>

    <el-main class="hidden-native-scroll-bar">
      <!-- gutter 只能拉开左右距离 -->
      <el-row :gutter="10">
        <el-col :span="24" style="margin-bottom: 10px">
          <transition
            name="animate__animated animate__fade"
            enter-active-class="animate__fadeInUp"
          >
            <!-- 逐小时预报 -->
            <ice-hours v-if="!loading"></ice-hours>
          </transition>
        </el-col>
        <el-col :span="12">
          <!-- 两小时降水(雪) -->
          <transition
            name="animate__animated animate__fade"
            enter-active-class="animate__fadeInUp"
          >
            <ice-rain style="margin-bottom: 10px" v-if="!loading"></ice-rain>
          </transition>
          <!-- 逐日预报 -->
          <transition
            name="animate__animated animate__fade"
            enter-active-class="animate__fadeInUp"
          >
            <ice-days v-if="!loading"></ice-days>
          </transition>
        </el-col>
        <el-col :span="12">
          <!-- 生活指数 -->
          <transition
            name="animate__animated animate__fade"
            enter-active-class="animate__fadeInUp"
          >
            <ice-living-indices
              style="margin-bottom: 10px"
              v-if="!loading"
            ></ice-living-indices>
          </transition>
          <!-- 日月升落 -->
          <transition
            name="animate__animated animate__fade"
            enter-active-class="animate__fadeInUp"
          >
            <ice-sun-moon v-if="!loading"></ice-sun-moon>
          </transition>
        </el-col>
      </el-row>

      <div class="function-btn">
        <!-- 选点按钮 -->
        <el-button
          icon="el-icon-location-outline"
          @click="displayLocation = true"
          circle
        ></el-button>
        <!-- 设置按钮 -->
        <el-button
          icon="el-icon-setting"
          @click="displaySetting = true"
          circle
        ></el-button>
      </div>
      <!-- 地图 -->
      <ice-map :visible.sync="displayLocation"></ice-map>
      <!-- 设置 -->
      <el-dialog title="设置" :visible.sync="displaySetting"></el-dialog>
    </el-main>
  </el-container>
</template>

<script>
/***********************
 *     自定义组件      *
 **********************/
import iceMap from "./components/ice-map.vue";
import iceIcon from "./components/ice-icon.vue";
import iceWeatherBg from "./components/weather-bg/ice-weather-bg.vue";
import iceHours from "./components/ice-hours.vue";
import iceDays from "./components/ice-days.vue";
import iceLivingIndices from "./components/ice-living-indices.vue";
import iceSunMoon from "./components/sun-moon/ice-sun-moon.vue";
import iceRain from "./components/chart/ice-rain.vue";
import iceWeatherBrief from "./components/ice-weather-brief.vue";

/***********************
 *        pinia        *
 **********************/
import { mapState, mapActions } from "pinia";
import { useWeather, useLocation, useLoading } from "./store";

/***********************
 *         动画        *
 **********************/
import "animate.css";

export default {
  name: "App",
  data() {
    return {
      displayLocation: false, // 是否显示地图
      displaySetting: false, // 是否打开设置页面
    };
  },
  components: {
    iceMap,
    iceIcon,
    iceWeatherBg,
    iceLivingIndices,
    iceWeatherBrief,
    iceSunMoon,
    iceRain,
    iceHours,
    iceDays,
  },
  mounted() {
    this.getAddr()
      .then((res) => {
        const { lng, lat } = res;
        this.qweatherHandler(`${lng},${lat}`);
      })
      .catch((err) => {
        if (typeof err === "string") {
          this.$message(err);
        } else if (typeof err === "object") {
          this.$message(err.message);
        }
      });
  },
  computed: {
    ...mapState(useWeather, ["weatherType", "now", "aqi"]),
    ...mapState(useLoading, ["loading"]),
  },
  methods: {
    ...mapActions(useWeather, ["qweatherHandler"]),
    ...mapActions(useLocation, ["getAddr"]),
  },
};
</script>

<style>
body {
  margin: 0;
}

.el-aside {
  color: #fff;
  height: 100vh;
  position: relative;
}

.el-main {
  background: #f6f6f8;
  color: #333;
  height: 100vh;
}

.function-btn {
  position: absolute;
  z-index: 100;
  bottom: 1em;
  right: 1em;
}

.weather-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
}

/* 隐藏默认滚动条 */
.hidden-native-scroll-bar {
  scrollbar-width: none;
}

.hidden-native-scroll-bar::-webkit-scrollbar {
  display: none;
}
</style>
