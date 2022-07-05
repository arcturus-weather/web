<template>
  <q-dialog
    :v-model="visible"
    @update:model-value="(value) => $emit('update:model-value', value)"
  >
    <q-card>
      <!-- date -->
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ $d(daily!.dateTime, 'long') }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <!-- detail info -->
      <q-card-section class="row items-center">
        <div class="col-12 row justify-center">
          <!-- day -->
          <div class="col-6 column justify-center items-center q-mb-md">
            <div class="">{{ $t('weather.max') }}</div>
            <i-icon :name="daily!.dayIcon" :size="70"></i-icon>
            <div>{{ daily!.dayDesc }}, {{ daily!.temperature.max }}°</div>
            <q-icon name="air" size="20px"></q-icon>
            <div>{{ daily!.dayWind.windDir }}</div>
            <div>
              {{ daily!.dayWind.windSpeed }}km/h /
              {{ daily!.dayWind.windScale }}
            </div>
          </div>
          <!-- night -->
          <div
            v-if="daily!.nightIcon"
            class="col-6 column justify-center items-center q-mb-md"
          >
            <div class="">{{ $t('weather.min') }}</div>
            <i-icon :name="daily!.nightIcon" :size="70"></i-icon>
            <div>{{ daily!.dayDesc }}, {{ daily!.temperature.min }}°</div>
            <q-icon name="air" size="20px"></q-icon>
            <div>{{ daily!.dayWind.windDir }}</div>
            <div>
              {{ daily!.dayWind.windSpeed }}km/h /
              {{ daily!.dayWind.windScale }}
            </div>
          </div>
        </div>
        <!-- sun and moon -->
        <div class="col-12 row q-my-md">
          <div
            class="col-3 column items-center"
            v-for="(item, idx) in astronomy"
            :key="idx"
          >
            <q-icon :name="item.icon" size="20px"></q-icon>
            <div>{{ $d(item.time, 'time2') }}</div>
          </div>
        </div>
        <!-- detail info -->
        <div class="grid col-12">
          <div
            class="column justify-center items-center"
            v-for="(item, idx) in other"
            :key="idx"
          >
            <q-icon :name="item.icon" size="20px"></q-icon>
            <div>{{ $t(`weather.${item.label}`) }}</div>
            <div>{{ item.value }}</div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useWeatherStore } from 'src/stores/stores';
import { storeToRefs } from 'pinia';

const { current } = storeToRefs(useWeatherStore());

interface Other {
  label: string;
  value: number | string;
  icon: string;
}

export default defineComponent({
  name: 'iceDailyPanel',

  props: {
    visible: {
      default: false,
      type: Boolean,
    },
    idx: Number,
  },

  emits: ['update:model-value'],

  computed: {
    daily() {
      return current!.value?.daily[this.idx];
    },

    astronomy() {
      const d = this.daily as IDailyItem;
      return [
        {
          icon: 'mdi-weather-sunset-up',
          time: d.sun.sunRise,
        },
        {
          icon: 'mdi-weather-sunset-down',
          time: d.sun.sunSet,
        },
        {
          icon: 'mdi-weather-night',
          time: d.moon.moonRise,
        },
        {
          icon: 'mdi-weather-night',
          time: d.moon.moonSet,
        },
      ];
    },

    other() {
      const d = this.daily as IDailyItem;
      const res: Other[] = [
        {
          label: 'humidity',
          value: `${d.humidity}%`,
          icon: 'water_drop',
        },
        {
          label: 'pressure',
          value: `${d.pressure}hpa`,
          icon: 'speed',
        },
      ];

      if (d.dewPoint) {
        res.push({
          label: 'dew',
          value: `${d.dewPoint}°`,
          icon: 'mdi-thermometer-lines',
        });
      }

      if (d.clouds) {
        res.push({
          label: 'coluds',
          value: d.clouds,
          icon: 'cloud',
        });
      }

      if (d.uvIndex) {
        res.push({
          label: 'uvIndex',
          value: d.uvIndex,
          icon: 'beach_access',
        });
      }

      if (d.visibility) {
        res.push({
          label: 'visibility',
          value: `${d.visibility}km`,
          icon: 'visibility',
        });
      }

      if (typeof d.pop !== 'undefined') {
        res.push({
          label: 'precipChance',
          value: `${d.pop}%`,
          icon: 'mdi-weather-rainy',
        });
      }

      if (typeof d.precip !== 'undefined') {
        res.push({
          label: 'precipitation',
          value: `${d.precip}mm`,
          icon: 'mdi-weather-pouring',
        });
      }

      return res;
    },
  },

  setup() {
    return { current };
  },
});
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}
</style>
