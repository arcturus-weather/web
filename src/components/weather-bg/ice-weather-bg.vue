<template>
  <div class="weather-bg-container">
    <!-- 晴天 -->
    <sun v-if="name === 'sun'"></sun>
    <!-- 多云 -->
    <cloudy v-if="name === 'cloudy'"></cloudy>
    <!-- 雨天 -->
    <rain v-if="name === 'rain'"></rain>
    <!-- 雪天 -->
    <snow v-if="name === 'snow'"></snow>
    <!-- 沙尘 -->
    <sand v-if="name === 'sand'"></sand>
    <!-- 阴天 -->
    <overcast v-if="name === 'overcast'"></overcast>
    <!-- 雾天 -->
    <fog v-if="name === 'fog'"></fog>
  </div>
</template>

<script>
import cloudy from "./cloudy.vue";
import fog from "./fog.vue";
import rain from "./rain.vue";
import sand from "./sand.vue";
import sun from "./sun.vue";
import overcast from "./overcast.vue";
import snow from "./snow.vue";

export default {
  name: "ice-weather-bg",
  components: {
    cloudy,
    fog,
    rain,
    sand,
    sun,
    overcast,
    snow,
  },
  props: {
    name: {
      default: "sun",
      type: String,
    },
  },
};
</script>

<style scoped>
.weather-bg-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>