<template>
  <!-- 背景 -->
  <div
    class="sky"
    :style="{
      backgroundColor: skyColor,
      height: `${skyHeight}px`,
    }"
    ref="sky"
  >
    <svg>
      <!-- 轨迹线 -->
      <circle
        class="curve-line"
        :stroke="curveLineColor"
        :r="curveRadius"
        cx="50%"
        :cy="curveY"
      />
    </svg>
    <!-- 太阳 -->
    <div
      class="sun-orbit"
      :style="{
        transform: `rotate(${sunDeg}deg)`,
        top: `${skyHeight - orbRadius}px`,
        right: `${orbitRight}px`,
        width: `${curveRadius + orbRadius}px`,
      }"
    >
      <div
        class="sun"
        :style="{
          width: `${orbRadius * 2}px`,
          height: `${orbRadius * 2}px`,
        }"
      >
        <div class="ring"></div>
        <div class="ring"></div>
        <div class="ring"></div>
      </div>
    </div>

    <!-- 月亮 -->
    <div
      class="moon-orbit"
      :style="{
        transform: `rotate(${moonDeg}deg)`,
        top: `${skyHeight - orbRadius}px`,
        right: `${orbitRight}px`,
        width: `${curveRadius + orbRadius}px`,
      }"
    >
      <div
        class="moon"
        :style="{
          width: `${orbRadius * 2}px`,
          height: `${orbRadius * 2}px`,
        }"
      ></div>
    </div>
  </div>
</template>

<script>
/***********************
 *      日月轨道       *
 **********************/

export default {
  name: "ice-track",
  props: {
    sunRise: String,
    sunSet: String,
    moonRise: String,
    moonSet: String,
  },
  data() {
    return {
      curveLineColor: "#fff", // 轨道颜色
      orbRadius: 20, // 星球半径
      skyHeight: 200, // 天空高度
      skyWidth: 0, // 天空宽度
    };
  },
  computed: {
    sunDeg() {
      // 日出日落
      const now = new Date().getTime(); // 当前时间戳
      const sunRise = new Date(this.sunRise).getTime();
      const sunSet = new Date(this.sunSet).getTime();
      const radio = (now - sunRise) / (sunSet - sunRise);
      return 180 * radio;
    },
    moonDeg() {
      // 月出月落
      const now = new Date().getTime(); // 当前时间戳
      const moonRise = new Date(this.moonRise).getTime();
      const moonSet = new Date(this.moonSet).getTime();
      const radio = (now - moonRise) / (moonSet - moonRise);
      return radio * 180;
    },
    skyColor() {
      // 根据当前时间变更天空背景色
      const now = new Date().getTime(); // 当前时间戳
      const sunSet = new Date(this.sunSet).getTime();
      const sunRise = new Date(this.sunRise).getTime();

      if (now - sunRise < 0 || now - sunSet > 0) {
        // 当前未日出
        return "#303133";
      } else if (now - sunSet > -7200000) {
        // 离日落还有两个小时
        return "#FEB692";
      } else {
        // 白天
        return "#6AB3FF";
      }
    },
    // 轨道半径
    curveRadius() {
      return this.skyHeight * 0.9 - this.orbRadius / 2;
    },
    // 轨道Y坐标
    curveY() {
      return this.skyHeight;
    },
    // 轨道右起始
    orbitRight() {
      return this.skyWidth / 2;
    },
  },
  mounted() {
    this.skyWidth = this.$refs.sky.offsetWidth;
  },
};
</script>

<style scoped>
.sky {
  --sun-color: #ff967d;
  --moon-color: #ccc;
  --moon-mountain-color: #aaa;
}

/* 天空 */
.sky {
  position: relative;
  overflow: hidden;
  transition: 4s background-color ease-out;
}

.sky > svg {
  width: 100%;
  height: 100%;
}

.curve-line {
  stroke-dasharray: 1, 5;
  stroke-width: 3;
  stroke-linecap: round;
  fill: none;
}

.sun-orbit,
.moon-orbit {
  position: absolute;
  height: auto;
  transition: 4s transform ease-out;
  transform-origin: 100% 50%;
}

.moon-orbit {
  transition-delay: 0.2s;
}

.sun {
  border-radius: 50%;
  background: var(--sun-color);
  position: relative;
}

.sun .ring {
  opacity: 0.8;
  background: inherit;
  position: absolute;
  animation: pulsing 1s ease-out infinite;
  border-radius: 50%;
  height: 100%;
  width: 100%;
}

.sun .ring:nth-of-type(1) {
  animation-delay: -0.5s;
}
.sun .ring:nth-of-type(2) {
  animation-delay: -1s;
}

.sun .ring:nth-of-type(3) {
  animation-delay: -1.5s;
}

@keyframes pulsing {
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

.moon {
  border-radius: 50%;
  background-color: var(--moon-color);
  position: relative;
}

.moon::after {
  position: absolute;
  content: "";
  border-radius: 50%;
  top: 20%;
  right: 10%;
  width: 30%;
  height: 30%;
  background-color: var(--moon-mountain-color);
}

.moon::before {
  position: absolute;
  content: "";
  border-radius: 50%;
  top: 40%;
  right: 50%;
  width: 15%;
  height: 15%;
  background-color: var(--moon-mountain-color);
}
</style>