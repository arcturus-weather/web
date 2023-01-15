<template>
  <q-dialog
    :v-model="visible"
    @update:model-value="(value) => $emit('update:model-value', value)"
  >
    <q-card class="card-border">
      <!-- public time -->
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ $d(daily.dateTime, 'long') }}</div>
        <q-space />
        <q-btn icon="fa-solid fa-xmark" flat round dense v-close-popup />
      </q-card-section>

      <!-- detail info -->
      <q-card-section class="row items-center" style="width: 350px">
        <div class="row justify-center q-mb-lg col-12">
          <div
            v-for="(item, idx) in maxAndMin"
            :key="idx"
            class="col-6 column justify-center items-center"
          >
            <div>{{ $t(item.label) }}</div>

            <i-icon :name="item.icon" :size="70"></i-icon>

            <div class="q-mb-lg">
              {{ $t(item.desc) }}, {{ $t(item.tempLabel) }} {{ item.temp }}°
            </div>

            <q-icon name="fa-solid fa-wind" size="20px"></q-icon>

            <div>{{ $t(item.windDir) }}</div>

            <div>{{ item.windSpeed }}km/h / {{ item.windScale }}</div>
          </div>
        </div>

        <div class="grid col-12">
          <!-- sun & moon time -->
          <div
            class="column items-center"
            v-for="(item, idx) in astronomy"
            :key="idx"
          >
            <q-icon :name="item.icon" size="20px"></q-icon>
            <div>{{ $t(item.label) }}</div>
            <div>{{ $d(item.time, 'time') }}</div>
          </div>

          <div
            class="column justify-center items-center"
            v-for="(item, idx) in other"
            :key="idx"
          >
            <q-icon :name="item.icon" size="20px"></q-icon>

            <div>{{ $t(item.label) }}</div>

            <div>{{ item.value }}</div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'iceDailyPanel',
});
</script>

<script lang="ts" setup>
import { computed } from 'vue';
import { useWeatherStore } from '@stores/stores';
import { isDef } from '@utils/utils';
import { storeToRefs } from 'pinia';

const { current } = storeToRefs(useWeatherStore());

interface OtherInfo {
  label: string;
  value: number | string;
  icon: string;
}

interface Astro {
  icon: string;
  time: Date;
  label: string;
}

interface MaxAndMin {
  label: string;
  temp: number;
  tempLabel: string;
  desc: string;
  icon: string;
  windDir: string;
  windSpeed: number;
  windScale: string | number;
}

const props = defineProps({
  visible: {
    default: false,
    type: Boolean,
  },
  idx: {
    required: true,
    type: Number,
  },
});

defineEmits(['update:model-value']);

const daily = computed(() => {
  return current.value!.dailys[props.idx];
});

const maxAndMin = computed(() => {
  const d = daily.value as IDaily;

  const res: MaxAndMin[] = [
    {
      label: 'date.day',
      tempLabel: 'weather.temperature.max',
      temp: d.temperature.max,
      desc: `weather.desc.${d.dayDesc}`,
      icon: d.dayIcon,
      windDir: `weather.wind.dir.${d.dayWind.windDir}`,
      windSpeed: d.dayWind.windSpeed,
      windScale: d.dayWind.windScale,
    },
    {
      label: 'date.night',
      tempLabel: 'weather.temperature.min',
      temp: d.temperature.min,
      desc: `weather.desc.${d.nightDesc}`,
      icon: d.nightIcon,
      windDir: `weather.wind.dir.${d.nightWind.windDir}`,
      windSpeed: d.nightWind.windSpeed,
      windScale: d.nightWind.windScale,
    },
  ];

  return res;
});

const astronomy = computed(() => {
  const d = daily.value as IDaily;

  const res: Astro[] = [];

  if (isDef(d.sun.sunrise)) {
    res.push({
      icon: 'fa-solid fa-sun',
      time: d.sun.sunrise!,
      label: 'weather.astronomy.sunrise',
    });
  }

  if (isDef(d.sun.sunset)) {
    res.push({
      icon: 'fa-solid fa-sun',
      time: d.sun.sunset!,
      label: 'weather.astronomy.sunset',
    });
  }

  if (isDef(d.moon?.moonrise)) {
    res.push({
      icon: 'fa-solid fa-moon',
      time: d.moon!.moonrise,
      label: 'weather.astronomy.moonrise',
    });
  }

  if (isDef(d.moon?.moonset)) {
    res.push({
      icon: 'fa-solid fa-moon',
      time: d.moon!.moonset,
      label: 'weather.astronomy.moonset',
    });
  }

  return res;
});

const other = computed(() => {
  const d = daily.value as IDaily;

  const res: OtherInfo[] = [];

  if (isDef(d.humidity)) {
    res.push({
      label: 'weather.humidity',
      value: `${d.humidity}%`,
      icon: 'fa-solid fa-droplet',
    });
  }

  if (isDef(d.pressure)) {
    res.push({
      label: 'weather.pressure',
      value: `${d.pressure}hpa`,
      icon: 'fa-solid fa-gauge',
    });
  }

  if (isDef(d.clouds)) {
    res.push({
      label: 'weather.coluds',
      value: `${d.clouds}%`,
      icon: 'fa-solid fa-cloud',
    });
  }

  if (isDef(d.uvIndex)) {
    res.push({
      label: 'weather.uvIndex',
      value: d.uvIndex!,
      icon: 'fa-solid fa-umbrella-beach',
    });
  }

  if (isDef(d.visibility)) {
    res.push({
      label: 'weather.visibility',
      value: `${d.visibility}km`,
      icon: 'fa-solid fa-eye',
    });
  }

  if (isDef(d.pop)) {
    res.push({
      label: 'weather.precipChance',
      value: `${d.pop}%`,
      icon: 'fa-solid fa-percent',
    });
  }

  if (isDef(d.precip)) {
    res.push({
      label: 'weather.precipitation',
      value: `${d.precip}mm`,
      icon: 'fa-solid fa-cloud-showers-heavy',
    });
  }

  return res;
});
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}
</style>
