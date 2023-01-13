<template>
  <q-card flat bordered style="height: 100%" class="card-border">
    <div style="height: 100%" class="column">
      <q-card-section>
        <div class="text-bold">{{ $t('weather.aqi') }}</div>
        <!-- public time -->
        <div class="text-caption">
          {{ $t('date.pubTime') }}: {{ $d(air!.air.dateTime, 'long') }}
        </div>
      </q-card-section>

      <q-card-section class="column justify-between" style="flex: 1">
        <!-- air quality -->
        <div class="text-h2 text-bold" :style="{ color: aqiColor }">
          {{ air?.air.aqi }}
          <span class="text-h5">{{ $t(`weather.air.${category}`) }}</span>
        </div>

        <!-- radio -->
        <div
          class="bar"
          :style="{
            background: `linear-gradient(to right, ${barColor})`,
          }"
        >
          <div
            class="circle"
            :style="{
              left: `${offset}%`,
            }"
          ></div>
        </div>

        <!-- pollutions -->
        <div class="row justify-between">
          <div
            v-for="(item, idx) in pollutions"
            :key="idx"
            class="column items-center"
          >
            <div class="text-bold">{{ item.value }}</div>
            <div class="text-caption">{{ item.label }}</div>
          </div>
        </div>
      </q-card-section>
    </div>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'iceAir',
});
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { aqiCategory, pollutionsMap } from '@utils/weather/tools';
import { useWeatherStore } from '@src/stores/stores';
import { aqiColors } from '@utils/weather/color';

const { current: air } = storeToRefs(useWeatherStore());

const barColor = ref(
  Object.keys(aqiColors)
    .map((el) => aqiColors[el as keyof typeof aqiColors])
    .join(',')
);

const category = computed(() => {
  return aqiCategory(air.value?.air.aqi);
});

const aqiColor = computed(() => {
  return aqiColors[category.value as keyof typeof aqiColors];
});

const offset = computed(() => {
  return air.value!.air.aqi / 5;
});

const pollutions = computed(() => {
  return Object.entries(air.value!.air.components).map(([k, v]) => ({
    label: pollutionsMap[k as keyof typeof pollutionsMap],
    value: v,
  }));
});
</script>

<style scoped lang="scss">
.bar {
  $radius: 10px;

  height: $radius;
  border-radius: $radius / 2;
  margin: 10px 0;
  position: relative;

  .circle {
    position: absolute;
    top: 50%;
    height: $radius * 1.5;
    width: $radius * 1.5;
    border: 2px solid #e4e7ed;
    background: #fff;
    border-radius: 50%;
    transform: translateY(-50%);
  }
}
</style>

