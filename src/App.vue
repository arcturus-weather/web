<template>
  <v-app>
    <nav-bar />
    <!-- 设置抽屉 -->
    <setting-drawer />
    <v-main>
      <v-row no-gutters class="xs">
        <v-col md="3" sm="12" class="pa-1">
          <!-- 当前天气 -->
          <transition name="fade" :duration="200" appear mode="out-in">
            <v-now v-if="$store.state.now" />
            <v-skeleton-loader
              v-else
              type="list-item-avatar-three-line,list-item-three-line,actions"
              class="v-sheet--outlined mb-1"
            />
          </transition>
          <!-- 降水图 -->
          <transition name="fade" :duration="200" appear mode="out-in">
            <v-rain v-if="showPrecip" />
            <v-skeleton-loader
              v-else
              type="image"
              class="v-sheet--outlined mb-1"
            />
          </transition>
        </v-col>
        <v-col md="7" sm="12">
          <!-- 小时概况/7天 -->
          <v-chart />
          <v-row no-gutters class="xs">
            <v-col md="6" sm="12" class="px-1 mb-1">
              <!-- 空气质量 -->
              <transition name="fade" :duration="200" appear mode="out-in">
                <v-aqi-panel v-if="$store.state.air" />
                <v-skeleton-loader
                  v-else
                  type="list-item-avatar,list-item@5"
                  class="v-sheet--outlined"
                />
              </transition>
            </v-col>
            <v-col md="6" sm="12" class="px-1 mb-1">
              <!-- 日出日落 -->
              <transition name="fade" :duration="200" appear mode="out-in">
                <v-sun-moon v-if="$store.state.SunMoon" />
                <v-skeleton-loader
                  v-else
                  type="image,list-item-three-line"
                  class="v-sheet--outlined"
                />
              </transition>
            </v-col>
          </v-row>
        </v-col>
        <v-col md="2" sm="12"></v-col>
      </v-row>
    </v-main>
  </v-app>
</template>


<script>
import VSunMoon from "./components/v-sun-moon.vue";
import VAqiPanel from "./components/v-aqi-panel.vue";
import VNow from "./components/v-now.vue";
import navBar from "./components/v-nav-bar.vue";
import settingDrawer from "./components/v-setting-drawer.vue";
import VRain from "./components/v-rain.vue";
import VChart from "./components/v-chart.vue";

export default {
  name: "App",
  components: {
    navBar,
    settingDrawer,
    VNow,
    VAqiPanel,
    VSunMoon,
    VRain,
    VChart,
  },
  computed: {
    showPrecip() {
      if (this.$store.state.rain) {
        let rain = this.$store.state.rain.minutely;
        let isRain = rain.filter((el) => {
          return el == 0;
        });
        return isRain.length === 0;
      } else {
        return false;
      }
    },
  },
  mounted() {
    // 获取日月时间
    this.$store.dispatch("getSunMoon");
    //  获取空气质量报告
    this.$store.dispatch("getAirQuality");
    // 请求当前天气
    this.$store.dispatch("getWeather");
    // 请求降水情况
    this.$store.dispatch("getRain");
    // 请求生活指数
    this.$store.dispatch("getLifeIndex");
    // 请求小时降雨量
    this.$store.dispatch("getHours");
  },
};
</script>

<style lang="sass">
.fade-enter-active, .fade-leave-active
  transition: opacity .5s

.fade-enter, .fade-leave-to
  opacity: 0

.xs
  @media screen and (max-width: 600px)
    flex-direction: column
</style>