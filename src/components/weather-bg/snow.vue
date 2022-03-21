<template>
  <!-- 雪天 -->
  <div class="snow-container snow-bg">
    <div class="snow">
      <div
        v-for="(item, index) in snow"
        :key="index"
        :style="{
          width: `${item.size}px`,
          height: `${item.size}px`,
          background: `var(--var-snow-color-${item.color})`,
          left: `${item.left}%`,
          animationName: `drop-${item.animate}`,
          animationDelay: `${item.delay}s`,
        }"
        class="snow-drop"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "snow",
  props: {
    nums: {
      // 降雪量
      type: Number,
      default: 100,
    },
  },
  data() {
    return {
      snow: [],
    };
  },
  mounted() {
    const snow = [];
    for (let i = 0; i < this.nums; i++) {
      let r1 = Math.random();
      let r2 = Math.random();
      let r3 = Math.random();
      let r4 = Math.random();
      snow.push({
        left: r1 * 100,
        delay: r2 * 20,
        color: Math.floor(r1 * 6),
        size: r3 * 10,
        animate: Math.floor(r4 * 6),
      });
    }
    this.snow = snow;
  },
};
</script>

<style scoped>
.snow-container {
  width: 100%;
  height: 100%;
}

.snow-bg {
  --var-snow-color-0: rgba(255, 255, 255, 1);
  --var-snow-color-1: rgba(255, 255, 255, 0.9);
  --var-snow-color-2: rgba(255, 255, 255, 0.8);
  --var-snow-color-3: rgba(255, 255, 255, 0.5);
  --var-snow-color-4: rgba(255, 255, 255, 0.3);
  --var-snow-color-5: rgba(255, 255, 255, 0.2);

  background: linear-gradient(
    to top right,
    rgba(215, 221, 232, 1) 0%,
    rgb(166, 175, 199) 100%
  );
}

.snow {
  position: relative;
  width: 100%;
  height: 100%;
}

/* 雪花 */
.snow-drop {
  position: absolute;
  border-radius: 50%;
  transform: translateY(-100%);
  animation: 20s linear infinite;
}

@keyframes drop-0 {
  0% {
    top: 0;
  }
  100% {
    left: 100%;
    top: 100%;
  }
}

@keyframes drop-1 {
  0% {
    top: 0;
  }
  100% {
    left: 80%;
    top: 100%;
  }
}

@keyframes drop-2 {
  0% {
    top: 0;
  }
  100% {
    left: 60%;
    top: 100%;
  }
}
@keyframes drop-3 {
  0% {
    top: 0;
  }
  100% {
    left: 40%;
    top: 100%;
  }
}
@keyframes drop-4 {
  0% {
    top: 0;
  }
  100% {
    left: 20%;
    top: 100%;
  }
}
@keyframes drop-5 {
  0% {
    top: 0;
  }
  100% {
    left: 0;
    top: 100%;
  }
}
</style>