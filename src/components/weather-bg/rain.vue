<template>
  <!-- 雨天 -->
  <div class="rain-container rain-bg">
    <div class="rain">
      <!-- 雨滴 -->
      <div
        class="rain-drop"
        v-for="(item, index) in rain"
        :key="index"
        :style="{
          animationDuration: `${duration}s`,
          animationDelay: `${item.delay}s`,
          left: `${item.left}%`,
          background: `var(--var-rain-color-${item.color})`,
        }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "rain",
  props: {
    nums: {
      type: Number,
      default: 50,
    },
  },
  data() {
    return {
      rain: [],
      duration: 2,
    };
  },
  mounted() {
    // 生成雨滴及其位置
    const rain = [];
    for (let i = 0; i < this.nums; i++) {
      let r1 = Math.random();
      let r2 = Math.random();
      rain.push({
        left: r1 * 100,
        delay: r2 * 5,
        color: Math.floor(r1 * 6),
      });
    }
    this.rain = rain;
  },
};
</script>

<style scoped>
.rain-container {
  width: 100%;
  height: 100%;
}

.rain-bg {
  --var-rain-color-0: rgba(255, 255, 255, 1);
  --var-rain-color-1: rgba(255, 255, 255, 0.9);
  --var-rain-color-2: rgba(255, 255, 255, 0.8);
  --var-rain-color-3: rgba(255, 255, 255, 0.5);
  --var-rain-color-4: rgba(255, 255, 255, 0.3);
  --var-rain-color-5: rgba(255, 255, 255, 0.2);

  background: linear-gradient(
    to top right,
    rgba(215, 221, 232, 1) 0%,
    rgb(166, 175, 199) 100%
  );
}

.rain {
  position: relative;
  width: 100%;
  height: 100%;
}

/* 雨滴 */
.rain-drop {
  position: absolute;
  width: 0.3em;
  height: 2em;
  border-radius: 0.15em;
  transform: translateY(-100%);
  animation: drop linear infinite;
}

@keyframes drop {
  0% {
    top: 0;
  }
  100% {
    top: 100%;
  }
}
</style>