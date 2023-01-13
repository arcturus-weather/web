<template>
  <q-dialog
    :v-model="visible"
    @update:model-value="(value) => $emit('update:model-value', value)"
  >
    <q-card>
      <!-- date -->
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ $d(hour!.dateTime, 'long') }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <!-- detail info -->
      <q-card-section
        class="column items-center"
        style="width: 350px;"
      >
        <div class="column justify-center items-center q-mb-md">
          <i-icon :name="hour!.icon" :size="70"></i-icon>
          <div>{{ hour!.description }}, {{ hour!.temperature.day }}°</div>
        </div>
        <div class="grid">
          <div class="column justify-center items-center">
            <q-icon name="air" size="20px"></q-icon>
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
    // 这里也可以直接传个对象过来
    // 但好像直接使用 idx 获取全局状态会更快?
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
          icon: 'mdi-thermometer-lines',
        },
        {
          label: 'humidity',
          value: `${h.humidity}%`,
          icon: 'water_drop',
        },
        {
          label: 'pressure',
          value: `${h.pressure}hpa`,
          icon: 'speed',
        },
      ];

      if (h.clouds) {
        res.push({
          label: 'coluds',
          value: h.clouds,
          icon: 'cloud',
        });
      }

      if (h.uvIndex) {
        res.push({
          label: 'uvIndex',
          value: h.uvIndex,
          icon: 'beach_access',
        });
      }

      if (h.visibility) {
        res.push({
          label: 'visibility',
          value: `${h.visibility}km`,
          icon: 'visibility',
        });
      }

      if (typeof h.pop !== 'undefined') {
        res.push({
          label: 'precipChance',
          value: `${h.pop}%`,
          icon: 'mdi-weather-rainy',
        });
      }

      if (typeof h.precip !== 'undefined') {
        res.push({
          label: 'precipitation',
          value: `${h.precip}mm`,
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
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}
</style>
