<template>
  <q-page>
    <div class="row skeleton__container">
      <div class="col-9 column height__100 q-pa-md">
        <div class="row item-stretch">
          <!-- main -->
          <div class="col-8 q-pr-xs">
            <ice-main :visible="ready"></ice-main>
          </div>
          <!-- aqi panel -->
          <div class="col-4">
            <ice-air :visible="ready"></ice-air>
          </div>
          <!-- sun and moon -->
          <div class="col-4 q-mt-md">
            <ice-astronomy :visible="ready"></ice-astronomy>
          </div>
          <!-- 风速,气压等 -->
          <div class="col-8 q-mt-md q-pl-xs gutter">
            <div v-for="i in 4" :key="i">
              <q-card flat bordered style="height: 100%">
                <q-card-section>
                  <q-skeleton height="80px"></q-skeleton>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </div>
      <!-- weather data -->
      <div class="col-3 row">
        <q-separator vertical class="height__100" />
        <div class="column height__100 width__100 justify-between q-pa-md">
          <ice-hourly :visible="ready"></ice-hourly>
          <ice-daily :visible="ready"></ice-daily>
        </div>
      </div>
    </div>
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
import iceMain from 'components/ice-main.vue';
import iceAir from 'components/ice-air.vue';
import iceAstronomy from 'components/ice-astronomy.vue';
import iceHourly from 'components/ice-hourly.vue';
import iceDaily from 'components/ice-daily.vue';
import { storeToRefs } from 'pinia';
import { defineComponent, ref } from 'vue';
import iceMap from 'src/components/ice-map.vue';
import { useLocationStore, useWeatherStore } from 'stores/stores';

const location = useLocationStore();
const weather = useWeatherStore();

export default defineComponent({
  name: 'dashBoardPage',

  components: { iceMap, iceMain, iceAir, iceAstronomy, iceHourly, iceDaily },

  methods: {
    confirm(e: IMapData) {
      location.changeLocation(e);
    },
  },

  setup() {
    const { ready } = storeToRefs(weather);

    weather.getAllWeather();

    return { ready, mapVisible: ref(false) };
  },
});
</script>

<style lang="scss" scoped>
.skeleton__container {
  height: 100vh;

  .height__100 {
    height: 100%;
  }

  .width__100 {
    width: calc(100% - 1px);
  }

  .gutter {
    display: grid;
    grid-gap: 4px;
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
