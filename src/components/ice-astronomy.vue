<template>
  <q-card flat bordered class="clickabe" style="height: 232px">
    <ice-transition>
      <div v-if="visible">
        <q-card-section>
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
        </q-card-section>
        <div class="row justify-between q-px-md">
          <!-- sun time -->
          <div class="row items-center">
            <q-icon name="sunny" size="25px"></q-icon>
            <div class="q-ml-sm">
              <div>{{ $d(current.sun.sunRise, 'time2') }}↑</div>
              <div>{{ $d(current.sun.sunSet, 'time2') }}↓</div>
            </div>
          </div>
          <!-- moon time -->
          <div class="row items-center">
            <div class="q-mr-sm">
              <div>{{ $d(current.moon.moonRise, 'time2') }}↑</div>
              <div>{{ $d(current.moon.moonSet, 'time2') }}↓</div>
            </div>
            <q-icon name="dark_mode" size="25px" ></q-icon>
          </div>
        </div>
      </div>
      <div v-else>
        <q-card-section>
          <q-skeleton height="150px" square />
        </q-card-section>
        <q-card-section class="row justify-between">
          <q-skeleton width="80px"></q-skeleton>
          <q-skeleton width="80px"></q-skeleton>
        </q-card-section>
      </div>
    </ice-transition>
  </q-card>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import { useWeatherStore } from 'stores/stores';
import { date } from 'quasar';
import { storeToRefs } from 'pinia';
import iceTransition from 'components/ice-transition.vue';

const { current } = storeToRefs(useWeatherStore());

export default defineComponent({
  name: 'ice-astronomy',

  components: { iceTransition },

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const sunDeg = ref(0),
      moonDeg = ref(0);

    watch(
      () => props.visible,
      (n) => {
        if (n) {
          setTimeout(() => {
            // one second delay is required here
            // otherwise, the css animate will not work
            // by the way, nextTick has no effect
            const diff1 = date.getDateDiff(
              new Date(),
              current.value.sun.sunRise,
              'seconds'
            );

            const diff2 = date.getDateDiff(
              current.value.sun.sunSet,
              current.value.sun.sunRise,
              'seconds'
            );
            sunDeg.value = 180 * (diff1 / diff2);

            const diff3 = date.getDateDiff(
              new Date(),
              current.value.moon.moonRise,
              'seconds'
            );

            const diff4 = date.getDateDiff(
              current.value.moon.moonSet,
              current.value.moon.moonRise,
              'seconds'
            );

            moonDeg.value = 180 * (diff3 / diff4);
          }, 1000);
        }
      }
    );

    return {
      curveLineColor: ref('#fff'), // the color of curve
      orbRadius: ref(20), // the radius of earth ans moon
      skyHeight: ref(150), // the background color
      sunDeg,
      moonDeg,
      current,
    };
  },

  computed: {
    sphereStyle() {
      return {
        width: `${this.orbRadius * 2}px`,
        height: `${this.orbRadius * 2}px`,
      };
    },

    skyColor() {
      const diff1 = date.getDateDiff(
        new Date(),
        current.value.sun.sunRise,
        'seconds'
      );

      const diff2 = date.getDateDiff(
        new Date(),
        current.value.sun.sunSet,
        'seconds'
      );

      if (diff1 < 0 || diff2 > 0) {
        // sun is not appeared
        return '#303133';
      } else if (diff2 > -7200) {
        // sunset is still two hours away
        return '#FEB692';
      } else {
        return '#6AB3FF';
      }
    },

    curveRadius() {
      return this.skyHeight * 0.9 - this.orbRadius * 2;
    },
  },
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
