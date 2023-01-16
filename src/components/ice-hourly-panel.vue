<template>
  <q-dialog
    :v-model="visible"
    @update:model-value="(value) => $emit('update:model-value', value)"
  >
    <q-card class="card-border">
      <!-- date -->
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ $d(hour.dateTime, 'long') }}</div>
        <q-space />
        <q-btn icon="fa-solid fa-xmark" flat round dense v-close-popup />
      </q-card-section>

      <!-- detail info -->
      <q-card-section class="column items-center" style="width: 350px">
        <div class="column justify-center items-center q-mb-lg">
          <i-icon
            :name="hour.icon"
            :size="70"
            :type="weather.strategies"
          ></i-icon>

          <div>
            {{ $t(`weather.desc.${hour.description}`) }},
            {{ hour.temperature }}°
          </div>
        </div>

        <div class="grid">
          <div
            class="column justify-center items-center"
            v-for="(item, idx) in other"
            :key="idx"
          >
            <q-icon :name="item.icon" size="20px"></q-icon>

            <div>{{ $t(`${item.label}`) }}</div>

            <div>{{ item.value }}</div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { isDef } from '@src/utils/utils';

export default defineComponent({
  name: 'iceHourlyPanel',
});
</script>

<script lang="ts" setup>
import { computed } from 'vue';
import { useWeatherStore } from '@src/stores/stores';
import { storeToRefs } from 'pinia';

const weather = useWeatherStore();
const { current } = storeToRefs(weather);

interface Other {
  label: string;
  value: number | string;
  icon: string;
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

const hour = computed(() => {
  return current.value!.hourlys[props.idx];
});

const other = computed(() => {
  const h = hour.value as IHourly;

  const res: Other[] = [];

  res.push({
    label: `weather.wind.dir.${h.wind.windDir}`,
    value: `${h.wind.windSpeed} km/h, ${h.wind.windScale}`,
    icon: 'fa-solid fa-wind',
  });

  if (isDef(h.dewPoint)) {
    res.push({
      label: 'weather.dew',
      value: `${h.dewPoint}°`,
      icon: 'fa-solid fa-temperature-low',
    });
  }

  if (isDef(h.humidity)) {
    res.push({
      label: 'weather.humidity',
      value: `${h.humidity}%`,
      icon: 'fa-solid fa-droplet',
    });
  }

  if (isDef(h.pressure)) {
    res.push({
      label: 'weather.pressure',
      value: `${h.pressure}hpa`,
      icon: 'fa-solid fa-gauge',
    });
  }

  if (isDef(h.clouds)) {
    res.push({
      label: 'weather.coluds',
      value: `${h.clouds}%`,
      icon: 'fa-solid fa-cloud',
    });
  }

  if (isDef(h.visibility)) {
    res.push({
      label: 'weather.visibility',
      value: `${h.visibility}km`,
      icon: 'fa-solid fa-eye',
    });
  }

  if (isDef(h.pop)) {
    res.push({
      label: 'weather.precipChance',
      value: `${h.pop}%`,
      icon: 'fa-solid fa-percent',
    });
  }

  if (isDef(h.precip)) {
    res.push({
      label: 'weather.precipitation',
      value: `${h.precip}mm`,
      icon: 'fa-solid fa-cloud-showers-heavy',
    });
  }

  return res;
});
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}
</style>
