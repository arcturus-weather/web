<template>
  <q-card flat bordered style="height: 100%">
    <q-card-section class="text-bold">
      {{ $t('weather.hourly') }}</q-card-section
    >
    <q-scroll-area
      class="height"
      :thumb-style="{
        bottom: '2px',
        borderRadius: '5px',
        opacity: '0.1',
      }"
    >
      <ice-transition>
        <q-list v-if="visible" class="row no-wrap height list">
          <q-item
            v-for="(item, idx) in current!.hourly"
            :key="idx"
            clickable
            v-ripple
            @click="openHourlyPanel(idx)"
            class="list-item column justify-between items-center q-px-xs"
          >
            <!-- 时间 -->
            <q-item-label class="text-center">
              {{ $d(item.dateTime, 'hour') }}
            </q-item-label>
            <!-- 图标 -->
            <q-item-section>
              <i-icon :name="item.icon" :size="40"></i-icon>
              <div class="text-center">{{ item.description }}</div>
            </q-item-section>
          </q-item>

          <!-- 折线图 -->
          <div ref="hour" class="graph"></div>
        </q-list>
        <!-- 骨架屏 -->
        <div v-else class="row no-wrap">
          <q-skeleton
            class="margin-right height"
            width="60px"
            v-for="i in 20"
            :key="i"
          />
        </div>
      </ice-transition>
    </q-scroll-area>
  </q-card>
  <ice-hourly-panel v-model="open" :idx="idx"></ice-hourly-panel>
</template>

<script lang="ts">
import { date } from 'quasar';
import { defineComponent, ref, watchEffect } from 'vue';
import iceTransition from 'components/ice-transition.vue';
import iceHourlyPanel from 'components/ice-hourly-panel.vue';
import { useWeatherStore } from 'stores/stores';
import { storeToRefs } from 'pinia';
import { DualAxes } from '@antv/g2plot';

interface TData {
  x: string;
  pop: number;
  temp: number;
}

// 绘制温度折线图
function createGraph(dom: HTMLDivElement | null | string, data: TData[]) {
  const dualAxes = new DualAxes(dom ?? 'hour', {
    data: [data, data],
    legend: false, // 关闭图例
    xField: 'x',
    yField: ['temp', 'pop'],
    yAxis: {
      pop: {
        label: null,
        line: null,
        max: 100,
      },
      temp: {
        range: [0.2, 0.8],
        tickCount: 3,
        tickInterval: 10,
        grid: {
          line: {
            style: {
              opacity: 0.5,
            },
          },
        },
      },
    },
    xAxis: {
      range: [0.01, 0.98],
      label: null,
      line: null,
    },
    renderer: 'svg',
    autoFit: true,
    label: {
      offset: 15,
      formatter(text) {
        return `${text.value}°`;
      },
    },
    geometryOptions: [
      {
        geometry: 'line',
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
        },
      },
      {
        // 柱形图
        geometry: 'column',
        label: {
          formatter(v) {
            return `${v.pop}%`;
          },
          offset: 10,
        },
        columnStyle: {
          fill: '#a0cfff',
          fillOpacity: 0.5,
        },
        columnWidthRatio: 0.1,
      },
    ],
  });

  dualAxes.render();
}

export default defineComponent({
  name: 'iceHourly',

  components: { iceTransition, iceHourlyPanel },

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    openHourlyPanel(e: number) {
      this.idx = e;
      this.open = true;
    },
  },

  setup() {
    const { current } = storeToRefs(useWeatherStore()),
      idx = ref(0),
      open = ref(false),
      hour = ref<HTMLDivElement | null>(null);

    watchEffect(() => {
      if (hour.value) {
        createGraph(
          hour.value,
          current.value!.hourly.map((e: IWeatherItem) => ({
            x: date.formatDate(e.dateTime, 'HH:mm'),
            temp: e.temperature.day!,
            pop: e.pop!,
          }))
        );
      }
    });

    return { current, open, idx, hour };
  },
});
</script>

<style lang="scss" scoped>
.height {
  height: 230px; // list 高度
}

.list {
  $height: 90px; // 折线图高度
  position: relative;

  .graph {
    height: $height;
    width: 100%;
    position: absolute;
    bottom: 0;
    z-index: -1;
  }

  .list-item {
    width: 60px;
    padding-bottom: $height;
  }
}
</style>
