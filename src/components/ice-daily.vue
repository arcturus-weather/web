<template>
  <q-scroll-area
    style="flex: 1"
    class="q-mt-md"
    :thumb-style="{
      right: '2px',
      borderRadius: '5px',
      opacity: '0.1',
    }"
  >
    <ice-transition>
      <q-list v-if="visible" class="column">
        <q-item
          v-for="(item, idx) in dailys"
          :key="idx"
          clickable
          v-ripple
          @click="openDailyPanel(idx)"
          class="margin-bottom row justify-between items-center"
          style="height: 50px"
        >
          <q-item-label class="text-center">
            {{ $d(item.dateTime, 'week') }}
          </q-item-label>

          <i-icon :name="item.dayIcon" :size="30"></i-icon>

          <div class="text-center text-bold">{{ item.temperature.max }}°</div>

          <q-range
            style="width: 50px"
            thumb-size="0"
            reverse
            :modelValue="item.model.value"
            readonly
            :min="min"
            :max="max"
          />

          <div class="text-center text-bold" v-if="item.temperature.min">
            {{ item.temperature.min }}°
          </div>

          <i-icon v-if="item.nightIcon" :name="item.nightIcon" :size="30"></i-icon>
        </q-item>
      </q-list>
      <div v-else class="column">
        <q-skeleton
          class="margin-bottom"
          height="50px"
          v-for="i in 7"
          :key="i"
        />
      </div>
    </ice-transition>
  </q-scroll-area>
  <ice-daily-panel v-model="open" :idx="idx"></ice-daily-panel>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import iceTransition from 'components/ice-transition.vue';
import iceDailyPanel from 'components/ice-daily-panel.vue';
import { useWeatherStore } from 'stores/stores';
import { storeToRefs } from 'pinia';

const { current } = storeToRefs(useWeatherStore());

export default defineComponent({
  name: 'iceDaily',

  components: { iceTransition, iceDailyPanel },

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    openDailyPanel(e: number) {
      this.idx = e;
      this.open = true;
    },
  },

  computed: {
    min() {
      return (
        Math.min(
          ...current!.value!.daily.map((e: IDailyItem) => e.temperature.min!)
        ) - 2
      );
    },

    max() {
      return (
        Math.max(
          ...current!.value!.daily.map((e: IDailyItem) => e.temperature.max!)
        ) + 2
      );
    },

    dailys() {
      return current!.value!.daily.map((e: IDailyItem) => ({
        ...e,
        model: ref<{
          min?: number | null | undefined;
          max?: number | null | undefined;
        }>({
          min: e.temperature.min,
          max: e.temperature.max,
        }),
      }));
    },
  },

  setup() {
    const idx = ref(0),
      open = ref(false);

    return { current, open, idx };
  },
});
</script>

<style lang="scss" scoped>
.margin-bottom:not(:last-of-type) {
  margin-bottom: 10px;
}
</style>
