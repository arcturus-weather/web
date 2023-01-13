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
        <div class="col-xs-12 col-sm-6 col-md-3 q-pa-sm">
          <ice-astronomy></ice-astronomy>
        </div>

        <!-- daily -->
        <div class="col-xs-12 col-sm-6 col-md-3 q-pa-sm daily_card">
          <ice-daily></ice-daily>
        </div>

        <!-- hourly -->
        <div class="col-xs-12 q-pa-sm hourly_card">
          <ice-hourly></ice-hourly>
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
  $daily_height: 360px;
  $hourly_height: 300px;
  @include bs;

  @media screen and (max-width: 600px) {
    padding-bottom: 72px; // 这是 tabbar 高度
  }

  .daily_card {
    height: $daily_height;
    @include bs;
  }

  .hourly_card {
    height: $hourly_height;
    @include bs;
  }
}

.loading-wrapper {
  height: 100vh;
}
</style>

