<template>
  <!-- 沙尘天 -->
  <div class="sand-container sand-bg">
    <div class="sand">
      <div
        v-for="(item, index) in sand"
        :key="index"
        class="sand-fly"
        :style="{
          width: `${item.size}px`,
          height: `${item.size}px`,
          background: `var(--var-sand-color-${item.color})`,
          top: `${item.top}%`,
          animationName: `fly-${item.animate}`,
          animationDelay: `${item.delay}s`,
        }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "sand",
  props: {
    nums: {
      type: Number,
      default: 100,
    },
  },
  data() {
    return {
      sand: [],
    };
  },
  mounted() {
    // 生成沙尘及其位置
    const sand = [];
    for (let i = 0; i < this.nums; i++) {
      let r1 = Math.random();
      let r2 = Math.random();
      let r3 = Math.random();
      let r4 = Math.random();
      sand.push({
        top: r1 * 50,
        delay: r2 * 20,
        color: Math.floor(r1 * 6),
        size: r3 * 10,
        animate: Math.floor(r4 * 5),
      });
    }
    this.sand = sand;
  },
};
</script>

<style scoped>
.sand-container {
  width: 100%;
  height: 100%;
}

.sand-bg {
  --var-sand-color-0: rgba(61, 46, 31, 0.6);
  --var-sand-color-1: rgba(61, 46, 31, 0.5);
  --var-sand-color-2: rgba(61, 46, 31, 0.4);
  --var-sand-color-3: rgba(61, 46, 31, 0.3);
  --var-sand-color-4: rgba(61, 46, 31, 0.2);
  --var-sand-color-5: rgba(61, 46, 31, 0.1);

  background: linear-gradient(
    to top right,
    rgb(207, 156, 104) 0%,
    rgb(184, 138, 95) 100%
  );
}

.sand {
  position: relative;
  width: 100%;
  height: 100%;
}

.sand-fly {
  position: absolute;
  border-radius: 50%;
  transform: translateX(-100%);
  animation: 2s linear infinite;
}

@keyframes fly-0 {
  0% {
    left: 0;
  }

  100% {
    left: 100%;
    top: 10%;
  }
}

@keyframes fly-1 {
  0% {
    left: 0;
  }

  100% {
    left: 100%;
    top: 20%;
  }
}

@keyframes fly-2 {
  0% {
    left: 0;
  }

  100% {
    left: 100%;
    top: 30%;
  }
}

@keyframes fly-3 {
  0% {
    left: 0;
  }

  100% {
    left: 100%;
    top: 40%;
  }
}

@keyframes fly-4 {
  0% {
    left: 0;
  }

  100% {
    left: 100%;
    top: 50%;
  }
}
</style>