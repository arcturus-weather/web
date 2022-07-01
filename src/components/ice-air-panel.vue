<template>
  <q-dialog
    :v-model="visible"
    @update:model-value="(value) => $emit('update:model-value', value)"
  >
    <q-card>
      <!-- Aqi index -->
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ $t('weather.aqi') }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <!-- pollutions -->
      <q-card-section
        class="row items-center"
        style="width: 500px; height: 250px"
      >
        <div class="col-4">
          <q-circular-progress
            :min="0"
            :max="500"
            show-value
            :value="current?.air.aqi"
            track-color="grey-3"
            color="secondary"
            size="120px"
            class="q-ma-md"
          />
        </div>
        <div class="col-8 column">
          <div class="grid">
            <q-linear-progress
              v-for="(item, idx) in pollutions"
              color="secondary"
              :key="idx"
              :value="item.value / item.max"
              size="60px"
              rounded
            >
              <div
                class="absolute-full column justify-between q-pa-sm"
                style="color: black; font-size: 10px"
              >
                <div class="text-bold">
                  {{ item.label }}
                </div>
                <div class="row items-center" style="font-size: 16px">
                  <div class="text-bold">{{ item.value }}</div>
                  <div class="text-caption">/{{ item.max }}</div>
                </div>
              </div>
            </q-linear-progress>
          </div>
          <div class="text-right q-mt-md">
            <q-badge>μg/m³</q-badge>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useWeatherStore } from 'src/stores/stores';
import { storeToRefs } from 'pinia';
import { pollutionsMap } from 'utils/weather/tools';

const { current } = storeToRefs(useWeatherStore());

export default defineComponent({
  name: 'iceAirPanel',

  props: {
    visible: {
      default: false,
      type: Boolean,
    },
  },

  emits: ['update:model-value'],

  computed: {
    pollutions() {
      return Object.keys(current!.value!.air.components).map((e) => ({
        ...pollutionsMap[e],
        value: current!.value!.air.components[e],
      }));
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
  gap: 10px;
}

.unit {
  border-radius: 2px;
  padding: 1px;
  color: #fff;
  background-color: #ff5252;
  font-weight: normal;
}
</style>
