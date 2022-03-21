<template>
  <div class="progress-container" ref="progress">
    <div class="progress-bar" :style="progressStyle"></div>
    <div class="progress-content">
      <div class="progress-desc">
        {{ desc }}<span class="sub">{{ sub }}</span>
      </div>
      <div class="progress-value">
        {{ value }}<span class="sub">/{{ max }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ice-aqi-progress",
  props: {
    max: {
      // 最大值
      type: Number,
      defalut: 100,
    },
    min: {
      // 最小值
      type: Number,
      default: 0,
    },
    value: Number, // 当前值
    desc: String,
    sub: String,
    activeColor: {
      // 进度条底色
      type: String,
      default: "#56B37F",
    },
  },
  computed: {
    width() {
      return (this.value / (this.max - this.min)) * 100;
    },
    progressStyle() {
      return {
        backgroundColor: this.activeColor,
        width: `${this.width}%`,
      };
    },
  },
};
</script>

<style scoped>
.progress-container {
  overflow: hidden;
  position: relative;
  padding: 1em;
  border-radius: 0.5em;
  background: #e5e9f2;
  box-sizing: border-box;
}

.progress-bar {
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.progress-content {
  position: relative;
}

.sub {
  font-size: 0.6em;
}

.progress-desc > .sub {
  margin: 0 0.5em;
}

.progress-value {
  font-size: 1.5em;
  font-weight: bold;
  margin-top: 0.5em;
}

.progress-value > .sub {
  font-weight: normal;
}
</style>