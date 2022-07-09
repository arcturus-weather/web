<template>
  <q-card flat bordered style="height: 100%">
    <ice-transition>
      <div v-if="visible">
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
              v-for="(item, idx) in current!.daily"
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
                  <i-icon :name="item.dayIcon" :size="40"></i-icon>
                  <div class="text-center">{{ item.dayDesc }}</div>
                </div>
              </div>

              <div class="down">
                <div class="text-center">{{ item.nightDesc }}</div>
                <i-icon
                  v-if="item.nightIcon"
                  :name="item.nightIcon"
                  :size="40"
                ></i-icon>
              </div>
            </q-item>
            <!-- 双折线图 -->
            <div ref="day" class="graph"></div>
          </q-list>
        </q-scroll-area>
      </div>
      <!-- 骨架屏 -->
      <div v-else>
        <q-card-section>
          <q-skeleton width="80px"></q-skeleton>
        </q-card-section>

        <q-scroll-area
          class="height q-pb-xs"
          :thumb-style="{
            height: '0',
          }"
        >
          <div class="row no-wrap">
            <q-skeleton
              class="day-skeleton height"
              width="80px"
              v-for="i in 10"
              :key="i"
            />
          </div>
        </q-scroll-area>
      </div>
    </ice-transition>
  </q-card>
  <ice-daily-panel v-model="open" :idx="idx"></ice-daily-panel>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';
import iceTransition from 'components/ice-transition.vue';
import iceDailyPanel from 'components/ice-daily-panel.vue';
import { useWeatherStore } from 'stores/stores';
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

// 绘制温度折线图
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
      range: [0.04, 0.93],
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

export default defineComponent({
  name: 'iceDaily',

  components: { iceTransition, iceDailyPanel },

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    openDailyPanel(e: number) {
      this.idx = e;
      this.open = true;
    },
  },

  setup() {
    const { current } = storeToRefs(useWeatherStore()),
      idx = ref(0),
      open = ref(false),
      day = ref<HTMLDivElement | null>(null);

    watchEffect(() => {
      if (day.value) {
        const d1: TData[] = [],
          d2: TData[] = [],
          d3: PData[] = [];

        current.value!.daily.forEach((e: IDailyItem) => {
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
            pop: e.pop!,
          });
        });

        createGraph(day.value, d3, [...d2, ...d1]);
      }
    });

    return { current, open, idx, day };
  },
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
