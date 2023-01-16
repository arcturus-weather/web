<template>
  <q-dialog
    :v-model="visible"
    @update:model-value="(value) => $emit('update:model-value', value)"
  >
    <q-card style="width: 400px" class="card-border">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ $t('weather.astronomy.moonphase.label') }}</div>
        <q-space />
        <q-btn flat round dense v-close-popup icon="fa-solid fa-xmark" />
      </q-card-section>

      <q-card-section>
        <q-scroll-area
          style="height: 350px"
          :thumb-style="{
            width: '0',
          }"
        >
          <q-timeline color="secondary">
            <q-timeline-entry
              v-for="(item, idx) in current!.moon?.moonPhase"
              :key="idx"
              :title="$t(`weather.astronomy.moonphase.${item.name}`)"
              :subtitle="$d(item.dateTime!, 'long')"
            >
              <div class="row items-center justify-between q-pr-md">
                <div>
                  <div>
                    {{ $t('weather.astronomy.illumination') }} :
                    {{ item.illumination }}
                  </div>
                  <div>
                    {{ $t('weather.astronomy.moonPhaseValue') }} :
                    {{ item.value }}
                  </div>
                </div>
                <i-icon :name="item.icon" :type="weather.strategies"></i-icon>
              </div>
            </q-timeline-entry>
          </q-timeline>
        </q-scroll-area>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'iceAstronomyPanel',
});
</script>

<script lang="ts" setup>
import { useWeatherStore } from '@stores/stores';
import { storeToRefs } from 'pinia';

const weather = useWeatherStore();
const { current } = storeToRefs(weather);

defineProps({
  visible: {
    default: false,
    type: Boolean,
  },
});

defineEmits(['update:model-value']);
</script>
