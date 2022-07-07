<template>
  <q-scroll-area
    style="height: 90px"
    :thumb-style="{
      bottom: '2px',
      borderRadius: '5px',
      opacity: '0.1',
    }"
  >
    <ice-transition>
      <q-list v-if="visible" class="row no-wrap" style="height: 90px">
        <q-item
          v-for="(item, idx) in current!.hourly"
          :key="idx"
          clickable
          v-ripple
          @click="openHourlyPanel(idx)"
          class="margin-right column justify-between items-center q-px-xs"
          style="width: 60px; position: relative"
        >
          <q-item-label class="text-center">
            {{ $d(item.dateTime, 'time3') }}
          </q-item-label>
          <q-item-section>
            <i-icon :name="item.icon" :size="30"></i-icon>
          </q-item-section>
          <q-item-label class="text-center text-bold">
            {{ item.temperature.day }}°
          </q-item-label>
        </q-item>
      </q-list>
      <div v-else class="row no-wrap">
        <q-skeleton
          class="margin-right"
          width="60px"
          height="90px"
          v-for="i in 8"
          :key="i"
        />
      </div>
    </ice-transition>
  </q-scroll-area>
  <ice-hourly-panel v-model="open" :idx="idx"></ice-hourly-panel>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import iceTransition from 'components/ice-transition.vue';
import iceHourlyPanel from 'components/ice-hourly-panel.vue';
import { useWeatherStore } from 'stores/stores';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'iceHourly',

  components: { iceTransition, iceHourlyPanel },

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    openHourlyPanel(e: number) {
      this.idx = e;
      this.open = true;
    },
  },

  setup() {
    const { current } = storeToRefs(useWeatherStore()),
      idx = ref(0),
      open = ref(false);

    return { current, open, idx };
  },
});
</script>

<style lang="scss" scoped>
.margin-right:not(:last-of-type) {
  margin-right: 10px;
}

.per {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
