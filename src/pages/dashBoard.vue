<template>
  <q-page>
    <ice-skeleton></ice-skeleton>
    <q-page-sticky
      style="z-index: 999"
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-btn fab icon="search" color="primary" @click="mapVisible = true" />
    </q-page-sticky>

    <!-- 隐藏页面 -->
    <ice-map v-model="mapVisible" @confirm="confirm"></ice-map>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import iceMap from 'src/components/ice-map.vue';
import { useLocationStore, useWeatherStore } from 'stores/stores';
import iceSkeleton from 'src/layouts/Skeleton.vue';
const location = useLocationStore();
const weather = useWeatherStore();

export default defineComponent({
  name: 'dashBoardPage',

  components: { iceMap, iceSkeleton },

  methods: {
    confirm(e: IMapData) {
      location.changeLocation(e);
    },
  },

  setup() {
    const air = ref<HTMLElement | null>(null);

    weather.getAllWeather().then(() => {});

    return {
      mapVisible: ref(false),
      air,
    };
  },
});
</script>

<style lang="scss" scoped>
.info__container {
  .height {
    height: 200px;
  }
}
</style>
