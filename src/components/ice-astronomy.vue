<template>
  <q-card
    flat
    bordered
    class="clickable card-border"
    @click="open = true"
    style="height: 100%"
  >
    <q-card-section class="text-bold">
      {{ $t('weather.astronomy.label') }}
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div
        class="sky"
        :style="{
          backgroundColor: skyColor,
          height: `${skyHeight}px`,
        }"
      >
        <!-- track -->
        <svg>
          <circle
            class="curve-line"
            :stroke="curveLineColor"
            :r="curveRadius"
            cx="50%"
            :cy="skyHeight"
          />
        </svg>

        <!-- sun -->
        <div
          class="sun-orbit"
          :style="{
            transform: `rotate(${sunDeg}deg)`,
            top: `${skyHeight - orbRadius}px`,
            right: '50%',
            width: `${curveRadius + orbRadius}px`,
          }"
        >
          <div class="sun" :style="sphereStyle">
            <div class="sun-light" :style="sphereStyle"></div>
            <div class="sun-light" :style="sphereStyle"></div>
          </div>
        </div>

        <!-- moon -->
        <div
          class="moon-orbit"
          :style="{
            transform: `rotate(${moonDeg}deg)`,
            top: `${skyHeight - orbRadius}px`,
            right: '50%',
            width: `${curveRadius + orbRadius}px`,
          }"
        >
          <div class="moon" :style="sphereStyle"></div>
        </div>
      </div>

      <!-- time -->
      <div class="row justify-between q-pt-md">
        <!-- sunrise & sunset -->
        <div class="row items-center">
          <q-icon name="fa-solid fa-sun" size="25px"></q-icon>
          <div class="q-ml-sm">
            <div>{{ sunrise }}↑</div>
            <div>{{ sunset }}↓</div>
          </div>
        </div>
        <!-- moonrise & moonset -->
        <div class="row items-center">
          <div class="q-mr-sm">
            <div>{{ moonrise }}↑</div>
            <div>{{ moonset }}↓</div>
          </div>
          <q-icon name="fa-solid fa-moon" size="25px"></q-icon>
        </div>
      </div>
    </q-card-section>
  </q-card>
  <ice-astronomy-panel v-model="open"></ice-astronomy-panel>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ice-astronomy',
});
</script>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useWeatherStore } from '@stores/stores';
import { date } from 'quasar';
import { storeToRefs } from 'pinia';
import iceAstronomyPanel from '@components/ice-astronomy-panel.vue';
import { i18n } from '@src/boot/i18n';

const { current } = storeToRefs(useWeatherStore());

const sunDeg = ref(-90);
const moonDeg = ref(-90);
const open = ref(false);
const curveLineColor = ref('#fff'); // the color of curve
const orbRadius = ref(10); // the radius of earth ans moon
const skyHeight = ref(220); // the background color

onMounted(() => {
  if (current.value!.sun.sunrise && current.value!.sun.sunset) {
    const diff1 = date.getDateDiff(
      new Date(),
      current.value!.sun.sunrise,
      'seconds'
    );

    const diff2 = date.getDateDiff(
      current.value!.sun.sunset,
      current.value!.sun.sunrise,
      'seconds'
    );

    sunDeg.value = 180 * (diff1 / diff2);
  }

  if (current.value!.moon?.moonrise && current.value!.moon?.moonset) {
    const diff3 = date.getDateDiff(
      new Date(),
      current.value!.moon.moonrise,
      'seconds'
    );

    const diff4 = date.getDateDiff(
      current.value!.moon.moonset,
      current.value!.moon.moonrise,
      'seconds'
    );

    moonDeg.value = 180 * (diff3 / diff4);
  }
});

const sphereStyle = computed(() => {
  return {
    width: `${orbRadius.value * 2}px`,
    height: `${orbRadius.value * 2}px`,
  };
});

const skyColor = computed(() => {
  let diff1 = 1,
    diff2 = -10000;

  if (current.value!.sun.sunrise && current.value!.sun.sunset) {
    diff1 = date.getDateDiff(new Date(), current.value!.sun.sunrise, 'seconds');

    diff2 = date.getDateDiff(new Date(), current.value!.sun.sunset, 'seconds');
  }

  if (diff1 < 0 || diff2 > 0) {
    // sun is not appeared
    return '#303133';
  } else if (diff2 > -7200) {
    // sunset is still two hours away
    return '#ffcc80';
  } else {
    return '#6AB3FF';
  }
});

const curveRadius = computed(() => {
  return skyHeight.value * 0.7 - orbRadius.value * 2;
});

const sunrise = computed(() => {
  if (current.value!.sun.sunrise) {
    return i18n.global.d(current.value!.sun.sunrise, 'time');
  } else {
    return '-/-';
  }
});

const sunset = computed(() => {
  if (current.value!.sun.sunset) {
    return i18n.global.d(current.value!.sun.sunset, 'time');
  } else {
    return '-/-';
  }
});

const moonrise = computed(() => {
  if (current.value!.moon?.moonrise) {
    return i18n.global.d(current.value!.moon.moonrise, 'time');
  } else {
    return '-/-';
  }
});

const moonset = computed(() => {
  if (current.value!.moon?.moonset) {
    return i18n.global.d(current.value!.moon?.moonset, 'time');
  } else {
    return '-/-';
  }
});
</script>

<style lang="scss" scoped>
$sun-color: #ffcf00;
$sun-light-color: #ffb55a;
$moon-color: #ccc;
$moon-mountain-color: #aaa;

.sky {
  position: relative;
  overflow: hidden;
  transition: 4s background-color ease-out;
  border-radius: 5px;

  & > svg {
    width: 100%;
    height: 100%;
  }

  .sun-orbit,
  .moon-orbit {
    position: absolute;
    height: auto;
    transition: 4s transform ease-out;
    transform-origin: 100% 50%;
  }

  .moon-orbit {
    transition-delay: 0.2s;

    .moon {
      border-radius: 50%;
      background-color: $moon-color;
      position: relative;

      &::after,
      &::before {
        position: absolute;
        content: '';
        border-radius: 50%;
        background-color: $moon-mountain-color;
      }

      &::after {
        top: 20%;
        right: 10%;
        width: 30%;
        height: 30%;
      }

      &::before {
        top: 40%;
        right: 50%;
        width: 15%;
        height: 15%;
      }
    }
  }

  .sun-orbit {
    .sun {
      border-radius: 50%;
      background: $sun-color;

      .sun-light {
        position: absolute;
        background-color: $sun-light-color;
        z-index: -1;

        &:last-of-type {
          transform: rotate(45deg);
        }
      }
    }
  }
}

.curve-line {
  stroke-dasharray: 1, 5;
  stroke-width: 3;
  stroke-linecap: round;
  fill: none;
}
</style>
