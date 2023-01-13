<template>
  <q-dialog
    :v-model="visible"
    @update:model-value="(value) => $emit('update:model-value', value)"
  >
    <q-card class="card-border">
      <!-- date -->
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ $d(hour!.dateTime, 'long') }}</div>
        <q-space />
        <q-btn icon="fa-solid fa-xmark" flat round dense v-close-popup />
      </q-card-section>

      <!-- detail info -->
      <q-card-section class="column items-center" style="width: 350px">
        <div class="column justify-center items-center q-mb-md">
          <i-icon :name="hour!.icon" :size="70"></i-icon>
          <div>{{ hour!.description }}, {{ hour!.temperature.day }}°</div>
        </div>

        <div class="grid">
          <div class="column justify-center items-center">
            <q-icon name="fa-solid fa-wind" size="20px"></q-icon>
            <div>{{ hour!.wind.windDir }}</div>
            <div>
              {{ hour!.wind.windSpeed }}km/h / {{ hour!.wind.windScale }}
            </div>
          </div>
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
import { useWeatherStore } from '@src/stores/stores';
import { storeToRefs } from 'pinia';

const { current } = storeToRefs(useWeatherStore());

interface Other {
  label: string;
  value: number | string;
  icon: string;
}

export default defineComponent({
  name: 'iceHourlyPanel',

  props: {
    visible: {
      default: false,
      type: Boolean,
    },
    idx: Number,
  },

  emits: ['update:model-value'],

  computed: {
    hour() {
      return current!.value?.hourly[this.idx];
    },

    other() {
      const h = this.hour as IWeatherItem;

      const res: Other[] = [
        {
          label: 'dew',
          value: `${h.dewPoint}°`,
          icon: 'fa-solid fa-temperature-low',
        },
        {
          label: 'humidity',
          value: `${h.humidity}%`,
          icon: 'fa-solid fa-droplet',
        },
        {
          label: 'pressure',
          value: `${h.pressure}hpa`,
          icon: 'fa-solid fa-gauge',
        },
      ];

      if (h.clouds) {
        res.push({
          label: 'coluds',
          value: h.clouds,
          icon: 'fa-solid fa-cloud',
        });
      }

      if (h.uvIndex) {
        res.push({
          label: 'uvIndex',
          value: h.uvIndex,
          icon: 'fa-solid fa-umbrella-beach',
        });
      }

      if (h.visibility) {
        res.push({
          label: 'visibility',
          value: `${h.visibility}km`,
          icon: 'fa-solid fa-eye',
        });
      }

      if (typeof h.pop !== 'undefined') {
        res.push({
          label: 'precipChance',
          value: `${h.pop}%`,
          icon: 'fa-solid fa-percent',
        });
      }

      if (typeof h.precip !== 'undefined') {
        res.push({
          label: 'precipitation',
          value: `${h.precip}mm`,
          icon: 'fa-solid fa-cloud-showers-heavy',
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
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}
</style>

