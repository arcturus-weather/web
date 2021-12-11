<template>
  <transition name="fade" :duration="200" appear mode="out-in">
    <v-card v-if="$store.state.SunMoon" flat outlined>
      <div class="curve" :style="{ backgroundColor: curveColor }">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
          <!-- 轨迹线 -->
          <circle class="curve-line" />
        </svg>
        <!-- 太阳 -->
        <div class="sun-orbit" :style="{ transform: `rotate(${sunDeg}deg)` }">
          <div class="sun">
            <div class="ring"></div>
            <div class="ring"></div>
            <div class="ring"></div>
          </div>
        </div>

        <!-- 月亮 -->
        <div class="moon-orbit" :style="{ transform: `rotate(${moonDeg}deg)` }">
          <div class="moon"></div>
        </div>
      </div>
      <div class="pa-1">
        <v-card-title class="pa-1">{{ $t("sun-moon") }}</v-card-title>
        <!-- 日月时间纸片 -->
        <v-chip
          class="ma-1"
          text-color="white"
          color="red"
          v-for="item in SunMoon"
          :key="item.label"
        >
          <v-icon left> {{ item.icon }}</v-icon>
          {{ item.date }}
        </v-chip>
      </div>
    </v-card>
    <v-skeleton-loader
      v-else
      type="image,list-item-three-line"
      class="v-sheet--outlined"
    />
  </transition>
</template>
<script>
export default {
  name: "v-sun-moon",
  data: () => ({
    curveColor: "#1D9DDD",
    sunDeg: -90
  }),
  computed: {
    SunMoon() {
      let sm = this.$store.state.SunMoon;
      if (sm) {
        return [
          {
            label: "sunrise",
            icon: "mdi-weather-sunset-up",
            date: `${sm.sunRise.getHours()}:${sm.sunRise.getMinutes()}`,
          },
          {
            label: "sunSet",
            icon: "mdi-weather-sunset-down",
            date: `${sm.sunSet.getHours()}:${sm.sunSet.getMinutes()}`,
          },
          {
            label: "moonrise",
            icon: "mdi-weather-night",
            date: `${sm.moonRise.getHours()}:${sm.moonRise.getMinutes()}`,
          },
          {
            label: "moonset",
            icon: "mdi-star-face",
            date: `${sm.moonSet.getHours()}:${sm.moonSet.getMinutes()}`,
          },
        ];
      } else {
        return null;
      }
    },
    sunDeg() {
      if (this.$store.state.SunMoon) {
        // 日出日落时间
        let sm = this.$store.state.SunMoon;
        let nowTime = new Date();
        let dT1 = nowTime.getTime() - sm.sunRise.getTime();
        let dT2 = sm.sunSet.getTime() - sm.sunRise.getTime();
        let radio = dT1 / dT2;
        return 180 * radio;
      } else {
        return -90;
      }
    },
    moonDeg() {
      if (this.$store.state.SunMoon) {
        // 月出月落时间
        let sm = this.$store.state.SunMoon;
        let nowTime = new Date();
        let dT1 = nowTime.getTime() - sm.moonRise.getTime();
        let dT2 = sm.moonSet.getTime() - sm.moonRise.getTime();
        let radio = dT1 / dT2;
        console.log(dT1, dT2, nowTime, "月亮");
        return 180 * radio;
      } else {
        return -90;
      }
    },
  },
  mounted() {
    // 获取日月时间
    this.$store.dispatch("getSunMoon");
  },
};
</script>

<style lang="sass">
$orb-radius: 3em
$sun-color: #ff967d
$moon-color: #CCC
$moon-mountain-color: #AAA
$curve-height: 10em

.curve
    width: 100%
    height: $curve-height
    position: relative
    overflow: hidden
    transition: 0.2s background-color ease
    > svg
        width: 100%
        height: 100%

.curve-line
    r: $curve-height * 0.9 - $orb-radius / 2
    stroke: rgba(0, 0, 0, 0.12)
    stroke-dasharray: 1, 5
    cy: 100%
    cx: 50%
    stroke-width: 3
    stroke-linecap: round
    fill: none

.sun-orbit, .moon-orbit
    position: absolute
    top: $curve-height - $orb-radius / 2
    width: $curve-height * 0.9
    height: auto
    transition: 2s transform ease
    transform-origin: 100% 50%

.sun
    border-radius: 50%
    width: $orb-radius
    height: $orb-radius
    background: $sun-color
    position: relative
    .ring
        opacity: 0.8
        background: inherit
        position: absolute
        animation: pulsing 2s ease-out infinite
        border-radius: 50%
        height: 100%
        width: 100%
        &:nth-of-type(1)
            animation-delay: -0.5s
        &:nth-of-type(2)
            animation-delay: -1s
        &:nth-of-type(3)
            animation-delay: -1.5s

@keyframes pulsing
    100%
        transform: scale(1.75)
        opacity: 0

.moon
    width: $orb-radius
    height: $orb-radius
    border-radius: 50%
    background-color: $moon-color
    position: relative

    &::after
        position: absolute
        content: ""
        border-radius: 50%
        top: 20%
        right: 10%
        width: 30%
        height: 30%
        background-color: $moon-mountain-color

    &::before
        position: absolute
        content: ""
        border-radius: 50%
        top: 40%
        right: 50%
        width: 15%
        height: 15%
        background-color: $moon-mountain-color
</style>