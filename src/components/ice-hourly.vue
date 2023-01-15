<template>
  <q-card flat bordered style="height: 100%" class="card-border">
    <q-card-section class="text-bold">
      {{ $t('weather.hourly') }}
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
          v-for="(item, idx) in current!.hourlys"
          :key="idx"
          clickable
          v-ripple
          @click="openHourlyPanel(idx)"
          class="list-item column justify-between items-center q-px-xs"
        >
          <!-- time -->
          <q-item-label class="text-center">
            {{ $d(item.dateTime, 'hour') }}
          </q-item-label>

          <!-- icon -->
          <q-item-section>
            <i-icon :name="item.icon" :size="40"></i-icon>
            <div class="text-center ellipsis" style="width: 100%">
              {{ $t(`weather.desc.${item.description}`) }}
            </div>
          </q-item-section>
        </q-item>

        <!-- line -->
        <div ref="hour" class="graph"></div>
      </q-list>
    </q-scroll-area>
  </q-card>
  <ice-hourly-panel v-model="open" :idx="idx"></ice-hourly-panel>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'iceHourly',
});
</script>

<script lang="ts" setup>
import { date } from 'quasar';
import { ref, watchEffect } from 'vue';
import iceHourlyPanel from '@components/ice-hourly-panel.vue';
import { useWeatherStore } from '@stores/stores';
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
      range: [0.01, 0.98],
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
          fill: '#a0cfff',
          fillOpacity: 0.5,
        },
        columnWidthRatio: 0.1,
      },
    ],
  });

  dualAxes.render();
}

function openHourlyPanel(e: number) {
  this.idx = e;
  this.open = true;
}

const { current } = storeToRefs(useWeatherStore()),
  idx = ref(0),
  open = ref(false),
  hour = ref<HTMLDivElement | null>(null);

watchEffect(() => {
  if (hour.value) {
    createGraph(
      hour.value,
      current.value!.hourlys.map((e) => ({
        x: date.formatDate(e.dateTime, 'HH:mm'),
        temp: e.temperature,
        pop: e.pop,
      }))
    );
  }
});
</script>

<style lang="scss" scoped>
.height {
  height: 230px;
}

.list {
  $height: 120px;
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

