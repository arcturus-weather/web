<template>
  <v-card ref="card" flat outlined style="height: 100%">
    <!-- 日月运动动画面板 -->
    <div class="curve" :style="{ backgroundColor: curveColor }">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
        <!-- 轨迹线 -->
        <circle class="curve-line" :stroke="curveLineColor" />
      </svg>
      <!-- 太阳 -->
      <div
        ref="sunorbit"
        class="sun-orbit"
        :style="{ transform: `rotate(${sunDeg}deg)` }"
      >
        <div class="sun">
          <div class="ring"></div>
          <div class="ring"></div>
          <div class="ring"></div>
        </div>
      </div>

      <!-- 月亮 -->
      <div
        ref="moonorbit"
        class="moon-orbit"
        :style="{ transform: `rotate(${moonDeg}deg)` }"
      >
        <div class="moon"></div>
      </div>
    </div>
    <!-- 日月时间详情 -->
    <div class="pa-1">
      <v-card-title class="pa-1">{{ $t("sun-moon") }}</v-card-title>
      <v-chip
        class="ma-1"
        text-color="white"
        color="red"
        v-for="item in SunMoon"
        :key="item.label"
        small
      >
        <v-icon left small> {{ item.icon }}</v-icon>
        {{ item.time | Time }}
      </v-chip>
    </div>
  </v-card>
</template>
<script>
import { filter } from "@/mixin";

export default {
  name: "v-sun-moon",
  data: () => ({
    curveColor: "#0091EA",
    sunDeg: -90,
    moonDeg: -90,
  }),
  mixins: [filter],
  computed: {
    curveLineColor() {
      return this.curveColor === "#212121" ? "#FAFAFA" : "#BDBDBD";
    },
    SunMoon() {
      let sm = this.$store.state.SunMoon;
      return [
        {
          label: "sunrise",
          icon: "mdi-weather-sunset-up",
          time: sm.sunRise,
        },
        {
          label: "sunSet",
          icon: "mdi-weather-sunset-down",
          time: sm.sunSet,
        },
        {
          label: "moonrise",
          icon: "mdi-weather-night",
          time: sm.moonRise,
        },
        {
          label: "moonset",
          icon: "mdi-star-face",
          time: sm.moonSet,
        },
      ];
    },
  },
  mounted() {
    // 动态获取组件宽度并使日月轨道以底部中点为旋转轴
    let card = this.$refs.card;
    let width = card.$el.offsetWidth;
    // 日
    let sunorbit = this.$refs.sunorbit;
    sunorbit.style.left = width / 2 - sunorbit.offsetWidth + "px";
    // 月
    let moonorbit = this.$refs.moonorbit;
    moonorbit.style.left = width / 2 - moonorbit.offsetWidth + "px";

    let sm = this.$store.state.SunMoon;
    let now = new Date();
    let nowTime = now.getTime();

    // 日出日落
    let dT1 = nowTime - sm.sunRise.getTime();
    let dT2 = sm.sunSet.getTime() - sm.sunRise.getTime();
    let radio = dT1 / dT2;
    this.sunDeg = 180 * radio;

    // 月出月落
    let dT3 = nowTime - sm.moonRise.getTime();
    let dT4 = sm.moonSet.getTime() - sm.moonRise.getTime();
    radio = dT3 / dT4;
    this.moonDeg = 180 * radio;

    // 根据当前时间变更天空背景色
    let dT5 = nowTime - sm.sunSet.getTime();
    if (dT1 < 0 || dT5 > 0) {
      // 当前未日出
      this.curveColor = "#212121";
    } else if (dT5 > -7200000) {
      // 离日落还有两个小时
      this.curveColor = "#E65100";
    }
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
  transition: 4s background-color ease-out
  > svg
    width: 100%
    height: 100%

.curve-line
  r: $curve-height * 0.9 - $orb-radius / 2
  stroke-dasharray: 1, 5
  cy: $curve-height + $orb-radius / 2
  cx: 50%
  stroke-width: 3
  stroke-linecap: round
  fill: none
  transition: 4s stroke ease-out

.sun-orbit, .moon-orbit
  position: absolute
  top: $curve-height
  width: $curve-height * 0.9
  height: auto
  transition: 4s transform ease-out
  transform-origin: 100% 50%

.moon-orbit
  transition-delay: .2s
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
    animation: pulsing 1s ease-out infinite
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
    transform: scale(1.5)
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