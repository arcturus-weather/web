<template>
  <q-card
    class="row card-border main-wrapper"
    flat
    bordered
    style="height: 100%"
  >
    <div class="search-btn-wrapper q-gutter-md">
      <q-btn
        round
        unelevated
        icon="fa-solid fa-droplet"
        @click="weather.openPrecip = true"
      >
        <q-badge rounded color="red" floating v-if="isPrecip" />
      </q-btn>

      <q-btn
        round
        unelevated
        icon="fa-solid fa-arrows-rotate"
        @click="useWeatherStore().getWeather()"
      />

      <q-btn
        round
        unelevated
        icon="fa-solid fa-magnifying-glass"
        @click="openMap = true"
      />
    </div>

    <q-card-section class="justify-between column" style="width: 100%">
      <div class="column q-mb-md">
        <i-icon :name="currentWeather!.now.icon" :size="100"></i-icon>
        <div
          class="text-h2 q-mb-md text-center text-bold"
          style="height: 80px; width: 80px; line-height: 80px"
        >
          {{ currentWeather!.now.temperature }}°
        </div>

        <div>
          {{ currentWeather!.now.description }},
          {{ currentWeather!.now.feelsLike }}
        </div>
      </div>

      <q-separator />

      <!-- current location -->
      <div class="row items-center clickable q-my-md" @click="openMap = true">
        <q-icon name="fa-solid fa-location-dot" size="20px"></q-icon>
        <div class="ellipsis q-ml-sm" style="width: 120px">
          {{ currentLocation.address }}
        </div>
      </div>

      <!-- public time -->
      <div class="row items-center">
        <q-icon name="fa-solid fa-calendar-days" size="20px"></q-icon>
        <div class="q-ml-sm">
          {{ $d(currentWeather!.now.dateTime, 'long') }}
        </div>
      </div>
    </q-card-section>
  </q-card>

  <ice-map
    v-model="openMap"
    @confirm="confirm"
    :lat="loc.latitude"
    :lng="loc.longitude"
    :addr="loc.address"
    :city="loc.city"
  ></ice-map>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'iceMain',
});
</script>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useLocationStore, useWeatherStore } from '@stores/stores';
import { storeToRefs } from 'pinia';
import iceMap from 'src/components/ice-map.vue';

const weather = useWeatherStore();

const { current: currentLocation } = storeToRefs(useLocationStore());
const { current: currentWeather } = storeToRefs(weather);

const location = useLocationStore();

function confirm(e: IMapData) {
  location.changeLocation(e);
}

const { current: loc } = storeToRefs(location);

const openMap = ref(false);

const isPrecip = computed(
  () => currentWeather.value!.precip.minutely.length !== 0
);
</script>

<style lang="scss" scoped>
.main-wrapper {
  position: relative;
}

.search-btn-wrapper {
  position: absolute;
  z-index: 10;
  right: 12px;
  top: 12px;
}
</style>
