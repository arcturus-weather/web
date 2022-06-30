<template>
  <q-card flat bordered style="height: 283px">
    <ice-transition>
      <div v-if="visible" flat square bordered>
        <q-card-section> {{ $t('weather.aqi') }}</q-card-section>
        <div class="row justify-center aqi-graph">
          <div style="height: 175px; width: 175px" ref="air"></div>
          <div class="text-h5 category">
            {{ $t(`weather.air.${category}`) }}
          </div>
        </div>
        <q-card-actions align="right">
          <q-btn unelevated text-color="primary" @click="openAirPanel">
            {{ $t('click') }}
          </q-btn>
        </q-card-actions>
      </div>

      <div v-else style="height: 283px">
        <q-card-section>
          <q-skeleton width="80px"></q-skeleton>
        </q-card-section>
        <div class="row justify-center">
          <q-skeleton height="175px" width="175px" />
        </div>
        <q-card-actions align="right">
          <q-skeleton type="QBtn" />
        </q-card-actions>
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
      category = ref(''),
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

<style lang="scss">
.aqi-graph {
  position: relative;

  .category {
    position: absolute;
    left: 50%;
    bottom: -10%;
    transform: translate(-50%, -50%);
  }
}
</style>
