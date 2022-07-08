<template>
  <q-card flat bordered style="height: 100%">
    <ice-transition>
      <div v-if="visible" style="height: 100%" class="column">
        <q-card-section>
          <div class="text-bold">{{ $t('weather.aqi') }}</div>
          <!-- 发布时间 -->
          <div class="text-caption">
            {{ $t('date.pubTime') }}: {{ $d(air!.air.dateTime, 'long') }}
          </div>
        </q-card-section>

        <q-card-section class="column justify-between" style="flex: 1">
          <!-- 空气质量 -->
          <div class="text-h2 text-bold" :style="{ color: aqiColor }">
            {{ air?.air.aqi }}
            <span class="text-h5">{{ $t(`weather.air.${category}`) }}</span>
          </div>

          <!-- 空气质量比例条 -->
          <div
            class="bar"
            :style="{
              background: `linear-gradient(to right, ${barColor})`,
            }"
          >
            <div
              class="circle"
              :style="{
                left: `${offset}%`,
              }"
            ></div>
          </div>

          <!-- 污染物 -->
          <div class="row justify-between">
            <div
              v-for="(item, idx) in pollutions"
              :key="idx"
              class="column items-center"
            >
              <div class="text-bold">{{ item.value }}</div>
              <div class="text-caption">{{ item.label }}</div>
            </div>
          </div>
        </q-card-section>
      </div>

      <div v-else style="height: 100%" class="column justify-between">
        <q-card-section>
          <q-skeleton width="80px"></q-skeleton>
        </q-card-section>
        <div class="row justify-center items-center" style="flex: 1">
          <q-skeleton height="175px" width="175px" />
        </div>
        <q-card-section class="row justify-between items-center">
          <q-skeleton v-for="idx in 6" :key="idx" width="30px" />
        </q-card-section>
      </div>
    </ice-transition>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import iceTransition from 'components/ice-transition.vue';
import { useWeatherStore } from 'src/stores/stores';
import { storeToRefs } from 'pinia';
import { aqiCategory, pollutionsMap } from 'utils/weather/tools';
import { aqiColor } from 'utils/weather/color';

const { current: air } = storeToRefs(useWeatherStore());

export default defineComponent({
  name: 'iceAir',

  components: { iceTransition },

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    category() {
      return aqiCategory(air.value?.air.aqi);
    },

    aqiColor() {
      return aqiColor[this.category];
    },

    offset() {
      return air.value!.air.aqi / 5;
    },

    pollutions() {
      return Object.entries(air.value!.air.components).map(([k, v]) => ({
        label: pollutionsMap[k],
        value: v,
      }));
    },
  },

  setup() {
    const barColor = ref(
      Object.keys(aqiColor)
        .map((el) => aqiColor[el])
        .join(',')
    );

    return { air, barColor };
  },
});
</script>

<style scoped lang="scss">
.bar {
  $radius: 10px;

  height: $radius;
  border-radius: $radius / 2;
  margin: 10px 0;
  position: relative;

  .circle {
    position: absolute;
    top: 50%;
    height: $radius * 1.5;
    width: $radius * 1.5;
    border: 2px solid #e4e7ed;
    background: #fff;
    border-radius: 50%;
    transform: translateY(-50%);
  }
}
</style>
