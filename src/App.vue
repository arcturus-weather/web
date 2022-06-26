<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useWeatherStore } from 'src/stores/weather';
import 'utils/mock';

export default defineComponent({
  name: 'App',
  setup() {
    const weatherStore = useWeatherStore();

    weatherStore.getAllWeather();
  },
});
</script>
