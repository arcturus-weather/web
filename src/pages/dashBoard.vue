<template>
  <q-page class="page">
    <q-scroll-area style="height: 100vh" :thumb-style="{ width: '0px' }">
      <div
        v-if="!ready"
        class="loading-wrapper flex justify-center items-center"
      >
        <q-circular-progress
          indeterminate
          rounded
          size="50px"
          color="orange-5"
          class="q-ma-md"
        />
      </div>
      <div v-else class="row items-stretch home-page-wrapper">
        <!-- main -->
        <div class="col-xs-12 col-sm-6 col-md-3 q-pa-sm">
          <ice-main></ice-main>
        </div>
        <!-- aqi -->
        <div class="col-xs-12 col-sm-6 col-md-3 q-pa-sm">
          <ice-air></ice-air>
        </div>
        <!-- sun and moon -->
        <div class="col-xs-12 col-sm-6 col-md-3 q-pa-sm card">
          <ice-astronomy></ice-astronomy>
        </div>
        <!-- hourly -->
        <div class="col-xs-12 col-sm-12 col-md-9 q-pa-sm card">
          <ice-hourly></ice-hourly>
        </div>

        <!-- daily -->
        <div class="col-xs-12 col-sm-12 col-md-5 q-pa-sm card_2">
          <ice-daily></ice-daily>
        </div>
      </div>
    </q-scroll-area>
  </q-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'dashBoardPage',
});
</script>

<script lang="ts" setup>
import iceMain from 'components/ice-main.vue';
import iceAir from 'components/ice-air.vue';
import iceAstronomy from 'components/ice-astronomy.vue';
import iceHourly from 'components/ice-hourly.vue';
import iceDaily from 'components/ice-daily.vue';
import { storeToRefs } from 'pinia';
import { useLocationStore, useWeatherStore } from '@stores/stores';

const location = useLocationStore();

const { ready } = storeToRefs(useWeatherStore());

if (process.env.NODE_ENV === 'development') {
  useWeatherStore().getAllWeather();
} else {
  location.getLocation();
}
</script>

<style lang="scss" scoped>
@mixin bs {
  box-sizing: border-box;
}

.home-page-wrapper {
  $height: 300px;
  $height_2: 360px;
  @include bs;

  @media screen and (max-width: 600px) {
    padding-bottom: 72px; // 这是 tabbar 高度
  }

  .card {
    height: $height;
    @include bs;
  }

  .card_2 {
    height: $height_2;
    @include bs;
  }
}

.loading-wrapper {
  height: 100vh;
}
</style>

