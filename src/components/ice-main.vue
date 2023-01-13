<template>
  <q-card
    class="row card-border main-wrapper"
    flat
    bordered
    style="height: 100%"
  >
    <div class="search-btn-wrapper">
      <q-btn
        fab
        unelevated
        icon="fa-solid fa-magnifying-glass"
        @click="openMap = true"
      />
    </div>

    <q-card-section class="justify-between column" style="width: 100%">
      <div class="column q-mb-md">
        <i-icon :name="currentWeather!.now.icon" :size="100"></i-icon>
        <div
          class="text-h2 q-mb-md text-center text-bold"
          style="height: 80px; width: 80px; line-height: 80px"
        >
          {{ currentWeather!.now.temperature.day }}°
        </div>

        <div>
          {{ currentWeather!.now.description }},
          {{ currentWeather!.now.feelsLike?.day }}
        </div>
      </div>

      <q-separator />

      <!-- current location -->
      <div class="row items-center clickable q-my-md" @click="openMap = true">
        <q-icon name="fa-solid fa-location-dot" size="20px"></q-icon>
        <div class="ellipsis q-ml-sm" style="width: 120px">
          {{ currentLocation.address }}
        </div>
      </div>

      <!-- public time -->
      <div class="row items-center">
        <q-icon name="fa-solid fa-calendar-days" size="20px"></q-icon>
        <div class="q-ml-sm">
          {{ $d(currentWeather!.now.dateTime, 'long') }}
        </div>
      </div>
    </q-card-section>

    <!-- 这里放降水图 -->
    <!-- <q-card flat bordered style="height: 100%">
      <q-card-section>
        {{ $t('weather.precipitation') }}
      </q-card-section>
      <div class="q-px-md" ref="precipPlot" style="height: 130px"></div>
      <q-card-section>
        <div class="summary" :class="$q.dark.isActive ? 'dark' : 'light'">
          {{ currentWeather?.precip.summary }}
        </div>
      </q-card-section>
    </q-card> -->
  </q-card>

  <ice-map
    v-model="openMap"
    @confirm="confirm"
    :lat="loc.latitude"
    :lng="loc.longitude"
    :addr="loc.address"
    :city="loc.city"
  ></ice-map>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
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

export default defineComponent({
  name: 'iceMain',
});
</script>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useLocationStore, useWeatherStore } from '@stores/stores';
import { storeToRefs } from 'pinia';
import { date } from 'quasar';
import iceMap from 'src/components/ice-map.vue';

const { current: currentLocation } = storeToRefs(useLocationStore());
const { current: currentWeather } = storeToRefs(useWeatherStore());

const location = useLocationStore();

function confirm(e: IMapData) {
  location.changeLocation(e);
}

const { current: loc } = storeToRefs(location);

// const isPrecip = computed(()=>{
//   return currentWeather.value!.precip.minutely.length === 0 ? false : true;
// })

const precipPlot = ref<HTMLDivElement | null>(null);

const openMap = ref(false);

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
</script>

<style lang="scss" scoped>
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

.main-wrapper {
  position: relative;
}

.search-btn-wrapper {
  position: absolute;
  z-index: 10;
  right: 12px;
  top: 12px;
}
</style>

