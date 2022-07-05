<template>
  <q-card class="row" flat bordered style="height: 283px">
    <q-card-section class="col justify-between column">
      <ice-transition>
        <div v-if="visible" class="row justify-between">
          <!-- location -->
          <div class="row items-center clickable" @click="$emit('openMap')">
            <q-icon name="room"></q-icon>
            <div class="ellipsis" style="width: 150px">
              {{ currentLocation.address }}
            </div>
            <q-tooltip>
              {{ currentLocation.address }}
            </q-tooltip>
          </div>
          <!-- weather pubtime -->
          <div>
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
          <!-- now temperature -->
          <div
            v-if="visible"
            class="text-h2 q-mb-md text-center text-bold"
            style="height: 80px; width: 80px; line-height: 80px"
          >
            {{ currentWeather!.now.temperature.day }}°
          </div>
          <q-skeleton
            v-else
            width="80px"
            height="80px"
            class="q-mb-md"
          ></q-skeleton>
        </ice-transition>

        <ice-transition>
          <!-- now description -->
          <div v-if="visible">
            {{ currentWeather!.now.description }},
            {{ currentWeather!.now.feelsLike?.day }}
          </div>
          <q-skeleton v-else width="50px"></q-skeleton>
        </ice-transition>
      </div>

      <ice-transition>
        <!-- pressure, precip, windspeed -->
        <div v-if="visible" class="row items-center justify-between">
          <q-chip icon="air" size="sm" clickable>
            {{ currentWeather!.now.pressure }}hpa
          </q-chip>
          <q-chip
            icon="water_drop"
            size="sm"
            clickable
            @click="slide = 'precip'"
          >
            {{ currentWeather!.now.precip }}mm
          </q-chip>
          <q-chip icon="wind_power" size="sm" clickable>
            {{ currentWeather!.now.wind.windSpeed }}km/h
          </q-chip>
        </div>
        <div v-else class="row items-center justify-between">
          <q-skeleton width="50px" v-for="i in 3" :key="i"></q-skeleton>
        </div>
      </ice-transition>
    </q-card-section>

    <q-card-section class="col">
      <ice-transition :duration="1000">
        <!-- temperature plot -->
        <q-card v-if="visible" flat bordered style="height: 100%">
          <q-carousel
            v-model="slide"
            height="249px"
            transition-prev="scale"
            transition-next="scale"
            animated
            arrows
          >
            <!-- temp graph -->
            <q-carousel-slide
              name="temp"
              class="q-pa-none column justify-between"
            >
              <q-card-section>
                {{ $t('weather.temperature') }}
              </q-card-section>
              <!-- Graph -->
              <q-card-section>
                <div ref="tempPlot" style="height: 90px"></div>
              </q-card-section>
              <!-- the maximum and minimal of temperature -->
              <q-card-section class="row justify-between">
                <div class="column items-center">
                  <div>{{ $t('weather.max') }}</div>
                  <div>{{ max }}°</div>
                </div>
                <div class="column items-center">
                  <div>{{ $t('weather.min') }}</div>
                  <div>{{ min }}°</div>
                </div>
              </q-card-section>
            </q-carousel-slide>

            <!-- preciptation graph -->
            <q-carousel-slide
              name="precip"
              class="q-pa-none column justify-between"
            >
              <q-card-section>
                {{ $t('weather.precipitation') }}
              </q-card-section>
              <q-card-section>
                <div ref="precipPlot" style="height: 90px"></div>
              </q-card-section>
              <q-card-section class="row justify-between">
                <div class="summary">{{ currentWeather?.precip.summary }}</div>
              </q-card-section>
            </q-carousel-slide>
          </q-carousel>
        </q-card>

        <q-card v-else flat bordered style="height: 100%">
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
import IceTransition from 'components/ice-transition.vue';
import { storeToRefs } from 'pinia';
import { date } from 'quasar';
import { area } from 'utils/antv';

const { current: currentLocation } = storeToRefs(useLocationStore());
const { current: currentWeather } = storeToRefs(useWeatherStore());

export default defineComponent({
  name: 'iceMain',

  components: { iceTransition, IceTransition },

  props: {
    visible: {
      type: Boolean,
      default: true,
    },
  },

  emits: ['openMap'],

  computed: {
    isPrecip() {
      return currentWeather!.value!.precip.minutely.every(
        (e: IPrecip) => e.precip !== 0.0
      );
    },
  },

  setup() {
    const tempPlot = ref<HTMLElement | null>(null),
      precipPlot = ref<HTMLElement | null>(null),
      max = ref(0),
      min = ref(0),
      slide = ref('temp');

    watchEffect(() => {
      if (tempPlot.value) {
        const hourly =
          currentWeather!.value!.hourly.map((e: IWeatherItem) => ({
            label: date.formatDate(e.dateTime, 'YYYY-MM-DD HH:mm:ss'),
            value: e.temperature.day!,
          })) ?? [];

        const temp = hourly.map((e) => e.value);
        max.value = Math.max(...temp);
        min.value = Math.min(...temp);

        // repaint
        area(tempPlot.value, hourly);
      }

      if (precipPlot.value) {
        const precip = currentWeather!.value!.precip.minutely.map(
          (e: IPrecip) => ({
            label: date.formatDate(e.dateTime, 'HH:mm'),
            value: e.precip,
          })
        );

        area(precipPlot.value, precip);
      }
    });

    return {
      currentLocation,
      currentWeather,
      tempPlot,
      max,
      min,
      slide,
      precipPlot,
    };
  },
});
</script>

<style lang="scss">
.summary {
  background-color: #f5f5f5;
  border-left: 2px solid #d5d5d5;
  border-radius: 1px;
  width: 100%;
  padding: 10px;
}
</style>
