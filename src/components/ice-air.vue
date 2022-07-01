<template>
  <q-card flat bordered style="height: 283px">
    <ice-transition>
      <div
        v-if="visible"
        style="height: inherit"
        @click="openAirPanel"
        class="column"
      >
        <div class="clickable click"></div>
        <q-card-section>
          {{ $t('weather.aqi') }}:
          {{ $t(`weather.air.${category}`) }}
        </q-card-section>
        <div class="row justify-center" style="flex: 1">
          <div style="width: 200px" ref="air"></div>
        </div>
      </div>

      <div v-else style="height: 283px" class="column">
        <q-card-section>
          <q-skeleton width="80px"></q-skeleton>
        </q-card-section>
        <div class="row justify-center items-center" style="flex: 1">
          <q-skeleton height="175px" width="175px" />
        </div>
      </div>
    </ice-transition>
  </q-card>

  <ice-air-panel v-model="open"></ice-air-panel>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';
import iceTransition from 'components/ice-transition.vue';
import iceAirPanel from 'components/ice-air-panel.vue';
import { useWeatherStore } from 'src/stores/stores';
import { guage } from 'utils/antv';
import { aqiCategory } from 'utils/weather/tools';
import { storeToRefs } from 'pinia';

const weather = useWeatherStore();

export default defineComponent({
  name: 'iceAir',

  components: { iceTransition, iceAirPanel },

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    openAirPanel() {
      this.open = true;
    },
  },

  setup() {
    const air = ref<HTMLElement | null>(null),
      open = ref(false),
      category = ref('excellent'),
      { current } = storeToRefs(weather);

    watchEffect(() => {
      if (air.value) {
        guage(air.value, current!.value!.air.aqi / 500);

        category.value = aqiCategory(current!.value!.air.aqi);
      }
    });

    return { air, category, open };
  },
});
</script>

<style scoped land="scss">
.click {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
}
</style>
