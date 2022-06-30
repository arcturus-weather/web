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
    <ice-air-panel v-model="airVisible" @confirm="confirm"></ice-air-panel>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, ref } from 'vue';
import iceMap from 'src/components/ice-map.vue';
import iceAirPanel from 'src/components/ice-air-panel.vue';
import { useLocationStore, useWeatherStore } from 'stores/stores';
// import { guage } from 'utils/antv';
import iceSkeleton from 'src/layouts/Skeleton.vue';
const location = useLocationStore();
const weather = useWeatherStore();

export default defineComponent({
  name: 'dashBoardPage',

  components: { iceMap, iceAirPanel, iceSkeleton },

  methods: {
    confirm(e: IMapData) {
      location.changeLocation(e);
    },
  },

  setup() {
    const air = ref<HTMLElement | null>(null);

    onMounted(() => {
      nextTick(() => {
        weather.getAllWeather().then(() => {});
      });
    });

    return {
      mapVisible: ref(false),
      airVisible: ref(false),
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
