<template>
  <q-dialog
    :v-model="visible"
    @update:model-value="(value) => $emit('update:model-value', value)"
    @show="init"
  >
    <q-card class="card-border">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ $t('weather.precipitation') }}</div>
        <q-space />
        <q-btn icon="fa-solid fa-xmark" flat round dense v-close-popup />
      </q-card-section>

      <div class="q-px-md" ref="plot" style="height: 160px; width: 400px"></div>

      <q-card-section>
        {{ currentWeather!.precip.summary }}
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'icePrecip',
});
</script>

<script setup lang="ts">
import { useWeatherStore } from '@src/stores/stores';
import { storeToRefs } from 'pinia';
import { defineProps, ref, defineEmits } from 'vue';
import { Area } from '@antv/g2plot';
import { date } from 'quasar';

const { current: currentWeather } = storeToRefs(useWeatherStore());

const plot = ref<HTMLDivElement | null>(null);

defineEmits(['update:model-value']);

interface Precip {
  precip: number;
  label: string;
}

function area(dom: HTMLDivElement | null | string, data: Precip[]) {
  const area = new Area(dom ?? 'area', {
    data,
    yField: 'precip',
    xField: 'label',
    startOnZero: false,
    yAxis: {
      range: [0.1, 1],
      grid: {
        line: {
          style: {
            lineDash: [5, 2],
            stroke: '#EBEEF5',
            lineWidth: 1,
          },
        },
      },
    },
    xAxis: {
      line: null,
      range: [0, 1],
      grid: {
        line: {
          style: {
            lineDash: [5, 2],
            stroke: '#EBEEF5',
            lineWidth: 1,
          },
        },
      },
      label: {
        offset: 1,
      },
      tickCount: 6,
    },
    autoFit: true,
    renderer: 'svg',
    areaStyle: () => {
      return {
        fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
      };
    },
    smooth: true,
  });

  area.render();
}

defineProps({
  visible: {
    default: false,
    type: Boolean,
  },
});

const init = function () {
  area(
    plot.value,
    currentWeather.value!.precip.minutely.map((e) => ({
      precip: e.value,
      label: date.formatDate(e.dateTime, 'HH:mm'),
    }))
  );
};
</script>
