<template>
  <q-card class="row" flat bordered style="height: 100%">
    <q-card-section class="col-xs-12 col-sm-6 col-md-4 justify-between column">
      <ice-transition>
        <div v-if="visible" class="row justify-between">
          <!-- 当前位置 -->
          <div
            class="row items-center clickable"
            @click="$emit('openMap')"
          >
            <q-icon name="room"></q-icon>
            <div class="ellipsis" style="width: 100px">
              {{ currentLocation.address }}
            </div>
            <q-tooltip>
              {{ currentLocation.address }}
            </q-tooltip>
          </div>
          <!-- 发布时间 -->
          <div>
            {{ $t('date.pubTime') }}
            {{ $d(currentWeather!.now.dateTime, 'time') }}
          </div>
        </div>
        <div v-else class="row justify-between">
          <q-skeleton width="80px"></q-skeleton>
          <q-skeleton width="80px"></q-skeleton>
        </div>
      </ice-transition>

      <div class="column items-center justify-center">
        <ice-transition>
          <!-- 当前温度 -->
          <div
            v-if="visible"
            class="text-h2 q-my-md text-center text-bold"
            style="height: 80px; width: 80px; line-height: 80px"
          >
            {{ currentWeather!.now.temperature.day }}°
          </div>
          <!-- 骨架屏 -->
          <q-skeleton
            v-else
            width="80px"
            height="80px"
            class="q-mb-md"
          ></q-skeleton>
        </ice-transition>

        <ice-transition>
          <!-- 当前天气情况 -->
          <div v-if="visible">
            {{ currentWeather!.now.description }},
            {{ currentWeather!.now.feelsLike?.day }}
          </div>
          <!-- 骨架屏 -->
          <q-skeleton v-else width="50px"></q-skeleton>
        </ice-transition>
      </div>

      <ice-transition>
        <!-- 大气压, 降水量, 风速 -->
        <div v-if="visible" class="row items-center justify-between">
          <div class="row items-center">
            <q-icon name="air" size="1em" class="q-mr-xs"></q-icon>
            {{ currentWeather!.now.pressure }}hpa
          </div>
          <div class="row items-center">
            <q-icon name="water_drop" size="1em" class="q-mr-xs"></q-icon>
            {{ currentWeather!.now.precip }}mm
          </div>
          <div class="row items-center">
            <q-icon name="wind_power" size="1em" class="q-mr-xs"></q-icon>
            {{ currentWeather!.now.wind.windSpeed }}km/h
          </div>
        </div>
        <!-- 骨架屏 -->
        <div v-else class="row items-center justify-between">
          <q-skeleton width="50px" v-for="i in 3" :key="i"></q-skeleton>
        </div>
      </ice-transition>
    </q-card-section>

    <q-card-section class="col-xs-12 col-sm-6 col-md-8">
      <ice-transition>
        <!-- 这里放降水图 -->
        <q-card v-if="visible && isPrecip" flat bordered style="height: 100%">
          <q-card-section>
            {{ $t('weather.precipitation') }}
          </q-card-section>
          <div class="q-px-md" ref="precipPlot" style="height: 130px"></div>
          <q-card-section>
            <div class="summary" :class="$q.dark.isActive ? 'dark' : 'light'">
              {{ currentWeather?.precip.summary }}
            </div>
          </q-card-section>
        </q-card>

        <!-- 骨架屏 -->
        <q-card v-else-if="!visible" flat bordered style="height: 100%">
          <q-card-section>
            <q-skeleton width="50px" />
          </q-card-section>
          <q-card-section>
            <q-skeleton height="90px"></q-skeleton>
          </q-card-section>
          <q-card-section class="row justify-between">
            <q-skeleton width="50px" v-for="i in 2" :key="i"></q-skeleton>
          </q-card-section>
        </q-card>
      </ice-transition>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';
import { useLocationStore, useWeatherStore } from 'stores/stores';
import iceTransition from 'components/ice-transition.vue';
import { storeToRefs } from 'pinia';
import { date } from 'quasar';
import { Area } from '@antv/g2plot';

interface Precip_ {
  precip: number;
  label: string;
}

export function area(dom: HTMLDivElement | null | string, data: Precip_[]) {
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

const { current: currentLocation } = storeToRefs(useLocationStore());
const { current: currentWeather } = storeToRefs(useWeatherStore());

export default defineComponent({
  name: 'iceMain',

  components: { iceTransition },

  props: {
    visible: {
      type: Boolean,
      default: true,
    },
  },

  emits: ['openMap'],

  computed: {
    // 当前是否降水
    isPrecip() {
      return currentWeather!.value!.precip.minutely.every(
        (e: IPrecip) => e.precip !== 0.0
      );
    },
  },

  setup() {
    const precipPlot = ref<HTMLDivElement | null>(null);

    watchEffect(() => {
      if (precipPlot.value) {
        area(
          precipPlot.value,
          currentWeather.value!.precip.minutely.map((e: IPrecip) => ({
            label: date.formatDate(e.dateTime, 'HH:mm'),
            precip: e.precip,
          }))
        );
      }
    });

    return {
      currentLocation,
      currentWeather,
      precipPlot,
    };
  },
});
</script>

<style lang="scss">
.summary {
  border-radius: 1px;
  width: 100%;
  padding: 10px;

  &.dark {
    color: #000;
    background-color: #c0c4cc;
    border-left: 2px solid #909399;
  }

  &.light {
    background-color: #f5f5f5;
    border-left: 2px solid #d5d5d5;
  }
}
</style>
