<template>
  <q-card flat bordered style="height: 100%" class="card-border">
    <q-card-section class="text-bold">
      {{ $t('weather.daily') }}
    </q-card-section>

    <q-scroll-area
      class="height"
      :thumb-style="{
        bottom: '2px',
        borderRadius: '5px',
        opacity: '0.1',
      }"
    >
      <q-list class="row no-wrap height list">
        <q-item
          v-for="(item, idx) in current!.dailys"
          :key="idx"
          clickable
          v-ripple
          @click="openDailyPanel(idx)"
          class="list-item q-px-xs column items-center"
        >
          <div class="up text-center">
            <div>{{ $d(item.dateTime, 'week') }}</div>
            <div class="text-caption">{{ $d(item.dateTime, 'day') }}</div>

            <div>
              <i-icon
                :name="item.dayIcon"
                :size="40"
                :type="weather.strategies"
              ></i-icon>
              <div class="text-center">
                {{ $t(`weather.desc.${item.dayDesc}`) }}
              </div>
            </div>
          </div>

          <div class="down">
            <div class="text-center">
              {{ $t(`weather.desc.${item.nightDesc}`) }}
            </div>
            <i-icon
              v-if="item.nightIcon"
              :name="item.nightIcon"
              :type="weather.strategies"
              :size="40"
            ></i-icon>
          </div>
        </q-item>

        <!-- 双折线图 -->
        <div ref="day" class="graph"></div>
      </q-list>
    </q-scroll-area>
  </q-card>
  <ice-daily-panel v-model="open" :idx="idx"></ice-daily-panel>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'iceDaily',
});
</script>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import iceDailyPanel from '@components/ice-daily-panel.vue';
import { useWeatherStore } from '@stores/stores';
import { storeToRefs } from 'pinia';
import { DualAxes } from '@antv/g2plot';
import { date } from 'quasar';

interface PData {
  x: string;
  pop: number;
}

interface TData {
  x: string;
  temp: number;
  name: string;
}

function createGraph(
  dom: HTMLDivElement | null | string,
  p: PData[],
  t: TData[]
) {
  const dualAxes = new DualAxes(dom ?? 'hour', {
    data: [t, p],
    legend: false, // 关闭图例
    xField: 'x',
    yField: ['temp', 'pop'],
    padding: [0, 20],
    yAxis: {
      pop: {
        range: [0.15, 1],
        label: null,
        line: null,
        max: 100,
      },
      temp: {
        range: [0.25, 0.8],
        tickInterval: 3,
        grid: {
          line: {
            style: {
              stroke: '#EBEEF5',
              opacity: 0.5,
            },
          },
        },
      },
    },
    xAxis: {
      range: [0, 1],
      label: null,
      line: null,
      grid: {
        line: {
          style: {
            stroke: '#EBEEF5',
            opacity: 0.5,
          },
        },
      },
    },
    renderer: 'svg',
    autoFit: true,
    geometryOptions: [
      {
        geometry: 'line',
        seriesField: 'name',
        smooth: true,
        lineStyle: {
          lineWidth: 2,
        },
        point: {
          color: '#F56C6C',
        },
        label: {
          formatter(v) {
            return `${v.temp}°`;
          },
          style: {
            fill: '#C0C4CC',
          },
        },
      },
      {
        // 柱形图
        geometry: 'column',
        label: {
          formatter(v) {
            return `${v.pop}%`;
          },
          position: 'bottom',
          offset: -15,
          style: {
            fill: '#C0C4CC',
          },
        },
        columnStyle: {
          fill: '#fab6b6',
          fillOpacity: 0.5,
        },
        columnWidthRatio: 0.1,
      },
    ],
  });

  dualAxes.render();
}

function openDailyPanel(e: number) {
  this.idx = e;
  this.open = true;
}

const weather = useWeatherStore();
const { current } = storeToRefs(weather);

const idx = ref(0);
const open = ref(false);
const day = ref<HTMLDivElement | null>(null);

watchEffect(() => {
  if (day.value) {
    const d1: TData[] = [],
      d2: TData[] = [],
      d3: PData[] = [];

    current.value!.dailys.forEach((e) => {
      const t = date.formatDate(e.dateTime, 'MM-DD');

      d1.push({
        x: t,
        temp: e.temperature.max!,
        name: 'max',
      });

      d2.push({
        x: t,
        temp: e.temperature.min!,
        name: 'min',
      });

      d3.push({
        x: t,
        pop: e.pop ?? 0,
      });
    });

    createGraph(day.value, d3, [...d2, ...d1]);
  }
});
</script>

<style lang="scss" scoped>
.day-skeleton {
  &:not(:last-of-type) {
    margin-right: 5px;
  }

  &:first-of-type {
    margin-left: 5px;
  }
}

.height {
  height: 290px;
}

.list {
  $height: 110px; // 折线图高度
  position: relative;

  .graph {
    height: $height;
    width: 100%;
    position: absolute;
    bottom: 70px;
    z-index: -1;
  }

  .list-item {
    width: 80px;
    position: relative;

    .up {
      position: absolute;
      top: 0;
    }

    .down {
      position: absolute;
      bottom: 0;
    }
  }
}
</style>
